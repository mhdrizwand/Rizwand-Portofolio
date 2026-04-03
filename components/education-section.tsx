"use client";

import { useRef } from "react";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── DATA ─────────────────────────────────────────────────────────
const educationData = [
  {
    degree: "S1 Pendidikan Geografi",
    institution: "Universitas Al Washliyah Darussalam",
    period: "2020 – 2025",
    gpa: "3,92",
    description:
      "Lulus dengan IPK 3,92 dengan fokus pada pengajaran geografi, analisis spasial, dan pemetaan. Aktif sebagai Asisten Dosen pada mata kuliah SIG, Penginderaan Jauh, dan Kartografi, serta Asisten Laboratorium Geografi. Terlibat dalam organisasi sebagai Sekretaris HIMAGEO dan Wakil Ketua Bidang Sekretariat BEM FKIP.",
    achievements: [
      "IPK 3,92 / 4,00",
      "Asisten Laboratorium Geografi",
      "Asisten Dosen — SIG, Penginderaan Jauh & Kartografi",
      "Juara 1 Lomba Karya Tulis Ilmiah",
    ],
    accent: "#5eead4",
    index: 0,
  },
  {
    degree: "SMA / Sederajat",
    institution: "SMKs MUDI Lamno",
    period: "2016 – 2019",
    gpa: null,
    description:
      "Jurusan Teknik Otomotif, dipercaya sebagai Ketua Kelas dan Wakil OSIS. Bertanggung jawab mengoordinasikan kegiatan kelas, menjadi penghubung antara siswa dan guru, serta membantu perencanaan dan pelaksanaan program kerja organisasi sekolah.",
    achievements: [
      "Juara 2 LKS Tingkat Kabupaten",
      "Juara 1 Kelas XI & XII",
      "Wakil Ketua OSIS",
    ],
    accent: "#2dd4bf",
    index: 1,
  },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

// ─── ACHIEVEMENT ITEM ─────────────────────────────────────────────
function AchievementItem({ text, i }: { text: string; i: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -16 },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className="group flex items-start gap-3"
    >
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/8 transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/15">
        <Award size={10} className="text-primary" />
      </div>
      <span className="text-sm leading-snug text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
        {text}
      </span>
    </motion.div>
  );
}

// ─── EDUCATION CARD ───────────────────────────────────────────────
function EducationCard({ edu }: { edu: (typeof educationData)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger(0.1)}
      className="group relative"
    >
      {/* Card */}
      <motion.div
        variants={scaleIn}
        whileHover={{
          y: -6,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/8"
      >
        {/* Top neon accent bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-0 h-[2px] w-full origin-left"
          style={{
            background: `linear-gradient(90deg, ${edu.accent}, ${edu.accent}40, transparent)`,
            boxShadow: `0 0 12px ${edu.accent}60`,
          }}
        />

        {/* Ambient corner glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full"
          style={{
            background: `radial-gradient(circle, ${edu.accent}10 0%, transparent 70%)`,
          }}
        />

        <div className="p-7 sm:p-8">
          {/* Header row */}
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-start justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <motion.div
                initial={{ rotate: -30, opacity: 0, scale: 0.6 }}
                animate={inView ? { rotate: 0, opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5"
              >
                <GraduationCap size={22} className="text-primary" />
              </motion.div>

              {/* Period */}
              <div className="flex items-center gap-1.5 rounded-sm border border-border bg-background/60 px-3 py-1.5">
                <Calendar size={10} className="text-primary/60" />
                <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
                  {edu.period}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Degree title */}
          <motion.h3
            variants={slideLeft}
            className="text-xl font-bold leading-tight text-foreground sm:text-2xl"
          >
            {edu.degree}
          </motion.h3>

          {/* Institution */}
          <motion.div
            variants={slideLeft}
            className="mt-1.5 flex items-center gap-2"
          >
            <BookOpen size={12} className="text-primary/60" />
            <p className="text-sm font-medium text-primary">
              {edu.institution}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="my-5 h-px w-full origin-left bg-border"
          />

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {edu.description}
          </motion.p>

          {/* Achievements */}
          <motion.div
            variants={stagger(0.3)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="mt-6 space-y-2.5"
          >
            {edu.achievements.map((a, i) => (
              <AchievementItem key={a} text={a} i={i} />
            ))}
          </motion.div>
        </div>

        {/* Bottom corner accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-0 right-0 h-16 w-16"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${edu.accent}08 100%)`,
          }}
        />
        <span
          className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-primary/15"
          style={{ borderBottomRightRadius: "0.75rem" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export function EducationSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true, margin: "-60px" });

  // Parallax on section
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      id="education"
      className="grid-bg relative overflow-hidden py-20 lg:py-28"
    >
      {/* Subtle parallax ambient */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute right-0 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(94,234,212,0.08) 0%, transparent 65%)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* ── HEADER ── */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={headerView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-3"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={headerView ? { width: "40px" } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-px bg-primary"
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              Riwayat Pendidikan
            </span>
          </motion.div>

          <div className="flex flex-wrap items-end gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={
                headerView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif bold text-5xl leading-none italic text-foreground sm:text-6xl lg:text-7xl"
            >
              Riwayat <span className="italic text-primary">Pendidikan</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-1 flex items-center gap-2 rounded-sm border border-foreground/15 px-4 py-1.5"
            >
              <GraduationCap size={12} className="text-muted-foreground" />
              <span className="text-sm font-semibold tracking-wider text-foreground">
                {educationData.length} Jenjang
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground"
          ></motion.p>
        </div>

        {/* ── CARDS GRID ── */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {educationData.map((edu) => (
            <EducationCard key={edu.degree} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}
