import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  Timestamp,
  limit
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  Users, 
  MessageSquare, 
  LogOut, 
  TrendingUp, 
  Search,
  CheckCircle2,
  Clock,
  MoreVertical,
  MousePointer2,
  PhoneCall,
  Activity,
  LayoutDashboard,
  Calendar,
  Eye
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format, subDays, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";

interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  status: "New" | "Contacted" | "Converted" | "Ignore";
  createdAt: Timestamp;
}

interface AnalyticsEvent {
  id: string;
  event_type: string;
  visitor_id: string;
  page: string;
  metadata?: Record<string, unknown>;
  context?: {
    device?: string;
    [key: string]: unknown;
  };
  local_timestamp?: number;
  created_at?: Timestamp;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Date Filtering State
  const [filterRange, setFilterRange] = useState<"7d" | "30d" | "all" | "custom">("7d");
  const [customRange, setCustomRange] = useState({ 
    start: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    end: format(new Date(), "yyyy-MM-dd")
  });
  
  const navigate = useNavigate();
  
  // REAL-TIME CLOCK for "Live Now" re-renders
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 10000); // Tick every 10 seconds to refresh "Live Now" counts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Listen to Leads
    const leadsQuery = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const leadsData: Lead[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Lead, "id">;
        leadsData.push({ id: doc.id, ...data, status: data.status || "New" });
      });
      setLeads(leadsData);
    });

    // Listen to Events (Analytics)
    // IMPORTANT: Get a lot more events to be sure we have the latest ones
    const eventsQuery = query(collection(db, "events"), orderBy("created_at", "desc"), limit(2000));
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData: AnalyticsEvent[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<AnalyticsEvent, "id">;
        eventsData.push({ id: doc.id, ...data });
      });
      setEvents(eventsData);
      setLoading(false);
    });

    return () => {
      unsubscribeLeads();
      unsubscribeEvents();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const updateLeadStatus = async (id: string, newStatus: Lead["status"]) => {
    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  // --- Date Range Calculation ---
  const getDateRange = () => {
    const end = endOfDay(new Date());
    let start = startOfDay(subDays(new Date(), 7));
    
    if (filterRange === "30d") start = startOfDay(subDays(new Date(), 30));
    else if (filterRange === "all") start = new Date(0);
    else if (filterRange === "custom") {
      start = startOfDay(new Date(customRange.start));
      return { start, end: endOfDay(new Date(customRange.end)) };
    }
    return { start, end };
  };

  const { start: startDate, end: endDate } = getDateRange();

  // --- Filtered Data ---
  const filteredEvents = events.filter(e => {
    // If it's a pending write from another device, created_at might be null momentarily.
    // Use local_timestamp as fallback.
    const date = e.created_at ? e.created_at.toDate() : (e.local_timestamp ? new Date(e.local_timestamp) : null);
    if (!date) return true; // Pending event, always show
    return isAfter(date, startDate) && isBefore(date, endDate);
  });

  const filteredLeadsData = leads.filter(l => {
    if (!l.createdAt) return false;
    const date = l.createdAt.toDate();
    return isAfter(date, startDate) && isBefore(date, endDate);
  });

  // --- SaaS Analytics Calculations ---
  
  // 1. Live Now (Truly real-time using current 'now' state)
  const fiveMinsAgo = new Date(now - 5 * 60 * 1000);
  const activeReaders = new Set(
    events
      .filter(e => {
        // More robust checking:
        // 1. If we have a local_timestamp, use it (machine time is more consistent)
        // 2. If it's so new that created_at is null, it's definitely alive.
        if (e.local_timestamp) return e.local_timestamp > fiveMinsAgo.getTime();
        if (!e.created_at) return true; // Most likely a pending write
        return e.created_at.toDate().getTime() > fiveMinsAgo.getTime();
      })
      .map(e => e.visitor_id)
  ).size;

  // 2. Stats (Filtered)
  const totalViews = filteredEvents.filter(e => e.event_type === "page_view").length;
  const uniqueVisitors = new Set(filteredEvents.map(e => e.visitor_id)).size;
  const whatsappClicks = filteredEvents.filter(e => e.event_type === "whatsapp_click").length;
  const planClicks = filteredEvents.filter(e => e.event_type === "plan_selected").length;
  const conversionRate = uniqueVisitors > 0 ? ((whatsappClicks / uniqueVisitors) * 100).toFixed(1) : 0;

  // 3. Plan Breakdown (Filtered)
  const planDataMap = filteredEvents
    .filter(e => e.event_type === "plan_selected")
    .reduce((acc: Record<string, number>, e) => {
      const name = (e.metadata?.plan_name as string) || "Unknown";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
  
  const planChartData = Object.entries(planDataMap).map(([name, value]) => ({ name, value }));

  // 4. Trend Chart (Filtered) - Daily Views
  const timelineData = filteredEvents.slice().reverse().reduce((acc: { name: string; views: number; engagement: number }[], event) => {
    const date = event.created_at ? event.created_at.toDate() : (event.local_timestamp ? new Date(event.local_timestamp) : new Date());
    const day = format(date, "MMM dd");
    const existing = acc.find(a => a.name === day);
    if (existing) {
      if (event.event_type === "page_view") existing.views += 1;
      else existing.engagement += 1;
    } else {
      acc.push({ 
        name: day, 
        views: event.event_type === "page_view" ? 1 : 0, 
        engagement: event.event_type !== "page_view" ? 1 : 0 
      });
    }
    return acc;
  }, []);

  const filteredLeads = filteredLeadsData.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.mobile?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-secondary/30 p-4 lg:p-8">
      {/* Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">SaaS Dashboard</h1>
          <p className="text-muted-foreground">Monitoring your store machine in real-time.</p>
        </div>
        
        {/* Advanced Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex p-1 bg-background border rounded-lg shadow-sm overflow-hidden">
            {(["7d", "30d", "all", "custom"] as const).map((r) => (
              <Button 
                key={r}
                variant={filterRange === r ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterRange(r)}
                className="text-xs h-8 px-4 font-semibold"
              >
                {r === "all" ? "All Time" : r.toUpperCase()}
              </Button>
            ))}
          </div>
          
          {filterRange === "custom" && (
            <div className="flex items-center gap-2 bg-background border p-1 rounded-lg animate-in slide-in-from-right-2 duration-200">
              <Input 
                type="date" 
                className="h-8 text-xs border-none bg-transparent w-36"
                value={customRange.start}
                onChange={(e) => setCustomRange({...customRange, start: e.target.value})}
              />
              <span className="text-muted-foreground text-xs font-bold">TO</span>
              <Input 
                type="date" 
                className="h-8 text-xs border-none bg-transparent w-36"
                value={customRange.end}
                onChange={(e) => setCustomRange({...customRange, end: e.target.value})}
              />
            </div>
          )}

          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 text-xs h-10 border-primary/20 hover:bg-primary/5" onClick={() => window.open('https://console.firebase.google.com/project/go-online-webiste/analytics', '_blank')}>
              <Activity size={16} /> Analytics
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex gap-2 text-destructive hover:text-destructive h-10 text-xs">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-background border shadow-sm p-1">
          <TabsTrigger value="overview" className="gap-2"><LayoutDashboard size={16} /> Overview</TabsTrigger>
          <TabsTrigger value="leads" className="gap-2"><Users size={16} /> Leads ({filteredLeadsData.length})</TabsTrigger>
          <TabsTrigger value="events" className="gap-2"><Activity size={16} /> Live Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border-none shadow-sm bg-background border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Live Now</CardTitle>
                <div className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground">{activeReaders}</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Active Readers</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-background border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Views</CardTitle>
                <Eye className="text-blue-500" size={18} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground">{totalViews}</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Page loads in period</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visitors</CardTitle>
                <Users className="text-primary" size={18} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground">{uniqueVisitors}</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Unique browsers</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Engagement</CardTitle>
                <MousePointer2 className="text-blue-500" size={18} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground">{whatsappClicks + planClicks}</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">CTA clicks total</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Conv. Rate</CardTitle>
                <TrendingUp className="text-amber-500" size={18} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-amber-600">{conversionRate}%</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Visitors → Leads</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-md bg-background overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" /> Daily Traffic Breakdown
                </CardTitle>
                <CardDescription>Views vs Engagement over the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] pt-10 px-2 lg:px-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }} 
                    />
                    <Line name="Page Views" type="monotone" dataKey="views" stroke="#004a8b" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                    <Line name="Engagement" type="monotone" dataKey="engagement" stroke="#25D366" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-background overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Popular Plans</CardTitle>
                <CardDescription>Clicks within current selection</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex flex-col items-center justify-center">
                {planChartData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height="70%">
                      <PieChart>
                        <Pie
                          data={planChartData}
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {planChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-bold">
                      {planChartData.map((p, i) => (
                        <div key={p.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="text-muted-foreground">{p.name}:</span> {String(p.value)}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground text-sm italic py-20 text-center">
                    No plan engagement recorded<br/>in this period.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <Card className="border-none shadow-md bg-background">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Business Leads</CardTitle>
                <CardDescription>Filtered by date and search queries</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Search leads..." 
                  className="pl-9 bg-secondary/50 border-none h-10 text-sm focus-visible:ring-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-48 flex items-center justify-center italic text-muted-foreground animate-pulse">Loading filtered leads...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/20 hover:bg-secondary/20">
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id} className="hover:bg-secondary/10 transition-colors">
                          <TableCell>
                            <div className="font-semibold text-sm">{lead.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{lead.email}</div>
                            <div className="text-xs text-muted-foreground">{lead.mobile}</div>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {lead.createdAt ? format(lead.createdAt.toDate(), "MMM dd, yyyy") : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className={`
                                ${lead.status === "New" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : ""}
                                ${lead.status === "Contacted" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : ""}
                                ${lead.status === "Converted" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}
                                `}
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical size={16} /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "Contacted")}>Mark Contacted</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "Converted")}>Mark Converted</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "Ignore")} className="text-destructive">Ignore</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="border-none shadow-md bg-background">
            <CardHeader>
              <CardTitle>Live Activity Feed</CardTitle>
              <CardDescription>Filtered by selected timeframe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/20 border border-border/50">
                    <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      event.event_type === "whatsapp_click" ? "bg-green-100 text-green-600" :
                      event.event_type === "plan_selected" ? "bg-blue-100 text-blue-600" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {event.event_type === "whatsapp_click" ? <PhoneCall size={14} /> :
                       event.event_type === "plan_selected" ? <MousePointer2 size={14} /> :
                       <Activity size={14} />}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm capitalize">{event.event_type.replace('_', ' ')}</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {event.created_at ? format(event.created_at.toDate(), "HH:mm:ss") : (event.local_timestamp ? format(new Date(event.local_timestamp), "HH:mm:ss") : "Just now")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate italic">
                        via {event.context?.device} — on {event.page}
                      </p>
                      {event.metadata && Object.keys(event.metadata).length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.entries(event.metadata).map(([k, v]) => (
                            <Badge key={k} variant="outline" className="text-[10px] py-0 px-1.5 opacity-70">
                              {k}: {String(v)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 text-muted-foreground italic">No activities found in this period.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
