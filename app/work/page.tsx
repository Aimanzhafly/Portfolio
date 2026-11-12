
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

type Project = {
  title: string;
  type: string;
  image: string;
  href?: string;
};

type Category = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  projects: Project[];
  viewAll?: string;
};

const categories: Category[] = [
  {
    id: "photography",
    number: "01",
    title: "PHOTOGRAPHY",
    subtitle: "AUTOMOTIVE · LIFESTYLE · PORTRAIT",
    viewAll: "/work/photography",
    projects: [
      {
        title: "MOTOR MANIAC 2026",
        type: "AUTOMOTIVE",
        image: "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 6.jpg",
        href: "/work/photography/motor-maniac-2026",
      },
      {
        title: "UWB.",
        type: "STREETWEAR · LIFESTYLE",
        image: "/portfolio/photography/UWB/UWB High Res 0 8.jpg",
        href: "/work/photography/uwb",
      },
    ],
  },
  {
    id: "videography",
    number: "02",
    title: "VIDEOGRAPHY",
    subtitle: "COMMERCIAL · AUTOMOTIVE · CREATIVE",
    viewAll: "/work/videography",
    projects: [
      {
        title: "AUTOMOTIVE FILMS",
        type: "AUTOMOTIVE · CINEMATOGRAPHY",
        image: "/hero-02.jpg",
        href: "/work/videography",
      },
      {
        title: "CREATIVE CAMPAIGNS",
        type: "FASHION · LIFESTYLE",
        image: "/hero-01.jpg",
        href: "/work/videography",
      },
      {
        title: "EVENT FILMS",
        type: "EVENT · HIGHLIGHTS",
        image: "/hero-03.jpg",
        href: "/work/videography",
      },
    ],
  },
  {
    id: "film-crew",
    number: "03",
    title: "FILM CREW",
    subtitle: "CAMERA DEPARTMENT · LIGHTING · GRIP",
    projects: [
      {
        title: "CAMERA DEPARTMENT",
        type: "1ST AC · 2ND AC · CAMERA ASSISTANT",
        image: "/hero-01.jpg",
      },
      {
        title: "LIGHTING",
        type: "GAFFER · BEST BOY",
        image: "/hero-02.jpg",
      },
      {
        title: "GRIP",
        type: "KEY GRIP · GRIP CREW",
        image: "/hero-03.jpg",
      },
    ],
  },
];

/* SCROLL REVEAL */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : "translate3d(0, 45px, 0)",
        transition: `opacity 900ms ease ${delay}ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* MAIN WORK PAGE */

export default function WorkPage() {
  const [pageReady, setPageReady] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [heroImageReady, setHeroImageReady] = useState(false);

  /* PAGE ENTRANCE */

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPageReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  /* NAVIGATION: HIDE DOWN, SHOW UP */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      if (currentScrollY <= 20) {
        setShowHeader(true);
      } else if (difference > 3 && currentScrollY > 80) {
        setShowHeader(false);
      } else if (difference < -3) {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-black text-white">

      {/* PAGE ENTRANCE TRANSITION */}

      <div
        className="pointer-events-none fixed inset-0 z-[100] bg-black"
        style={{
          opacity: pageReady ? 0 : 1,
          transition: "opacity 1200ms ease",
        }}
      />

      {/* NAVIGATION */}

      <header
        className="fixed top-5 z-50"
        style={{
          left: "50%",
          width: "calc(100% - 32px)",
          maxWidth: "1100px",
          transform: `translate3d(-50%, ${
            pageReady && showHeader ? "0px" : "-120px"
          }, 0)`,
          opacity: pageReady && showHeader ? 1 : 0,
          transition: "transform 500ms ease, opacity 500ms ease",
          pointerEvents: pageReady && showHeader ? "auto" : "none",
        }}
      >
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-5 py-3 shadow-2xl backdrop-blur-xl md:px-7">

          <Link href="/" className="flex items-center">
            <img
              src="/logo ATAS BAWAH.PNG"
              alt="Aiman Zhafly"
              className="w-[42px] md:w-[52px]"
            />
          </Link>

          <div className="flex items-center gap-5 text-[9px] tracking-[0.28em] text-white md:gap-8 md:text-[10px]">
            <Link href="/work" className="text-white transition-opacity hover:opacity-50">
              WORK
            </Link>
            <Link href="/about" className="text-white/60 transition-opacity hover:text-white">
              ABOUT
            </Link>
            <Link href="/contact" className="text-white/60 transition-opacity hover:text-white">
              CONTACT
            </Link>
          </div>

        </nav>
      </header>

      {/* FEATURED HERO */}

      <section className="relative flex min-h-[90vh] items-end overflow-hidden px-6 pb-14 pt-32 md:px-12 md:pb-20">

        <img
          src="/hero-01.jpg"
          alt="Featured creative project"
          onLoad={() => setHeroImageReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: heroImageReady ? 1 : 0,
            transform:
              heroImageReady && pageReady ? "scale(1)" : "scale(1.12)",
            transition:
              "opacity 1400ms ease, transform 2200ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 w-full">

          <div
            style={{
              opacity: pageReady ? 1 : 0,
              transform: pageReady ? "translateY(0)" : "translateY(35px)",
              transition: "all 1100ms ease 700ms",
            }}
          >
            <div className="mb-6 flex items-center gap-4 text-[9px] tracking-[0.4em]">
              <span className="h-px w-10 bg-white" />
              <span>SELECTED WORK / 2026</span>
            </div>

            <p className="mb-3 text-[10px] tracking-[0.35em] text-white/70">
              PHOTOGRAPHY · VIDEOGRAPHY · FILM CREW
            </p>

            <h1 className="text-5xl font-medium tracking-[-0.06em] md:text-8xl lg:text-[9rem]">
              RECENT
              <br />
              PROJECT.
            </h1>
          </div>

          <div
            className="mt-10 flex items-center justify-between border-t border-white/30 pt-5"
            style={{
              opacity: pageReady ? 1 : 0,
              transition: "opacity 1000ms ease 1100ms",
            }}
          >
            <p className="text-[8px] tracking-[0.25em] text-white/70 md:text-[9px]">
              VISUAL PRODUCTION · CREATIVE WORK
            </p>

            <a
              href="#selected"
              className="text-[9px] tracking-[0.3em] transition hover:text-white/50"
            >
              EXPLORE WORK ↓
            </a>
          </div>

        </div>
      </section>

      {/* CATEGORY INTRODUCTION */}

      <section
        id="selected"
        className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28"
      >
        <Reveal>
          <div className="mb-12 flex items-center justify-between">
            <p className="text-[10px] tracking-[0.35em] text-white/50">
              01 / DISCIPLINES
            </p>

            <p className="text-[9px] tracking-[0.25em] text-white/40">
              EXPLORE BY DISCIPLINE
            </p>
          </div>
        </Reveal>

        {/* CATEGORY NAVIGATION */}

        <div className="grid border-y border-white/20 md:grid-cols-3">

          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 140}>
              <a
                href={`#${category.id}`}
                className="group block border-b border-white/20 py-8 transition-all duration-500 hover:bg-white hover:px-5 hover:text-black md:border-b-0 md:border-r md:px-5 md:last:border-r-0"
              >
                <p className="text-[9px] tracking-[0.3em] opacity-50">
                  {category.number}
                </p>

                <h2 className="mt-5 text-2xl tracking-[-0.04em] md:text-3xl">
                  {category.title}
                </h2>

                <p className="mt-3 text-[8px] tracking-[0.18em] opacity-50">
                  {category.subtitle}
                </p>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.25em]">
                    EXPLORE
                  </span>

                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}

        </div>
      </section>

      {/* CATEGORY PROJECT SECTIONS */}

      <section className="space-y-28 pb-32 md:space-y-36">

        {categories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className="scroll-mt-28"
          >

            {/* CATEGORY TITLE */}

            <div className="mb-8 px-6 md:px-12">
              <Reveal>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-3 text-[9px] tracking-[0.35em] text-white/40">
                      {category.number} / SELECTED WORK
                    </p>

                    <h2 className="text-3xl tracking-[-0.05em] md:text-5xl">
                      {category.title}
                    </h2>

                    <p className="mt-3 text-[8px] tracking-[0.2em] text-white/40">
                      {category.subtitle}
                    </p>
                  </div>

                  <span className="hidden text-[9px] tracking-[0.25em] text-white/40 md:block">
                    {String(category.projects.length).padStart(2, "0")} PROJECTS
                  </span>
                </div>
              </Reveal>
            </div>

            {/* PROJECT CAROUSEL */}

            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 md:gap-6 md:px-12">

              {category.projects.map((project, index) => (
                <Reveal
                  key={`${category.id}-${project.title}`}
                  delay={index * 120}
                  className="w-[78vw] max-w-[520px] flex-none snap-start md:w-[42vw]"
                >
                  <div className="group relative">

                    {project.href ? (
                      <Link
                        href={project.href}
                        className="relative block overflow-hidden"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-900">
                          <img
                            src={project.image}
                            alt={`${category.title} ${project.title}`}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between md:bottom-7 md:left-7 md:right-7">
                          <div>
                            <p className="text-[8px] tracking-[0.3em] text-white/60">
                              {project.type}
                            </p>

                            <h3 className="mt-2 text-xl tracking-[-0.03em] md:text-2xl">
                              {project.title}
                            </h3>
                          </div>

                          <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
                            ↗
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <div className="relative overflow-hidden">
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-900">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7">
                          <p className="text-[8px] tracking-[0.3em] text-white/60">
                            {project.type}
                          </p>

                          <h3 className="mt-2 text-xl tracking-[-0.03em] md:text-2xl">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    )}

                  </div>
                </Reveal>
              ))}

            </div>

            {/* VIEW ALL */}

            {category.viewAll && (
              <Reveal delay={150}>
                <div className="mt-5 flex justify-end px-6 md:px-12">
                  <Link
                    href={category.viewAll}
                    className="border-b border-white/40 pb-2 text-[9px] tracking-[0.3em] transition hover:border-white hover:text-white/60"
                  >
                    VIEW ALL {category.title} ↗
                  </Link>
                </div>
              </Reveal>
            )}

          </div>
        ))}

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/15 px-6 py-10 md:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="text-[9px] tracking-[0.35em] text-white/40">
                AIMAN ZHAFLY
              </p>

              <p className="mt-3 text-2xl tracking-[-0.04em]">
                VISUAL STORYTELLER.
              </p>
            </div>

            <div className="flex gap-6 text-[9px] tracking-[0.25em] text-white/60">
              <Link href="/" className="transition hover:text-white">
                HOME
              </Link>

              <Link href="/about" className="transition hover:text-white">
                ABOUT
              </Link>

              <Link href="/contact" className="transition hover:text-white">
                CONTACT
              </Link>
            </div>

          </div>

          <p className="mt-10 text-[8px] tracking-[0.25em] text-white/30">
            © 2026 AIMAN ZHAFLY. ALL RIGHTS RESERVED.
          </p>
        </Reveal>
      </footer>

    </main>
  );
}
