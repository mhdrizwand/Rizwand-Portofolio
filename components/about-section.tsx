"use client";

import { Check } from "lucide-react";

const softwareSkills = [
  { name: "WORD", level: 5, label: "Advanced" },
  { name: "EXCEL", level: 3, label: "Basic" },
  { name: "POWERPOINT", level: 5, label: "Advanced" },
  { name: "CORELDRAW", level: 5, label: "Advanced" },
  { name: "ADOBE ILLUSTRATOR", level: 4, label: "Intermediate" },
  { name: "ADOBE PHOTOSHOP", level: 4, label: "Intermediate" },
  { name: "ARCGIS", level: 4, label: "Intermediate" },
];

const hardSkills = [
  "ADMINISTRASI & DOKUMENTASI",
  "PENGOLAHAN DATA",
  "PELAYANAN & KOMUNIKASI",
  "DESAIN GRAFIS",
];

const softSkills = [
  "MANAJEMEN WAKTU",
  "PROBLEM SOLVING",
  "ADAPTABILITY",
  "MAMPU BEKERJA DALAM TIM",
];

function SkillBar({
  level,
  maxLevel = 5,
}: {
  level: number;
  maxLevel?: number;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxLevel }).map((_, i) => (
        <div
          key={i}
          className={`h-3.5 w-5 rounded-sm ${
            i < level ? "bg-primary" : "bg-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="grid-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        {/* Main Heading */}
        <h2 className="mb-8 font-rehgal text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Hai, <span className="text-primary">Saya Rizwan</span>
        </h2>

        {/* Subheading with teal bar */}
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <h3 className="font-rehgal text-2xl text-foreground sm:text-3xl lg:text-4xl">
            Perkenalan Tentang Saya
          </h3>
          <div className="hidden h-3 w-48 rounded-full bg-primary sm:block lg:w-64" />
        </div>

        {/* Description Paragraph */}
        <div className="mb-16 max-w-5xl">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Nama Lengkap saya{" "}
            <strong className="text-foreground">Muhammad Rizwan</strong>. Saya
            seorang Fresh Graduate lulusan Pendidikan Geografi dengan pengalaman
            sebagai Asisten Dosen dan Asisten Laboratorium, serta pengalaman
            kerja di bidang Customer Service, Administrasi, dan Desain Grafis.
            Memiliki kemampuan komunikasi, pengalaman mengajar materi geografi,
            serta keterampilan desain menggunakan CorelDRAW, Adobe Illustrator,
            dan Adobe Photoshop. Menguasai Microsoft Word, Excel, dan PowerPoint
            untuk mendukung pekerjaan. Mampu bekerja sama dalam tim dengan baik
            serta memiliki semangat untuk terus berkembang dan mempelajari
            hal-hal baru.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Skill Software */}
          <div className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30">
            <h4 className="mb-5 text-center text-lg font-bold tracking-wider">
              <span className="text-foreground">SKILL </span>
              <span className="text-primary">SOFTWARE</span>
            </h4>
            <div className="space-y-3">
              {softwareSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-3"
                >
                  <span className="truncate text-xs font-bold tracking-wide text-foreground">
                    {skill.name}
                  </span>
                  <SkillBar level={skill.level} />
                  <span className="w-[72px] text-right text-[10px] text-muted-foreground">
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hard Skill */}
          <div className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30">
            <h4 className="mb-5 text-center text-lg font-bold tracking-wider">
              <span className="text-foreground">HARD </span>
              <span className="text-primary">SKILL</span>
            </h4>
            <div className="space-y-4">
              {hardSkills.map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <Check
                    className="shrink-0 text-primary"
                    size={16}
                    strokeWidth={3}
                  />
                  <span className="text-xs font-semibold tracking-wide text-foreground">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skill */}
          <div className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 sm:col-span-2 lg:col-span-1">
            <h4 className="mb-5 text-center text-lg font-bold tracking-wider">
              <span className="text-primary">SOFT </span>
              <span className="text-foreground">SKILL</span>
            </h4>
            <div className="space-y-4">
              {softSkills.map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <Check
                    className="shrink-0 text-primary"
                    size={16}
                    strokeWidth={3}
                  />
                  <span className="text-xs font-semibold tracking-wide text-foreground">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
