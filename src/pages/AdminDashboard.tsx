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
  Filter,
  LayoutDashboard
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
import { format } from "date-fns";

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
  metadata: any;
  context: any;
  created_at: Timestamp;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    const eventsQuery = query(collection(db, "events"), orderBy("created_at", "desc"), limit(1000));
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData: AnalyticsEvent[] = [];
      snapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() } as AnalyticsEvent);
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

  // --- SaaS Analytics Calculations ---
  
  // 1. Funnel
  const uniqueVisitors = new Set(events.map(e => e.visitor_id)).size;
  const whatsappClicks = events.filter(e => e.event_type === "whatsapp_click").length;
  const planClicks = events.filter(e => e.event_type === "plan_selected").length;
  const conversionRate = uniqueVisitors > 0 ? ((whatsappClicks / uniqueVisitors) * 100).toFixed(1) : 0;

  // 2. Plan Breakdown
  const planDataMap = events
    .filter(e => e.event_type === "plan_selected")
    .reduce((acc: any, e) => {
      const name = e.metadata?.plan_name || "Unknown";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
  
  const planChartData = Object.entries(planDataMap).map(([name, value]) => ({ name, value }));

  // 3. Events Timeline (Page Views vs Clicks)
  const timelineData = events.slice().reverse().reduce((acc: any[], event) => {
    const day = event.created_at ? format(event.created_at.toDate(), "MMM dd") : "Unknown";
    const existing = acc.find(a => a.name === day);
    if (existing) {
      if (event.event_type === "page_view") existing.views += 1;
      else existing.clicks += 1;
    } else {
      acc.push({ name: day, views: event.event_type === "page_view" ? 1 : 0, clicks: event.event_type !== "page_view" ? 1 : 0 });
    }
    return acc;
  }, []);

  // Filtered Leads for Table
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.mobile?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-secondary/30 p-4 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">SaaS Dashboard</h1>
          <p className="text-muted-foreground">Monitoring your store machine in real-time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2" onClick={() => window.open('https://console.firebase.google.com/project/go-online-webiste/analytics', '_blank')}>
            <Activity size={18} /> Firebase Console
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="flex gap-2 text-destructive hover:text-destructive">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-background border shadow-sm p-1">
          <TabsTrigger value="overview" className="gap-2"><LayoutDashboard size={16} /> Overview</TabsTrigger>
          <TabsTrigger value="leads" className="gap-2"><Users size={16} /> Leads ({leads.length})</TabsTrigger>
          <TabsTrigger value="events" className="gap-2"><Activity size={16} /> Live Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Unique Visitors</CardTitle>
                <Users className="text-primary" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueVisitors}</div>
                <p className="text-xs text-muted-foreground mt-1">Direct + Organic</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Plan Interest</CardTitle>
                <MousePointer2 className="text-blue-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{planClicks}</div>
                <p className="text-xs text-muted-foreground mt-1">Button clicks on plans</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">WhatsApp Leads</CardTitle>
                <PhoneCall className="text-[#25D366]" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{whatsappClicks}</div>
                <p className="text-xs text-muted-foreground mt-1">Clicked WhatsApp button</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Conversion rate</CardTitle>
                <TrendingUp className="text-amber-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Visitors → WhatsApp</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Trend Chart */}
            <Card className="lg:col-span-2 border-none shadow-md bg-background overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" /> Traffic & Engagement Trends
                </CardTitle>
                <CardDescription>Daily breakdown of activities</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] pt-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
                    />
                    <Line type="monotone" dataKey="views" stroke="#004a8b" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="clicks" stroke="#25D366" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Plan breakdown chart */}
            <Card className="border-none shadow-md bg-background overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Popular Plans</CardTitle>
                <CardDescription>Which plans users are clicking</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex flex-col items-center justify-center">
                {planChartData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height="70%">
                      <PieChart>
                        <Pie
                          data={planChartData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {planChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-medium">
                      {planChartData.map((p, i) => (
                        <div key={p.name} className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          {p.name}: {String(p.value)}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground text-sm italic">No plan clicks recorded yet.</div>
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
                <CardDescription>People who actually filled the form</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Search leads..." 
                  className="pl-9 bg-secondary/50 border-none h-9 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-48 flex items-center justify-center italic text-muted-foreground">Loading leads...</div>
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
              <CardDescription>Real-time stream of what's happening on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {events.map((event) => (
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
                          {event.created_at ? format(event.created_at.toDate(), "HH:mm:ss") : "Just now"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate italic">
                        via {event.context?.device} — on {event.page}
                      </p>
                      {event.metadata && Object.keys(event.metadata).length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.entries(event.metadata).map(([k, v]: [string, any]) => (
                            <Badge key={k} variant="outline" className="text-[10px] py-0 px-1.5 opacity-70">
                              {k}: {String(v)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
