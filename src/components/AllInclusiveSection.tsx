import { Layers, Rocket, ShieldCheck } from "lucide-react";

const points = [
  { icon: Layers, title: "All-in-One Platform", desc: "Store, payments, delivery, marketing — everything under one roof." },
  { icon: Rocket, title: "Launch in Minutes", desc: "No coding. No designers. Pick a theme and go live today." },
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "SSL-secured, 99.9% uptime, with automatic backups for peace of mind." },
];

const AllInclusiveSection = () => (
  <section className="section-padding bg-secondary/50">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why GoOnline</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
          The simplest way to
          <br />
          <span className="gradient-text">run your business online.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md">
          Stop juggling tools. GoOnline combines everything you need in a single, 
          beautifully simple platform.
        </p>
      </div>

      <div className="space-y-5">
        {points.map((p) => (
          <div key={p.title} className="glass-card p-6 flex gap-5 items-start hover:shadow-lg transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <p.icon className="text-primary" size={22} />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground">{p.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AllInclusiveSection;
