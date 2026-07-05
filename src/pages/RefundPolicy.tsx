import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">Refund Policy</h1>
          <p className="text-muted-foreground">Last Updated: April 3, 2026</p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground">
          <p className="text-lg mb-8">
            At GoOnline, we aim to provide high-quality website services. This Refund Policy outlines how refunds are handled.
          </p>

          <hr className="my-12 border-border" />

          <section id="subscription-payments">
            <h2 className="text-foreground">1. Subscription Payments</h2>
            <p className="mb-4">All subscription payments are billed in advance on a monthly basis.</p>
            <p className="font-medium">Payments are generally non-refundable, except as stated below.</p>
          </section>

          <section id="eligibility">
            <h2 className="text-foreground">2. Eligibility for Refunds</h2>
            <p className="mb-4">Refunds may be considered only in the following cases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You were charged incorrectly</li>
              <li>You were billed after canceling your subscription</li>
              <li>We fail to deliver the agreed service within a reasonable timeframe</li>
            </ul>
          </section>

          <section id="non-refundable">
            <h2 className="text-foreground">3. Non-Refundable Situations</h2>
            <p className="mb-4">We do not offer refunds for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Change of mind after purchase</li>
              <li>Failure to use the service</li>
              <li>Delays caused by lack of client response or content</li>
              <li>Partial use of the subscription period</li>
            </ul>
          </section>

          <section id="cancellation">
            <h2 className="text-foreground">4. Cancellation</h2>
            <p className="mb-4">You may cancel your subscription at any time.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your service will remain active until the end of your billing period</li>
              <li>No refunds will be issued for unused time</li>
            </ul>
          </section>

          <section id="service-suspension">
            <h2 className="text-foreground">5. Service Suspension</h2>
            <p className="mb-4">If payment is not received:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your website may be suspended or taken offline</li>
              <li>Access will be restored once payment is made</li>
            </ul>
          </section>

          <section id="custom-work">
            <h2 className="text-foreground">6. Custom Work</h2>
            <p>
              Any custom work completed (design, setup, etc.) is non-refundable once delivered.
            </p>
          </section>

          <section id="processing">
            <h2 className="text-foreground">7. Processing Refunds</h2>
            <p className="mb-4">If a refund is approved:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>It will be processed within 7–14 business days</li>
              <li>Refunds will be issued via the original payment method</li>
            </ul>
          </section>

          <section id="contact">
            <h2 className="text-foreground">8. Contact Us</h2>
            <p>
              For refund requests or questions, contact us:<br />
              <strong>Email:</strong> <a href="mailto:goonlinemedia0@gmail.com" className="text-primary hover:underline transition-colors">goonlinemedia0@gmail.com</a><br />
              <strong>Phone/WhatsApp:</strong> <a href="https://wa.me/2347081150770" className="text-primary hover:underline transition-colors">+234 708 115 0770</a>
            </p>
          </section>

          <hr className="my-12 border-border" />

          <p className="text-sm italic">
            By subscribing to GoOnline, you agree to this Refund Policy.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
