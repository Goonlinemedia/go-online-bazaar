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
                No. If you can use WhatsApp, you can use Goonline. We build everything for you so you can focus on your business.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Can I use WhatsApp?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                Yes! That's the best part. Your store is connected directly to your WhatsApp. When a customer orders, it lands straight in your DM.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">How do I receive payments?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                You can receive payments via Bank Transfer, Paystack, or Flutterwave. We set everything up for you during the onboarding process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Can I upgrade later?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                Yes, you can upgrade your plan at any time as your business grows. Just send us a message and we'll handle it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="glass-panel px-8 border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <AccordionTrigger className="hover:no-underline py-6 text-xl font-bold text-left font-heading tracking-tight">Is there support?</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 font-medium">
                Yes! We provide priority support via WhatsApp and Email to ensure your store is always running smoothly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
