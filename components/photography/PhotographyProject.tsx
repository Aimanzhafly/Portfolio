
"use client";

import { useState } from "react";
import Link from "next/link";

type PhotographyProjectProps = {
  title: string;
  category: string;
  year: string;
  description: string;
  photos: string[];
  projectNumber: string;
};

export default function PhotographyProject({
  title,
  category,
  year,
  description,
  photos,
  projectNumber,
}: PhotographyProjectProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const galleryPhotos = photos.slice(1);

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const previousPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-black text-white">


{/* SHARED NAVIGATION */}
<header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
  <nav className="flex w-full max-w-[1100px] items-center justify-between rounded-full border border-white/10 bg-black/55 px-5 py-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/25 md:px-7">

    <Link href="/" aria-label="Aiman Zhafly home">
      <img
        src="/logo ATAS BAWAH.PNG"
        alt="Aiman Zhafly"
        className="w-[42px] md:w-[52px]"
      />
    </Link>

    <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] text-white md:gap-8 md:text-[10px] md:tracking-[0.28em]">
      <Link href="/work" className="transition-opacity duration-300 hover:opacity-50">
        WORK
      </Link>
      <Link href="/about" className="transition-opacity duration-300 hover:opacity-50">
        ABOUT
      </Link>
      <Link href="/contact" className="transition-opacity duration-300 hover:opacity-50">
        CONTACT
      </Link>
    </div>

  </nav>
</header>


      {/* SHARED CINEMATIC PROJECT COVER */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-neutral-950">

        {photos.length > 0 && (
          <img
            src={photos[0]}
            alt={`${title} campaign cover`}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />

        {/* BACK LINK */}
        <Link
          href="/work/photography"
          className="absolute left-6 top-28 z-20 text-[9px] tracking-[0.3em] text-white/80 transition hover:text-white md:left-10"
        >
          ← BACK TO PHOTOGRAPHY
        </Link>

        {/* TOP LABELS */}
        <div className="absolute left-6 right-6 top-40 z-10 flex items-center justify-between gap-4 md:left-10 md:right-10">
          <p className="text-[9px] tracking-[0.25em] md:text-xs">
            {title}
          </p>

          <p className="text-right text-[8px] tracking-[0.2em] md:text-[10px] md:tracking-[0.3em]">
            {category} · {year}
          </p>
        </div>

        {/* CENTRE PROJECT TITLE */}
        <div className="relative z-10 w-full px-5 text-center">
          <h1 className="mx-auto max-w-[95vw] text-[clamp(3.5rem,10vw,10rem)] font-medium italic leading-[0.85] tracking-[-0.075em]">
            {title}
          </h1>
        </div>

        {/* BOTTOM DETAILS */}
        <div className="absolute bottom-8 left-6 right-6 z-10 flex items-end justify-between gap-6 md:bottom-10 md:left-10 md:right-10">

          <div className="max-w-md">
            <div className="mb-4 h-px w-10 bg-white/80" />
            <p className="text-[8px] leading-[1.9] tracking-[0.15em] text-white/90 md:text-[10px] md:tracking-[0.2em]">
              {description}
            </p>
          </div>

          <p className="whitespace-nowrap text-[9px] tracking-[0.3em] md:text-[10px]">
            {title.split(" ")[0]} / {projectNumber}
          </p>

        </div>
      </section>

      {/* SHARED GALLERY HEADER */}
      <section className="flex items-center justify-between px-6 py-10 md:px-12 md:py-12">
        <div>
          <p className="text-[9px] tracking-[0.3em] text-white/40">
            PROJECT {projectNumber}
          </p>

          <h2 className="mt-2 text-2xl tracking-[-0.04em] md:text-3xl">
            SELECTED PHOTOGRAPHS
          </h2>
        </div>

        <p className="text-[9px] tracking-[0.2em] text-white/40">
          {photos.length} IMAGES
        </p>
      </section>

      {/* SHARED PHOTO GRID */}
      <section className="grid grid-cols-2 gap-3 px-4 pb-24 md:grid-cols-3 md:gap-5 md:px-12">
        {galleryPhotos.map((photo, index) => (
          <button
            key={photo}
            onClick={() => setSelectedPhoto(index + 1)}
            className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 text-left"
          >
            <img
              src={photo}
              alt={`${title} photograph ${index + 2}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.2em] text-white opacity-0 transition-opacity group-hover:opacity-100">
              IMAGE {String(index + 2).padStart(2, "0")}
            </span>
          </button>
        ))}
      </section>

      {/* SHARED LIGHTBOX */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">

          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-5 text-4xl text-white/70 hover:text-white"
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            onClick={previousPhoto}
            className="absolute left-3 z-10 p-3 text-4xl text-white/70 hover:text-white md:left-10"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={photos[selectedPhoto]}
            alt={`${title} photograph ${selectedPhoto + 1}`}
            className="max-h-[85vh] max-w-[85vw] object-contain"
          />

          <button
            onClick={nextPhoto}
            className="absolute right-3 z-10 p-3 text-4xl text-white/70 hover:text-white md:right-10"
            aria-label="Next photo"
          >
            ›
          </button>

          <p className="absolute bottom-5 text-[9px] tracking-[0.25em] text-white/50">
            {String(selectedPhoto + 1).padStart(2, "0")} / {photos.length}
          </p>
        </div>
      )}

      {/* SHARED FOOTER */}
      <footer className="border-t border-white/15 px-6 py-10 md:px-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] tracking-[0.35em] text-white/40">
              AIMAN ZHAFLY
            </p>
            <p className="mt-3 text-xl tracking-[-0.04em]">
              PHOTOGRAPHY ARCHIVE.
            </p>
          </div>

          <Link
            href="/work/photography"
            className="text-[9px] tracking-[0.25em] text-white/50 transition hover:text-white"
          >
            ← BACK TO PHOTOGRAPHY
          </Link>
        </div>

        <p className="mt-10 text-[8px] tracking-[0.25em] text-white/30">
          © 2026 AIMAN ZHAFLY. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </main>
  );
}
