import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="rounded-lg border-border-default bg-surface-default p-8 shadow-none">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-border-medium border-t-accent-secondary" />
          <p className="text-sm text-text-secondary">Loading...</p>
        </div>
      </Card>
    </div>
  );
}
