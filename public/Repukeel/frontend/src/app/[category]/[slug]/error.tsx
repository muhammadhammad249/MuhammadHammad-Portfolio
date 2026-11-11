"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h2 className="text-2xl font-bold text-[#0a152e] mb-4">
        Something went wrong loading this page
      </h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-[#1e3a8a] text-white font-bold px-6 py-3 rounded"
      >
        Try again
      </button>
    </main>
  );
}
