import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer id="about" className="border-t border-border/50 py-16 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-5xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="font-serif text-xl">GigSurance</Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs">
              AI-powered parametric insurance for India's gig workers. Automated, instant, zero paperwork.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 font-sans">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#platform" className="hover:text-foreground transition-colors">Platform</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a></li>
              <li><a href="#plans" className="hover:text-foreground transition-colors">Coverage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 font-sans">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 font-sans">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">IRDAI License</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/50 text-xs text-muted-foreground">
          © 2026 GigSurance Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
