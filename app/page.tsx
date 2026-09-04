export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-10">
        <div className="text-sm font-medium tracking-[0.25em]">
          AZ
        </div>

        <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-white/60">
          <a href="#work" className="transition hover:text-white">
            Work
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[85vh] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/50">
          Photographer · Videographer · Filmmaker
        </p>

        <h1 className="max-w-6xl text-[15vw] font-medium leading-[0.8] tracking-[-0.06em] md:text-[11vw]">
          AIMAN
          <br />
          ZHAFLY
        </h1>

        <div className="mt-10 flex max-w-xl justify-between text-sm text-white/50">
          <p>
            Visual storyteller
            <br />
            based in Malaysia.
          </p>

          <p className="text-right">
            2026
            <br />
            Selected Works
          </p>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="text-4xl tracking-tight md:text-6xl">
            Selected Work
          </h2>

          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            01 — 04
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Project title="Automotive" number="01" />
          <Project title="Commercial" number="02" />
          <Project title="Photography" number="03" />
          <Project title="Events" number="04" />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="grid gap-12 md:grid-cols-2">
          <h2 className="text-4xl tracking-tight md:text-6xl">
            About
          </h2>

          <div className="max-w-xl text-lg leading-relaxed text-white/60">
            <p>
              Aiman Zhafly is a photographer, videographer and
              filmmaker based in Malaysia, working across commercial
              productions, automotive, events and visual storytelling.
            </p>

            <p className="mt-6">
              Currently developing his craft with a focus on
              cinematography and becoming a Director of Photography.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/40">
          Get in touch
        </p>

        <a
          href="mailto:your@email.com"
          className="break-all text-[9vw] font-medium leading-none tracking-[-0.05em] transition hover:text-white/50"
        >
          LET&apos;S TALK
        </a>

        <div className="mt-16 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/40">
          © 2026 Aiman Zhafly
        </div>
      </section>
    </main>
  );
}

function Project({
  title,
  number,
}: {
  title: string;
  number: string;
}) {
  return (
    <a
      href="#"
      className="group relative flex aspect-[4/3] items-end overflow-hidden bg-zinc-900 p-6 transition md:p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex w-full items-end justify-between">
        <h3 className="text-3xl tracking-tight md:text-4xl">
          {title}
        </h3>

        <span className="text-xs text-white/50">
          {number}
        </span>
      </div>
    </a>
  );
}