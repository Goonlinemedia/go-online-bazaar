const services = [
  {
    title: "Website Design",
    description:
      "We use the latest web development technologies and frameworks to ensure that your website is fast, secure, and user-friendly. From simple landing pages to complex web applications, we have the skills and experience to deliver high-quality web solutions that meet your needs and exceed your expectations.",
  },
  {
    title: "Graphic Design",
    description:
      "Keeps businesses updated on current trends and future market directions. Assists in adapting to changes in consumer behavior and preferences.",
  },
  {
    title: "Content Management Services",
    description:
      "Our Website Content Management team offers a range of services to help you manage the content on your website (Uploading content, campaigns). Whether it's WordPress, Drupal, or a custom CMS, we provide flexible and scalable experts that grow with your business.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full mb-6 inline-block">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 font-heading tracking-tight">
            What <span className="text-primary italic">We Do</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The ultimate guide to building credibility and control with digital transformation. 
            We turn your social media followers into loyal customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
            >
              <div className="mb-8">
                <span className="text-5xl font-black text-gray-100 group-hover:text-primary transition-colors duration-500">0{idx + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {service.description}
              </p>
              <div className="mt-auto pt-8 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span>Learn more</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
