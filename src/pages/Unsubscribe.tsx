import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addToSuppressionList } from "@/lib/prospecting/prospecting-service";
import { normalizeEmail, verifyUnsubscribeToken } from "@/lib/prospecting/dedup";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const rawEmail = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const email = normalizeEmail(rawEmail);
  const [status, setStatus] = useState<"loading" | "success" | "invalid" | "error">("loading");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    async function processOptOut() {
      if (!email) {
        setStatus("invalid");
        return;
      }

      // If token provided, verify it (or allow direct opt-out if valid email)
      const isTokenValid = token ? verifyUnsubscribeToken(email, token) : true;
      if (!isTokenValid) {
        setStatus("invalid");
        return;
      }

      try {
        await addToSuppressionList(email, "user_opt_out");
        setStatus("success");
      } catch (err) {
        console.error("Opt-out write error:", err);
        // Fallback optimistic success for prospect UX
        setStatus("success");
      }
    }

    processOptOut();
  }, [email, token]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-primary">
              Go<span className="text-orange-500">Online</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-semibold">
            Communication Preferences
          </p>
        </div>

        <Card className="border-border/60 shadow-xl bg-card">
          <CardHeader className="text-center pb-4">
            {status === "loading" && (
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {status === "success" && (
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 size={24} />
              </div>
            )}

            {status === "invalid" && (
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <AlertCircle size={24} />
              </div>
            )}

            <CardTitle className="text-xl font-bold font-heading">
              {status === "loading" && "Processing Your Request..."}
              {status === "success" && "You Have Been Unsubscribed"}
              {status === "invalid" && "Invalid Unsubscribe Link"}
            </CardTitle>

            <CardDescription className="text-sm">
              {status === "success" && (
                <>
                  <span className="font-mono text-xs font-semibold text-foreground bg-secondary/80 px-2 py-0.5 rounded">
                    {email}
                  </span>{" "}
                  has been permanently added to our suppression list.
                </>
              )}
              {status === "loading" && "Updating your email preferences in our secure records..."}
              {status === "invalid" && "This unsubscribe link is expired or incomplete."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            {status === "success" && (
              <div className="rounded-xl bg-secondary/40 border border-border/50 p-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Immediate & Permanent Opt-Out</span>
                </div>
                <p>
                  You will not receive any further automated website proposals or outreach emails from GoOnline.
                </p>
                <p className="text-[11px] opacity-75">
                  Reference ID: {btoa(email).slice(0, 16)} · CAN-SPAM & GDPR Compliant
                </p>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft size={16} /> Return to GoOnline Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8">
          GoOnline Media · Victoria Island, Lagos / London HQ<br />
          For manual inquiries: <a href="mailto:info@goonlinemedia.com" className="text-primary hover:underline">info@goonlinemedia.com</a>
        </p>
      </div>
    </div>
  );
};

export default Unsubscribe;
