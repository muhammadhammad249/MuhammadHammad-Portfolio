import { trustProfiles } from '@/data/trustProfiles';

export default function TrustProfileLinks({ className = '' }: { className?: string }) {
  // Only render profiles that have non-empty URLs
  const activeProfiles = Object.values(trustProfiles).filter(
    (profile) => profile.url && profile.url.trim() !== ''
  );

  if (activeProfiles.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 text-[14px] text-gray-500 ${className}`}>
      <span className="font-[600] text-[#0f172a]">Find us on:</span>
      <div className="flex flex-wrap items-center gap-4">
        {activeProfiles.map((profile) => (
          <a
            key={profile.name}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-[600] text-[#0A66C2] hover:underline transition-colors"
          >
            {profile.label}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
