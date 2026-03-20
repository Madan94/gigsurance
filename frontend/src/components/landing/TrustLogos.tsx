import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const logos = [
  { name: "Zomato", src: "/zomato.jpeg" },
  { name: "Swiggy", src: "/Swiggy.jpeg" },
  { name: "Blinkit", src: "/Blinkit.jpeg" },
  { name: "Zepto", src: "/Zepto.jpeg" },
  { name: "Amazon", src: "/Amazon.jpeg" },
  { name: "Flipkart", src: "/Flipkart.jpeg" },
];

export function TrustLogos() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-16 px-6 border-y border-border/50">
      <div className="container mx-auto">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by workers across platforms
        </p>
        <div className="relative overflow-hidden max-w-[920px] mx-auto">
          <div
            className={`marquee-track flex w-max items-center gap-4 md:gap-6 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center w-[170px] md:w-[220px]">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 md:h-14 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
            {logos.map((logo, i) => (
              <div
                key={`${logo.name}-dup-${i}`}
                className="flex items-center justify-center w-[170px] md:w-[220px]"
                aria-hidden="true"
              >
                <img
                  src={logo.src}
                  alt=""
                  className="h-12 md:h-14 w-auto object-contain opacity-80"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
