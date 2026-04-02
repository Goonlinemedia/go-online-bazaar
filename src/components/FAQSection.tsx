import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section id="faq" className="max-w-3xl mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 font-heading">Got questions? ❓</h2>
        <p className="text-muted-foreground italic">"We've got answers to help you get started today."</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Do I need technical skills?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Nope. If you can use WhatsApp, you can use this. We've simplified everything so you can focus on selling while we handle the tech.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">How do I receive orders?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Customers browse your website, add items to their cart, and their order is sent directly to your WhatsApp instantly. You can chat with them and finalize the sale immediately.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Can I upgrade later?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Yes! You can upgrade anytime as your business grows. We make it easy to scale up seamlessly without any downtime or data loss.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Do you take commissions?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            No. We charge a flat subscription fee. What you earn from your sales is 100% yours to keep. No hidden fees, ever.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Can I use my own domain?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Yes — custom domains are available on the Deluxe plan and above. You can easily connect your own perfectly branded domain name to build even more trust.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
