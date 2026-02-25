"use client";

import { GraduationCap, Award } from "lucide-react";

const educationData = [
  {
    degree: "S1 Pendidikan Geografi",
    institution: "Universitas Al Washliyah Darussalam",
    period: "2020-2024",
    description:
      "Lulus dengan IPK 3,92 dengan fokus pada pengajaran geografi, analisis spasial, dan pemetaan. Selama masa perkuliahan aktif sebagai Asisten Dosen pada mata kuliah Sistem Informasi Geografis (SIG), Penginderaan Jauh, dan Kartografi, serta sebagai Asisten Laboratorium Geografi yang mendukung proses pembelajaran dan pengelolaan administrasi praktikum. Terlibat dalam organisasi sebagai Sekretaris Himpunan Mahasiswa Geografi (HIMAGEO) dan Wakil Ketua Bidang Sekretariat BEM FKIP. Selain itu, mengikuti Program Kampus Mengajar dan terlibat dalam penelitian dosen.",
    achievements: [
      "IPK 3.92",
      "Asisten Laboratorium",
      "Asisten Dosen (Mata Kuliah SIG, Penginderaan Jauh & Kartografi",
      "Juara 1 Lomba Penulisan Karya Tulis Ilmiah",
    ],
  },
  {
    degree: "SMA / Sederajat",
    institution: "SMKs MUDI Lamno",
    period: "2016 - 2019",
    description:
      "Jurusan Teknik Otomotif, dipercaya sebagai Ketua Kelas dan Wakil OSIS. Dalam peran tersebut, saya bertanggung jawab mengoordinasikan kegiatan kelas, menjadi penghubung antara siswa dan guru, serta membantu perencanaan dan pelaksanaan program kerja organisasi sekolah.",
    achievements: [
      "Juara 2 Lomba Kompetensi Siswa (LKS) - Tingkat Kabupaten.",
      "Juara Kelas - Juara 2 Kelas X, Juara 1 Kelas XI, Juara 1 Kelas XII.",
      "Wakil Ketua OSIS",
    ],
  },
];

export function EducationSection() {
  return (
    <section id="education" className="grid-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:pl-16">
        {/* Section Title */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Riwayat <span className="text-primary">Pendidikan</span>
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Top accent line */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/80 to-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 flex items-start justify-between">
                <GraduationCap className="text-primary" size={32} />
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {edu.period}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground">
                {edu.degree}
              </h3>
              <p className="mt-1 text-sm text-primary">{edu.institution}</p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {edu.description}
              </p>

              {/* Achievements */}
              <div className="mt-6 space-y-2">
                {edu.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Award size={14} className="text-primary" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
