import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: April 3, 2026</p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground">
          <p className="text-lg mb-8">
            GoOnline ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          <hr className="my-12 border-border" />

          <section id="information-collection">
            <h2 className="text-foreground">1. Information We Collect</h2>
            <p className="mb-4">We may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (name, email address, phone number)</li>
              <li>Business information (if provided)</li>
              <li>Payment details (processed securely via third-party providers)</li>
              <li>Website content you submit (text, images, etc.)</li>
            </ul>
          </section>

          <section id="information-usage">
            <h2 className="text-foreground">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and manage our services</li>
              <li>Build and maintain your website</li>
              <li>Process payments</li>
              <li>Communicate with you (updates, support, etc.)</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section id="payment-information">
            <h2 className="text-foreground">3. Payment Information</h2>
            <p>
              We do not store your full payment details. Payments are handled securely through trusted third-party payment providers.
            </p>
          </section>

          <section id="data-sharing">
            <h2 className="text-foreground">4. Data Sharing</h2>
            <p className="mb-4">We do not sell your personal information.</p>
            <p className="mb-4">We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers (hosting, payment processors)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </section>

          <section id="data-security">
            <h2 className="text-foreground">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your data. However, no online service is completely secure, and we cannot guarantee absolute protection.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-foreground">6. Cookies</h2>
            <p>
              Our website may use cookies to improve user experience and track usage. You can disable cookies in your browser settings.
            </p>
          </section>

          <section id="your-rights">
            <h2 className="text-foreground">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section id="data-retention">
            <h2 className="text-foreground">8. Data Retention</h2>
            <p>
              We retain your information only as long as necessary to provide our services or comply with legal obligations.
            </p>
          </section>

          <section id="third-party-links">
            <h2 className="text-foreground">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section id="modifications">
            <h2 className="text-foreground">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy at any time. Continued use of our services means you accept the updated policy.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-foreground">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, contact us:<br />
              <strong>Email:</strong> <a href="mailto:goonlinemedia0@gmail.com" className="text-primary hover:underline transition-colors">goonlinemedia0@gmail.com</a><br />
              <strong>Phone/WhatsApp:</strong> <a href="https://wa.me/2348035826698" className="text-primary hover:underline transition-colors">+234 803 582 6698</a>
            </p>
          </section>

          <hr className="my-12 border-border" />

          <p className="text-sm italic">
            By using GoOnline, you agree to this Privacy Policy.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
