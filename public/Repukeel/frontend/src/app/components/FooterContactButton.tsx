import Link from 'next/link';

export default function FooterContactButton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/contact"
        className="bg-[var(--gold)] hover:bg-[#c19b2e] text-[#0a152e] font-[700] text-[15px] rounded-[12px] px-6 py-3.5 flex items-center gap-2 transition-colors whitespace-nowrap shadow-sm"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Contact Us Now
      </Link>

      <a
        href="mailto:Legal@Repukeel.com"
        className="bg-white/10 hover:bg-white/20 text-white font-[600] text-[14px] rounded-[12px] px-5 py-3.5 flex items-center gap-2 transition-colors whitespace-nowrap border border-white/10"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        Email / Gmail
      </a>
    </div>
  );
}
