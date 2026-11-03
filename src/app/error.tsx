"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto grid min-h-[80svh] max-w-[520px] content-center justify-items-start gap-6 px-5">
      <h1 className="text-head">Something went wrong</h1>
      <p>An unexpected error occurred. Please try again or contact me if the problem persists.</p>
      {error.digest && <p className="text-small text-muted">Error ID: {error.digest}</p>}
      <div className="flex flex-wrap items-center gap-6">
        <button type="button" onClick={reset} className="button cursor-pointer">
          Try again
        </button>
        <Link href="/" className="link">
          Go home
        </Link>
      </div>
    </main>
  );
}
