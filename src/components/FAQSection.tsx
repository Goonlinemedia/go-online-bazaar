import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 relative overflow-hidden bg-background border-b border-border/30">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-reveal>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] bg-secondary px-3 py-1.5 rounded-full mb-4 inline-block">
            Support
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-muted-foreground font-medium">
            Common details about our engagement models, delivery timelines, and project launches.
          </p>
        </div>
        
        <div data-reveal data-reveal-delay="1">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-card px-6 rounded-2xl border border-border">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Do I need technical skills?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 font-medium">
                No. We handle design, setup, domain routing, and launch completely. You only manage your orders and business.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-card px-6 rounded-2xl border border-border">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Can I use WhatsApp?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. Your ecommerce system can route order captures directly to WhatsApp, allowing you to close deals in real-time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-card px-6 rounded-2xl border border-border">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                How do I receive payments?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 font-medium">
                We set up payment integrations via bank transfer, Paystack, or Flutterwave, routing funds directly to your accounts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-card px-6 rounded-2xl border border-border">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Can I upgrade later?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. You can scale your pricing tier and expand your operational support as your business grows.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-card px-6 rounded-2xl border border-border">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Is there support?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. We provide priority email and chat support to ensure your website operates without issue.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
