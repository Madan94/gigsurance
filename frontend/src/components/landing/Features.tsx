import { Zap, Bot, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: Zap,
    title: "60-Second Onboarding",
    description: "Just your phone number and work details. No documents, no branches, no waiting.",
  },
  {
    icon: Bot,
    title: "Instant AI Payouts",
    description: "Our AI detects disruptions in real-time and triggers automatic payouts to your account.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Claims Process",
    description: "No forms to fill. No calls to make. Payouts happen before you even notice.",
  },
];

export function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="platform" ref={ref} className="py-24 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl text-center mb-4 text-balance">
          Why gig workers choose us
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">
          Built from the ground up for India's gig economy
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500 border border-border/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-5">
                <f.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl mb-2 font-serif">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
