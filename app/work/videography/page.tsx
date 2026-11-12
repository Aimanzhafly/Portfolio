
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "RETRO HAVOC 2026.",
    video: "154On_m2Zv92-KETMGYX55uQw2HGih4cF",
    year: "2026",
  },
  {
    title: "NURRMOTORS MODEL.",
    video: "1AVw_jMoKlRn0C6QukOBeNljydDPbIktN",
    year: "2026",
  },
  {
    title: "MOTOR MANIAC 2026.",
    video: "1OJ12Z61dginsA3kX1Q3AVMPk5VtIkaeT",
    year: "2026",
  },
  {
    title: "NURRMOTORS IAM KL 2026.",
    subtitle: "MERCHANDISE TEASER",
    video: "1Y5k_lXH4waMIXMgVbhRkkF7Ix1bRYcPX",
    year: "2026",
  },
  {
    title: "UWB PROMO VIDEO.",
    video: "1rLt3J8oLg94Afmo4I3ypzcByeKQ1dRbx",
    year: "2026",
  },
];

export default function VideographyPage() {
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* NAVIGATION */}
      <header
        className={`fixed inset-x-0 top-5 z-50 flex justify-center px-4 transition-all duration-500 ease-in-out ${
          showNav
            ? "translate-y-0 opacity-100"
            : "-translate-y-32 pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex w-full max-w-[1100px] items-center justify-between rounded-full border border-white/15 bg-black/60 px-5 py-3 shadow-2xl backdrop-blur-xl md:px-7">
          <Link href="/" aria-label="Aiman Zhafly home">
            <img
              src="/logo ATAS BAWAH.PNG"
              alt="Aiman Zhafly"
              className="w-[42px] md:w-[52px]"
            />
          </Link>

          <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] text-white md:gap-8 md:text-[10px] md:tracking-[0.28em]">
            {[
              { name: "WORK", href: "/work" },
              { name: "ABOUT", href: "/about" },
              { name: "CONTACT", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative py-2 transition-opacity duration-300 hover:opacity-60"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* INTRO */}
      <section className="px-5 pb-12 pt-36 md:px-12 md:pb-16 md:pt-44">
        <p className="mb-8 text-[9px] tracking-[0.4em] text-white/40">
          WORK / VIDEOGRAPHY
        </p>

        <h1 className="text-[15vw] font-medium leading-[0.85] tracking-[-0.085em] md:text-[12vw]">
          VIDEOGRAPHY.
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/20 pt-6 md:mt-14 md:flex-row md:items-end">
          <p className="max-w-lg text-sm leading-relaxed text-white/55">
            A collection of moving images, cinematic visuals and stories
            across automotive, creative campaigns and events.
          </p>

          <p className="text-[9px] tracking-[0.3em] text-white/40">
            SELECTED FILMS · 2026
          </p>
        </div>
      </section>

      {/* VIDEO PROJECTS */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[9px] tracking-[0.3em] text-white/40">
            SELECTED FILMS
          </p>

          <p className="text-[9px] tracking-[0.3em] text-white/40">
            05 PROJECTS
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.video}
              className="overflow-hidden bg-neutral-950"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <iframe
                  src={`https://drive.google.com/file/d/${project.video}/preview`}
                  title={project.title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-white/10 p-6 md:p-8">
                <div className="min-w-0">
                  <h2 className="text-2xl font-medium tracking-[-0.06em] md:text-4xl">
                    {project.title}
                  </h2>

                  {project.subtitle && (
                    <p className="mt-2 text-[10px] tracking-[0.25em] text-white/50">
                      {project.subtitle}
                    </p>
                  )}
                </div>

                <span className="shrink-0 text-[9px] tracking-[0.2em] text-white/60">
                  {project.year}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/15 px-5 py-10 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] tracking-[0.35em] text-white/40">
              AIMAN ZHAFLY
            </p>

            <p className="mt-3 text-xl tracking-[-0.04em]">
              MOVING IMAGES. VISUAL STORIES.
            </p>
          </div>

          <Link
            href="/work"
            className="text-[9px] tracking-[0.25em] text-white/60 transition hover:text-white"
          >
            ← BACK TO WORK
          </Link>
        </div>

        <p className="mt-10 text-[8px] tracking-[0.25em] text-white/30">
          © 2026 AIMAN ZHAFLY. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}
