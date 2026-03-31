import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone, MapPin, Clock, Sparkles, PartyPopper, Bike, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiGet, apiPost } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

type Mode = "login" | "register";

type Region = { city: string; zones: string[] };
type Plan = {
  planId: string;
  name: string;
  initialPayment: string;
  weeklyPayment: string;
  durationInWeeks: number;
  score: number;
  expiryTimePeriod: string;
};

type RegisterDraft = {
  username: string;
  phoneNumber: string;
  email: string;
  dob: string;
  gender: string;
  profilePicture: File | null;
  platform: "FoodDelivery" | "Quick-Commerce" | "E-Commerce";
  region: { city: string; zone: string };
  workPattern: { day: string; week: string };
  insuranceId: string;
};

const REGISTER_STEPS = ["Personal", "Work Type", "Location", "Schedule", "Plan", "OTP"];

function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

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

function LoginStep({
  phone,
  setPhone,
  onSendOtp,
  onSwitchToRegister,
  sendingOtp,
}: {
  phone: string;
  setPhone: (v: string) => void;
  onSendOtp: () => void;
  onSwitchToRegister: () => void;
  sendingOtp: boolean;
}) {
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
            onChange={(e) => setPhone(normalizePhoneDigits(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && phone.length >= 10 && !sendingOtp) onSendOtp();
            }}
            placeholder="98765 43210"
            className="h-12 flex-1 rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
          />
        </div>

        <Button
          variant="hero"
          size="lg"
          className="w-full"
          disabled={phone.length < 10 || sendingOtp}
          onClick={onSendOtp}
        >
          Send OTP
        </Button>

        <div className="pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>New user?</span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-medium text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPersonalStep({
  draft,
  setDraft,
  onNext,
}: {
  draft: RegisterDraft;
  setDraft: (u: (p: RegisterDraft) => RegisterDraft) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
        <Phone className="h-6 w-6" />
      </div>
      <h2 className="text-3xl md:text-4xl">Create your account</h2>
      <p className="text-muted-foreground">Profile picture is optional</p>

      <div className="space-y-4 max-w-sm">
        <input
          type="text"
          value={draft.username}
          onChange={(e) => setDraft((p) => ({ ...p, username: e.target.value }))}
          placeholder="Username"
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
        />

        <div className="flex gap-2">
          <span className="h-12 px-4 rounded-xl bg-secondary flex items-center text-sm font-medium">+91</span>
          <input
            type="tel"
            value={draft.phoneNumber}
            onChange={(e) => setDraft((p) => ({ ...p, phoneNumber: normalizePhoneDigits(e.target.value) }))}
            placeholder="98765 43210"
            className="h-12 flex-1 rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
          />
        </div>

        <input
          type="email"
          value={draft.email}
          onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
          placeholder="Email"
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
        />

        <input
          type="date"
          value={draft.dob}
          onChange={(e) => setDraft((p) => ({ ...p, dob: e.target.value }))}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
        />

        <select
          value={draft.gender}
          onChange={(e) => setDraft((p) => ({ ...p, gender: e.target.value }))}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 appearance-none cursor-pointer"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setDraft((p) => ({ ...p, profilePicture: e.target.files?.[0] ?? null }))}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 file:mr-4 file:h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium"
        />

        <Button
          variant="hero"
          size="lg"
          className="w-full"
          disabled={!draft.username || draft.phoneNumber.length < 10 || !draft.email || !draft.dob || !draft.gender}
          onClick={onNext}
        >
          Continue <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

const workTypes = [
  { id: "FoodDelivery" as const, icon: Bike, title: "Food Delivery", desc: "Zomato, Swiggy, etc.", color: "bg-accent" },
  { id: "Quick-Commerce" as const, icon: Package, title: "Quick Commerce", desc: "Blinkit, Zepto, etc.", color: "bg-secondary" },
  { id: "E-Commerce" as const, icon: ShoppingBag, title: "E-Commerce", desc: "Amazon, Flipkart, etc.", color: "bg-accent" },
];

function WorkTypeStep({
  value,
  onChange,
  onNext,
}: {
  value: RegisterDraft["platform"] | "";
  onChange: (v: RegisterDraft["platform"]) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl">What do you do?</h2>
      <p className="text-muted-foreground">Select your primary gig platform type</p>

      <div className="grid gap-4 max-w-md">
        {workTypes.map((w) => (
          <button
            key={w.id}
            onClick={() => onChange(w.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left active:scale-[0.98] ${
              value === w.id
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

      <Button variant="hero" size="lg" disabled={!value} onClick={onNext}>
        Continue <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}

function LocationStep({
  regions,
  loading,
  city,
  zone,
  setCity,
  setZone,
  onNext,
}: {
  regions: Region[];
  loading: boolean;
  city: string;
  zone: string;
  setCity: (v: string) => void;
  setZone: (v: string) => void;
  onNext: () => void;
}) {
  const zones = useMemo(() => regions.find((r) => r.city === city)?.zones ?? [], [regions, city]);

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
          onChange={(e) => {
            setCity(e.target.value);
            setZone("");
          }}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 appearance-none cursor-pointer"
        >
          <option value="">{loading ? "Loading cities..." : "Select city"}</option>
          {regions.map((r) => (
            <option key={r.city} value={r.city}>
              {r.city}
            </option>
          ))}
        </select>

        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 appearance-none cursor-pointer"
        >
          <option value="">Select zone</option>
          {zones.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <Button variant="hero" size="lg" className="w-full" disabled={!city || !zone} onClick={onNext}>
          Continue <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

function ScheduleStep({
  hours,
  days,
  setHours,
  setDays,
  onNext,
}: {
  hours: number;
  days: number;
  setHours: (v: number) => void;
  setDays: (v: number) => void;
  onNext: () => void;
}) {
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

function PlanStep({
  plans,
  loading,
  selectedPlanId,
  setSelectedPlanId,
  onNext,
}: {
  plans: Plan[];
  loading: boolean;
  selectedPlanId: string;
  setSelectedPlanId: (v: string) => void;
  onNext: () => void;
}) {
  const recommendedPlanId = useMemo(() => {
    const sorted = [...plans].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    return sorted[0]?.planId ?? "";
  }, [plans]);

  useEffect(() => {
    if (!selectedPlanId && recommendedPlanId) setSelectedPlanId(recommendedPlanId);
  }, [recommendedPlanId, selectedPlanId, setSelectedPlanId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-warning" />
        <span className="text-sm font-medium text-warning">AI Recommendation</span>
      </div>
      <h2 className="text-3xl md:text-4xl">Your personalized plans</h2>
      <p className="text-muted-foreground">Based on your work pattern and location</p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
        {(loading ? [] : plans).map((plan) => (
          <button
            key={plan.planId}
            onClick={() => setSelectedPlanId(plan.planId)}
            className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
              selectedPlanId === plan.planId
                ? "border-foreground bg-card shadow-lg"
                : "border-border/50 bg-card hover:border-border"
            }`}
          >
            {plan.planId === recommendedPlanId && (
              <span className="absolute -top-3 left-4 bg-foreground text-primary-foreground text-[10px] font-medium px-3 py-1 rounded-full">
                Recommended
              </span>
            )}
            <h3 className="font-serif text-xl mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-0.5 mb-1">
              <span className="text-3xl font-serif">{plan.weeklyPayment}</span>
              <span className="text-sm text-muted-foreground">/week</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Initial: {plan.initialPayment} • {plan.durationInWeeks} weeks
            </p>
          </button>
        ))}
      </div>

      <Button variant="hero" size="lg" disabled={!selectedPlanId} onClick={onNext}>
        Continue <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}

function RegisterOtpStep({
  phoneNumber,
  otp,
  setOtp,
  onVerify,
  verifying,
}: {
  phoneNumber: string;
  otp: string;
  setOtp: (v: string) => void;
  onVerify: () => void;
  verifying: boolean;
}) {
  const canVerify = phoneNumber.length === 10 && otp.length === 6;
  return (
    <div className="space-y-6">
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
        <Phone className="h-6 w-6" />
      </div>
      <h2 className="text-3xl md:text-4xl">Enter OTP</h2>
      <p className="text-muted-foreground">We sent a one-time code to your phone</p>

      <div className="space-y-4 max-w-sm">
        <div className="flex gap-2">
          <span className="h-12 px-4 rounded-xl bg-secondary flex items-center text-sm font-medium">+91</span>
          <input
            type="tel"
            value={phoneNumber}
            disabled
            className="h-12 flex-1 rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 opacity-70"
          />
        </div>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter 6-digit OTP"
          className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 tracking-widest text-center text-lg"
        />

        <Button variant="hero" size="lg" className="w-full" disabled={!canVerify || verifying} onClick={onVerify}>
          Verify & Finish
        </Button>
      </div>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="text-center space-y-6 py-10">
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
        Your plan is now active. Coverage starts immediately. Stay safe out there!
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
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const [loginPhone, setLoginPhone] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  const [regions, setRegions] = useState<Region[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);

  const [registerDraft, setRegisterDraft] = useState<RegisterDraft>({
    username: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    profilePicture: null,
    platform: "FoodDelivery",
    region: { city: "", zone: "" },
    workPattern: { day: "8", week: "5" },
    insuranceId: "",
  });

  const [registerOtp, setRegisterOtp] = useState("");
  const [registerVerifying, setRegisterVerifying] = useState(false);

  useEffect(() => {
    if (mode !== "register") return;
    if (step !== 2) return;
    let cancelled = false;
    (async () => {
      setRegionsLoading(true);
      try {
        const res = await apiGet<{ regions: Region[] }>("/showRegions");
        if (!cancelled) setRegions(res.data?.regions ?? []);
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: "Failed to load regions",
          description: e?.response?.data?.message ?? "Please try again",
        });
      } finally {
        if (!cancelled) setRegionsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, step]);

  useEffect(() => {
    if (mode !== "register") return;
    if (step !== 4) return;
    let cancelled = false;
    (async () => {
      setPlansLoading(true);
      try {
        const res = await apiGet<{ plans: Plan[] }>("/showPlans");
        if (!cancelled) setPlans(res.data?.plans ?? []);
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: "Failed to load plans",
          description: e?.response?.data?.message ?? "Please try again",
        });
      } finally {
        if (!cancelled) setPlansLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, step]);

  const sendOtpForLogin = async () => {
    if (sendingOtp) return;
    setSendingOtp(true);
    try {
      await apiPost<{ phoneNumber: string; otp: string; expiresAt: string }, { phoneNumber: string }>("/login", {
        phoneNumber: loginPhone,
      });
      navigate("/onboarding/otp", { state: { phoneNumber: loginPhone, postOtpRedirect: { to: "/dashboard" }, flow: "login" } });
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: e?.response?.data?.message ?? "Please try again",
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const advanceToRegisterOtp = () => {
    if (!registerDraft.phoneNumber || registerDraft.phoneNumber.length < 10) {
      toast({ variant: "destructive", title: "Invalid phone number", description: "Please enter a valid 10-digit phone number" });
      return;
    }
    setStep(5);
  };

  const finalizeRegister = async () => {
    if (registerVerifying) return;
    setRegisterVerifying(true);
    try {
      await apiPost<{ token: string }, { phoneNumber: string; otp: string }>("/verifyphone", {
        phoneNumber: registerDraft.phoneNumber,
        otp: registerOtp,
      });

      const fd = new FormData();
      fd.append("username", registerDraft.username);
      fd.append("phoneNumber", registerDraft.phoneNumber);
      fd.append("email", registerDraft.email);
      fd.append("dob", registerDraft.dob);
      fd.append("gender", registerDraft.gender);
      fd.append("platform", registerDraft.platform);
      fd.append("region", JSON.stringify(registerDraft.region));
      fd.append("workPattern", JSON.stringify(registerDraft.workPattern));
      fd.append("insuranceId", registerDraft.insuranceId);
      if (registerDraft.profilePicture) fd.append("profilePicture", registerDraft.profilePicture);

      const res = await apiPost<{ token: string }, FormData>("/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const token = res.data?.token ?? "";
      if (token) localStorage.setItem("gs_token", token);
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: e?.response?.data?.message ?? "Please try again",
      });
    } finally {
      setRegisterVerifying(false);
    }
  };

  const stepCount = mode === "login" ? 1 : REGISTER_STEPS.length;

  const renderStep = () => {
    if (mode === "login") {
      return (
        <LoginStep
          phone={loginPhone}
          setPhone={setLoginPhone}
          sendingOtp={sendingOtp}
          onSendOtp={sendOtpForLogin}
          onSwitchToRegister={() => {
            setMode("register");
            setStep(0);
            setRegisterDraft((p) => ({ ...p, phoneNumber: loginPhone || p.phoneNumber }));
          }}
        />
      );
    }

    switch (step) {
      case 0:
        return (
          <RegisterPersonalStep
            draft={registerDraft}
            setDraft={(u) => setRegisterDraft((p) => u(p))}
            onNext={() => setStep(1)}
          />
        );
      case 1:
        return (
          <WorkTypeStep
            value={registerDraft.platform}
            onChange={(v) => setRegisterDraft((p) => ({ ...p, platform: v }))}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <LocationStep
            regions={regions}
            loading={regionsLoading}
            city={registerDraft.region.city}
            zone={registerDraft.region.zone}
            setCity={(v) => setRegisterDraft((p) => ({ ...p, region: { ...p.region, city: v } }))}
            setZone={(v) => setRegisterDraft((p) => ({ ...p, region: { ...p.region, zone: v } }))}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <ScheduleStep
            hours={Number(registerDraft.workPattern.day || "8")}
            days={Number(registerDraft.workPattern.week || "5")}
            setHours={(v) => setRegisterDraft((p) => ({ ...p, workPattern: { ...p.workPattern, day: String(v) } }))}
            setDays={(v) => setRegisterDraft((p) => ({ ...p, workPattern: { ...p.workPattern, week: String(v) } }))}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <PlanStep
            plans={plans}
            loading={plansLoading}
            selectedPlanId={registerDraft.insuranceId}
            setSelectedPlanId={(v) => setRegisterDraft((p) => ({ ...p, insuranceId: v }))}
            onNext={advanceToRegisterOtp}
          />
        );
      case 5:
        return (
          <RegisterOtpStep
            phoneNumber={registerDraft.phoneNumber}
            otp={registerOtp}
            setOtp={setRegisterOtp}
            onVerify={finalizeRegister}
            verifying={registerVerifying}
          />
        );
      case 6:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="font-serif text-xl">GigSurance</Link>
          {mode === "register" && (
            <span className="text-xs text-muted-foreground">
              Step {Math.min(step + 1, REGISTER_STEPS.length)} of {REGISTER_STEPS.length}
            </span>
          )}
        </div>

        <StepIndicator current={mode === "login" ? 0 : Math.min(step, REGISTER_STEPS.length - 1)} total={stepCount} />

        {mode === "register" && step > 0 && step < REGISTER_STEPS.length && (
          <button
            onClick={back}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}

        <div key={`${mode}-${step}`} className="animate-fade-up">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

