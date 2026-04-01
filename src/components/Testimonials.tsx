import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Got my first sale in 2 days 🔥 Super easy, everything was handled for me. Now I focus on my products.",
    author: "Binta K.",
    role: "Merchant",
    stars: 5,
  },
  {
    quote: "I used to spend hours on WhatsApp manually taking orders. Now customers browse and order themselves. A game-changer!",
    author: "Ade O.",
    role: "Retailer",
    stars: 5,
  },
  {
    quote: "Professional, clean, and fast. The best part is I didn't have to touch a single line of code.",
    author: "Tobi S.",
    role: "Small Business Owner",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground font-heading">
            Trusted by growing <span className="text-primary">businesses</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Hear from entrepreneurs who took their business digital with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#fafafa] p-10 rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300 relative group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed mb-8 text-lg">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-bold text-foreground font-heading">{t.author}</h4>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
              {/* Decorative Quote Mark */}
              <div className="absolute top-10 right-10 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 8.89543 14.017 10V13H11.017V10C11.017 7.23858 13.2556 5 16.017 5H19.017C21.7784 5 24.017 7.23858 24.017 10V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0.0170044 21L0.0170044 18C0.0170044 16.8954 0.912435 16 2.017 16H5.017C5.56928 16 6.017 15.5523 6.017 15V9C6.017 8.44772 5.56928 8 5.017 8H2.017C0.912435 8 0.0170044 8.89543 0.0170044 10V13H-2.983V10C-2.983 7.23858 -0.744416 5 2.017 5H5.017C7.77842 5 10.017 7.23858 10.017 10V15C10.017 18.3137 7.33072 21 4.017 21H0.0170044Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
