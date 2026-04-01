"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  ClipboardList,
  BarChart3,
  MessageSquare,
  Palette,
  Map,
  Megaphone,
} from "lucide-react";
import { Globe3D } from "@/components/globe-3d";

// ─── HOOK ─────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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


// ─── SKILL DATA ───────────────────────────────────────────────────

const softwareSkills = [
  {
    name: "CorelDRAW",
    level: 5,
    label: "Mahir",
    img: "/images/icons/corel.webp",
  },
  {
    name: "Photoshop",
    level: 4,
    label: "Menengah",
    img: "/images/icons/ps.webp",
  },
  {
    name: "Illustrator",
    level: 4,
    label: "Menengah",
    img: "/images/icons/ai.webp",
  },
  {
    name: "Canva",
    level: 3,
    label: "Menengah",
    img: "/images/icons/canva.webp",
  },

  {
    name: "Premiere Pro",
    level: 3,
    label: "Dasar",
    img: "/images/icons/pr.webp",
  },
  {
    name: "After Effects",
    level: 3,
    label: "Dasar",
    img: "/images/icons/ae.webp",
  },
  { name: "CapCut", level: 3, label: "Dasar", img: "/images/icons/cc.webp" },

  {
    name: "ArcGIS",
    level: 4,
    label: "Menengah",
    img: "/images/icons/arcgis.webp",
  },
  {
    name: "Google Earth Engine",
    level: 2,
    label: "Dasar",
    img: "/images/icons/gee.webp",
  },
  {
    name: "Agisoft Metashape",
    level: 3,
    label: "Dasar",
    img: "/images/icons/agisoft.webp",
  },
  {
    name: "Emlid Studio",
    level: 2,
    label: "Dasar",
    img: "/images/icons/emlid.webp",
  },

  { name: "Word", level: 5, label: "Mahir", img: "/images/icons/word.webp" },
  { name: "Excel", level: 3, label: "Dasar", img: "/images/icons/excel.webp" },
  {
    name: "PowerPoint",
    level: 5,
    label: "Mahir",
    img: "/images/icons/ppt.webp",
  },
];

const groupAccents: Record<string, string> = {
  default: "#5eead4",
};

const hardSkills = [
  { label: "Administrasi & Dokumentasi", icon: ClipboardList },
  { label: "Pengolahan Data Spasial", icon: BarChart3 },
  { label: "Pelayanan & Komunikasi", icon: MessageSquare },
  { label: "Desain Grafis & Konten", icon: Palette },
  { label: "Pemetaan & Survei Lapangan", icon: Map },
  { label: "Humas & Media Sosial", icon: Megaphone },
];

// ─── LEVEL BAR ────────────────────────────────────────────────────
function LevelBar({ level, inView, delay }: any) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: "14px",
            background: i < level ? "#5eead4" : "rgba(94,234,212,0.12)",
            opacity: inView ? 1 : 0,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transitionDelay: `${delay + i * 0.06}s`,
            transformOrigin: "left",
          }}
        />
      ))}
    </div>
  );
}

// ─── SKILL ICON CARD ──────────────────────────────────────────────
function SkillIconCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof softwareSkills)[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const delay = index * 0.045;
  const accent = groupAccents[skill.group] ?? "#5eead4";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-xl border border-border bg-card p-3 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.92)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {/* Glow bg on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accent}12 0%, transparent 70%)`,
        }}
      />

      {/* Icon image */}
      <div
        className="relative z-10 transition-transform duration-300"
        style={{
          width: "clamp(32px, 5vw, 44px)",
          height: "clamp(32px, 5vw, 44px)",
          transform: hovered ? "scale(1.15) translateY(-2px)" : "scale(1)",
        }}
      >
        {!imgError ? (
          <Image
            src={skill.img}
            alt={skill.name}
            fill
            className="object-contain drop-shadow-sm"
            sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 44px"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback jika gambar belum diupload */
          <div
            className="flex h-full w-full items-center justify-center rounded-lg text-[10px] font-bold text-white"
            style={{ background: accent, fontSize: "clamp(8px, 1.5vw, 11px)" }}
          >
            {skill.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name */}
      <span
        className="relative z-10 text-center font-medium leading-tight text-foreground"
        style={{ fontSize: "clamp(8px, 1.2vw, 10px)" }}
      >
        {skill.name}
      </span>

      {/* Level bar */}
      <div className="relative z-10">
        <LevelBar level={skill.level} inView={inView} delay={delay + 0.1} />
      </div>

      {/* Label badge */}
      <span
        className="relative z-10 rounded-full px-2 py-0.5 font-medium uppercase tracking-[0.08em] transition-all duration-300"
        style={{
          fontSize: "clamp(7px, 1vw, 9px)",
          background: hovered ? `${accent}25` : `${accent}0D`,
          color: accent,
        }}
      >
        {skill.label}
      </span>
    </div>
    
  );
}

// ─── GROUP LABEL ──────────────────────────────────────────────────
function GroupLabel({
  name,
  inView,
  delay,
}: {
  name: string;
  inView: boolean;
  delay: number;
}) {
  const accent = "#5eead4";
  return (
    <div
      className="col-span-full flex items-center gap-3"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div className="h-px w-4 rounded-full" style={{ background: accent }} />
      <span
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {name}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── CATEGORY CARD ────────────────────────────────────────────────
function CategoryCard({
  cat,
  index,
  inView,
}: {
  cat: (typeof skillCategories)[number];
  index: number;
  inView: boolean;
}) {
  const delay = 0.1 + index * 0.07;
  return (
    <div
      className={`rounded-xl border border-border bg-gradient-to-br ${cat.bg} p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className="h-1.5 w-5 rounded-full"
          style={{ background: cat.accent }}
        />
        <h4
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: cat.accent }}
        >
          {cat.title}
        </h4>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cat.items.map((item) => (
          <span
            key={item}
            className="rounded-sm border border-border/60 bg-background/50 px-2 py-1 text-[11px] text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="grid-bg relative overflow-hidden py-20 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* ── HEADER ── */}
        <div className="mb-16">
          <div
            className="mb-3 flex items-center gap-3"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
            }}
          >
            <div
              className="h-px bg-primary transition-all duration-700"
              style={{
                width: inView ? "40px" : "0px",
                transitionDelay: "0.1s",
              }}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              Tentang Saya
            </span>
          </div>

          <h2
            className="font-rehgal text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            Hai, <span className="italic text-primary">Saya Rizwan</span>
          </h2>
        </div>

        {/* ── BIO + HARD SKILLS ── */}
        <div className="mb-20 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Bio */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <h3 className="mb-4 font-rehgal text-2xl text-foreground sm:text-3xl">
              Perkenalan Tentang Saya
            </h3>
            <div
              className="mb-4 h-1 rounded-full bg-primary"
              style={{
                width: inView ? "64px" : "0px",
                transition: "width 0.8s ease 0.4s",
              }}
            />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Nama lengkap saya{" "}
              <strong className="text-foreground">Muhammad Rizwan</strong>.
              Lulusan S1 Pendidikan Geografi (IPK 3,92) dengan pengalaman di
              bidang Desain GrafisHumas & Komunikasi, Sistem Informasi
              Geografis, dan Administrasi. Terbiasa membuat konten visual
              menggunakan CorelDRAW, Adobe Photoshop, dan Illustrator. Menguasai
              ArcGIS untuk analisis spasial dan pemetaan. Berpengalaman dalam
              administrasi, pelayanan, serta kerja tim lintas fungsi dengan
              semangat tinggi untuk terus berkembang.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { num: "3,92", label: "IPK" },
                { num: "7+", label: "Pengalaman" },
                { num: "7+", label: "Sertifikat" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card p-3 text-cent
                  er sm:p-4"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.6s ease ${0.5 + i * 0.1}s, transform 0.6s ease ${0.5 + i * 0.1}s`,
                  }}
                >
                  <div className="font-serif text-xl font-light text-primary sm:text-2xl">
                    {s.num}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hard Skills */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Hard Skill
            </h3>
            <div className="space-y-2">
              {hardSkills.map((skill, i) => (
                <div
                  key={skill.label}
                  className="group flex items-center gap-4 rounded-sm border border-border bg-card px-4 py-3 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                >
                  <skill.icon className="h-4 w-4 text-primary shrink-0 opacity-80 group-hover:opacity-100 transition" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    {skill.label}
                  </span>
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary/40 transition-colors duration-300 group-hover:bg-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SKILL SOFTWARE ICONS (Grouped) ── */}
        <div className="mb-16">
          <div
            className="mb-8 flex items-center gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Skill Software
            </h3>
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] text-muted-foreground/50">
              {softwareSkills.length} tools
            </span>
          </div>

          {/* Grid dengan group label */}
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
            {softwareSkills.map((skill, i) => (
              <SkillIconCard
                key={skill.name}
                skill={skill}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
