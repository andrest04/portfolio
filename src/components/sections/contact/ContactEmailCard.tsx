"use client";

import { Mail, Check, Copy, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type ContactEmailCardProps = {
  email: string;
  label: string;
  isEs: boolean;
};

export default function ContactEmailCard({
  email,
  label,
  isEs,
}: ContactEmailCardProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Card className="group relative h-full gap-3 overflow-hidden rounded-lg border-border-default bg-surface-medium py-5 shadow-none transition-colors duration-200 hover:border-border-strong sm:py-6">
      <CardHeader className="px-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-primary/10 text-accent-primary">
            <Mail className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-text-primary">{label}</p>
        </div>
        <CardAction>
          <button
            onClick={() => copy(email)}
            className="cursor-pointer rounded-lg border border-border-default bg-surface-default p-2.5 min-h-11 min-w-11 flex items-center justify-center text-text-tertiary transition-all hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label={isEs ? "Copiar email" : "Copy email"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-5 sm:px-6">
        <p className="break-all text-sm text-text-secondary">{email}</p>

        {copied && (
          <p className="mt-2 text-xs font-medium text-green-400 animate-in fade-in duration-200">
            {isEs ? "¡Copiado al portapapeles!" : "Copied to clipboard!"}
          </p>
        )}
      </CardContent>

      <CardFooter className="px-5 sm:px-6">
        <Button asChild size="sm" className="rounded-md">
          <a href={`mailto:${email}`}>
            {isEs ? "Enviar email" : "Send email"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
