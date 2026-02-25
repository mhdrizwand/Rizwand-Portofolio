"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="grid-bg relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:gap-4 lg:pl-16">
        {/* Profile Image */}
        <div className="relative flex-shrink-0 lg:flex-1">
          <div className="relative mx-auto h-[340px] w-[280px] overflow-hidden sm:h-[420px] sm:w-[340px] lg:mx-0 lg:h-[520px] lg:w-[420px]">
            <Image
              src="/images/Profil.jpeg"
              alt="M. Rizwan - Profile Photo"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Red/blue overlay tint effect */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-blue-700/30 mix-blend-overlay dark:from-red-600/30 dark:to-blue-700/40" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-rehgal text-5xl leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="">Porto</span>
            <span className="text-primary">Folio</span>
          </h1>

          <h2 className="mt-2 font-serif text-4xl font-bold tracking-wide text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            M. RIZWAN
          </h2>

          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            fresh graduate | Pendidikan Geografi | Desain Grafis
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#pengalaman"
              className="rounded-sm border border-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:text-sm"
            >
              Lihat Portofolio
            </a>
            <a
              href="/cv/CV M Rizwan.pdf"
              download="CV M Rizwan.pdf"
              className="rounded-sm border border-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:text-sm"
            >
              Download CV
            </a>
          </div>

          {/* See Portfolio Link */}
          <a
            href="#about"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            See My Portofolio
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
