"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, ArrowRight, MapPin } from "lucide-react";
import { Globe3D } from "@/components/globe-3d";

// ─── FADE UP ──────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────
function Counter({
  target,
  suffix = "",
  delay = 0,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000 + 800);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────
export function HeroSection() {
  const [globeSize, setGlobeSize] = useState(520);

  // Responsive globe size
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setGlobeSize(280);
      else if (w < 1024) setGlobeSize(380);
      else if (w < 1280) setGlobeSize(460);
      else setGlobeSize(540);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="home"
      className="grid-bg relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* ── GLOBE BACKGROUND (absolute, right side) ── */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] opacity-60 sm:translate-x-[15%] sm:opacity-70 lg:translate-x-[8%] lg:opacity-80"
        aria-hidden="true"
      >
        <Globe3D size={globeSize} rotationSpeed={0.0025} orbitSpeed={0.8} />
      </div>

      {/* ── AMBIENT GLOW ── */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── COORDINATE TAGS ── */}
      <FadeUp
        delay={1.4}
        className="pointer-events-none absolute right-6 top-28 hidden lg:block"
      >
        <div className="flex flex-col gap-1 text-right">
          <span className="font-mono text-[9px] tracking-[0.2em] text-primary/30">
            05°32′N 95°19′E
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-primary/20">
            ACEH, INDONESIA
          </span>
        </div>
      </FadeUp>

      <FadeUp
        delay={1.6}
        className="pointer-events-none absolute bottom-16 left-6 hidden lg:block"
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] tracking-[0.2em] text-primary/20">
            GIS · CARTOGRAPHY
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-primary/15">
            SPATIAL ANALYSIS
          </span>
        </div>
      </FadeUp>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-16">
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-8 py-12 lg:grid-cols-[0fr_1fr] lg:gap-0 lg:py-0">
          {/* ── LEFT: PROFILE IMAGE ── */}
          <FadeUp
            delay={0.3}
            className="flex items-center justify-center lg:justify-start lg:pr-8"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 -m-6 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, rgba(94,234,212,0.3) 0%, transparent 70%)",
                  animation: "breathe 4s ease-in-out infinite",
                }}
              />

              {/* Frame container */}
              <div className="relative h-[300px] w-[240px] sm:h-[380px] sm:w-[300px] lg:h-[460px] lg:w-[360px] xl:h-[500px] xl:w-[390px]">
                {/* Corner brackets */}
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((cls, i) => (
                  <span
                    key={i}
                    className={`absolute h-7 w-7 border-primary/60 ${cls}`}
                    style={{
                      animation: `bracketIn 0.6s ease ${0.5 + i * 0.08}s both`,
                    }}
                  />
                ))}

                {/* Main image */}
                <div className="absolute inset-3 overflow-hidden rounded-sm">
                  <Image
                    src="/images/Profil.jpeg"
                    alt="M. Rizwan - Profile Photo"
                    fill
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 390px"
                  />
                  {/* Subtle teal overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-overlay"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(94,234,212,0.08) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Right accent line */}
                <div
                  className="absolute -right-4 top-[10%] h-[80%] w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(94,234,212,0.5), transparent)",
                    animation: "accentPulse 3s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute -right-[18px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-[1.5px] border-primary/60"
                  style={{
                    animation: "accentPulse 3s ease-in-out infinite 0.5s",
                  }}
                />

                {/* Bottom label */}
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <p className="font-serif text-sm italic text-muted-foreground/60">
                    Muhammad Rizwan
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-1.5">
                    <MapPin size={9} className="text-primary/50" />
                    <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/40">
                      Aceh, Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ── RIGTH: TEXT ── */}
          <div className="flex flex-col justify-center items-start text-left">
            {/* Eyebrow */}
            <FadeUp delay={0.1} className="mb-5 flex items-center gap-3">
              <div
                className="h-px bg-primary transition-all duration-700"
                style={{ width: "32px" }}
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-primary">
                Portofolio
              </span>
            </FadeUp>

            {/* Main title */}
            <FadeUp delay={0.2}>
              <h1 className="font-rehgal text-[clamp(52px,10vw,96px)] leading-[0.88] tracking-tight text-foreground">
                Porto
                <span className="italic text-primary">folio</span>
              </h1>
            </FadeUp>

            {/* Name */}
            <FadeUp delay={0.35}>
              <h2 className="mt-3 font-rehgal text-[clamp(14px,2.5vw,24px)] font-medium uppercase tracking-[0.28em] text-foreground">
                M. Rizwan
              </h2>
            </FadeUp>

            {/* Tagline */}
            <FadeUp delay={0.48}>
              <p className="mt-6 max-w-[400px] border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Fresh Graduate · Pendidikan Geografi · Desain Grafis
                </span>
                <br />
              </p>
            </FadeUp>

            {/* Skill tags */}
            <FadeUp
              delay={0.6}
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {["CorelDRAW", "Photoshop", "ArcGIS", "Surveyor BNSP", "K3U"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-primary"
                  >
                    {tag}
                  </span>
                ),
              )}
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp
              delay={0.72}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <a
                href="/cv/CV M Rizwan.pdf"
                download="CV_M_Rizwan.pdf"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
                <Download size={13} />
                Download CV
              </a>
              <a
                href="#pengalaman"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                Lihat Portofolio
                <ArrowRight size={13} />
              </a>
            </FadeUp>

            {/* Stats */}
            <FadeUp
              delay={0.88}
              className="mt-10 flex items-center gap-0 border-t border-border pt-8"
            >
              {[
                { num: 392, suffix: "", display: "3,92", label: "IPK" },
                { num: 7, suffix: "+", display: null, label: "Pengalaman" },
                { num: 7, suffix: "+", display: null, label: "Sertifikat" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center px-5 first:pl-0 last:pr-0 lg:items-start"
                  style={{
                    borderRight: i < 2 ? "0.5px solid var(--border)" : "none",
                  }}
                >
                  <span className="font-serif text-[clamp(22px,3.5vw,30px)] font-light text-primary">
                    {s.display ?? (
                      <Counter target={s.num} suffix={s.suffix} delay={0.88} />
                    )}
                  </span>
                  <span className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <FadeUp
        delay={1.4}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
          Scroll
        </span>
        <div
          className="h-8 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(94,234,212,0.6), transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </FadeUp>

      {/* ── KEYFRAMES ── */}
      <style jsx global>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.35;
          }
        }
        @keyframes bracketIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes accentPulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes scrollLine {
          0% {
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
          }
          40% {
            transform: scaleY(1);
            transform-origin: top;
            opacity: 1;
          }
          41% {
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
