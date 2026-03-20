import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone, MapPin, Clock, Sparkles, PartyPopper, Bike, Package, ShoppingBag } from "lucide-react";

const STEPS = ["Phone", "Work Type", "Location", "Schedule", "Plan", "Success"];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i <= current ? "bg-foreground flex-[2]" : "bg-border flex-1"
          }`}
        />
      ))}
    </div>
  );
}

function PhoneStep({ onNext }: { onNext: () => void }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <div className="space-y-6">
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
        <Phone className="h-6 w-6" />
      </div>
      <h2 className="text-3xl md:text-4xl">Enter your phone number</h2>
      <p className="text-muted-foreground">We'll send you a one-time verification code</p>

      <div className="space-y-4 max-w-sm">
        <div className="flex gap-2">
          <span className="h-12 px-4 rounded-xl bg-secondary flex items-center text-sm font-medium">+91</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="98765 43210"
            className="h-12 flex-1 rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
          />
        </div>

        {!otpSent ? (
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            disabled={phone.length < 10}
            onClick={() => setOtpSent(true)}
          >
            Send OTP
          </Button>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 tracking-widest text-center text-lg"
            />
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              disabled={otp.length < 6}
              onClick={onNext}
            >
              Verify & Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

const workTypes = [
  { id: "food", icon: Bike, title: "Food Delivery", desc: "Zomato, Swiggy, etc.", color: "bg-accent" },
  { id: "quick", icon: Package, title: "Quick Commerce", desc: "Blinkit, Zepto, etc.", color: "bg-secondary" },
  { id: "ecom", icon: ShoppingBag, title: "E-Commerce", desc: "Amazon, Flipkart, etc.", color: "bg-accent" },
];

function WorkTypeStep({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl">What do you do?</h2>
      <p className="text-muted-foreground">Select your primary gig platform type</p>

      <div className="grid gap-4 max-w-md">
        {workTypes.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelected(w.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left active:scale-[0.98] ${
              selected === w.id
                ? "border-foreground bg-card shadow-md"
                : "border-border/50 bg-card hover:border-border"
            }`}
          >
            <div className={`h-12 w-12 rounded-xl ${w.color} flex items-center justify-center shrink-0`}>
              <w.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">{w.title}</p>
              <p className="text-sm text-muted-foreground">{w.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <Button variant="hero" size="lg" disabled={!selected} onClick={onNext}>
        Continue <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}

const cities = ["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"];
const zones = ["Central", "North", "South", "East", "West", "Suburban"];

function LocationStep({ onNext }: { onNext: () => void }) {
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  return (
    <div className="space-y-6">
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
        <MapPin className="h-6 w-6" />
      </div>
      <h2 className="text-3xl md:text-4xl">Where do you work?</h2>
      <p className="text-muted-foreground">This helps us monitor local disruption events</p>

      <div className="space-y-4 max-w-sm">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 appearance-none cursor-pointer"
        >
          <option value="">Select city</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 appearance-none cursor-pointer"
        >
          <option value="">Select zone</option>
          {zones.map((z) => <option key={z} value={z}>{z}</option>)}
        </select>

        <Button variant="hero" size="lg" className="w-full" disabled={!city || !zone} onClick={onNext}>
          Continue <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

function ScheduleStep({ onNext }: { onNext: () => void }) {
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(5);

  return (
    <div className="space-y-6">
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
        <Clock className="h-6 w-6" />
      </div>
      <h2 className="text-3xl md:text-4xl">Your work pattern</h2>
      <p className="text-muted-foreground">Helps us calibrate your coverage</p>

      <div className="space-y-8 max-w-sm">
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span>Hours per day</span>
            <span className="font-medium text-lg font-serif">{hours}h</span>
          </div>
          <input
            type="range"
            min={2}
            max={16}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>2h</span><span>16h</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-3">
            <span>Days per week</span>
            <span className="font-medium text-lg font-serif">{days} days</span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span><span>7</span>
          </div>
        </div>

        <Button variant="hero" size="lg" className="w-full" onClick={onNext}>
          Get My Plan <Sparkles className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

const plans = [
  { name: "Basic", price: "₹99", period: "/month", coverage: "₹5,000", features: ["Weather disruption", "Basic accident cover", "UPI payouts"] },
  { name: "Standard", price: "₹199", period: "/month", coverage: "₹15,000", features: ["All Basic benefits", "Platform outage cover", "Device damage", "Priority support"], recommended: true },
  { name: "Premium", price: "₹349", period: "/month", coverage: "₹50,000", features: ["All Standard benefits", "Full hospitalization", "Income protection", "Family cover", "24/7 AI support"] },
];

function PlanStep({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState("Standard");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-warning" />
        <span className="text-sm font-medium text-warning">AI Recommendation</span>
      </div>
      <h2 className="text-3xl md:text-4xl">Your personalized plans</h2>
      <p className="text-muted-foreground">Based on your work pattern and location</p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
        {plans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => setSelected(plan.name)}
            className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
              selected === plan.name
                ? "border-foreground bg-card shadow-lg"
                : "border-border/50 bg-card hover:border-border"
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-4 bg-foreground text-primary-foreground text-[10px] font-medium px-3 py-1 rounded-full">
                Recommended
              </span>
            )}
            <h3 className="font-serif text-xl mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-0.5 mb-1">
              <span className="text-3xl font-serif">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Up to {plan.coverage} coverage</p>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="text-xs flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <Button variant="hero" size="lg" onClick={onNext}>
        Activate {selected} Plan <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="text-center space-y-6 py-10">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ["#f59e0b", "#10b981", "#6366f1", "#ec4899", "#f97316"][i % 5],
              animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 1}s forwards`,
            }}
          />
        ))}
      </div>

      <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto animate-scale-in">
        <PartyPopper className="h-10 w-10 text-success" />
      </div>
      <h2 className="text-3xl md:text-5xl opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
        You're protected!
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
        Your Standard plan is now active. Coverage starts immediately. Stay safe out there!
      </p>
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <Button asChild variant="hero" size="lg">
          <Link to="/dashboard">Go to Dashboard →</Link>
        </Button>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0: return <PhoneStep onNext={next} />;
      case 1: return <WorkTypeStep onNext={next} />;
      case 2: return <LocationStep onNext={next} />;
      case 3: return <ScheduleStep onNext={next} />;
      case 4: return <PlanStep onNext={next} />;
      case 5: return <SuccessStep />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="font-serif text-xl">GigSurance</Link>
          {step < 5 && (
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of {STEPS.length - 1}
            </span>
          )}
        </div>

        {step < 5 && <StepIndicator current={step} total={5} />}

        {step > 0 && step < 5 && (
          <button
            onClick={back}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}

        <div key={step} className="animate-fade-up">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
