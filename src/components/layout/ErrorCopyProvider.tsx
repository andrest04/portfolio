"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/types/i18n";

const ErrorCopyContext = createContext<Dictionary["error"] | null>(null);

/**
 * error.tsx must be a client component, so it cannot await the dictionary. The root
 * layout hands it only the error strings, which keeps both dictionaries off the client.
 */
export function ErrorCopyProvider({
  copy,
  children,
}: {
  copy: Dictionary["error"];
  children: React.ReactNode;
}) {
  return <ErrorCopyContext.Provider value={copy}>{children}</ErrorCopyContext.Provider>;
}

export function useErrorCopy() {
  const copy = useContext(ErrorCopyContext);
  if (!copy) {
    throw new Error("useErrorCopy must be used below ErrorCopyProvider");
  }
  return copy;
}
