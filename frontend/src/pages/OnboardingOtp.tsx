import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type LocationState = {
  phoneNumber?: string;
  postOtpRedirect?: { to: string; state?: unknown };
};

function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export default function OnboardingOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const initialPhone = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const phoneFromQuery = params.get("phone") ?? "";
    return normalizePhoneDigits(state.phoneNumber ?? phoneFromQuery);
  }, [location.search, state.phoneNumber]);

  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [otp, setOtp] = useState("");

  const canVerify = phoneNumber.length === 10 && otp.length === 6;

  const onVerify = () => {
    const redirect = state.postOtpRedirect ?? { to: "/onboarding", state: { initialStep: 1 } };
    navigate(redirect.to, { replace: true, state: redirect.state });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="font-serif text-xl">
            GigSurance
          </Link>
        </div>

        <Link
          to="/onboarding"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="space-y-6 animate-fade-up">
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
                onChange={(e) => setPhoneNumber(normalizePhoneDigits(e.target.value))}
                placeholder="98765 43210"
                className="h-12 flex-1 rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20"
              />
            </div>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="h-12 w-full rounded-xl bg-secondary px-4 text-sm outline-none focus:ring-2 ring-foreground/20 tracking-widest text-center text-lg"
            />

            <Button variant="hero" size="lg" className="w-full" disabled={!canVerify} onClick={onVerify}>
              Verify & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

