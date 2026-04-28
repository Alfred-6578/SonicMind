import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center bg-background px-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl font-bold tracking-tight text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center h-10 px-4 rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors text-sm font-medium"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
