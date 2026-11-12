
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const projects = [
  {
    number: "001",
    title: "MOTOR MANIAC 2026.",
    category: "AUTOMOTIVE · EVENT PHOTOGRAPHY",
    description:
      "Automotive culture, machines and moments captured through photography.",
    image:
      "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 6.jpg",
    href: "/work/photography/motor-maniac-2026",
  },
  {
    number: "002",
    title: "UWB.",
    category: "STREETWEAR · LIFESTYLE · EDITORIAL",
    description:
      "A visual exploration of streetwear, identity and contemporary lifestyle.",
    image: "/portfolio/photography/UWB/UWB High Res 0 8.jpg",
    href: "/work/photography/uwb",
  },
];

export default function PhotographyPage() {
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
          WORK / PHOTOGRAPHY
        </p>

        <h1 className="text-[15vw] font-medium leading-[0.85] tracking-[-0.085em] md:text-[12vw]">
          PHOTOGRAPHY.
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/20 pt-6 md:mt-14 md:flex-row md:items-end">
          <p className="max-w-lg text-sm leading-relaxed text-white/55">
            A collection of photographs exploring automotive culture,
            people, lifestyle, fashion and events.
          </p>

          <p className="text-[9px] tracking-[0.3em] text-white/40">
            SELECTED PROJECTS · 2026
          </p>
        </div>
      </section>

      {/* PROJECT ARCHIVE */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">

        <div className="mb-6 flex items-center justify-between">
          <p className="text-[9px] tracking-[0.3em] text-white/40">
            01 / SELECTED WORK
          </p>

          <p className="text-[9px] tracking-[0.3em] text-white/40">
            02 PROJECTS
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {projects.map((project, index) => (
            <Link
              key={project.number}
              href={project.href}
              className="group relative block overflow-hidden bg-neutral-900"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/15" />

                <p className="absolute right-6 top-6 text-[9px] tracking-[0.3em]">
                  {project.number}
                </p>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 md:p-9">

                  <div className="max-w-2xl">

                    <p className="mb-3 text-[8px] tracking-[0.3em] text-white/60 md:text-[9px]">
                      {project.category}
                    </p>

                    <h2 className="text-3xl font-medium tracking-[-0.06em] md:text-5xl">
                      {project.title}
                    </h2>

                    <p className="mt-3 max-w-md text-xs leading-relaxed text-white/60 md:text-sm">
                      {project.description}
                    </p>

                  </div>

                  <span className="mb-1 text-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                    ↗
                  </span>

                </div>
              </div>
            </Link>
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
              BEHIND THE FRAME.
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
