"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[boonbuyfinds] route error", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
        Something went wrong
      </p>
      <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
        This page hit a temporary error
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        You can try again, or go back to the homepage and keep browsing finds.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-black text-white hover:bg-accent-hover"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold text-foreground hover:border-accent/40 hover:text-accent"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
