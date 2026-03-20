import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Zap, Users, CreditCard, MapPin, Settings, Bell, ChevronDown,
  AlertTriangle, CheckCircle, Clock, ArrowUpRight, TrendingUp, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Zap, label: "Events", path: "/admin/events" },
  { icon: Users, label: "Workers", path: "/admin/workers" },
  { icon: CreditCard, label: "Payouts", path: "/admin/payouts" },
  { icon: MapPin, label: "Zones", path: "/admin/zones" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const stats = [
  { label: "Active Workers", value: "12,847", change: "+234", icon: Users, trend: "up" },
  { label: "Today's Payouts", value: "₹4.2L", change: "+₹87K", icon: CreditCard, trend: "up" },
  { label: "Events Detected", value: "23", change: "+5", icon: Zap, trend: "up" },
  { label: "Trust Violations", value: "3", change: "-2", icon: AlertTriangle, trend: "down" },
];

const events = [
  { id: 1, type: "weather", severity: "high", title: "Heavy rainfall — Mumbai Andheri", time: "12 min ago", affected: 342, status: "active" },
  { id: 2, type: "platform", severity: "medium", title: "Swiggy API latency spike", time: "28 min ago", affected: 156, status: "monitoring" },
  { id: 3, type: "traffic", severity: "low", title: "Road closure — Bangalore HSR Layout", time: "1h ago", affected: 89, status: "resolved" },
  { id: 4, type: "heat", severity: "high", title: "Extreme heat warning — Delhi NCR (46°C)", time: "2h ago", affected: 521, status: "active" },
];

const approvals = [
  { id: 1, worker: "Amit Kumar", event: "Heavy rainfall", amount: "₹1,200", trust: 92, status: "pending" },
  { id: 2, worker: "Priya Singh", event: "Platform outage", amount: "₹800", trust: 88, status: "pending" },
  { id: 3, worker: "Rajesh Patel", event: "Heat warning", amount: "₹500", trust: 45, status: "flagged" },
  { id: 4, worker: "Meena Devi", event: "Heavy rainfall", amount: "₹1,200", trust: 91, status: "pending" },
  { id: 5, worker: "Vikram Rao", event: "Traffic disruption", amount: "₹650", trust: 78, status: "pending" },
];

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border/50 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-serif">{stat.value}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${stat.trend === "up" ? "text-success" : "text-warning"}`}>
                  <TrendingUp className="h-3 w-3" /> {stat.change} today
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Events Feed */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-lg mb-4">Live Disruption Events</h2>
              <div className="space-y-3">
                {events.map((e) => (
                  <div key={e.id} className="bg-card rounded-xl border border-border/50 shadow-sm p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        e.severity === "high" ? "bg-destructive/10 text-destructive"
                          : e.severity === "medium" ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {e.severity.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{e.time}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{e.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{e.affected} workers affected</span>
                      <span className={`text-[10px] flex items-center gap-1 ${
                        e.status === "active" ? "text-destructive" : e.status === "monitoring" ? "text-warning" : "text-success"
                      }`}>
                        {e.status === "active" ? <AlertTriangle className="h-3 w-3" /> :
                         e.status === "resolved" ? <CheckCircle className="h-3 w-3" /> :
                         <Clock className="h-3 w-3" />}
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout Approvals */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-lg mb-4">Payout Approval Queue</h2>
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border/50 bg-muted/30">
                        <th className="text-left p-4 font-medium">Worker</th>
                        <th className="text-left p-4 font-medium">Event</th>
                        <th className="text-right p-4 font-medium">Amount</th>
                        <th className="text-center p-4 font-medium">Trust</th>
                        <th className="text-right p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvals.map((a) => (
                        <tr key={a.id} className="border-b border-border/30 last:border-0">
                          <td className="p-4 font-medium">{a.worker}</td>
                          <td className="p-4 text-muted-foreground">{a.event}</td>
                          <td className="p-4 text-right font-medium">{a.amount}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              a.trust >= 80 ? "bg-success/10 text-success"
                                : a.trust >= 60 ? "bg-warning/10 text-warning"
                                : "bg-destructive/10 text-destructive"
                            }`}>
                              {a.trust}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="default" className="h-7 text-xs px-3">
                                Approve
                              </Button>
                              {a.status === "flagged" && (
                                <Button size="sm" variant="outline" className="h-7 text-xs px-3">
                                  Review
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Zone Monitoring */}
              <h2 className="font-serif text-lg mt-8 mb-4">Zone Monitoring</h2>
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {["Mumbai", "Delhi NCR", "Bangalore"].map((city) => (
                    <div key={city} className="text-center p-3 rounded-xl bg-muted/50">
                      <p className="text-sm font-medium">{city}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {city === "Mumbai" ? "⚠️ 2 active" : city === "Delhi NCR" ? "🔴 1 critical" : "✅ Clear"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-40 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" /> Zone heatmap visualization
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
