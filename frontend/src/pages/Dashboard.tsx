import { Link } from "react-router-dom";
import { Shield, Bell, MessageCircle, ArrowUpRight, TrendingUp, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const payouts = [
  { id: 1, date: "Mar 18, 2026", event: "Heavy rainfall — Andheri", amount: "₹1,200", status: "Credited" },
  { id: 2, date: "Mar 14, 2026", event: "Platform outage — Swiggy", amount: "₹800", status: "Credited" },
  { id: 3, date: "Mar 9, 2026", event: "Extreme heat — 44°C", amount: "₹500", status: "Credited" },
  { id: 4, date: "Feb 28, 2026", event: "Traffic disruption — BKC", amount: "₹650", status: "Credited" },
];

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="font-serif text-xl">GigSurance</Link>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
              RS
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Trust Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl mb-1">Welcome back, Rahul</h1>
            <p className="text-sm text-muted-foreground">Your coverage is active and monitoring</p>
          </div>
          <div className="flex items-center gap-3 bg-card rounded-2xl border border-border/50 shadow-sm px-5 py-3">
            <div className="relative h-14 w-14">
              <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--success))" strokeWidth="4"
                  strokeDasharray={`${(87 / 100) * 150.8} 150.8`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">87</span>
            </div>
            <div>
              <p className="text-sm font-medium">Trust Score</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" /> +3 this week
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Active Policy */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg">Standard Plan</h3>
                  <p className="text-xs text-muted-foreground">Policy #GS-2026-48291</p>
                </div>
              </div>
              <span className="text-xs font-medium bg-success/10 text-success px-3 py-1 rounded-full">Active</span>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                <p className="text-xl font-serif">₹15,000</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Premium</p>
                <p className="text-xl font-serif">₹199/mo</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expires</p>
                <p className="text-xl font-serif">Apr 18</p>
              </div>
            </div>
          </div>

          {/* Live Status */}
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
                  <p className="text-sm">Mumbai — Andheri West</p>
                  <p className="text-xs text-muted-foreground">Zone actively monitored</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payouts */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-lg">Recent Payouts</h3>
            <span className="text-xs text-muted-foreground">Last 30 days</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border/50">
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Event</th>
                  <th className="text-right pb-3 font-medium">Amount</th>
                  <th className="text-right pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b border-border/30 last:border-0">
                    <td className="py-3.5 text-muted-foreground">{p.date}</td>
                    <td className="py-3.5">{p.event}</td>
                    <td className="py-3.5 text-right font-medium">{p.amount}</td>
                    <td className="py-3.5 text-right">
                      <span className="text-xs bg-success/10 text-success px-2.5 py-1 rounded-full">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coverage Zone Placeholder */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
          <h3 className="font-serif text-lg mb-4">Coverage Zone</h3>
          <div className="h-48 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="h-5 w-5 mr-2" /> Interactive map coming soon
          </div>
        </div>
      </div>

      {/* AI Chatbot Widget */}
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
              Hi Rahul! 👋 How can I help you today?
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
