"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MAX_VISIBLE_IMAGES = 4;

const experiences = [
  {
    title: "LAPAS KELAS III CALANG",
    role: "MAGANG",
    period: "Nov 2025 - Sekarang",
    description:
      "Sebagai Pembina Kepribadian, mendukung administrasi dan pelaksanaan program pembinaan warga binaan serta menyusun laporan kegiatan. Di bagian Humas, bertanggung jawab dalam pembuatan desain materi publikasi dan media informasi lembaga.",
    images: [
      "/images/PAS 1.png",
      "/images/PAS 2.png",
      "/images/PAS 3.png",
      "/images/PAS 4.png",
      "/images/PAS 5.png",
      "/images/PAS 6.png",
      "/images/PAS 7.png",
      "/images/PAS 8.png",
      "/images/PAS 9.png",
      "/images/PAS 10.png",
    ],
  },
  {
    title: "BPVP BANDA ACEH",
    role: "PELATIHAN & SERTIFIKASI",
    period: "Sep 2025 - Oct 2025",
    description:
      "Dinyatakan lulus seluruh unit kompetensi Sertifikasi Surveyor yang meliputi penerapan K3L, komunikasi dalam proses pengukuran, persiapan dan pengoperasian alat ukur, pemetaan situasi, stake out, serta evaluasi hasil pengukuran. Memahami standar industri dan prosedur kerja lapangan secara sistematis.",
    images: [
      "/images/BLK 1.png",
      "/images/BLK 2.png",
      "/images/BLK 3.png",
      "/images/BLK 4.png",
      "/images/BLK 5.png",
      "/images/BLK 6.png",
    ],
  },
  {
    title: "CV. RESTU UMMI",
    role: "DESAIN GRAFIS, ADMINISTRASI & CUSTOMER SERVICE",
    period: "Aug 2024 - Sep 2025",
    description:
      "Melayani dan merespons pelanggan secara online/offline, memberikan informasi produk serta menangani keluhan. Mengelola pemesanan, pencatatan transaksi, dan data pelanggan, mendesain produk sesuai kebutuhan pelanggan, serta berkoordinasi dengan tim untuk kelancaran dan efektivitas operasional.",
    images: [
      "/images/RU 1.png",
      "/images/RU 2.png",
      "/images/RU 3.png",
      "/images/RU 4.png",
      "/images/RU 5.png",
    ],
  },
  {
    title: "UNIVERSITAS AL WASHLIYAH DARUSSALAM",
    role: "ASLAB & ASDOS",
    period: "Aug 2023 - Aug 2025",
    description:
      "Mendampingi praktikum, mengelola administrasi & peralatan laboratorium, menangani kendala teknis mahasiswa. Mengajar mata kuliah Sistem Informasi Geospasial (SIG), Penginderaan Jauh, dan Kartografi, serta membimbing analisis spasial menggunakan Software Spasial seperti ArcGIS, ENVI, GEE dan lainnya.",
    images: [
      "/images/AW_1.png",
      "/images/AW_2.png",
      "/images/AW_3.png",
      "/images/AW_4.png",
      "/images/AW_5.png",
      "/images/AW_6.png",
    ],
  },
  {
    title: "SMA NEGERI 1 BAITUSSALAM",
    role: "GURU PENGGANTI SEMENTARA",
    period: "Jan 2024 - Dec 2024",
    description:
      "Melaksanakan kegiatan belajar mengajar mata pelajaran Geografi kelas X, XI dan XII, Menyusun Rencana Pembelajaran dan bahan ajar relevan dengan lingkungan sekitar siswa, Membimbing siswa dalam kegiatan O2SN mata pelajaran Geografi dan Astronomi.",
    images: [
      "/images/SMA 1.png",
      "/images/SMA 2.png",
      "/images/SMA 3.png",
      "/images/SMA 4.png",
    ],
  },
  {
    title: "SD NEGERI 58 BANDA ACEH",
    role: "PROGRAM KAMPUS MENGAJAR",
    period: "Feb 2023 - Jun 2023",
    description:
      "Melaksanakan Program Kampus Mengajar selama 899 jam (20 SKS) dengan tugas observasi dan perancangan program sekolah, pelaksanaan AKM, penguatan literasi dan numerasi, adaptasi teknologi, serta dukungan administrasi dan manajemen sekolah. Berkontribusi dalam implementasi Kurikulum Merdeka dan penyusunan laporan kegiatan.",
    images: [
      "/images/KM 1.png",
      "/images/KM 2.png",
      "/images/KM 3.png",
      "/images/KM 4.png",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Image Gallery Modal                                                */
/* ------------------------------------------------------------------ */
function GalleryModal({
  images,
  title,
  onClose,
}: {
  images: string[];
  title: string;
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
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery: ${title}`}
    >
      <div
        className="relative mx-4 flex w-full max-w-3xl flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wide text-primary sm:text-base">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={images[activeIndex]}
            alt={`${title} - ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 720px"
          />

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-foreground backdrop-blur transition-colors hover:bg-background"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-foreground backdrop-blur transition-colors hover:bg-background"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-16 sm:w-24 ${
                i === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {activeIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image Grid (with See More overlay)                                 */
/* ------------------------------------------------------------------ */
function ImageGrid({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const hasMore = images.length > MAX_VISIBLE_IMAGES;
  const visibleImages = images.slice(0, MAX_VISIBLE_IMAGES);
  const extraCount = images.length - MAX_VISIBLE_IMAGES;

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-1.5 sm:w-[200px] lg:w-[260px]">
        {visibleImages.map((img, i) => {
          const isLastVisible = hasMore && i === MAX_VISIBLE_IMAGES - 1;
          return (
            <button
              key={i}
              onClick={() => setOpen(true)}
              className="group relative aspect-[4/3] overflow-hidden rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={
                isLastVisible
                  ? `See ${extraCount} more images`
                  : `View image ${i + 1}`
              }
            >
              <Image
                src={img}
                alt={`${title} portfolio ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="130px"
              />
              {isLastVisible && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[2px] transition-colors group-hover:bg-background/60">
                  <span className="text-xs font-semibold text-primary sm:text-sm">
                    +{extraCount} more
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* See More link below grid */}
      {hasMore && (
        <button
          onClick={() => setOpen(true)}
          className="mt-2 text-xs font-medium text-primary underline-offset-4 transition-colors hover:underline sm:hidden"
        >
          See more ({images.length} images)
        </button>
      )}

      {open && (
        <GalleryModal
          images={images}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience Section                                                 */
/* ------------------------------------------------------------------ */
export function ExperienceSection() {
  return (
    <section id="pengalaman" className="grid-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <h2 className="font-rehgal text-4xl text-foreground sm:text-5xl">
            Jejak <span className="text-primary">Karir</span>
          </h2>
          <span className="w-fit rounded border border-foreground px-4 py-1.5 text-sm font-semibold tracking-wider text-foreground">
            Pengalaman
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/*
            Desktop vertical line:
            date pill = 88px, then 12px padding-left to center of dot (dot = 14px, center = 7px)
            => 88 + 12 + 7 = 107px from left, but the dot container is px-[14px] so:
            88 + 14 + 6 = 108. We use left-[101px] to center on dot visually.
          */}
          <div className="absolute left-[101px] top-0 hidden h-full w-0.5 bg-primary/40 sm:block" />
          {/* Mobile vertical line */}
          <div className="absolute left-[5px] top-0 block h-full w-0.5 bg-primary/40 sm:hidden" />

          <div className="space-y-14 lg:space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col sm:flex-row">
                {/* Desktop: Date pill + dot column */}
                <div className="mb-3 flex items-start gap-0 sm:mb-0 sm:flex-none">
                  {/* Date pill */}
                  <div className="hidden w-[88px] shrink-0 sm:block">
                    <span className="inline-block w-full rounded-full border border-primary/60 bg-background px-2 py-1.5 text-center text-[11px] leading-snug tracking-wide text-primary">
                      {exp.period}
                    </span>
                  </div>
                  {/* Desktop dot - centered on the line */}
                  <div className="hidden shrink-0 sm:flex sm:w-[28px] sm:items-center sm:justify-center">
                    <div className="relative z-10 h-3.5 w-3.5 rounded-full border-[2.5px] border-primary bg-background" />
                  </div>
                </div>

                {/* Mobile: dot + date inline */}
                <div className="flex items-center gap-3 sm:hidden">
                  <div className="relative z-10 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background" />
                  <span className="rounded-full border border-primary/60 bg-background px-3 py-1 text-xs tracking-wide text-primary">
                    {exp.period}
                  </span>
                </div>

                {/* Content row */}
                <div className="mt-3 grid flex-1 gap-6 pl-6 sm:mt-0 sm:grid-cols-[1fr_auto] sm:gap-8 sm:pl-2">
                  {/* Text content */}
                  <div>
                    <h3 className="text-base font-extrabold tracking-wide text-primary sm:text-lg">
                      {exp.title}{" "}
                      <span className="font-normal text-muted-foreground">
                        -
                      </span>{" "}
                      <span className="font-semibold uppercase text-muted-foreground">
                        {exp.role}
                      </span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>

                  {/* Image grid with see-more support */}
                  <ImageGrid images={exp.images} title={exp.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
