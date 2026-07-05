"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

export const products = [
  {
    title: "Meshach Photography",
    link: "https://mesh-photography.vercel.app/",
    thumbnail: "/photography-cover.png",
  },
  {
    title: "GoOnline Estates",
    link: "https://goonline-estate.vercel.app/",
    thumbnail: "/estate-cover.png",
  },
  {
    title: "PrintHub",
    link: "https://print-powerhouse-hub.vercel.app/",
    thumbnail: "/printhub-cover.png",
  },
  {
    title: "Youth On Fire",
    link: "https://vibrant-youth-link.vercel.app/",
    thumbnail: "/youth-fire-cover.png",
  },
  {
    title: "Bitswitch Portal",
    link: "https://bitswitch.vercel.app/",
    thumbnail: "/bitswitch-cover.png",
  },
  // Row 2 (Repeated for balanced visual scrolling)
  {
    title: "Meshach Photography",
    link: "https://mesh-photography.vercel.app/",
    thumbnail: "/photography-cover.png",
  },
  {
    title: "GoOnline Estates",
    link: "https://goonline-estate.vercel.app/",
    thumbnail: "/estate-cover.png",
  },
  {
    title: "PrintHub",
    link: "https://print-powerhouse-hub.vercel.app/",
    thumbnail: "/printhub-cover.png",
  },
  {
    title: "Youth On Fire",
    link: "https://vibrant-youth-link.vercel.app/",
    thumbnail: "/youth-fire-cover.png",
  },
  {
    title: "Bitswitch Portal",
    link: "https://bitswitch.vercel.app/",
    thumbnail: "/bitswitch-cover.png",
  },
  // Row 3 (Repeated for balanced visual scrolling)
  {
    title: "Meshach Photography",
    link: "https://mesh-photography.vercel.app/",
    thumbnail: "/photography-cover.png",
  },
  {
    title: "GoOnline Estates",
    link: "https://goonline-estate.vercel.app/",
    thumbnail: "/estate-cover.png",
  },
  {
    title: "PrintHub",
    link: "https://print-powerhouse-hub.vercel.app/",
    thumbnail: "/printhub-cover.png",
  },
  {
    title: "Youth On Fire",
    link: "https://vibrant-youth-link.vercel.app/",
    thumbnail: "/youth-fire-cover.png",
  },
  {
    title: "Bitswitch Portal",
    link: "https://bitswitch.vercel.app/",
    thumbnail: "/bitswitch-cover.png",
  },
];

const HeroSection = () => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <section 
      id="home"
      ref={ref} 
      className="h-[300vh] py-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-[#FCFCFD] dark:bg-background"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Header = () => {
  const { trackEvent } = useAnalytics();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("cta_click", { section: "hero", button: "view_our_work" });
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#portfolio";
    }
  };

  return (
    <div className="max-w-7xl relative mx-auto pt-24 pb-12 px-6 w-full left-0 top-0 text-left z-20">
      <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
        Digital Website Partner
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-foreground leading-[1.1] tracking-tight mb-6 font-heading">
        Professional Websites <br /> That Grow Your Business
      </h1>

      <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed mb-10 font-medium">
        We design and build modern websites for businesses, schools, churches, and NGOs—helping you attract customers, build credibility, and grow online.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a 
          href={isHome ? "#contact" : "/#contact"} 
          onClick={() => trackEvent("cta_click", { section: "hero", button: "get_started" })}
          className="btn-primary text-sm py-4 px-8 inline-flex items-center justify-center gap-2 shadow-sm rounded-full"
        >
          Get Started <ArrowRight size={16} />
        </a>
        <a 
          href="#portfolio" 
          onClick={handleWorkClick}
          className="btn-outline text-sm py-4 px-8 inline-flex items-center justify-center border border-border bg-transparent text-foreground hover:bg-secondary rounded-full"
        >
          View Our Work
        </a>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  const isExternal = product.link.startsWith("http");

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-72 w-[24rem] md:h-96 md:w-[30rem] relative flex-shrink-0 rounded-2xl overflow-hidden shadow-md"
    >
      {isExternal ? (
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full group-hover/product:shadow-2xl"
        >
          <img
            src={product.thumbnail}
            className="object-cover object-left-top absolute h-full w-full inset-0"
            alt={product.title}
          />
        </a>
      ) : (
        <Link
          to={product.link}
          className="block w-full h-full group-hover/product:shadow-2xl"
        >
          <img
            src={product.thumbnail}
            className="object-cover object-left-top absolute h-full w-full inset-0"
            alt={product.title}
          />
        </Link>
      )}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-85 bg-black pointer-events-none transition-all duration-300"></div>
      <h2 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-white font-bold text-sm tracking-tight transition-all duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};

export default HeroSection;
