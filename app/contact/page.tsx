
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

export default function ContactPage() {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

            <a href="/about" className="text-white/60 transition hover:text-white">
              ABOUT
            </a>

            <a href="/contact" className="text-white transition hover:text-white/50">
              CONTACT
            </a>
          </div>

        </nav>
      </header>

      {/* CONTACT MAIN SECTION */}

      <section className="relative flex min-h-screen items-center px-6 pb-20 pt-36 md:px-12 md:pt-40">

        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">

          {/* LEFT: CONTACT INFORMATION */}

          <div className="order-2 lg:order-1">

            <Reveal direction="left">

              <div className="mb-12 flex items-center gap-4 text-[9px] tracking-[0.4em] text-white/60">
                <span className="h-px w-10 bg-white" />
                <span>03 / CONTACT</span>
              </div>

              <p className="mb-5 text-[10px] tracking-[0.35em] text-white/50">
                HAVE A PROJECT IN MIND?
              </p>

              <h1 className="text-6xl font-medium leading-[0.85] tracking-[-0.075em] md:text-8xl lg:text-[6rem]">
                LET'S
                <br />
                CREATE.
              </h1>

              <p className="mt-10 max-w-lg text-sm leading-7 text-white/65 md:text-base">
                Have an idea, a project or something interesting
                in mind? Let's talk and create something meaningful
                together.
              </p>

            </Reveal>

            {/* CONTACT DETAILS */}

            <Reveal direction="left" delay={200}>

              <div className="mt-14 border-t border-white/25 pt-8">

                <p className="mb-7 text-[9px] tracking-[0.35em] text-white/45">
                  GET IN TOUCH
                </p>

                <div className="space-y-8">

                  {/* EMAIL */}

                  <div>
                    <p className="mb-3 text-[9px] tracking-[0.3em] text-white/40">
                      EMAIL
                    </p>

                    <a
                      href="mailto:helloaimanzhafly@gmail.com"
                      className="text-lg tracking-[-0.03em] transition hover:text-white/50 md:text-2xl"
                    >
                      helloaimanzhafly@gmail.com ↗
                    </a>
                  </div>

                  {/* INSTAGRAM */}

                  <div>
                    <p className="mb-3 text-[9px] tracking-[0.3em] text-white/40">
                      INSTAGRAM
                    </p>

                    <a
                      href="https://www.instagram.com/aimanzhafly/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg tracking-[-0.03em] transition hover:text-white/50 md:text-2xl"
                    >
                      @aimanzhafly ↗
                    </a>
                  </div>

                  {/* PHONE */}

                  <div>
                    <p className="mb-3 text-[9px] tracking-[0.3em] text-white/40">
                      PHONE
                    </p>

                    <a
                      href="https://wa.me/60143211565?text=Hi%20Aiman!%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                      className="text-lg tracking-[-0.03em] transition hover:text-white/50 md:text-2xl"
                    >
                      +6014-321 1565 ↗
                    </a>
                  </div>

                </div>

              </div>

            </Reveal>

          </div>

          {/* RIGHT: IMAGE */}

          <Reveal
            direction="right"
            delay={250}
            className="order-1 lg:order-2"
          >

            <div className="group relative overflow-hidden bg-neutral-900">

              <div className="aspect-[4/3] overflow-hidden md:aspect-[1.18/1]">

                <img
                  src="/hero-01.jpg"
                  alt="Selected creative work by Aiman Zhafly"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                />

              </div>

              {/* IMAGE OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 md:bottom-9 md:left-9 md:right-9">

                <p className="mb-3 text-[9px] tracking-[0.35em] text-white/60">
                  AVAILABLE FOR
                </p>

                <h2 className="max-w-md text-2xl font-medium leading-tight tracking-[-0.04em] md:text-4xl">
                  PHOTOGRAPHY
                  <br />
                  VIDEOGRAPHY
                  <br />
                  FILM CREW
                </h2>

              </div>

            </div>

            <div className="mt-4 flex items-center justify-between">

              <p className="text-[8px] tracking-[0.3em] text-white/40">
                CREATIVE COLLABORATIONS
              </p>

              <p className="text-[8px] tracking-[0.3em] text-white/40">
                AIMAN ZHAFLY
              </p>

            </div>

          </Reveal>

        </div>

      </section>

      {/* CLOSING STATEMENT */}

      <section className="border-t border-white/15 px-6 py-20 md:px-12 md:py-28">

        <Reveal>

          <p className="mb-8 text-[9px] tracking-[0.4em] text-white/40">
            LET'S MAKE IT HAPPEN
          </p>

          <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.07em] md:text-7xl lg:text-[7rem]">
            GOOD IDEAS
            <br />
            START WITH A
            <br />
            CONVERSATION.
          </h2>

          <div className="mt-12 flex items-center justify-between border-t border-white/25 pt-6">

            <p className="text-[9px] tracking-[0.25em] text-white/50">
              THANK YOU FOR STOPPING BY.
            </p>

            <a
              href="/"
              className="text-[9px] tracking-[0.3em] transition hover:text-white/50"
            >
              BACK TO HOME ↑
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
              <a href="/about">ABOUT</a>
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
