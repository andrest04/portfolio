import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[80svh] max-w-[520px] content-center justify-items-start gap-6 px-5">
      <h1 className="text-head">Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="button">
        Go home
      </Link>
    </main>
  );
}
