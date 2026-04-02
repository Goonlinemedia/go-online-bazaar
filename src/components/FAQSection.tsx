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
            No. If you can use WhatsApp, you can use Goonline. We build everything for you so you can focus on your business.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Can I use WhatsApp?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Yes! That's the best part. Your store is connected directly to your WhatsApp. When a customer orders, it lands straight in your DM.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">How do I receive payments?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            You can receive payments via Bank Transfer, Paystack, or Flutterwave. We set everything up for you during the onboarding process.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Can I upgrade later?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Yes, you can upgrade your plan at any time as your business grows. Just send us a message and we'll handle it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="bg-card border px-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="hover:no-underline font-semibold text-left font-heading">Is there support?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            Yes! We provide priority support via WhatsApp and Email to ensure your store is always running smoothly.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
