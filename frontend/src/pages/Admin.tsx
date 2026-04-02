import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Zap, Users, CreditCard, MapPin, Settings, Bell, ChevronDown,
  AlertTriangle, CheckCircle, Clock, ArrowUpRight, TrendingUp, Shield, AlertCircle, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearAdminSession } from "@/lib/adminAuth";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Zap, label: "Events", path: "/admin/events" },
  { icon: Users, label: "Workers", path: "/admin/workers" },
  { icon: CreditCard, label: "Payouts", path: "/admin/payouts" },
  { icon: MapPin, label: "Zones", path: "/admin/zones" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

// Sample regions data
const regionsData = {
  "Chennai": {
    totalUsers: 1200,
    planDistribution: { Basic: 600, Pro: 400, Premium: 200 },
    disruptionStatus: "2 Days Lost Logged This Week",
    aiAuditLog: [
      {
        date: "March 25, 2026",
        confidence: 0.95,
        severity: "high",
        reason: "Red alert issued by IMD. City paralyzed by waterlogging. 100% loss of working hours for food delivery executives."
      },
      {
        date: "March 24, 2026",
        confidence: 0.78,
        severity: "medium",
        reason: "Traffic congestion detected. 45% of workers reported delays. Estimated 2-3 hour impact."
      },
      {
        date: "March 23, 2026",
        confidence: 0.92,
        severity: "high",
        reason: "Extreme heat warning (42°C). Health department advisory issued. 80% loss of daytime hours."
      }
    ],
    settlements: [
      { tier: "Basic", affected: 120, daysLost: 2, dailyRate: 500, total: 1200, status: "Scheduled for Sunday Auto-Transfer" },
      { tier: "Pro", affected: 80, daysLost: 2, dailyRate: 800, total: 1600, status: "Scheduled for Sunday Auto-Transfer" },
      { tier: "Premium", affected: 40, daysLost: 2, dailyRate: 1200, total: 2400, status: "Scheduled for Sunday Auto-Transfer" },
    ]
  },
  "Mumbai": {
    totalUsers: 2100,
    planDistribution: { Basic: 1050, Pro: 700, Premium: 350 },
    disruptionStatus: "1 Day Lost This Week",
    aiAuditLog: [
      {
        date: "March 25, 2026",
        confidence: 0.88,
        severity: "medium",
        reason: "Monsoon warning issued. Moderate rainfall expected. 50% potential disruption."
      }
    ],
    settlements: [
      { tier: "Basic", affected: 210, daysLost: 1, dailyRate: 500, total: 105000, status: "Scheduled for Sunday Auto-Transfer" },
      { tier: "Pro", affected: 140, daysLost: 1, dailyRate: 800, total: 112000, status: "Scheduled for Sunday Auto-Transfer" },
      { tier: "Premium", affected: 70, daysLost: 1, dailyRate: 1200, total: 84000, status: "Scheduled for Sunday Auto-Transfer" },
    ]
  },
  "Delhi NCR": {
    totalUsers: 1800,
    planDistribution: { Basic: 900, Pro: 600, Premium: 300 },
    disruptionStatus: "Critical - 3 Days Lost This Week",
    aiAuditLog: [
      {
        date: "March 25, 2026",
        confidence: 0.96,
        severity: "critical",
        reason: "Stage 4 air quality alert. AQI 450+. Complete halt of outdoor delivery operations. Emergency protocols activated."
      },
      {
        date: "March 24, 2026",
        confidence: 0.93,
        severity: "high",
        reason: "Stage 3 pollution alert. AQI 380. 90% reduction in active workers."
      }
    ],
    settlements: [
      { tier: "Basic", affected: 270, daysLost: 3, dailyRate: 500, total: 405000, status: "Scheduled for Sunday Auto-Transfer" },
      { tier: "Pro", affected: 180, daysLost: 3, dailyRate: 800, total: 432000, status: "Scheduled for Sunday Auto-Transfer" },
      { tier: "Premium", affected: 90, daysLost: 3, dailyRate: 1200, total: 324000, status: "Scheduled for Sunday Auto-Transfer" },
    ]
  },
};

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const regions = Object.keys(regionsData) as (keyof typeof regionsData)[];
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} border-r border-border/50 bg-card flex flex-col transition-all duration-300 shrink-0 hidden lg:flex fixed left-0 top-0 h-screen z-10`}>
        <div className="h-16 flex items-center px-5 border-b border-border/50">
          <Link to="/" className="font-serif text-lg">{sidebarOpen ? "GigSurance" : "GS"}</Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border/50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-xs text-muted-foreground hover:text-foreground py-2 transition-colors"
          >
            {sidebarOpen ? "← Collapse" : "→"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col min-w-0 ${sidebarOpen ? "lg:ml-60" : "lg:ml-16"} transition-all duration-300`}>
        <header className="h-16 border-b border-border/50 bg-card flex items-center justify-between px-6">
          <h1 className="text-lg font-serif">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center text-xs text-primary-foreground font-medium">
                AD
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* SECTION 1: GLOBAL COMMAND CENTER */}
          <div className="mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                <span className="text-xs text-muted-foreground block mb-2">Total Active Policies</span>
                <p className="text-4xl font-serif font-bold text-foreground">47,200</p>
                <p className="text-xs text-success mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +2,340 this month</p>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                <span className="text-xs text-muted-foreground block mb-2">Total Weekly Premiums</span>
                <p className="text-4xl font-serif font-bold text-foreground">₹84.5L</p>
                <p className="text-xs text-success mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +₹12L week-on-week</p>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                <span className="text-xs text-muted-foreground block mb-2">Total Pending Payouts</span>
                <p className="text-4xl font-serif font-bold text-foreground">₹32.8L</p>
                <p className="text-xs text-warning mt-2">Scheduled for Sunday Auto-Transfer</p>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                <span className="text-xs text-muted-foreground block mb-2">Active Red Alerts</span>
                <p className="text-4xl font-serif font-bold text-destructive">3</p>
                <p className="text-xs text-destructive mt-2 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Delhi NCR · Chennai · Mumbai</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: REGION EXPLORER */}
          <div className="mb-8">
            <div className="relative">
              <div className="relative inline-block w-full sm:w-72">
                <select
                  value={selectedRegion || ""}
                  onChange={(e) => setSelectedRegion(e.target.value || null)}
                  className="w-full appearance-none bg-card border border-border/50 rounded-xl px-4 py-3 text-sm font-medium cursor-pointer hover:border-border transition-colors"
                >
                  <option value="">Select Region: Choose a city...</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* SECTION 3: REGION DETAILS */}
          {selectedRegion && (
            <div className="space-y-6">
              {/* A. Business Snapshot */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                  <h3 className="font-serif text-lg mb-4">Business Snapshot</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Total {selectedRegion} Users</span>
                      <p className="text-2xl font-serif font-bold">{regionsData[selectedRegion as keyof typeof regionsData].totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="pt-4 border-t border-border/30">
                      <span className="text-xs text-muted-foreground block mb-3">Plan Distribution</span>
                      {Object.entries(regionsData[selectedRegion as keyof typeof regionsData].planDistribution).map(([plan, count]) => (
                        <div key={plan} className="flex items-center justify-between mb-2">
                          <span className="text-sm">{plan}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  plan === "Basic" ? "bg-blue-500" : plan === "Pro" ? "bg-purple-500" : "bg-amber-500"
                                }`}
                                style={{width: `${(count / regionsData[selectedRegion as keyof typeof regionsData].totalUsers) * 100}%`}}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-12">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* B. AI Brain */}
                <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                  <h3 className="font-serif text-lg mb-4">AI Brain</h3>
                  <div className="space-y-3 mb-4 pb-4 border-b border-border/30">
                    <div>
                      <span className="text-xs text-muted-foreground">Current Disruption Status</span>
                      <p className="text-sm font-medium text-foreground mt-1">{regionsData[selectedRegion as keyof typeof regionsData].disruptionStatus}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-3">AI Audit Log</span>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {regionsData[selectedRegion as keyof typeof regionsData].aiAuditLog.map((log, idx) => (
                        <div key={idx} className="bg-muted/50 rounded-lg p-3 border border-border/30">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-[10px] text-muted-foreground">{log.date}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                log.severity === "critical" ? "bg-destructive text-white" :
                                log.severity === "high" ? "bg-destructive/20 text-destructive" :
                                "bg-warning/20 text-warning"
                              }`}>
                                {log.severity.toUpperCase()}
                              </span>
                              <span className="text-xs font-semibold text-foreground px-2 py-0.5 bg-primary/20 text-primary rounded">
                                {(log.confidence * 100).toFixed(0)}% confidence
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed">{log.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* C. Automated Settlement Ledger */}
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                <h3 className="font-serif text-lg mb-4">Pending Sunday Settlements for {selectedRegion}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border/50 bg-muted/30">
                        <th className="text-left p-4 font-medium">Plan Tier</th>
                        <th className="text-center p-4 font-medium">Affected Workers</th>
                        <th className="text-center p-4 font-medium">Days Lost</th>
                        <th className="text-right p-4 font-medium">Daily Coverage Rate</th>
                        <th className="text-right p-4 font-medium">Total Auto-Payout</th>
                        <th className="text-center p-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionsData[selectedRegion as keyof typeof regionsData].settlements.map((settlement, idx) => (
                        <tr key={idx} className="border-b border-border/30 last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="p-4 font-medium">{settlement.tier}</td>
                          <td className="p-4 text-center">{settlement.affected}</td>
                          <td className="p-4 text-center">{settlement.daysLost}</td>
                          <td className="p-4 text-right font-medium">₹{settlement.dailyRate.toLocaleString()}</td>
                          <td className="p-4 text-right font-semibold text-foreground">₹{settlement.total.toLocaleString()}</td>
                          <td className="p-4 text-center">
                            <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-full bg-success/20 text-success">
                              ✓ Scheduled
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-muted/50 border-t border-border/50">
                        <td colSpan={4} className="p-4 font-semibold text-right">Total Weekly Payout:</td>
                        <td className="p-4 text-right font-serif text-lg font-bold text-foreground">
                          ₹{regionsData[selectedRegion as keyof typeof regionsData].settlements.reduce((sum, s) => sum + s.total, 0).toLocaleString()}
                        </td>
                        <td className="p-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
