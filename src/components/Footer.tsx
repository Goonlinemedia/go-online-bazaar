const Footer = () => (
  <footer className="bg-dark text-primary-foreground/70 py-12 px-4">
    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold font-heading text-primary">Go</span>
          <span className="text-2xl font-bold font-heading text-primary-foreground">Online</span>
        </div>
        <p className="text-sm leading-relaxed">
          Your all-inclusive digital store builder. Sell your products to anyone, anywhere.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {["Home", "Features", "Pricing", "Contact Us"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4">Support</h4>
        <ul className="space-y-2 text-sm">
          <li>Email: hello@goonline.com</li>
          <li>Phone: +234 902 021 9544</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4">Address</h4>
        <p className="text-sm">B4-313, HFP Eastline Shopping Complex, Abraham Adesanya Estate.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs">
      © {new Date().getFullYear()} Go Online. All rights reserved.
    </div>
  </footer>
);

export default Footer;
