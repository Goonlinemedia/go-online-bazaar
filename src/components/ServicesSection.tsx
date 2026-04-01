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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            What <span className="text-primary">We Do</span>
          </h2>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest max-w-3xl mx-auto">
            The ultimate guide to building credibility and control with digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#fafafa] p-10 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-heading">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
