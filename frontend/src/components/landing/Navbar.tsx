import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="group fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/50 border-b border-white/40 shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:bg-white/70 hover:border-white/70 hover:shadow-[0_14px_40px_rgba(15,23,42,0.14)] relative">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-y-6 left-0 right-0 bg-gradient-to-b from-white/70 via-white/25 to-transparent" />
        <div className="absolute inset-0 ring-1 ring-white/40" />
      </div>

      <div className="container mx-auto flex items-center justify-between h-16 px-6 relative">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          GigSurance
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <a href="#plans" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Plans</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
        </div>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="default">
            <Link to="/onboarding">Get Protected</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/60 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/40 bg-white/70 backdrop-blur-2xl px-6 py-4 space-y-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <a href="#platform" className="block text-sm text-muted-foreground py-2 hover:text-foreground transition-colors">Platform</a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground py-2 hover:text-foreground transition-colors">How it Works</a>
          <a href="#plans" className="block text-sm text-muted-foreground py-2 hover:text-foreground transition-colors">Plans</a>
          <a href="#about" className="block text-sm text-muted-foreground py-2 hover:text-foreground transition-colors">About</a>
          <Button asChild variant="hero" size="default" className="w-full mt-2">
            <Link to="/onboarding">Get Protected</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
