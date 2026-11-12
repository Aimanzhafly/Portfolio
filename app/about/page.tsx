
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const initialTransform =
    direction === "left"
      ? "translate3d(-45px, 0, 0)"
      : direction === "right"
      ? "translate3d(45px, 0, 0)"
      : "translate3d(0, 45px, 0)";

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
        transform: visible ? "translate3d(0, 0, 0)" : initialTransform,
        transition: `opacity 900ms ease ${delay}ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    number: "01",
    title: "PHOTOGRAPHY",
    description: "Automotive · Lifestyle · Portrait",
  },
  {
    number: "02",
    title: "VIDEOGRAPHY",
    description: "Commercial · Automotive · Travel",
  },
  {
    number: "03",
    title: "FILM CREW",
    description: "Camera · Lighting · Grip · Production",
  },
];

export default function AboutPage() {
  const [pageReady, setPageReady] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  /* PAGE ENTRANCE */

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPageReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  /* NAVBAR SCROLL ANIMATION */

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

      {/* PAGE ENTRANCE */}

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

          <a href="/" className="flex items-center">
            <img
              src="/logo ATAS BAWAH.PNG"
              alt="Aiman Zhafly"
              className="w-[42px] md:w-[52px]"
            />
          </a>

          <div className="flex items-center gap-5 text-[9px] tracking-[0.28em] text-white md:gap-8 md:text-[10px]">
            <a href="/work" className="text-white/60 transition hover:text-white">
              WORK
            </a>
            <a href="/about" className="text-white transition hover:text-white/50">
              ABOUT
            </a>
            <a href="/contact" className="text-white/60 transition hover:text-white">
              CONTACT
            </a>
          </div>

        </nav>
      </header>

      {/* ABOUT HERO */}

      <section className="relative px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">

        {/* SECTION LABEL */}

        <Reveal direction="left">
          <div className="mb-14 flex items-center gap-4 text-[9px] tracking-[0.4em] text-white/60 md:mb-20">
            <span className="h-px w-10 bg-white" />
            <span>02 / ABOUT</span>
          </div>
        </Reveal>

        {/* MAIN COMPOSITION */}

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.85fr_0.9fr] lg:gap-10">

          {/* LEFT: TYPOGRAPHY */}

          <div className="order-1 flex flex-col justify-center">

            <Reveal direction="left" delay={100}>
              <h1 className="text-[16vw] font-medium leading-[0.78] tracking-[-0.09em] md:text-[12vw] lg:text-[6.8vw]">
                BEHIND
              </h1>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <h1 className="mt-3 text-[16vw] font-medium leading-[0.78] tracking-[-0.09em] md:text-[12vw] lg:text-[6.8vw]">
                THE
              </h1>
            </Reveal>

            <Reveal direction="left" delay={300}>
              <h1 className="mt-3 text-[16vw] font-medium leading-[0.78] tracking-[-0.09em] md:text-[12vw] lg:text-[6.8vw]">
                FRAME.
              </h1>
            </Reveal>

            <Reveal direction="left" delay={450}>
              <div className="mt-10 border-t border-white/25 pt-5 lg:mt-14">
                <p className="text-[9px] tracking-[0.3em] text-white/50">
                  THE PERSON BEHIND THE CAMERA
                </p>

                <p className="mt-3 text-sm tracking-wide text-white/80">
                  A CREATIVE APPROACH TO VISUAL STORYTELLING.
                </p>
              </div>
            </Reveal>

          </div>

          {/* CENTRE: IMAGE */}

          <Reveal direction="right" delay={250} className="order-2">
            <div className="group relative overflow-hidden bg-neutral-900">

              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/about/aiman-portrait.jpg"
                  alt="Aiman Zhafly visual portfolio"
                  className="h-full w-full object-cover object-[80%_center] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] tracking-[0.35em] text-white/80">
                  AIMAN ZHAFLY
                </p>
              </div>

            </div>
          </Reveal>

          {/* RIGHT: INTRODUCTION */}

          <div className="order-3 flex flex-col justify-center">

            <Reveal direction="right" delay={350}>
              <p className="text-[9px] tracking-[0.35em] text-white/50">
                PHOTOGRAPHER / VIDEOGRAPHER / FILM CREW
              </p>

              <h2 className="mt-7 text-3xl font-medium leading-[1.05] tracking-[-0.06em] md:text-4xl lg:text-5xl">
                AIMAN
                <br />
                ZHAFLY.
              </h2>
            </Reveal>

            <Reveal direction="right" delay={500}>
              <div className="mt-10 border-t border-white/25 pt-7">

                <p className="text-[10px] tracking-[0.3em] text-white/50">
                  MY APPROACH
                </p>

                <h3 className="mt-5 text-2xl font-medium leading-tight tracking-[-0.05em] md:text-3xl">
                  I CREATE IMAGES WITH PURPOSE.
                </h3>

                <div className="mt-7 space-y-5 text-sm leading-7 text-white/65">
                  <p>
                    I am a photographer, videographer and freelance film crew
                    professional working across different forms of visual production.
                  </p>

                  <p>
                    My work explores the relationship between people,
                    machines, places and atmosphere — creating visuals
                    that communicate a feeling, not just an image.
                  </p>

                  <p>
                    From photography to motion pictures, I approach
                    every project with curiosity, creativity and an
                    attention to detail.
                  </p>
                </div>

              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* CREATIVE DISCIPLINES */}

      <section className="px-6 pb-28 md:px-12 md:pb-36">

        <Reveal>
          <div className="mb-10 flex items-center justify-between border-b border-white/25 pb-5">
            <p className="text-[9px] tracking-[0.35em] text-white/50">
              01 / WHAT I DO
            </p>

            <p className="text-[9px] tracking-[0.25em] text-white/40">
              CREATIVE DISCIPLINES
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3">

          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={index * 150}
              direction={index === 0 ? "left" : index === 2 ? "right" : "up"}
            >

              <div className="group border-b border-white/25 py-9 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">

                <div className="flex items-center justify-between">
                  <p className="text-[9px] tracking-[0.3em] text-white/40">
                    {service.number}
                  </p>

                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">
                    ↗
                  </span>
                </div>

                <h3 className="mt-12 text-2xl tracking-[-0.05em] md:text-3xl">
                  {service.title}
                </h3>

                <p className="mt-4 text-[9px] tracking-[0.2em] text-white/50">
                  {service.description}
                </p>

                <div className="mt-8 h-px w-full bg-white/20 transition-all duration-700 group-hover:bg-white" />

              </div>

            </Reveal>
          ))}

        </div>

      </section>

      {/* CLOSING STATEMENT */}

      <section className="relative overflow-hidden border-t border-white/15 px-6 py-24 md:px-12 md:py-36">

        <Reveal>
          <p className="mb-8 text-[9px] tracking-[0.4em] text-white/40">
            THE CREATIVE PROCESS
          </p>

          <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.07em] md:text-7xl lg:text-[7rem]">
            EVERY FRAME
            <br />
            HAS A STORY.
          </h2>

          <div className="mt-12 flex items-center justify-between border-t border-white/25 pt-6">

            <p className="text-[9px] tracking-[0.25em] text-white/50">
              LET'S MAKE SOMETHING MEANINGFUL.
            </p>

            <a
              href="/#contact"
              className="text-[9px] tracking-[0.3em] transition hover:text-white/50"
            >
              GET IN TOUCH ↗
            </a>

          </div>
        </Reveal>

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
              <a href="/">HOME</a>
              <a href="/work">WORK</a>
              <a href="/#contact">CONTACT</a>
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
