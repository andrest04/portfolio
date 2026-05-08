import Card from "@/components/ui/Card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card variant="solid" className="max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-strong text-3xl font-bold text-text-primary">
            404
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-text-primary">
          Page not found
        </h2>

        <p className="mt-3 text-sm text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-200 ease-out hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Go home
          </Link>
        </div>
      </Card>
    </div>
  );
}
