import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const orbs = Array.from({ length: 6 }, (_, index) => ({
      radius: 260 + index * 30,
      speed: 0.00035 + index * 0.00012,
      drift: 60 + index * 14,
      offset: index * 1.37,
      phase: index * 0.9,
      color: ["#c9a84c", "#d4847a", "#f0e6d3"][index % 3],
    }));

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      orbs.forEach((orb, index) => {
        const t = time * orb.speed + orb.offset;
        const x = width * 0.5 + Math.sin(t + orb.phase) * (width * 0.25 + orb.drift);
        const y = height * 0.5 + Math.cos(t * 0.85 + index) * (height * 0.22 + orb.drift);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
        gradient.addColorStop(0, `${orb.color}66`);
        gradient.addColorStop(0.6, `${orb.color}2b`);
        gradient.addColorStop(1, "transparent");

        ctx.save();
        ctx.filter = "blur(80px)";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    frameId = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="hero-animated-bg relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <div className="container mx-auto max-w-4xl text-center relative">

        <h1
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          Insurance built for<br />
          <span className="italic">Gig Workers</span>
        </h1>

        <p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 text-pretty opacity-0 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Automated. Instant. Zero paperwork.
        </p>

        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <Button asChild variant="hero" size="lg">
            <Link to="/onboarding">Get Protected →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
