import { Check, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const covered = [
  "Heavy rainfall & flooding",
  "Extreme heat (above 42°C)",
  "Platform outages & surges",
  "Traffic disruptions",
  "Accident hospitalization",
  "Device damage during work",
];

const notCovered = [
  "Pre-existing conditions",
  "Intentional fraud",
  "Non-work-related incidents",
  "Coverage outside active hours",
  "Unregistered vehicles",
  "War or civil unrest",
];

export function Coverage() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="plans" ref={ref} className="py-24 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl text-center mb-16">What's covered</h2>

        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-success" />
              </div>
              Covered
            </h3>
            <ul className="space-y-4">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="h-4 w-4 text-destructive" />
              </div>
              Not Covered
            </h3>
            <ul className="space-y-4">
              {notCovered.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="h-4 w-4 text-destructive/60 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
