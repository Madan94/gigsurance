import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { number: "01", title: "Onboard", description: "Sign up with phone number. Select your gig platform and city." },
  { number: "02", title: "Monitor", description: "Our AI continuously monitors weather, traffic, and platform data." },
  { number: "03", title: "Detect", description: "Disruption events are automatically detected and verified in real-time." },
  { number: "04", title: "Payout", description: "Instant payment to your UPI. No claims, no paperwork, no delays." },
];

export function HowItWorks() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-6 gradient-bg-subtle scroll-mt-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl text-center mb-4">How it works</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">
          From signup to payout in four simple steps
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative transition-all duration-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="text-5xl font-serif text-border font-normal">{step.number}</span>
              <h3 className="text-lg font-serif mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 border-t border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
