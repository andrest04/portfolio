"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useErrorCopy } from "@/components/layout/ErrorCopyProvider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useErrorCopy();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto grid min-h-[80svh] max-w-[520px] content-center justify-items-start gap-6 px-5">
      <h1 className="text-head">{t.title}</h1>
      <p>{t.body}</p>
      {error.digest && (
        <p className="text-small text-muted">
          {t.errorId} {error.digest}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-6">
        <button type="button" onClick={reset} className="button cursor-pointer">
          {t.retry}
        </button>
        <Link href="/" className="link">
          {t.home}
        </Link>
      </div>
    </main>
  );
}
