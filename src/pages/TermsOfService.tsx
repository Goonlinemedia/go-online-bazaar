import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TermsOfService = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: April 3, 2026</p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground">
          <p className="text-lg mb-8">
            Welcome to Goonline ("we", "our", "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service.
          </p>

          <hr className="my-12 border-border" />

          <section id="services">
            <h2 className="text-foreground">1. Services</h2>
            <p>
              Goonline provides subscription-based website design, hosting, and maintenance services. By subscribing, you agree to pay a recurring fee in exchange for continued access to these services.
            </p>
          </section>

          <section id="eligibility">
            <h2 className="text-foreground">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our services. By using our platform, you confirm that you meet this requirement.
            </p>
          </section>

          <section id="subscription-payments">
            <h2 className="text-foreground">3. Subscription & Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Services are billed on a monthly basis unless otherwise stated.</li>
              <li>Payments must be made in advance.</li>
              <li>Failure to pay may result in suspension or termination of your website and services.</li>
              <li>All payments are non-refundable unless otherwise stated.</li>
            </ul>
          </section>

          <section id="website-ownership">
            <h2 className="text-foreground">4. Website Ownership</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Websites created under subscription remain the property of Goonline until otherwise agreed.</li>
              <li>Clients may not transfer, duplicate, or resell the website without permission.</li>
              <li>If a subscription is canceled, access to the website may be restricted or removed.</li>
            </ul>
          </section>

          <section id="client-responsibilities">
            <h2 className="text-foreground">5. Client Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information and content</li>
              <li>Ensure you have rights to any materials submitted (images, text, etc.)</li>
              <li>Not use the website for illegal or harmful activities</li>
            </ul>
          </section>

          <section id="prohibited-use">
            <h2 className="text-foreground">6. Prohibited Use</h2>
            <p className="mb-4">You may not use our services for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fraudulent or deceptive activities</li>
              <li>Hosting illegal content</li>
              <li>Spamming or phishing</li>
              <li>Any activity that violates applicable laws</li>
            </ul>
          </section>

          <section id="service-availability">
            <h2 className="text-foreground">7. Service Availability</h2>
            <p>
              We strive to provide continuous service, but we do not guarantee uninterrupted or error-free operation. Maintenance or technical issues may cause temporary downtime.
            </p>
          </section>

          <section id="termination">
            <h2 className="text-foreground">8. Termination</h2>
            <p className="mb-4">We reserve the right to suspend or terminate your account if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You violate these Terms</li>
              <li>You fail to make payments</li>
              <li>You misuse the service</li>
            </ul>
          </section>

          <section id="limitation-liability">
            <h2 className="text-foreground">9. Limitation of Liability</h2>
            <p className="mb-4">Goonline shall not be held liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of data</li>
              <li>Loss of business or revenue</li>
              <li>Any indirect or consequential damages</li>
            </ul>
            <p className="mt-4 font-medium italic">Use of our service is at your own risk.</p>
          </section>

          <section id="modifications">
            <h2 className="text-foreground">10. Modifications</h2>
            <p>
              We may update these Terms at any time. Continued use of the service after changes means you accept the updated Terms.
            </p>
          </section>

          <section id="governing-law">
            <h2 className="text-foreground">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with the laws of Nigeria.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-foreground">12. Contact Information</h2>
            <p>
              For questions about these Terms, contact us at:<br />
              <strong>Email:</strong> <a href="mailto:goonlinemedia0@gmail.com" className="text-primary hover:underline transition-colors">goonlinemedia0@gmail.com</a>
            </p>
          </section>

          <hr className="my-12 border-border" />

          <p className="text-sm italic">
            By using Goonline, you acknowledge that you have read, understood, and agreed to these Terms of Service.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
