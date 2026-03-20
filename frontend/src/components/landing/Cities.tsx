import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin } from "lucide-react";

const cities = [
  { name: "Mumbai", workers: "2.4L+" },
  { name: "Delhi NCR", workers: "3.1L+" },
  { name: "Bangalore", workers: "1.8L+" },
  { name: "Hyderabad", workers: "1.2L+" },
  { name: "Chennai", workers: "95K+" },
  { name: "Pune", workers: "87K+" },
  { name: "Kolkata", workers: "1.1L+" },
];

export function Cities() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 px-6 gradient-bg-subtle">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl text-center mb-4">Active in 7 metro cities</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">
          Coverage across India's largest gig economies
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city, i) => (
            <div
              key={city.name}
              className={`bg-card rounded-xl p-5 border border-border/50 shadow-sm transition-all duration-500 hover:shadow-md ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">{city.name}</span>
              </div>
              <span className="text-2xl font-serif">{city.workers}</span>
              <p className="text-xs text-muted-foreground mt-1">active workers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
