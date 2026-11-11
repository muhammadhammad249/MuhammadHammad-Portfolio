// Server Component — no "use client" needed
// Returns a styled icon card for each service based on its slug

type IconDef = {
  label: string;
  bg: string;
  iconColor: string;
  // Either svgPath (single) or svgPaths (multiple) for complex logos
  svgPaths: { d: string; fill?: string }[];
  viewBox?: string;
};

const iconMap: Record<string, IconDef> = {
  /* ——— CONTENT REMOVAL ——— */
  "tiktok-content-removal": {
    label: "TikTok",
    bg: "#010101",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.77 1.52V6.82a4.85 4.85 0 01-1-.13z" }],
  },
  "mugshot-removal-suppression": {
    label: "Mugshot",
    bg: "#1e3a8a",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M12 2a5 5 0 110 10A5 5 0 0112 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z" }],
  },
  "bbb-review-removal": {
    label: "BBB",
    bg: "#003087",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" }],
  },
  "facebook-review-removal": {
    label: "Facebook",
    bg: "#1877F2",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796V24C19.612 23.094 24 18.1 24 12.073z" }],
  },
  "instagram-content-removal": {
    label: "Instagram",
    bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 2.163c-3.259 0-3.667.014-4.947.072-3.453.163-4.869 1.61-5.032 5.032-.058 1.281-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.163 3.422 1.579 4.869 5.032 5.032 1.28.058 1.688.072 4.947.072 3.26 0 3.668-.014 4.948-.072 3.422-.163 4.869-1.61 5.032-5.032.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.163-3.422-1.61-4.869-5.032-5.032-1.28-.058-1.688-.072-4.948-.072zm0 3.838a6 6 0 100 12 6 6 0 000-12zm0 9.892a3.892 3.892 0 110-7.784 3.892 3.892 0 010 7.784zm6.406-10.843a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }],
  },
  "fake-review-removal": {
    label: "Reviews",
    bg: "#f59e0b",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }],
  },
  "travel-hospitality-review-removal": {
    label: "Travel",
    bg: "#0ea5e9",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" }],
  },
  "trustpilot-review-removal": {
    label: "Trustpilot",
    bg: "#00b67a",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }],
  },
  "ripoff-report-removal": {
    label: "Ripoff Report",
    bg: "#dc2626",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }],
  },
  "indeed-review-removal": {
    label: "Indeed",
    bg: "#2164f3",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-7h2v7zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" }],
  },
  "twitter-x-content-removal": {
    label: "X (Twitter)",
    bg: "#000000",
    iconColor: "#ffffff",
    svgPaths: [{ d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }],
  },
  "google-review-removal": {
    label: "Google",
    bg: "#ffffff",
    iconColor: "#4285F4",
    svgPaths: [
      { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" },
      { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" },
      { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", fill: "#FBBC05" },
      { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" },
    ],
  },

  /* ——— DATING REPUTATION ——— */
  "awdtsg-removal": { label: "AWDTSG", bg: "#e11d48", iconColor: "#ffffff", svgPaths: [{ d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }] },
  "awdtsg-checker-search": { label: "Search", bg: "#7c3aed", iconColor: "#ffffff", svgPaths: [{ d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }] },
  "image-protection": { label: "Image Protection", bg: "#0d9488", iconColor: "#ffffff", svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" }] },
  "social-media-takedowns": { label: "Social Takedowns", bg: "#ec4899", iconColor: "#ffffff", svgPaths: [{ d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" }] },
  "monitoring-packages": { label: "Monitoring", bg: "#0891b2", iconColor: "#ffffff", svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" }] },
  "dating-coach-support": { label: "Coach Support", bg: "#059669", iconColor: "#ffffff", svgPaths: [{ d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }] },
  "tea-app-checker-removal": { label: "Tea App", bg: "#7c3aed", iconColor: "#ffffff", svgPaths: [{ d: "M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3z" }] },

  /* ——— JOB REPUTATION ——— */
  "background-check-cleanup": { label: "Background Check", bg: "#1e3a8a", iconColor: "#ffffff", svgPaths: [{ d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" }] },
  "licensing-risk-removal": { label: "Licensing", bg: "#b45309", iconColor: "#ffffff", svgPaths: [{ d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" }] },
  "glassdoor-employer-review-cleanup": { label: "Glassdoor", bg: "#0caa41", iconColor: "#ffffff", svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 10-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 000-1.41c-.39-.39-1.03-.39-1.42 0z" }] },
  "linkedin-search-visibility-repair": { label: "LinkedIn", bg: "#0A66C2", iconColor: "#ffffff", svgPaths: [{ d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }] },
  "employer-response-reference-repair": { label: "Employment", bg: "#374151", iconColor: "#ffffff", svgPaths: [{ d: "M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.55 15.45 0 12.3 0 10.22 0 8.42 1.07 7.36 2.7L6 4.5 4.64 2.7C3.58 1.07 1.78 0-.3 0-3.45 0-6 2.55-6 5.7c0 .44.11.86.18 1.3H-8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" }] },

  /* ——— MONITORING & ALERTS ——— */
  "awdtsg-monitoring-scan-alerts": { label: "Scan Alerts", bg: "#dc2626", iconColor: "#ffffff", svgPaths: [{ d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" }] },
  "social-media-reputation-monitoring": { label: "Social Monitor", bg: "#6d28d9", iconColor: "#ffffff", svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" }] },
  "dark-web-data-leak-monitoring": { label: "Dark Web", bg: "#111827", iconColor: "#6d28d9", svgPaths: [{ d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" }] },
  "employer-workplace-risk-tracking": { label: "Workplace Risk", bg: "#0369a1", iconColor: "#ffffff", svgPaths: [{ d: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" }] },
  "monthly-snapshot-reports-reputation-logs": { label: "Reports", bg: "#15803d", iconColor: "#ffffff", svgPaths: [{ d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" }] },

  /* ——— REPUTATION MANAGEMENT ——— */
  "professionals": { label: "Professionals", bg: "#1e3a8a", iconColor: "#ffffff", svgPaths: [{ d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" }] },
  "public-figures": { label: "Public Figures", bg: "#7c2d12", iconColor: "#ffffff", svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" }] },
  "business-owners": { label: "Business", bg: "#1e3a8a", iconColor: "#ffffff", svgPaths: [{ d: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" }] },
  "reputation-management-packages": { label: "Packages", bg: "#0369a1", iconColor: "#ffffff", svgPaths: [{ d: "M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" }] },
  "search-cleanup": { label: "Search Cleanup", bg: "#4285F4", iconColor: "#ffffff", svgPaths: [{ d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }] },
  "website-creation": { label: "Website", bg: "#0f172a", iconColor: "#ffffff", svgPaths: [{ d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5H5v-2h10v2zm2-4H5v-2h12v2zm1-4H5V6h13v1.5z" }] },
  "website-creation-for-business-owners": { label: "Business Website", bg: "#1e3a8a", iconColor: "#ffffff", svgPaths: [{ d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5H5v-2h10v2zm2-4H5v-2h12v2zm1-4H5V6h13v1.5z" }] },
  "website-creation-for-professionals": { label: "Pro Website", bg: "#374151", iconColor: "#ffffff", svgPaths: [{ d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5H5v-2h10v2zm2-4H5v-2h12v2zm1-4H5V6h13v1.5z" }] },

  /* ——— SEARCH RESULT CLEANUP ——— */
  "google-suppression-de-indexing": { label: "Google", bg: "#ffffff", iconColor: "#4285F4", svgPaths: [{ d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }, { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }, { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", fill: "#FBBC05" }, { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }] },
  "wikipedia-page-creation": { label: "Wikipedia", bg: "#ffffff", iconColor: "#000000", svgPaths: [{ d: "M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.994-1.727.994-1.432 0-1.814-1.53-1.814-1.53L2.999 6.006s-.206-1.187.855-1.187c1.142 0 1.341 1.482 1.341 1.482l1.854 7.895 1.939-3.945c.244-.477.606-.799 1.021-.799.415 0 .81.322 1.054.8.244.477 1.999 3.989 1.999 3.989.5-2.001 1.125-4.513 1.434-5.729.309-1.216 1.019-1.482 1.572-1.482.684 0 1.243.494 1.243 1.482 0 .988-1.905 6.995-1.905 6.995s-.422 1.53-1.854 1.53c-.6 0-1.111-.08-1.727-.994z" }] },
  "autocomplete-fix": { label: "Autocomplete", bg: "#1a73e8", iconColor: "#ffffff", svgPaths: [{ d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }] },
  "news-article-removal": { label: "News", bg: "#374151", iconColor: "#ffffff", svgPaths: [{ d: "M22 3l-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 17H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" }] },
  "reddit-forum-result-cleanup": { label: "Reddit", bg: "#FF4500", iconColor: "#ffffff", svgPaths: [{ d: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .379-.257l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" }] },
  "youtube-video-result-suppression": { label: "YouTube", bg: "#FF0000", iconColor: "#ffffff", svgPaths: [{ d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }] },

  /* ——— REPUTATION AUDIT ——— */
  "google-business-profile-audit": { label: "Google Business", bg: "#ffffff", iconColor: "#4285F4", svgPaths: [{ d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }, { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }, { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", fill: "#FBBC05" }, { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }] },
  "personal-reputation-audit": { label: "Personal Audit", bg: "#1e3a8a", iconColor: "#ffffff", svgPaths: [{ d: "M12 2a5 5 0 110 10A5 5 0 0112 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z" }] },

  /* ——— INDUSTRIES ——— */
  "lawyers": { label: "Legal", bg: "#1e3a8a", iconColor: "#ffffff", svgPaths: [{ d: "M14 4v5h5l-5-5zM3 2h9l5 5v13a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2zm7 8H5v2h5v-2zm6 4H5v2h11v-2zm-3-8H5v2h8V6z" }] },
  "doctors-medical-practices": { label: "Medical", bg: "#dc2626", iconColor: "#ffffff", svgPaths: [{ d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }] },
  "dentists": { label: "Dental", bg: "#0284c7", iconColor: "#ffffff", svgPaths: [{ d: "M12 2a10 10 0 100 20A10 10 0 0012 2zm1 17.93V18h-2v1.93C7.06 17.7 4 15.08 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 3.08-3.06 5.7-7 7.93z" }] },
  "real-estate-agents": { label: "Real Estate", bg: "#15803d", iconColor: "#ffffff", svgPaths: [{ d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" }] },
  "restaurants-hospitality": { label: "Restaurant", bg: "#c2410c", iconColor: "#ffffff", svgPaths: [{ d: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" }] },
  "car-dealerships": { label: "Auto", bg: "#374151", iconColor: "#ffffff", svgPaths: [{ d: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5zm-2.5-1c.83 0 1.5-.67 1.5-1.5S17.33 13 16.5 13s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-9 0c.83 0 1.5-.67 1.5-1.5S8.33 13 7.5 13 6 13.67 6 14.5 6.67 16 7.5 16z" }] },
  "executives-hnw-individuals": { label: "Executive", bg: "#1e3a8a", iconColor: "#d9a52b", svgPaths: [{ d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" }] },
  "contractors-home-services": { label: "Contractor", bg: "#92400e", iconColor: "#ffffff", svgPaths: [{ d: "M13.5 2.5c0 1.5-1.5 3.5-1.5 3.5S10.5 4 10.5 2.5a1.5 1.5 0 013 0zM13.5 21h-3l-4-9h11l-4 9zM5.5 10H18l-1.5-3h-9.5L5.5 10z" }] },
  "financial-advisors-wealth-managers": { label: "Finance", bg: "#15803d", iconColor: "#ffffff", svgPaths: [{ d: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" }] },
  "plastic-surgeons-aesthetic-medicine": { label: "Aesthetic", bg: "#be185d", iconColor: "#ffffff", svgPaths: [{ d: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" }] },
};

// Default fallback icon
const defaultIcon: IconDef = {
  label: "Service",
  bg: "#1e3a8a",
  iconColor: "#ffffff",
  svgPaths: [{ d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" }],
};

export default function ServiceIcon({ slug, name }: { slug: string; name: string }) {
  const icon = iconMap[slug] ?? defaultIcon;

  return (
    <div className="
      flex items-center gap-4 p-4
      sm:flex-col sm:items-center sm:gap-0 sm:p-8
      bg-white rounded-2xl border border-[var(--border-light)]
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
    ">
      {/* Icon Box */}
      <div
        style={{
          background: icon.bg,
          borderRadius: "16px",
          flexShrink: 0,
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
        }}
        className="sm:w-[90px] sm:h-[90px] sm:mb-3 sm:rounded-[20px]"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 sm:w-12 sm:h-12"
          aria-hidden="true"
        >
          {icon.svgPaths.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill ?? icon.iconColor} />
          ))}
        </svg>
      </div>

      {/* Labels */}
      <div className="sm:text-center">
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px", color: "#111" }}>
          {icon.label}
        </p>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
          {name}
        </p>
      </div>
    </div>
  );
}
