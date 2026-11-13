
"use client";

import { useEffect, useRef, useState } from "react";

type Slide =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

const slides: Slide[] = [
  { type: "image", src: "/hero-01.jpg" },
  { type: "image", src: "/hero-03.jpg" },
  { type: "image", src: "/hero-02.jpg" },
  { type: "video", src: "/hero-video-01.mp4" },
  { type: "video", src: "/hero-video-02.mp4" },
];

const categories = [
  {
    number: "01",
    title: "PHOTOGRAPHY",
    subtitle: "AUTOMOTIVE · LIFESTYLE · PORTRAIT",
    image: "/hero-01.jpg",
    href: "/work#photography",
  },
  {
    number: "02",
    title: "VIDEOGRAPHY",
    subtitle: "COMMERCIAL · AUTOMOTIVE · TRAVEL",
    image: "/hero-02.jpg",
    href: "/work#videography",
  },
  {
    number: "03",
    title: "FILMMAKING",
    subtitle: "SHORT FILM · DOCUMENTARY · BRAND FILM",
    image: "/hero-03.jpg",
    href: "/work#filmmaking",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [workProgress, setWorkProgress] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const slide = slides[current];

  // HEADER SHOW / HIDE
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // WORK SCROLL PROGRESS
  useEffect(() => {
    const updateProgress = () => {
      if (!workRef.current) return;

      const rect = workRef.current.getBoundingClientRect();
      const total = workRef.current.offsetHeight - window.innerHeight;

      if (total <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setWorkProgress(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // ABOUT AND CONTACT REVEALS
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === aboutRef.current) {
            setAboutVisible(entry.isIntersecting);
          }

          if (entry.target === contactRef.current) {
            setContactVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  // HERO IMAGE TIMER
  useEffect(() => {
    if (slide.type !== "image") return;

    const timer = window.setTimeout(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [current, slide.type]);

  // RESET VIDEO SOUND WHEN CHANGING SLIDES
  useEffect(() => {
    setIsMuted(true);

    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, [current]);

  const nextSlide = () => {
    setCurrent((previous) => (previous + 1) % slides.length);
  };

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) return;

    const nextMuted = !isMuted;

    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      try {
        await video.play();
      } catch {
        setIsMuted(true);
        video.muted = true;
      }
    }
  };

  // WORK ANIMATION VALUES
  const introOpacity =
    workProgress < 0.38
      ? 1
      : Math.max(0, 1 - (workProgress - 0.38) * 5);

  const introY = workProgress < 0.38 ? workProgress * -35 : -50;

  const carOpacity =
    workProgress < 0.15
      ? 0
      : workProgress < 0.6
        ? Math.min(1, (workProgress - 0.15) * 5)
        : Math.max(0, 1 - (workProgress - 0.6) * 9);

  const carScale =
    workProgress < 0.66 ? 0.82 + workProgress * 0.3 : 1.04;

  const carLabelOpacity =
    workProgress > 0.32 && workProgress < 0.68 ? 1 : 0;

  const blackTransition =
    workProgress < 0.64
      ? 0
      : Math.min(1, (workProgress - 0.64) * 9);

  const cardsOpacity =
    workProgress < 0.74
      ? 0
      : Math.min(1, (workProgress - 0.74) * 5);

  return (
    <main className="scroll-smooth overflow-x-clip bg-black text-white">

      {/* FLOATING HEADER */}
      <header
        className={`fixed left-1/2 top-4 z-50 w-[calc(100%-32px)] max-w-[1100px] -translate-x-1/2 transition-all duration-500 ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-5 py-3 shadow-2xl backdrop-blur-xl md:px-7">
          <a href="#home" aria-label="Aiman Zhafly home">
            <img
              src="/logo ATAS BAWAH.PNG"
              alt="Aiman Zhafly"
              className="w-[42px] md:w-[52px]"
            />
          </a>

          <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] text-white md:gap-8 md:text-[10px] md:tracking-[0.28em]">
            <a href="/work" className="transition-opacity hover:opacity-50">
              WORK
            </a>
            <a href="/about" className="transition-opacity hover:opacity-50">
              ABOUT
            </a>
            <a href="/contact" className="transition-opacity hover:opacity-50">
              CONTACT
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative h-[100svh] min-h-[650px] overflow-hidden bg-black"
      >
        <div className="absolute inset-0">
          {slide.type === "image" ? (
            <img
              key={slide.src}
              src={slide.src}
              alt="Aiman Zhafly selected visual work"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              key={slide.src}
              src={slide.src}
              autoPlay
              muted={isMuted}
              playsInline
              preload="metadata"
              onEnded={nextSlide}
              className={
                slide.src.includes("01")
                  ? "absolute left-1/2 top-1/2 h-[100vw] w-[100vh] max-h-none max-w-none -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] object-cover"
                  : "h-full w-full object-cover"
              }
            />
          )}
        </div>

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black/50 to-transparent" />

        {/* HERO CONTENT */}
        <div className="absolute bottom-28 left-6 z-10 max-w-3xl md:bottom-24 md:left-10">
          <p className="mb-5 text-[9px] tracking-[0.3em] text-white/70 md:text-xs md:tracking-[0.4em]">
            PHOTOGRAPHER · VIDEOGRAPHER · FILM CREW
          </p>

          <img
            src="/logo wide.PNG"
            alt="Aiman Zhafly"
            className="w-[260px] md:w-[500px]"
          />

          <p className="mt-5 max-w-xl text-xs leading-6 text-white/60 md:mt-6 md:text-base">
            Visual storyteller working across photography,
            film and commercial production.
          </p>
        </div>

        {/* SLIDE INDICATORS */}
        <div className="absolute bottom-8 left-6 z-20 flex gap-2 md:bottom-10 md:left-10">
          {slides.map((item, index) => (
            <button
              key={item.src}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              className={`h-[2px] transition-all duration-500 ${
                index === current ? "w-12 bg-white" : "w-6 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] tracking-[0.35em] text-white/50 md:flex">
          <span>SCROLL</span>
          <span className="h-10 w-px bg-white/30" />
        </div>

        {/* HERO CONTROLS */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2 md:bottom-8 md:right-10 md:gap-3">
          {slide.type === "video" && (
            <button
              onClick={toggleSound}
              className="border border-white/25 px-3 py-3 text-[8px] tracking-[0.2em] transition hover:bg-white hover:text-black md:px-5 md:text-[9px]"
            >
              SOUND {isMuted ? "OFF" : "ON"}
            </button>
          )}

          <button
            onClick={nextSlide}
            className="border border-white/25 px-4 py-3 text-[8px] tracking-[0.2em] transition hover:bg-white hover:text-black md:px-5 md:text-[9px]"
          >
            NEXT →
          </button>
        </div>
      </section>

      {/* WORK */}
      <section
        id="work"
        ref={workRef}
        className="relative h-[260vh] bg-black"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">

          {/* WORK INTRO */}
          <div
            className="absolute inset-0 z-30 flex items-center px-6 md:px-10"
            style={{
              opacity: introOpacity,
              transform: `translateY(${introY}px)`,
            }}
          >
            <div className="w-full">
              <div className="mb-9 flex items-center gap-4 text-[10px] tracking-[0.4em] text-white/40">
                <span className="h-px w-12 bg-white/30" />
                <span>01 / WORK</span>
              </div>

              <p
                className="mb-7 text-[10px] tracking-[0.5em] text-white/40"
                style={{
                  opacity: workProgress < 0.06 ? workProgress / 0.06 : 1,
                }}
              >
                AIMAN ZHAFLY
              </p>

              {["MY", "PAST", "WORK"].map((word, index) => (
                <div key={word} className="overflow-hidden">
                  <h2
                    className="text-[17vw] font-medium leading-[0.72] tracking-[-0.075em]"
                    style={{
                      opacity: workProgress < 0.04 + index * 0.04 ? 0 : 1,
                      transform:
                        workProgress < 0.04 + index * 0.04
                          ? "translateY(110%)"
                          : "translateY(0)",
                      transition:
                        "transform 700ms cubic-bezier(.22,1,.36,1), opacity 500ms ease",
                    }}
                  >
                    {word}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {/* AUTOMOTIVE IMAGE */}
          <div
            className="absolute inset-0 z-10"
            style={{
              opacity: carOpacity,
              transform: `scale(${carScale})`,
            }}
          >
            <img
              src="/hero-01.jpg"
              alt="Automotive photography"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black/45 to-transparent" />
          </div>

          {/* AUTOMOTIVE LABEL */}
          <div
            className="absolute bottom-14 left-6 z-30 md:left-10"
            style={{
              opacity: carLabelOpacity,
              transform: carLabelOpacity > 0 ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 500ms ease, transform 700ms ease",
            }}
          >
            <p className="text-[9px] tracking-[0.4em] text-white/50">
              SELECTED WORK
            </p>
            <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-5xl">
              AUTOMOTIVE
            </h3>
          </div>

          {/* BLACK TRANSITION */}
          <div
            className="pointer-events-none absolute inset-0 z-[35] bg-black"
            style={{ opacity: blackTransition }}
          />

          {/* CATEGORY CARDS */}
          <div
            className="absolute inset-0 z-40 flex items-center justify-center bg-black px-6 py-16 md:px-10"
            style={{
              opacity: cardsOpacity,
              transform: `translateY(${workProgress < 0.74 ? 60 : 0}px)`,
              pointerEvents: workProgress > 0.84 ? "auto" : "none",
            }}
          >
            <div className="flex w-full max-w-[1500px] gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
              {categories.map((category, index) => {
                const start = 0.74 + index * 0.045;
                const progress = Math.min(
                  1,
                  Math.max(0, (workProgress - start) * 7)
                );

                return (
                  <a
                    key={category.title}
                    href={category.href}
                    className="group relative block min-w-[78vw] overflow-hidden border border-white/15 bg-black md:min-w-0"
                    style={{
                      opacity: progress,
                      transform: `translateY(${(1 - progress) * 80}px) scale(${0.96 + progress * 0.04})`,
                    }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/5]">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/20 transition duration-700 group-hover:bg-black/40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />

                      <div className="absolute left-5 top-5 text-[9px] tracking-[0.35em] text-white/60 md:left-6 md:top-6">
                        {category.number}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                        <p className="mb-3 text-[7px] tracking-[0.2em] text-white/50 md:text-[8px] md:tracking-[0.3em]">
                          {category.subtitle}
                        </p>

                        <h3 className="text-xl font-medium tracking-[-0.04em] md:text-3xl">
                          {category.title}
                        </h3>

                        <div className="mt-5 flex items-center justify-between md:mt-6">
                          <span className="text-[8px] tracking-[0.35em] text-white/60">
                            VIEW MORE
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm transition duration-500 group-hover:bg-white group-hover:text-black md:h-10 md:w-10">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* SCROLL INDICATOR */}
          <div
            className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-[8px] tracking-[0.4em] text-white/30"
            style={{ opacity: workProgress > 0.85 ? 0 : 1 }}
          >
            KEEP SCROLLING
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={aboutRef}
        className="relative overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-[1500px]">

          {/* SECTION LABEL */}
          <div
            className={`flex items-center gap-4 text-[10px] tracking-[0.4em] text-white transition-all duration-700 ${
              aboutVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <span className="h-px w-10 bg-white/30" />
            <span>02 / ABOUT</span>
          </div>

          {/* MAIN ABOUT LAYOUT */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[500px_375px_minmax(0,1fr)] lg:gap-x-[40px]">

            {/* TITLE */}
            <div>
              <h2
                className={`text-[13vw] font-medium leading-[0.72] tracking-[-0.08em] text-white transition-all duration-1000 md:text-[8vw] lg:text-[5.5rem] ${
                  aboutVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-24 opacity-0"
                }`}
              >
                BEHIND
                <br />
                THE
                <br />
                FRAME.
              </h2>

              <div
                className={`mt-8 border-l border-white/20 pl-4 transition-all delay-300 duration-700 ${
                  aboutVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <p className="text-[9px] leading-5 tracking-[0.25em] text-white">
                  THE PERSON
                  <br />
                  BEHIND THE
                  <br />
                  CAMERA.
                </p>
              </div>
            </div>

            {/* PORTRAIT */}
            <div
              className={`transition-all delay-150 duration-1000 ${
                aboutVisible
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-16 scale-[1.04] opacity-0"
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/hero-03.jpg"
                  alt="Aiman Zhafly"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* STORY */}
            <div
              className={`flex flex-col justify-center transition-all delay-300 duration-700 ${
                aboutVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-[9px] tracking-[0.4em] text-white">
                AIMAN ZHAFLY
              </p>

              <p className="mt-3 text-[9px] leading-5 tracking-[0.25em] text-white">
                PHOTOGRAPHER
                <br />
                VIDEOGRAPHER
                <br />
                FILM CREW
              </p>

              <h3 className="mt-10 text-3xl font-medium leading-[0.95] tracking-[-0.05em] text-white md:text-4xl">
                I CREATE IMAGES
                <br />
                WITH PURPOSE.
              </h3>

              <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-white/70">
                <p>
                  Working across photography, videography and filmmaking,
                  I&apos;m interested in the space between technical execution
                  and visual storytelling.
                </p>

                <p>
                  From commercial productions and automotive culture to
                  personal creative work, I approach every project with one
                  goal — make something people remember.
                </p>
              </div>
            </div>
          </div>

          {/* DISCIPLINES */}
          <div
            className={`mt-12 border-t border-white/10 transition-all delay-500 duration-700 ${
              aboutVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid md:grid-cols-3">

              <div className="border-b border-white/10 py-5 md:border-b-0 md:border-r md:pr-8">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.35em] text-white/50">01</span>
                  <span className="text-[9px] tracking-[0.25em] text-white">PHOTOGRAPHY</span>
                </div>
                <p className="mt-2 text-[10px] text-white/60">
                  Automotive · Lifestyle · Portrait
                </p>
              </div>

              <div className="border-b border-white/10 py-5 md:border-b-0 md:border-r md:px-8">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.35em] text-white/50">02</span>
                  <span className="text-[9px] tracking-[0.25em] text-white">VIDEOGRAPHY</span>
                </div>
                <p className="mt-2 text-[10px] text-white/60">
                  Commercial · Automotive · Travel
                </p>
              </div>

              <div className="py-5 md:pl-8">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.35em] text-white/50">03</span>
                  <span className="text-[9px] tracking-[0.25em] text-white">FILMMAKING</span>
                </div>
                <p className="mt-2 text-[10px] text-white/60">
                  Short Film · Documentary · Brand Film
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        ref={contactRef}
        className="relative min-h-screen overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1600px]">

          {/* SECTION LABEL */}
          <div
            className={`flex items-center gap-4 text-[10px] tracking-[0.4em] text-white transition-all duration-700 ${
              contactVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <span className="h-px w-10 bg-white/30" />
            <span>03 / CONTACT</span>
          </div>

          {/* CONTACT GRID */}
          <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">

            {/* LEFT */}
            <div>
              <h2
                className={`text-[16vw] font-medium leading-[0.75] tracking-[-0.07em] transition-all duration-1000 md:text-[11vw] lg:text-[6rem] ${
                  contactVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-16 opacity-0"
                }`}
              >
                LET&apos;S
                <br />
                CREATE.
              </h2>

              <div
                className={`mt-12 transition-all delay-300 duration-700 ${
                  contactVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <p className="text-[10px] tracking-[0.35em] text-white">
                  HAVE A PROJECT IN MIND?
                </p>

                <p className="mt-4 max-w-xl text-base leading-7 text-white/70 md:text-lg">
                  Let&apos;s create something meaningful, cinematic and worth
                  remembering.
                </p>
              </div>

              {/* CONTACT DETAILS */}
              <div
                className={`mt-10 grid gap-7 transition-all delay-500 duration-700 sm:grid-cols-2 ${
                  contactVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div>
                  <p className="text-[8px] tracking-[0.4em] text-white/50">
                    EMAIL
                  </p>
                  <p className="mt-2 text-sm tracking-[0.08em] text-white/70">
                    YOURNAME@GMAIL.COM
                  </p>
                  <p className="mt-2 text-[8px] tracking-[0.15em] text-white/30">
                    EMAIL ADDRESS TO BE UPDATED
                  </p>
                </div>

                <div>
                  <p className="text-[8px] tracking-[0.4em] text-white/50">
                    INSTAGRAM
                  </p>
                  <a
                    href="https://www.instagram.com/aimanzhafly/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm tracking-[0.08em] text-white transition hover:opacity-50"
                  >
                    @AIMANZHAFLY ↗
                  </a>
                </div>

                <div>
                  <p className="text-[8px] tracking-[0.4em] text-white/50">
                    WHATSAPP
                  </p>
                  <a
                    href="https://wa.me/60143211565?text=Hi%20Aiman!%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm tracking-[0.08em] text-white transition hover:opacity-50"
                  >
                    014 321 1565 ↗
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`transition-all delay-200 duration-1000 ${
                contactVisible
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-16 scale-[1.04] opacity-0"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-[1.18/1]">
                <img
                  src="/hero-01.jpg"
                  alt="Automotive photography by Aiman Zhafly"
                  className="h-full w-full object-cover transition duration-1000 hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <p className="text-[8px] tracking-[0.4em] text-white/60">
                    AVAILABLE FOR
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.18em] text-white">
                    PHOTOGRAPHY · VIDEOGRAPHY · FILM CREW
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 text-[9px] tracking-[0.25em] text-white/30 md:flex-row">
          <span>© {new Date().getFullYear()} AIMAN ZHAFLY</span>
          <span>PHOTOGRAPHER · VIDEOGRAPHER · FILM CREW</span>
        </div>
      </footer>
    </main>
  );
}
