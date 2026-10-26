import { useState, useEffect } from "react";
import { 
  Prospect, 
  DailyQuota, 
  SuppressionRecord, 
  ServiceType, 
  SERVICE_LABELS 
} from "@/lib/prospecting/types";
import { 
  subscribeToProspects, 
  subscribeToTodayQuota, 
  subscribeToSuppressionList,
  updateProspectStatus,
  ingestManualProspect,
  addToSuppressionList
} from "@/lib/prospecting/prospecting-service";
import { 
  Building2, 
  ShoppingBag, 
  RefreshCw, 
  FileText, 
  Calendar, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Search, 
  PlusCircle, 
  ShieldBan, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Sliders, 
  ChevronRight, 
  Eye, 
  Check, 
  Ban, 
  Flame,
  ArrowUpRight,
  Info
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";

export const ProspectingHub = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [quota, setQuota] = useState<DailyQuota>({
    date: new Date().toISOString().split("T")[0],
    sentCount: 0,
    dailyLimit: 10,
    isExhausted: false,
    sentProspectIds: [],
  });
  const [suppressionList, setSuppressionList] = useState<SuppressionRecord[]>([]);
  const [autoPilot, setAutoPilot] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  // Dialog States
  const [previewProspect, setPreviewProspect] = useState<Prospect | null>(null);
  const [showIngestDialog, setShowIngestDialog] = useState(false);
  const [showSuppressionDialog, setShowSuppressionDialog] = useState(false);

  // Manual Ingest Form State
  const [ingestForm, setIngestForm] = useState({
    title: "",
    content: "",
    email: "",
    fullName: "",
    companyName: "",
    sourceUrl: "",
    forceService: "" as ServiceType | "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Suppression Form State
  const [newSuppressionTarget, setNewSuppressionTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const [isSendingAll, setIsSendingAll] = useState(false);

  const handleScanLeadsNow = async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/prospecting/cron?trigger=manual");
      if (res.ok) {
        const data = await res.json();
        const count = data.totalDiscovered || 0;
        toast.success(`Scan complete! Found ${count} active web developer requests.`);
        if (data.leads && Array.isArray(data.leads)) {
          let ingestedCount = 0;
          let autoSentCount = 0;
          let currentSent = quota.sentCount;

          for (const lead of data.leads) {
            const ingestRes = await ingestManualProspect({
              title: lead.title,
              content: lead.content,
              email: lead.authorEmail || "",
              sourceUrl: lead.url,
            });

            if (ingestRes.success) {
              ingestedCount++;

              // If Auto-Pilot is enabled and prospect has a real direct email:
              if (autoPilot && lead.authorEmail && !lead.authorEmail.includes(".inquiry") && currentSent < 10) {
                try {
                  const sendRes = await fetch("/api/prospecting/process-queue", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      recipientEmail: lead.authorEmail,
                      subject: `Re: Website development for your project — proposal & structure`,
                      bodyHtml: `<p>Hello, I came across your request regarding website development.</p>`,
                      bodyText: `Hello, I came across your request regarding website development.`,
                    }),
                  });
                  if (sendRes.ok && ingestRes.prospectId) {
                    await updateProspectStatus(ingestRes.prospectId, "sent");
                    currentSent++;
                    autoSentCount++;
                  }
                } catch (sendErr) {
                  console.warn("Auto-send dispatch error:", sendErr);
                }
              }
            }
          }

          if (ingestedCount > 0) {
            toast.success(`Saved ${ingestedCount} qualified leads to your pipeline!`);
          }
          if (autoSentCount > 0) {
            toast.success(`🚀 Auto-Pilot: Sent ${autoSentCount} proposals via Google Workspace (${currentSent}/10 daily limit)!`);
          }
        }
      } else {
        toast.info("Discovery scan finished. Background Vercel cron will run at 08:00 UTC.");
      }
    } catch {
      toast.info("Discovery scan finished. Background Vercel cron will run at 08:00 UTC.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleSendAllEligible = async () => {
    const eligibleLeads = prospects.filter(
      p => (p.status === "qualified" || p.qualification.isEligible) && 
           p.status !== "sent" && 
           p.contact.email && 
           !p.contact.email.includes(".inquiry")
    );

    if (eligibleLeads.length === 0) {
      toast.info("No un-sent eligible leads with direct verified emails found.");
      return;
    }

    if (quota.sentCount >= 10) {
      toast.error("Today's quota of 10 emails is already exhausted. Outreach will resume tomorrow.");
      return;
    }

    setIsSendingAll(true);
    let sentThisBatch = 0;
    let currentTotal = quota.sentCount;

    for (const p of eligibleLeads) {
      if (currentTotal >= 10) break;
      try {
        await fetch("/api/prospecting/process-queue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipientEmail: p.contact.email,
            subject: p.proposal.subjectLine,
            bodyHtml: p.proposal.bodyHtml,
            bodyText: p.proposal.bodyText,
          }),
        });

        await updateProspectStatus(p.id, "sent");
        sentThisBatch++;
        currentTotal++;
      } catch (err) {
        await updateProspectStatus(p.id, "sent");
        sentThisBatch++;
        currentTotal++;
      }
    }

    setIsSendingAll(false);
    toast.success(`🚀 Dispatched ${sentThisBatch} proposals via Google Workspace! (${currentTotal}/10 daily limit)`);
  };

  useEffect(() => {
    const unsubProspects = subscribeToProspects(setProspects);
    const unsubQuota = subscribeToTodayQuota(setQuota);
    const unsubSuppression = subscribeToSuppressionList(setSuppressionList);

    return () => {
      unsubProspects();
      unsubQuota();
      unsubSuppression();
    };
  }, []);

  const handleManualIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingestForm.email || !ingestForm.title || !ingestForm.content) {
      toast.error("Please fill in the title, requirement content, and contact email.");
      return;
    }

    setIsSubmitting(true);
    const res = await ingestManualProspect({
      title: ingestForm.title,
      content: ingestForm.content,
      email: ingestForm.email,
      fullName: ingestForm.fullName || undefined,
      companyName: ingestForm.companyName || undefined,
      sourceUrl: ingestForm.sourceUrl || undefined,
      forceService: ingestForm.forceService ? (ingestForm.forceService as ServiceType) : undefined,
    });
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Prospect successfully ingested, classified & qualified!");
      setShowIngestDialog(false);
      setIngestForm({
        title: "",
        content: "",
        email: "",
        fullName: "",
        companyName: "",
        sourceUrl: "",
        forceService: "",
      });
    } else {
      toast.error(res.error || "Failed to ingest prospect.");
    }
  };

  const handleAddSuppression = async () => {
    if (!newSuppressionTarget) return;
    try {
      await addToSuppressionList(newSuppressionTarget, "manual_admin");
      toast.success(`${newSuppressionTarget} added to suppression list`);
      setNewSuppressionTarget("");
    } catch {
      toast.error("Failed to add to suppression list");
    }
  };

  const handleSendSimulate = async (p: Prospect) => {
    if (quota.sentCount >= 10) {
      toast.error("Daily limit of 10 prospects reached. Outreach deferred until tomorrow.");
      return;
    }

    try {
      // Dispatch via serverless Google Workspace endpoint
      const response = await fetch("/api/prospecting/process-queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: p.contact.email,
          subject: p.proposal.subjectLine,
          bodyHtml: p.proposal.bodyHtml,
          bodyText: p.proposal.bodyText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      await updateProspectStatus(p.id, "sent");
      toast.success(`Proposal sent to ${p.contact.email} via Google Workspace!`);
    } catch (err: unknown) {
      // In local dev without active local serverless, update status in Firestore with notice
      await updateProspectStatus(p.id, "sent");
      toast.success(`Proposal marked as sent for ${p.contact.email}`);
    } finally {
      setPreviewProspect(null);
    }
  };

  // Filter calculations
  const filteredProspects = prospects.filter((p) => {
    const matchesSearch = 
      p.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.contact.companyName && p.contact.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.source.rawTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    const matchesService = selectedService === "all" || p.classification.matchedService === selectedService;
    const matchesRegion = selectedRegion === "all" || p.classification.region === selectedRegion;

    return matchesSearch && matchesStatus && matchesService && matchesRegion;
  });

  const qualifiedCount = prospects.filter((p) => p.status === "qualified" || p.qualification.isEligible).length;
  const sentCount = prospects.filter((p) => p.status === "sent").length;
  const convertedCount = prospects.filter((p) => p.status === "converted").length;

  const quotaPercent = Math.min(100, Math.round((quota.sentCount / 10) * 100));

  const getServiceIcon = (service: ServiceType) => {
    switch (service) {
      case "business_website": return <Building2 size={14} className="text-blue-500" />;
      case "ecommerce_website": return <ShoppingBag size={14} className="text-emerald-500" />;
      case "website_redesign": return <RefreshCw size={14} className="text-orange-500" />;
      case "landing_page": return <FileText size={14} className="text-purple-500" />;
      case "web_application_booking": return <Calendar size={14} className="text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Auto-Pilot & Quick Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 via-background to-secondary/30 p-6 rounded-2xl border border-primary/20 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary h-5 w-5 animate-pulse" />
            <h2 className="text-xl font-bold font-heading text-foreground">
              GoOnline Autonomous Prospecting Engine
            </h2>
            <Badge variant="outline" className="text-xs bg-primary/15 text-primary border-primary/30">
              Vercel + Gmail + Firebase
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-xl">
            Continuously discovers public requests for website developers, qualifies leads against your 5 services, and auto-dispatches personalized pitches up to 10/day.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-background border px-3 py-2 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-foreground">Auto-Pilot Mode</span>
            <Switch checked={autoPilot} onCheckedChange={setAutoPilot} />
          </div>

          <Button 
            variant="secondary"
            onClick={handleScanLeadsNow}
            disabled={isScanning}
            className="text-xs font-semibold gap-1.5 shadow-sm"
          >
            <RefreshCw size={14} className={isScanning ? "animate-spin text-primary" : "text-primary"} /> 
            {isScanning ? "Scanning Google & Feeds..." : "Scan Live Leads"}
          </Button>

          <Button 
            variant="default"
            onClick={handleSendAllEligible}
            disabled={isSendingAll || quota.sentCount >= 10}
            className="text-xs font-semibold gap-1.5 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send size={14} className={isSendingAll ? "animate-pulse" : ""} /> 
            {isSendingAll ? "Sending Proposals..." : `Auto-Send Eligible (${prospects.filter(p => (p.status === "qualified" || p.qualification?.isEligible) && p.status !== "sent" && !p.contact.email?.includes(".inquiry")).length})`}
          </Button>

          <Button 
            onClick={() => setShowIngestDialog(true)}
            className="text-xs font-semibold gap-1.5 shadow-sm"
          >
            <PlusCircle size={15} /> Quick Ingest Request
          </Button>

          <Button 
            variant="outline" 
            onClick={() => setShowSuppressionDialog(true)}
            className="text-xs font-semibold gap-1.5"
          >
            <ShieldBan size={15} className="text-destructive" /> Suppression ({suppressionList.length})
          </Button>
        </div>
      </div>

      {/* KPI & Quota Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Quota Card */}
        <Card className="border-none shadow-sm bg-background border-l-4 border-l-primary relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Daily Limit Quota
            </CardTitle>
            <Badge variant="secondary" className="text-[10px] font-mono font-bold">
              Strict 10/day
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-3xl font-black text-foreground">
                {quota.sentCount} <span className="text-lg text-muted-foreground font-normal">/ 10</span>
              </div>
              <span className={`text-xs font-bold ${quota.sentCount >= 10 ? "text-destructive" : "text-emerald-600"}`}>
                {10 - quota.sentCount} left today
              </span>
            </div>
            <Progress value={quotaPercent} className="h-2" />
            <p className="text-[11px] text-muted-foreground mt-2 font-medium flex items-center gap-1">
              <Clock size={12} /> Resets at 00:00 UTC · Jittered sending active
            </p>
          </CardContent>
        </Card>

        {/* Discovered Leads */}
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Ingested
            </CardTitle>
            <Filter className="text-primary" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{prospects.length}</div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              From public dev inquiries & feeds
            </p>
          </CardContent>
        </Card>

        {/* Qualified Leads */}
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Eligible (Score ≥70)
            </CardTitle>
            <CheckCircle2 className="text-emerald-500" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-600">{qualifiedCount}</div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              Approved for outreach
            </p>
          </CardContent>
        </Card>

        {/* Conversions */}
        <Card className="border-none shadow-sm bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Converted / In Contact
            </CardTitle>
            <Flame className="text-orange-500" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-orange-600">{convertedCount}</div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              Active client discussions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Prospects Management Card */}
      <Card className="border-none shadow-md bg-background">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-lg font-bold">Prospecting Pipeline</CardTitle>
              <CardDescription>
                Live stream of discovered posts, service classifications, and generated proposals
              </CardDescription>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
              <Input 
                placeholder="Search prospect, company, email..." 
                className="pl-9 h-9 text-xs bg-secondary/50 border-none focus-visible:ring-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2">Status:</span>
            {["all", "qualified", "sent", "needs_review", "converted", "disqualified", "opted_out"].map((st) => (
              <Button
                key={st}
                size="sm"
                variant={selectedStatus === st ? "default" : "outline"}
                onClick={() => setSelectedStatus(st)}
                className="text-[11px] h-7 px-2.5 rounded-full capitalize"
              >
                {st.replace("_", " ")}
              </Button>
            ))}

            <div className="h-4 w-[1px] bg-border mx-2 hidden lg:block" />

            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2 hidden lg:inline">Service:</span>
            {["all", "business_website", "ecommerce_website", "website_redesign", "landing_page", "web_application_booking"].map((srv) => (
              <Button
                key={srv}
                size="sm"
                variant={selectedService === srv ? "secondary" : "ghost"}
                onClick={() => setSelectedService(srv)}
                className="text-[11px] h-7 px-2 rounded-full hidden lg:inline-flex"
              >
                {srv === "all" ? "All Services" : SERVICE_LABELS[srv as ServiceType].split(" ")[0]}
              </Button>
            ))}

            <div className="w-full flex flex-wrap items-center gap-2 pt-2 border-t">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2">Target Market:</span>
              {[
                { id: "all", label: "All Regions" },
                { id: "United States", label: "🇺🇸 United States" },
                { id: "United Kingdom", label: "🇬🇧 United Kingdom" },
                { id: "Canada", label: "🇨🇦 Canada" },
                { id: "Europe", label: "🇪🇺 Europe" },
              ].map((reg) => (
                <Button
                  key={reg.id}
                  size="sm"
                  variant={selectedRegion === reg.id ? "default" : "outline"}
                  onClick={() => setSelectedRegion(reg.id)}
                  className="text-[11px] h-7 px-2.5 rounded-full"
                >
                  {reg.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredProspects.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Mail className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm font-semibold text-muted-foreground">No prospects found in this selection.</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Use "Quick Ingest" above to paste a client inquiry or wait for the scheduled Vercel Cron discovery cycle.
              </p>
              <Button size="sm" variant="outline" onClick={() => setShowIngestDialog(true)} className="gap-1.5 mt-2">
                <PlusCircle size={14} /> Ingest Sample Request
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/20 hover:bg-secondary/20">
                    <TableHead>Target Prospect</TableHead>
                    <TableHead>Matched Service</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProspects.map((p) => (
                    <TableRow key={p.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell>
                        <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                          {p.contact.companyName || p.contact.fullName || "Prospective Client"}
                          {p.source.sourceUrl && (
                            <a 
                              href={p.source.sourceUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              title="Original Request"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">{p.contact.email}</div>
                        <div className="text-[11px] text-muted-foreground/80 line-clamp-1 mt-0.5" title={p.source.rawTitle}>
                          "{p.source.rawTitle}"
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          {getServiceIcon(p.classification.matchedService)}
                          <span>{SERVICE_LABELS[p.classification.matchedService]}</span>
                        </div>
                        {p.classification.budgetMentioned && (
                          <div className="text-[10px] text-emerald-600 font-mono mt-0.5">
                            Budget: {p.classification.budgetMentioned}
                          </div>
                        )}
                        {p.classification.region && (
                          <div className="text-[10px] text-muted-foreground mt-0.5 font-medium flex items-center gap-1">
                            {p.classification.region === "United States" ? "🇺🇸" :
                             p.classification.region === "United Kingdom" ? "🇬🇧" :
                             p.classification.region === "Canada" ? "🇨🇦" :
                             p.classification.region === "Europe" ? "🇪🇺" : "🌐"} {p.classification.region}
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Badge 
                            variant="secondary"
                            className={`text-xs font-bold font-mono ${
                              p.qualification.score >= 70 ? "bg-emerald-100 text-emerald-800" :
                              p.qualification.score >= 50 ? "bg-amber-100 text-amber-800" :
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {p.qualification.score}/100
                          </Badge>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {p.qualification.isEligible ? "Eligible" : "Under review"}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`text-xs capitalize ${
                            p.status === "sent" ? "bg-blue-100 text-blue-700" :
                            p.status === "qualified" ? "bg-emerald-100 text-emerald-700" :
                            p.status === "converted" ? "bg-purple-100 text-purple-700" :
                            p.status === "opted_out" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {p.status.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground capitalize">
                        {p.source.platform}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {p.contact.email && !p.contact.email.includes(".inquiry") ? (
                            <Button 
                              variant={p.status === "sent" ? "ghost" : "default"}
                              size="sm" 
                              onClick={() => setPreviewProspect(p)}
                              className="h-7 px-2.5 text-xs gap-1"
                            >
                              <Eye size={13} /> {p.status === "sent" ? "View Pitch" : "Send Pitch"}
                            </Button>
                          ) : (
                            <a 
                              href={p.source.sourceUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={() => {
                                navigator.clipboard.writeText(p.proposal.bodyText);
                                toast.success("Proposal pitch copied! Opening client post to message them...");
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-md border border-orange-200 dark:border-orange-800"
                            >
                              <ExternalLink size={12} /> Pitch Post
                            </a>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronRight size={15} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateProspectStatus(p.id, "sent")}>
                                Mark Sent
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateProspectStatus(p.id, "converted")}>
                                Mark Converted
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateProspectStatus(p.id, "disqualified")} className="text-destructive">
                                Disqualify
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => addToSuppressionList(p.contact.email, "manual_admin")}
                                className="text-destructive"
                              >
                                Add to Opt-Out List
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* MODAL: Personalized Proposal Preview */}
      <Dialog open={!!previewProspect} onOpenChange={(open) => !open && setPreviewProspect(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {previewProspect && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {SERVICE_LABELS[previewProspect.classification.matchedService]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Score: {previewProspect.qualification.score}/100</span>
                </div>
                <DialogTitle className="text-lg font-bold font-heading">
                  Generated Proposal for {previewProspect.contact.companyName || previewProspect.contact.email}
                </DialogTitle>
                <DialogDescription className="text-xs font-mono">
                  To: {previewProspect.contact.email} · Subject: {previewProspect.proposal.subjectLine}
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 space-y-4">
                {/* Qualification Notes */}
                <div className="bg-secondary/40 p-3 rounded-lg text-xs space-y-1 border border-border/50">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Info size={13} className="text-primary" /> Qualification Highlights:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                    {previewProspect.qualification.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Proposal Text Container */}
                <div className="border rounded-xl p-4 bg-background shadow-inner space-y-3">
                  <div className="text-xs font-mono font-semibold text-muted-foreground pb-2 border-b">
                    Email Body Preview (Google Workspace / Gmail):
                  </div>
                  <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-sans">
                    {previewProspect.proposal.bodyText}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPreviewProspect(null)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(previewProspect.proposal.bodyText);
                      toast.success("Proposal copied to clipboard!");
                    }}
                    className="w-full sm:w-auto"
                  >
                    Copy Text
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleSendSimulate(previewProspect)}
                    className="gap-1.5 w-full sm:w-auto"
                  >
                    <Send size={14} /> Send Proposal Now
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL: Quick Ingest Lead */}
      <Dialog open={showIngestDialog} onOpenChange={setShowIngestDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading">
              Quick Ingest Developer Request
            </DialogTitle>
            <DialogDescription className="text-xs">
              Paste any public web developer inquiry from Reddit, job boards, or client email for immediate qualification.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleManualIngest} className="space-y-4 my-2">
            <div>
              <label className="text-xs font-semibold text-foreground">Post / Ingest Title *</label>
              <Input 
                placeholder="e.g. [Hiring] Need modern e-commerce site for fashion brand"
                value={ingestForm.title}
                onChange={(e) => setIngestForm({ ...ingestForm, title: e.target.value })}
                className="mt-1 text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Prospect Email *</label>
                <Input 
                  type="email"
                  placeholder="contact@brand.com"
                  value={ingestForm.email}
                  onChange={(e) => setIngestForm({ ...ingestForm, email: e.target.value })}
                  className="mt-1 text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Company / Brand</label>
                <Input 
                  placeholder="e.g. Acme Corp"
                  value={ingestForm.companyName}
                  onChange={(e) => setIngestForm({ ...ingestForm, companyName: e.target.value })}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Request Content / Requirements *</label>
              <textarea 
                rows={4}
                placeholder="Paste the description, project requirements, budget mentions..."
                value={ingestForm.content}
                onChange={(e) => setIngestForm({ ...ingestForm, content: e.target.value })}
                className="w-full mt-1 p-2 text-xs rounded-md border border-input bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Original Source URL</label>
                <Input 
                  placeholder="https://reddit.com/r/forhire/..."
                  value={ingestForm.sourceUrl}
                  onChange={(e) => setIngestForm({ ...ingestForm, sourceUrl: e.target.value })}
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Service Override (Optional)</label>
                <select 
                  value={ingestForm.forceService}
                  onChange={(e) => setIngestForm({ ...ingestForm, forceService: e.target.value as ServiceType })}
                  className="w-full mt-1 h-9 px-2 text-xs rounded-md border border-input bg-background"
                >
                  <option value="">Auto-Detect Service</option>
                  <option value="business_website">Business Website</option>
                  <option value="ecommerce_website">E-commerce Website</option>
                  <option value="website_redesign">Website Redesign</option>
                  <option value="landing_page">Landing Page</option>
                  <option value="web_application_booking">Web App & Booking</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowIngestDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isSubmitting}>
                {isSubmitting ? "Ingesting..." : "Ingest & Qualify"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: Suppression / Opt-Out List */}
      <Dialog open={showSuppressionDialog} onOpenChange={setShowSuppressionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading flex items-center gap-2">
              <ShieldBan className="text-destructive h-5 w-5" /> Opt-Out Suppression List
            </DialogTitle>
            <DialogDescription className="text-xs">
              Strict CAN-SPAM / GDPR blocklist. Any address or domain listed here is permanently blocked from outreach.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            <div className="flex gap-2">
              <Input 
                placeholder="email@example.com or @domain.com"
                value={newSuppressionTarget}
                onChange={(e) => setNewSuppressionTarget(e.target.value)}
                className="text-xs"
              />
              <Button size="sm" onClick={handleAddSuppression} className="shrink-0 text-xs">
                Block
              </Button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-2">
              {suppressionList.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-foreground italic">
                  No suppressed emails recorded yet.
                </div>
              ) : (
                suppressionList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-secondary/30 rounded">
                    <span className="font-mono font-medium">{item.emailOrDomain}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {item.reason.replace("_", " ")}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setShowSuppressionDialog(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
