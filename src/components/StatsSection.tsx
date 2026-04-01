const stats = [
  { value: "500,000+", label: "Successful Orders" },
  { value: "102,000+", label: "Total Customers" },
  { value: "4,000+", label: "Businesses Onboarded" },
];

const StatsSection = () => (
  <section className="py-16 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
    <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground">
            {s.value}
          </div>
          <div className="mt-2 text-sm font-medium text-primary-foreground/80">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
