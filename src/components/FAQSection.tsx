import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden bg-transparent border-b border-border/50">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-reveal>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Support
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-muted-foreground font-medium">
            Common details about our engagement models, delivery timelines, and project launches.
          </p>
        </div>
        
        <div data-reveal data-reveal-delay="1">
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            <AccordionItem value="item-1" className="bg-card px-6 rounded-[20px] border border-border shadow-sm">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Do you design websites for churches and schools?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. We build sermon media libraries and online giving systems for churches, and admissions trackers, timetables, and student portal integrations for schools.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card px-6 rounded-[20px] border border-border shadow-sm">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Can NGOs receive online donations securely?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. We integrate secure local and international payment gateways (like Paystack and Flutterwave) directly into NGO websites to collect donations securely.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card px-6 rounded-[20px] border border-border shadow-sm">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Is training provided for managing our portal?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-5 font-medium">
                Absolutely. Upon launch, we provide a hands-on walkthrough session and documentation so your staff can easily manage class postings, list events, or update catalogs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card px-6 rounded-[20px] border border-border shadow-sm">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Do you offer post-launch support and hosting?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. We offer fully-managed hosting packages and ongoing maintenance plans covering security backups, custom content changes, and technical assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card px-6 rounded-[20px] border border-border shadow-sm">
              <AccordionTrigger className="hover:no-underline py-5 text-base font-bold text-left font-heading tracking-tight">
                Can you build customized database features?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-5 font-medium">
                Yes. For corporate directories, listing hubs, or logistics workflows, we design bespoke database systems that synchronize with your operational flows.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
