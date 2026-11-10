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
    <main id="main" tabIndex={-1} className="fault tone--ochre">
      <h1>{t.title}</h1>
      <p>{t.body}</p>
      {error.digest && (
        <p className="label">
          {t.errorId} {error.digest}
        </p>
      )}
      <div className="fault__actions">
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
