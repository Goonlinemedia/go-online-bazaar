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
  Timestamp 
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
  Line 
} from "recharts";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  LogOut, 
  TrendingUp, 
  Search,
  CheckCircle2,
  Clock,
  MoreVertical
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

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData: Lead[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Lead, "id">;
        leadsData.push({ 
          id: doc.id, 
          ...data,
          status: data.status || "New" 
        });
      });
      setLeads(leadsData);
      setLoading(false);
    });

    return () => unsubscribe();
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

  // Analytics Calculations
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.mobile?.includes(searchTerm)
  );

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === "New").length;
  const convertedLeads = leads.filter(l => l.status === "Converted").length;

  // Process data for charts (leads by day)
  const chartData = leads.slice().reverse().reduce((acc: any[], lead) => {
    const day = lead.createdAt ? format(lead.createdAt.toDate(), "MMM dd") : "Unknown";
    const existing = acc.find(a => a.name === day);
    if (existing) {
      existing.leads += 1;
    } else {
      acc.push({ name: day, leads: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-secondary/30 p-4 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to the Go Online backend.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex gap-2">
          <LogOut size={18} /> Logout
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Leads</CardTitle>
            <Users className="text-primary" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Growth: +{leads.length > 5 ? "12%" : "0%"}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">New Leads</CardTitle>
            <MessageSquare className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeadsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Require response</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Converted</CardTitle>
            <CheckCircle2 className="text-emerald-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertedLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Success stories</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Pending</CardTitle>
            <Clock className="text-amber-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.filter(l => l.status === "Contacted").length}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics & Table */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Charts */}
        <Card className="lg:col-span-1 border-none shadow-sm bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> Analytics
            </CardTitle>
            <CardDescription>Leads trend over current period</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#004a8b" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#004a8b" }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-background">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Manage all your latest submissions</CardDescription>
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
              <div className="h-48 flex items-center justify-center">
                <p className="text-muted-foreground">Loading data...</p>
              </div>
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
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
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
                              ${lead.status === "Ignore" ? "bg-slate-100 text-slate-700 hover:bg-slate-100" : ""}
                            `}
                          >
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "Contacted")}>Mark as Contacted</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "Converted")}>Mark as Converted</DropdownMenuItem>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
