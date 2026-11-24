"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/base-path";

interface Props {
  src: string;
  poster: string;
  title: string;
  duration: string;
  captions?: string;
}

/** Shows only a poster until the visitor asks to play, so the video never loads by default. */
export function LazyVideo({ src, poster, title, duration, captions }: Props) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black">
      {playing ? (
        <video src={asset(src)} poster={asset(poster)} controls autoPlay playsInline preload="none" className="size-full" aria-label={title}>
          {captions && <track kind="captions" src={asset(captions)} srcLang="en" label="English" default />}
        </video>
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 text-left">
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover opacity-80 transition group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-noir-bg/90 via-noir-bg/20 to-transparent" />
          <span className="absolute bottom-5 left-5 flex items-center gap-4 sm:bottom-7 sm:left-7">
            <span className="grid size-14 place-items-center rounded-full bg-noir-saffron text-noir-on-accent shadow-lg transition group-hover:scale-105">
              <svg aria-hidden viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </span>
            <span>
              <span className="block font-semibold text-noir-text">{title}</span>
              <span className="block text-sm text-noir-muted">{duration} · plays here, loads only when you press play</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
