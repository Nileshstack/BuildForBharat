export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      aria-busy="true"
      className="mx-auto min-h-[65vh] max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="animate-pulse">
        <div className="h-3 w-36 rounded bg-navy/10" />
        <div className="mt-5 h-10 w-[min(90%,620px)] rounded bg-navy/10 sm:h-14" />
        <div className="mt-4 h-4 w-[min(85%,520px)] rounded bg-navy/8" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="h-48 rounded-lg border border-white/80 bg-white/50" />
          <div className="h-48 rounded-lg border border-white/80 bg-white/50" />
          <div className="h-48 rounded-lg border border-white/80 bg-white/50 sm:col-span-2" />
        </div>
      </div>
    </main>
  );
}
