"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Eye, Award } from "lucide-react";

// ─── DATA SERTIFIKAT ──────────────────────────────────────────────
const certificates = [
  {
    id: 1,
    title: "Operator Muda Survei Terestris",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    category: "surveyor",
    date: "November 2025",
    badge: "Lulus",
    img: "/images/sertifikat/ST_bnsp.png",
  },
  {
    id: 2,
    title: "Pendidikan & Pelatihan Surveyor Jenjang 3",
    issuer: "BPVP Banda Aceh",
    category: "surveyor",
    date: "Oktober 2025",
    badge: "Complete",
    img: "/images/sertifikat/ST_surveyor.png",
  },
  {
    id: 3,
    title: "Bootcamp GIS & UAV for Mining",
    issuer: "Geodemy.id",
    category: "gis",
    date: "Agustus 2025",
    badge: "Verified",
    img: "/images/sertifikat/ST_geodemy.png",
  },
  {
    id: 4,
    title: "Pendidikan & Pelatihan Kompetensi Ahli K3 Umum",
    issuer: "Nagan Training",
    category: "k3",
    date: "September 2025",
    badge: "Verified",
    img: "/images/sertifikat/ST_k3u.png",
  },
  {
    id: 5,
    title: "Graphic Design Certificate",
    issuer: "Restu Ummi (printing & advertising)",
    category: "desain",
    date: "Februari 2025",
    badge: "Complete",
    img: "/images/sertifikat/ST_ru.png",
  },
  {
    id: 6,
    title: "Google Earth Engine & Python Bootcamp",
    issuer: "Logis.Map",
    category: "gis",
    date: "Maret 2024",
    badge: "Complete",
    img: "/images/sertifikat/ST_logismaps.png",
  },
  {
    id: 7,
    title: "Climate Studies for Students Initiative",
    issuer: "CSSI Indonesia",
    category: "iklim",
    date: "Juni 2023",
    badge: "Complete",
    img: "/images/sertifikat/ST_cssi.png",
  },
  {
    id: 8,
    title: "Kampus Mengajar Angkatan 5",
    issuer: "Kemendikbudristek",
    category: "akademik",
    date: "Juni 2023",
    badge: "Complete",
    img: "/images/sertifikat/ST_km5.png",
  },
  {
    id: 9,
    title: "Webinar, Seminar & Lainnya",
    issuer: "Indosurta, Geosoftware.Id, Logis.Maps, Dll",
    category: "lainnya",
    date: "2024-2025",
    badge: "Certified",
    img: "/images/sertifikat/ST_banyak.png",
  },
];

// ─── KATEGORI ─────────────────────────────────────────────────────
// ⚠️ KEY di sini HARUS sama persis dengan field "category" di data
const categoryLabels: Record<string, string> = {
  all: "Semua",
  surveyor: "Surveyor",
  gis: "GIS & Remote Sensing",
  k3: "K3 Umum",
  desain: "Desain Grafis",
  akademik: "Akademik",
  iklim: "Climate Learning",
  lainnya: "Webinar, Seminar & Lainnya",
};

const filterCategories = [
  "all",
  "surveyor",
  "gis",
  "k3",
  "desain",
  "akademik",
  "iklim",
  "lainnya",
];

type Certificate = (typeof certificates)[number];

// ─── MODAL ────────────────────────────────────────────────────────
function CertModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-md border border-border bg-card p-6 sm:p-8 shadow-2xl"
        style={{
          animation: "modalIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <X size={14} />
        </button>

        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded border border-border bg-muted">
          {cert.img ? (
            <Image
              src={cert.img}
              alt={cert.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 672px"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Award size={40} className="text-muted-foreground/20" />
            </div>
          )}
        </div>

        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
          {categoryLabels[cert.category] ?? cert.category}
        </p>
        <h3 className="mb-1 font-serif text-2xl font-light text-foreground">
          {cert.title}
        </h3>
        <p className="mb-5 text-sm text-muted-foreground">{cert.issuer}</p>

        <div className="flex flex-wrap gap-6 border-t border-border pt-4">
          {[
            { label: "Tanggal", value: cert.date },
            { label: "Status", value: cert.badge },
            {
              label: "Kategori",
              value: categoryLabels[cert.category] ?? cert.category,
            },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50">
                {m.label}
              </span>
              <span className="text-sm text-muted-foreground">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CERTIFICATE CARD ─────────────────────────────────────────────
function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: Certificate;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <span className="absolute right-3 top-3 z-10 font-serif text-xs text-border/60">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative aspect-video overflow-hidden bg-muted/30">
        {cert.img ? (
          <Image
            src={cert.img}
            alt={cert.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Award size={32} className="text-border/30" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm">
            <Eye size={14} className="text-primary" />
          </div>
        </div>
      </div>

      <div className="h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />

      <div className="p-4">
        <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-primary">
          {categoryLabels[cert.category] ?? cert.category}
        </p>
        <h3 className="mb-1.5 text-sm font-medium leading-snug text-foreground">
          {cert.title}
        </h3>
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="inline-block h-1 w-1 rounded-full bg-border" />
          {cert.issuer}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-[10px] tracking-wide text-muted-foreground/50">
            {cert.date}
          </span>
          <span className="rounded-sm border border-primary/20 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-primary">
            {cert.badge}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export function CertificateSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filtered =
    activeFilter === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  const closeModal = useCallback(() => setSelectedCert(null), []);

  return (
    <>
      <section id="sertifikat" className="grid-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          {/* Header */}
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                Kompetensi Terverifikasi
              </span>
            </div>
            <h2 className="font-rehgal text-5xl italic leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Sertifi<span className="text-primary">kat</span>
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sertifikat bukti kompetensi dan pengalaman
              </p>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-1 w-1 rounded-full bg-primary" />
                {certificates.length} Sertifikat
              </span>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-sm border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-200 ${
                  activeFilter === cat
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Award size={40} className="mb-4 text-muted-foreground/20" />
              <p className="text-sm text-muted-foreground">
                Belum ada sertifikat di kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      <CertModal cert={selectedCert} onClose={closeModal} />

      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
