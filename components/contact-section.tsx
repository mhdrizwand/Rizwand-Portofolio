"use client";

import { useRef, useEffect, useState } from "react";
import { Mail, MessageCircle, MapPin, Instagram, Linkedin } from "lucide-react";

// ─── HOOK: Intersection Observer ──────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── FADE UP WRAPPER ──────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── CONTACT CARD ─────────────────────────────────────────────────
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  delay,
  inView,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  delay: number;
  inView: boolean;
}) {
  const inner = (
    <div className="group flex items-center gap-5 rounded-sm border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
      {/* Icon */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15" />
        <Icon size={20} className="relative z-10 text-primary" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>

      {/* Arrow */}
      {href && (
        <div className="-translate-x-2 ml-auto shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <FadeUp delay={delay} inView={inView}>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : (
        <div>{inner}</div>
      )}
    </FadeUp>
  );
}

// ─── SOCIAL BUTTON ────────────────────────────────────────────────
function SocialBtn({
  icon: Icon,
  href,
  label,
  delay,
  inView,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <FadeUp delay={delay} inView={inView}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group flex items-center gap-3 rounded-sm border border-border bg-card px-5 py-3.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/0 transition-all duration-300 group-hover:bg-primary/10" />
          <Icon
            size={16}
            className="relative z-10 transition-colors duration-300"
          />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
          {label}
        </span>
        <div className="-translate-x-1 ml-auto opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </a>
    </FadeUp>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="kontak"
      className="grid-bg relative overflow-hidden py-20 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-60 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.03) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* ── HEADER ── */}
        <div className="mb-16">
          <FadeUp delay={0} inView={inView}>
            <div className="mb-4 flex items-center gap-3">
              <div
                className="h-px bg-primary transition-all duration-700"
                style={{
                  width: inView ? "40px" : "0px",
                  transitionDelay: "0.1s",
                }}
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                Mari Terhubung
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} inView={inView}>
            <h2 className="font-rehgal text-5xl leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Hubungi <span className="italic text-primary">Saya</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} inView={inView}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Terbuka untuk diskusi, kolaborasi, atau sekadar membangun
              silaturahmi. Jangan ragu untuk menghubungi saya melalui kontak di
              bawah ini.
            </p>
          </FadeUp>
        </div>

        {/* ── LAYOUT: 2 kolom di desktop ── */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* LEFT — Kontak langsung */}
          <div className="space-y-4">
            <FadeUp delay={0.22} inView={inView}>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                Kontak Langsung
              </p>
            </FadeUp>

            <ContactCard
              icon={Mail}
              label="Email"
              value="rizwandmuhmmad@gmail.com"
              href="mailto:rizwandmuhmmad@gmail.com"
              delay={0.28}
              inView={inView}
            />
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value="+62 852 1413 9915"
              href="https://wa.me/6285214139915"
              delay={0.35}
              inView={inView}
            />
            <ContactCard
              icon={MapPin}
              label="Lokasi"
              value="Aceh, Indonesia"
              delay={0.42}
              inView={inView}
            />

            {/* Availability badge */}
            <FadeUp delay={0.5} inView={inView}>
              <div className="inline-flex items-center gap-2.5 rounded-sm border border-primary/20 bg-primary/5 px-4 py-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-medium text-primary">
                  Mari saling terhubung
                </span>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — Sosial media */}
          <div className="space-y-4">
            <FadeUp delay={0.3} inView={inView}>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                Temukan Saya Di
              </p>
            </FadeUp>

            <SocialBtn
              icon={Instagram}
              href="https://instagram.com/mhdrizwand_"
              label="Instagram — @mhdrizwand_"
              delay={0.36}
              inView={inView}
            />
            <SocialBtn
              icon={Linkedin}
              href="https://linkedin.com/in/m-rizwan-b28a26319/"
              label="LinkedIn — M. Rizwan"
              delay={0.43}
              inView={inView}
            />
            <SocialBtn
              icon={MessageCircle}
              href="https://wa.me/6285214139915"
              label="WhatsApp — Chat Langsung"
              delay={0.5}
              inView={inView}
            />

            {/* Quote */}
            <FadeUp delay={0.58} inView={inView}>
              <div className="relative mt-6 rounded-sm border border-border bg-card p-6">
                <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-primary/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary/40" />
                <p className="font-serif text-base italic leading-relaxed text-muted-foreground">
                  "Silaturahmi adalah sebab dipanjangkannya umur dan
                  diluaskannya rezeki."
                </p>
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                  — Imam Al-Ghazali
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
