"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye, Briefcase } from "lucide-react";

// ─── HOOK: Intersection Observer ─────────────────────────────────
function useInView(threshold = 0.12) {
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

// ─── DATA ─────────────────────────────────────────────────────────
const MAX_VISIBLE = 4;

const experiences = [
  {
    title: "Lapas Kelas III Calang",
    role: "Magang — Pembina & Humas",
    period: "Nov 2025",
    periodEnd: "Sekarang",
    tag: "Aktif",
    tagColor: "#22C55E",
    accent: "#5eead4",
    description:
      "Sebagai Pembina Kepribadian, mendukung administrasi dan pelaksanaan program pembinaan warga binaan serta menyusun laporan kegiatan. Di bagian Humas, bertanggung jawab dalam pembuatan desain materi publikasi dan media informasi lembaga.",
    images: [
      "/images/porto/PAS 11.png",
      "/images/porto/PAS 13.png",
      "/images/porto/PAS 12.png",
      "/images/porto/PAS 1.png",
      "/images/porto/PAS 2.png",
      "/images/porto/PAS 3.png",
      "/images/porto/PAS 4.png",
      "/images/porto/PAS 5.png",
      "/images/porto/PAS 6.png",
      "/images/porto/PAS 7.png",
      "/images/porto/PAS 8.png",
      "/images/porto/PAS 9.png",
      "/images/porto/PAS 10.png",
    ],
    skills: ["Desain Grafis", "Humas", "Administrasi"],
  },
  {
    title: "BPVP Banda Aceh",
    role: "Pelatihan & Sertifikasi Surveyor",
    period: "Sep 2025",
    periodEnd: "Okt 2025",
    tag: "Sertifikasi",
    tagColor: "#3B82F6",
    accent: "#60A5FA",
    description:
      "Dinyatakan lulus seluruh unit kompetensi Sertifikasi Surveyor meliputi penerapan K3L, komunikasi dalam proses pengukuran, persiapan dan pengoperasian alat ukur, pemetaan situasi, stake out, serta evaluasi hasil pengukuran.",
    images: [
      "/images/porto/BLK 1.png",
      "/images/porto/BLK 2.png",
      "/images/porto/BLK 3.png",
      "/images/porto/BLK 4.png",
      "/images/porto/BLK 5.png",
      "/images/porto/BLK 6.png",
    ],
    skills: ["Survei Lapangan", "K3L", "Pemetaan"],
  },
  {
    title: "CV. Restu Ummi",
    role: "Desain Grafis, Administrasi & CS",
    period: "Agt 2024",
    periodEnd: "Nov 2025",
    tag: "Kerja",
    tagColor: "#8B5CF6",
    accent: "#A78BFA",
    description:
      "Melayani dan merespons pelanggan secara online/offline, memberikan informasi produk serta menangani keluhan. Mendesain produk sesuai kebutuhan pelanggan, mengelola pemesanan dan data pelanggan secara sistematis.",
    images: [
      "/images/porto/RU 1.png",
      "/images/porto/RU 2.png",
      "/images/porto/RU 3.png",
      "/images/porto/RU 4.png",
      "/images/porto/RU 5.png",
    ],
    skills: ["CorelDRAW", "Customer Service", "Administrasi"],
  },
  {
    title: "Universitas Al-Washliyah Darussalam",
    role: "Asisten Lab & Asisten Dosen",
    period: "Agt 2023",
    periodEnd: "Agt 2025",
    tag: "Akademik",
    tagColor: "#F59E0B",
    accent: "#FCD34D",
    description:
      "Mendampingi praktikum, mengelola administrasi & peralatan laboratorium. Mengajar mata kuliah SIG, Penginderaan Jauh, dan Kartografi, serta membimbing analisis spasial menggunakan ArcGIS, ENVI, GEE dan lainnya.",
    images: [
      "/images/porto/AW_1.png",
      "/images/porto/AW_2.png",
      "/images/porto/AW_3.png",
      "/images/porto/AW_4.png",
      "/images/porto/AW_5.png",
      "/images/porto/AW_6.png",
    ],
    skills: ["ArcGIS", "GIS", "Penginderaan Jauh"],
  },
  {
    title: "SMA Negeri 1 Baitussalam",
    role: "Guru Geografi (Pengganti)",
    period: "Jan 2024",
    periodEnd: "Des 2024",
    tag: "Mengajar",
    tagColor: "#14B8A6",
    accent: "#5eead4",
    description:
      "Melaksanakan KBM Geografi kelas X, XI, dan XII dengan pendekatan kontekstual dan berbasis proyek. Menyusun Rencana Pembelajaran dan membimbing siswa dalam O2SN Geografi dan Astronomi.",
    images: [
      "/images/porto/SMA 1.png",
      "/images/porto/SMA 2.png",
      "/images/porto/SMA 3.png",
      "/images/porto/SMA 4.png",
    ],
    skills: ["Pengajaran", "Kurikulum", "Geografi"],
  },
  {
    title: "SD Negeri 58 Banda Aceh",
    role: "Program Kampus Mengajar",
    period: "Feb 2023",
    periodEnd: "Jun 2023",
    tag: "Program",
    tagColor: "#F43F5E",
    accent: "#FB7185",
    description:
      "Melaksanakan Kampus Mengajar selama 899 jam (20 SKS) dengan tugas observasi, perancangan program, pelaksanaan AKM, penguatan literasi dan numerasi, adaptasi teknologi, serta administrasi sekolah.",
    images: [
      "/images/porto/KM 1.png",
      "/images/porto/KM 2.png",
      "/images/porto/KM 3.png",
      "/images/porto/KM 4.png",
    ],
    skills: ["Literasi", "Numerasi", "Kurikulum Merdeka"],
  },
];

// ─── GALLERY MODAL ────────────────────────────────────────────────
function GalleryModal({
  images,
  title,
  accent,
  onClose,
}: {
  images: string[];
  title: string;
  accent: string;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-t-2xl border border-border bg-card sm:rounded-2xl"
        style={{
          animation: "modalSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b border-border px-5 py-4"
          style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
        >
          <div>
            <p
              className="text-[10px] font-medium uppercase tracking-[0.16em]"
              style={{ color: accent }}
            >
              Galeri Foto
            </p>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Main image */}
        <div className="relative aspect-video w-full bg-muted/30">
          <Image
            src={images[activeIndex]}
            alt={`${title} - ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-border/40">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / images.length) * 100}%`,
                background: accent,
              }}
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto p-4 pb-5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm transition-all duration-200"
              style={{
                outline:
                  i === activeIndex
                    ? `2px solid ${accent}`
                    : "2px solid transparent",
                opacity: i === activeIndex ? 1 : 0.45,
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── IMAGE GRID ───────────────────────────────────────────────────
function ImageGrid({
  images,
  title,
  accent,
}: {
  images: string[];
  title: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const visible = images.slice(0, MAX_VISIBLE);
  const extra = images.length - MAX_VISIBLE;

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-1.5 sm:w-[180px] lg:w-[220px] xl:w-[240px]">
        {visible.map((img, i) => {
          const isLast = extra > 0 && i === MAX_VISIBLE - 1;
          return (
            <button
              key={i}
              onClick={() => setOpen(true)}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm focus:outline-none"
              aria-label={isLast ? `Lihat ${extra} foto lagi` : `Foto ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="120px"
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `${accent}20` }}
              />
              {isLast && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/75 backdrop-blur-[2px]">
                  <Eye size={14} style={{ color: accent }} />
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: accent }}
                  >
                    +{extra} foto
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {open && (
        <GalleryModal
          images={images}
          title={title}
          accent={accent}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

// ─── EXPERIENCE CARD ──────────────────────────────────────────────
function ExpCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  const isEven = index % 2 === 0;
  const delay = 0.05;

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {/* Timeline connector */}
      {!isLast && (
        <div
          className="absolute left-[19px] top-[52px] hidden w-px sm:block"
          style={{
            height: "calc(100% + 32px)",
            background: `linear-gradient(to bottom, ${exp.accent}60, transparent)`,
          }}
        />
      )}

      <div className="flex gap-4 sm:gap-6">
        {/* Left: dot + number */}
        <div className="flex flex-col items-center gap-2 pt-1">
          {/* Dot */}
          <div
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-all duration-300 group-hover:scale-110"
            style={{ borderColor: exp.accent }}
          >
            <span
              className="font-serif text-sm font-light"
              style={{ color: exp.accent }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* Ping for active */}
            {exp.tag === "Aktif" && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: exp.accent }}
                />
                <span
                  className="relative inline-flex h-3 w-3 rounded-full"
                  style={{ background: exp.accent }}
                />
              </span>
            )}
          </div>
        </div>

        {/* Right: card */}
        <div
          className="mb-8 flex-1 overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-black/20"
          style={{
            borderLeftWidth: "2px",
            borderLeftColor: `${exp.accent}60`,
          }}
        >
          {/* Card header */}
          <div
            className="relative overflow-hidden px-5 py-4"
            style={{
              background: `linear-gradient(135deg, ${exp.accent}08 0%, transparent 60%)`,
            }}
          >
            {/* Decorative number */}
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-serif text-6xl font-light opacity-[0.04] select-none"
              style={{ color: exp.accent }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {/* Period + tag row */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      borderColor: `${exp.tagColor}40`,
                      color: exp.tagColor,
                      background: `${exp.tagColor}10`,
                    }}
                  >
                    {exp.tag}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {exp.period}
                    <span className="mx-1 text-muted-foreground/40">→</span>
                    {exp.periodEnd}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold leading-tight text-foreground sm:text-lg"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {exp.title}
                </h3>

                {/* Role */}
                <p
                  className="mt-0.5 text-xs font-medium uppercase tracking-[0.1em]"
                  style={{ color: exp.accent }}
                >
                  {exp.role}
                </p>
              </div>

              {/* Skill tags */}
              <div className="hidden flex-wrap gap-1.5 sm:flex">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm border border-border bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start sm:gap-6">
            {/* Description */}
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {exp.description}
            </p>

            {/* Image grid */}
            <div className="shrink-0">
              <ImageGrid
                images={exp.images}
                title={exp.title}
                accent={exp.accent}
              />
              <button
                className="mt-2 flex items-center gap-1 text-[10px] font-medium transition-colors hover:underline"
                style={{ color: exp.accent }}
                onClick={() => {}}
              >
                <Eye size={10} />
                {exp.images.length} foto
              </button>
            </div>
          </div>

          {/* Card footer — skill tags mobile */}
          <div className="flex flex-wrap gap-1.5 border-t border-border/50 px-5 py-3 sm:hidden">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="rounded-sm border border-border bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export function ExperienceSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  return (
    <>
      <section
        id="pengalaman"
        className="grid-bg relative overflow-hidden py-20 lg:py-28"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-1/3 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94,234,212,0.03) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
          {/* ── HEADER ── */}
          <div ref={headerRef} className="mb-16">
            <div
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-px bg-primary transition-all duration-700"
                  style={{
                    width: headerInView ? "40px" : "0px",
                    transitionDelay: "0.1s",
                  }}
                />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                  Rekam Jejak
                </span>
              </div>

              <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                <h2 className="font-rehgal text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
                  Jejak <span className="italic text-primary">Karir</span>
                </h2>
                <div
                  className="mb-1 flex items-center gap-2 rounded-sm border border-foreground/20 px-4 py-1.5"
                  style={{
                    opacity: headerInView ? 1 : 0,
                    transition: "opacity 0.6s ease 0.35s",
                  }}
                >
                  <Briefcase size={12} className="text-muted-foreground" />
                  <span className="text-sm font-semibold tracking-wider text-foreground">
                    {experiences.length} Pengalaman
                  </span>
                </div>
              </div>

              <p
                className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground"
                style={{
                  opacity: headerInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.25s",
                }}
              >
                Perjalanan karir yang membentuk kompetensi di bidang desain
                grafis, humas, pemetaan, dan administrasi.
              </p>
            </div>
          </div>

          {/* ── TIMELINE ── */}
          <div>
            {experiences.map((exp, i) => (
              <ExpCard
                key={exp.title}
                exp={exp}
                index={i}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
