"use client";

import { useEffect } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";

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
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card variant="solid" className="max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-strong text-2xl">
            ⚠️
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-text-primary">
          Something went wrong
        </h2>

        <p className="mt-3 text-sm text-text-secondary">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>

        {error.digest && (
          <p className="mt-2 text-xs text-text-tertiary font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-200 ease-out hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-text-primary transition-colors duration-200 ease-out hover:border-white/30 hover:bg-white/5"
          >
            Go home
          </Link>
        </div>
      </Card>
    </div>
  );
}
