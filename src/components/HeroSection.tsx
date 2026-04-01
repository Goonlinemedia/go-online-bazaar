import heroMockup from "@/assets/hero-mockup.jpg";

const HeroSection = () => (
  <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 text-center">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
        Ditch sales struggles.
        <br />
        <span className="text-gradient-gold">Own a business website today.</span>
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Go Online is your all-inclusive digital store builder that builds you a very beautiful
        website to sell your physical or digital products to anyone, anywhere in the world.
      </p>
      <div className="mt-8">
        <a href="#pricing" className="btn-gold text-base">Get Started</a>
      </div>
    </div>
    <div className="max-w-5xl mx-auto mt-12">
      <img
        src={heroMockup}
        alt="Go Online dashboard preview"
        className="w-full rounded-2xl shadow-2xl"
        width={1024}
        height={768}
      />
    </div>
  </section>
);

export default HeroSection;
