import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="section-number">06</div>
      <div className="aura-blob bg-primary w-[400px] h-[400px] -left-20 top-1/2 opacity-5" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-reveal>
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">Support</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-heading font-black text-foreground tracking-tighter leading-tight">
            Got questions? <span className="gradient-text italic">We've got answers.</span>
          </h2>
          <p className="mt-8 text-xl text-muted-foreground font-medium italic">
            Everything you need to know to get started today.
          </p>
        </div>
        
        <div data-reveal data-reveal-delay="1">
          <Accordion type="single" collapsible className="w-full space-y-6">
            <AccordionItem value="item-1" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Do I need technical skills?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                No. We handle design, setup, and launch completely. You only need to manage your business.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Can I use WhatsApp?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                Yes. Your website integrates directly with WhatsApp so orders are routed straight to your private chat.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">How do I receive payments?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                You can receive payments via Bank Transfer, Paystack, or Flutterwave. We configure everything for you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Can I upgrade later?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                Yes. You can scale your pricing tier at any time as your product catalog or sales volumes grow.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Is there support?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                Yes. We provide priority email and chat support to ensure your website runs seamlessly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
