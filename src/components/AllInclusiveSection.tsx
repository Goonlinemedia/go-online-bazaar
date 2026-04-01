import { Star } from "lucide-react";

const AllInclusiveSection = () => (
  <section className="section-padding">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-4">
        <Star className="text-primary fill-primary" size={28} />
      </div>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
        All-Inclusive <span className="text-gradient-gold">Digital Store</span> Builder.
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Everything you need to launch, grow, and manage your online business — all in one platform.
      </p>
    </div>
  </section>
);

export default AllInclusiveSection;
