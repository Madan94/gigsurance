import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Bell, MessageCircle, TrendingUp, MapPin, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

type DriverProfile = {
  driverId: string;
  personalData: {
    username: string;
    phoneNumber: string;
    email: string;
    dob: string;
    gender: string;
    profilePicture: string;
  };
  platformDetails: {
    platform: string;
    region: { city: string; zone: string };
    workPattern: { day: string; week: string };
  };
  insurancePlan: {
    plan: string;
    initialPaymentPaid: boolean;
    numberOfWeeksPaid: number;
    weeklyPayment: { amount: string; dueDate: string };
    expiryDate: string;
  };
  wallet: {
    totalAmount: number;
    transactions: { credited: unknown[]; debited: unknown[] };
  };
  createdAt: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(iso: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [driver, setDriver] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("gs_token");
    if (!token) {
      navigate("/onboarding", { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await apiGet<{ driver: DriverProfile }>("/driverProfile");
        setDriver(res.data?.driver ?? null);
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: "Session expired",
          description: e?.response?.data?.message ?? "Please login again",
        });
        localStorage.removeItem("gs_token");
        navigate("/onboarding", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("gs_token");
    navigate("/onboarding", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading dashboard...</div>
      </div>
    );
  }

  if (!driver) return null;

  const { personalData, platformDetails, insurancePlan, wallet } = driver;
  const username = personalData.username || "Driver";
  const avatarInitials = initials(username);
  const planName = insurancePlan.plan || "No Plan";
  const isPlanActive = !!insurancePlan.plan;
  const weeklyAmount = insurancePlan.weeklyPayment?.amount || "0";
  const expiryDate = formatDate(insurancePlan.expiryDate);
  const city = platformDetails.region?.city || "-";
  const zone = platformDetails.region?.zone || "-";
  const platform = platformDetails.platform || "-";
  const hoursPerDay = platformDetails.workPattern?.day || "-";
  const daysPerWeek = platformDetails.workPattern?.week || "-";
  const walletBalance = wallet?.totalAmount ?? 0;
  const creditedCount = wallet?.transactions?.credited?.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="font-serif text-xl">GigSurance</Link>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              {creditedCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
              {avatarInitials}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl mb-1">Welcome back, {username}</h1>
            <p className="text-sm text-muted-foreground">
              {isPlanActive ? "Your coverage is active and monitoring" : "No active coverage"}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-card rounded-2xl border border-border/50 shadow-sm px-5 py-3">
            <div className="relative h-14 w-14">
              <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--success))" strokeWidth="4"
                  strokeDasharray={`${((walletBalance > 0 ? Math.min(walletBalance / 100, 100) : 0) / 100) * 150.8} 150.8`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {walletBalance}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">Wallet</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" /> {creditedCount} payouts
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg">{planName}</h3>
                  <p className="text-xs text-muted-foreground">ID: {driver.driverId}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${isPlanActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {isPlanActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Weekly Payment</p>
                <p className="text-xl font-serif">{weeklyAmount}/wk</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Weeks Paid</p>
                <p className="text-xl font-serif">{insurancePlan.numberOfWeeksPaid}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expires</p>
                <p className="text-xl font-serif">{expiryDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <h3 className="font-serif text-lg mb-4">Live Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-success animate-pulse" />
                <div>
                  <p className="text-sm font-medium">All Clear</p>
                  <p className="text-xs text-muted-foreground">No disruptions in your zone</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm">{city} — {zone}</p>
                  <p className="text-xs text-muted-foreground">Zone actively monitored</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5">
            <p className="text-xs text-muted-foreground mb-1">Platform</p>
            <p className="text-lg font-serif">{platform}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5">
            <p className="text-xs text-muted-foreground mb-1">Hours / Day</p>
            <p className="text-lg font-serif">{hoursPerDay}h</p>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5">
            <p className="text-xs text-muted-foreground mb-1">Days / Week</p>
            <p className="text-lg font-serif">{daysPerWeek} days</p>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5">
            <p className="text-xs text-muted-foreground mb-1">Phone</p>
            <p className="text-lg font-serif">+91 {personalData.phoneNumber}</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
          <h3 className="font-serif text-lg mb-4">Coverage Zone</h3>
          <div className="h-48 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="h-5 w-5 mr-2" /> Interactive map coming soon
          </div>
        </div>
      </div>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-card rounded-2xl border border-border/50 shadow-xl z-50 overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">GigSurance AI</p>
                <p className="text-[10px] text-success">Online</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 h-52 flex items-end">
            <div className="bg-muted rounded-xl rounded-bl-sm p-3 text-sm max-w-[80%]">
              Hi {username}! How can I help you today?
            </div>
          </div>
          <div className="p-3 border-t border-border/50">
            <input
              placeholder="Type a message..."
              className="w-full h-10 bg-muted rounded-xl px-4 text-sm outline-none"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 z-50"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </button>
    </div>
  );
}
