export interface ServiceCtaConfig {
  ctaText: string;
  modalTitle: string;
  modalSubtitle: string;
  inputPlaceholder?: string;
}

export const SERVICE_CTA_CONFIG: Record<string, ServiceCtaConfig> = {
  // ==========================================
  // 1. Content Removal
  // ==========================================
  "tiktok-content-removal": {
    ctaText: "Get TikTok Posts Removed",
    modalTitle: "Request TikTok Content Removal",
    modalSubtitle: "Submit the TikTok video, clip, or profile URL for fast takedown.",
    inputPlaceholder: "https://www.tiktok.com/@username/video/..."
  },
  "mugshot-removal-suppression": {
    ctaText: "Get Mugshots Removed & Suppressed",
    modalTitle: "Request Mugshot Removal & Suppression",
    modalSubtitle: "Provide the link to the arrest record or mugshot listing for evaluation.",
    inputPlaceholder: "Link to mugshot or publication page"
  },
  "bbb-review-removal": {
    ctaText: "Get BBB Complaints Removed",
    modalTitle: "Request BBB Complaint Removal",
    modalSubtitle: "Provide your BBB listing or complaint URL to initiate dispute escalation.",
    inputPlaceholder: "Link to BBB complaint or business profile"
  },
  "facebook-review-removal": {
    ctaText: "Get Facebook Reviews Removed",
    modalTitle: "Request Facebook Review Removal",
    modalSubtitle: "Provide the link to the offending Facebook review or page for swift removal.",
    inputPlaceholder: "https://www.facebook.com/..."
  },
  "instagram-content-removal": {
    ctaText: "Get Instagram Posts Removed",
    modalTitle: "Request Instagram Content Removal",
    modalSubtitle: "Submit the Instagram post, story, reel, or impersonator profile link.",
    inputPlaceholder: "https://www.instagram.com/p/..."
  },
  "fake-review-removal": {
    ctaText: "Get Fake Reviews Removed",
    modalTitle: "Request Fake Review Removal",
    modalSubtitle: "Provide the link to the fraudulent review or profile hurting your business.",
    inputPlaceholder: "Link to the fake review or listing"
  },
  "travel-hospitality-review-removal": {
    ctaText: "Get Hospitality Reviews Removed",
    modalTitle: "Request Travel & Hospitality Review Removal",
    modalSubtitle: "Submit the TripAdvisor, Booking, or OTA review URL for removal review.",
    inputPlaceholder: "Link to TripAdvisor / Booking review"
  },
  "trustpilot-review-removal": {
    ctaText: "Get Trustpilot Reviews Removed",
    modalTitle: "Request Trustpilot Review Removal",
    modalSubtitle: "Provide the Trustpilot review URL or business profile link.",
    inputPlaceholder: "https://www.trustpilot.com/review/..."
  },
  "ripoff-report-removal": {
    ctaText: "Get Ripoff Reports Removed",
    modalTitle: "Request Ripoff Report Removal",
    modalSubtitle: "Submit the Ripoff Report URL to initiate de-indexing and takedown.",
    inputPlaceholder: "https://www.ripoffreport.com/reports/..."
  },
  "indeed-review-removal": {
    ctaText: "Get Indeed Reviews Removed",
    modalTitle: "Request Indeed Review Removal",
    modalSubtitle: "Submit the malicious Indeed employer review link for removal.",
    inputPlaceholder: "https://www.indeed.com/cmp/..."
  },
  "twitter-x-content-removal": {
    ctaText: "Get Twitter / X Posts Removed",
    modalTitle: "Request Twitter / X Post Removal",
    modalSubtitle: "Provide the link to the defamatory tweet, media, or impersonating account.",
    inputPlaceholder: "https://x.com/username/status/..."
  },
  "google-review-removal": {
    ctaText: "Get Google Reviews Removed",
    modalTitle: "Request Google Review Removal",
    modalSubtitle: "Provide your Google Maps or Business Profile link and the target review details.",
    inputPlaceholder: "Link to Google Maps review or business listing"
  },

  // ==========================================
  // 2. Dating Reputation
  // ==========================================
  "awdtsg-removal": {
    ctaText: "Get AWDTSG Posts Removed",
    modalTitle: "Request AWDTSG Post Removal",
    modalSubtitle: "Provide any screenshots, group names, or post links for private takedown.",
    inputPlaceholder: "Group name, city, or post details"
  },
  "awdtsg-checker-search": {
    ctaText: "Check AWDTSG Groups Now",
    modalTitle: "Request Confidential AWDTSG Search",
    modalSubtitle: "Enter your name and city to check if your photos or details are posted.",
    inputPlaceholder: "Your full name, city, and dating profile details"
  },
  "image-protection": {
    ctaText: "Protect & Takedown Stolen Images",
    modalTitle: "Request Image Protection & Takedown",
    modalSubtitle: "Provide links to your original photos and where they are being abused.",
    inputPlaceholder: "Link to unauthorized photos or image URLs"
  },
  "social-media-takedowns": {
    ctaText: "Get Unauthorized Posts Removed",
    modalTitle: "Request Social Media Takedown",
    modalSubtitle: "Submit links to unauthorized posts or impersonation profiles.",
    inputPlaceholder: "Link to unauthorized post or account"
  },
  "monitoring-packages": {
    ctaText: "Start Reputation Monitoring",
    modalTitle: "Enroll in Monitoring Protection",
    modalSubtitle: "Tell us what names or profiles you want 24/7 proactive monitoring on.",
    inputPlaceholder: "Names, keywords, or profiles to monitor"
  },
  "dating-coach-support": {
    ctaText: "Get Dating Profile Support",
    modalTitle: "Book Dating Reputation Advisory",
    modalSubtitle: "Connect with our advisory team to rebuild your profile and online trust.",
    inputPlaceholder: "Your dating app profile link or concern"
  },
  "tea-app-checker-removal": {
    ctaText: "Check & Remove Tea App Posts",
    modalTitle: "Request Tea App Check & Removal",
    modalSubtitle: "Submit your details or screenshots to identify and scrub Tea App leaks.",
    inputPlaceholder: "Tea App username, screenshots, or details"
  },

  // ==========================================
  // 3. Job Reputation
  // ==========================================
  "background-check-cleanup": {
    ctaText: "Clean Up Background Check Records",
    modalTitle: "Request Background Check Cleanup",
    modalSubtitle: "Provide details on inaccurate records or search results affecting employment.",
    inputPlaceholder: "Link to search result, database, or record"
  },
  "licensing-risk-removal": {
    ctaText: "Protect Professional License",
    modalTitle: "Request Licensing Risk Cleanup",
    modalSubtitle: "Submit links or records threatening your state or professional board standing.",
    inputPlaceholder: "Link to board complaint, record, or article"
  },
  "glassdoor-employer-review-cleanup": {
    ctaText: "Get Glassdoor Reviews Removed",
    modalTitle: "Request Glassdoor Review Removal",
    modalSubtitle: "Provide links to policy-violating Glassdoor reviews hurting your hiring.",
    inputPlaceholder: "https://www.glassdoor.com/Reviews/..."
  },
  "linkedin-search-visibility-repair": {
    ctaText: "Repair Search & LinkedIn Visibility",
    modalTitle: "Request Visibility Repair",
    modalSubtitle: "Tell us what negative results appear when employers search your name.",
    inputPlaceholder: "Your LinkedIn URL or search queries showing issues"
  },
  "employer-response-reference-repair": {
    ctaText: "Repair Employer References",
    modalTitle: "Request Reference Repair Strategy",
    modalSubtitle: "Submit details about harmful employer feedback or public reference issues.",
    inputPlaceholder: "Details or links regarding negative references"
  },

  // ==========================================
  // 4. Monitoring & Alerts
  // ==========================================
  "awdtsg-monitoring-scan-alerts": {
    ctaText: "Start AWDTSG Alert Monitoring",
    modalTitle: "Activate AWDTSG Monitoring",
    modalSubtitle: "Set up real-time surveillance across local dating groups and forums.",
    inputPlaceholder: "Your name, city, and target groups"
  },
  "social-media-reputation-monitoring": {
    ctaText: "Start Social Media Monitoring",
    modalTitle: "Activate Social Media Monitoring",
    modalSubtitle: "Monitor brand mentions, competitor smear campaigns, and viral threats.",
    inputPlaceholder: "Brand name, social handles, or website"
  },
  "dark-web-data-leak-monitoring": {
    ctaText: "Scan Dark Web & Data Leaks",
    modalTitle: "Request Dark Web Leak Scan",
    modalSubtitle: "Scan compromised databases for exposed credentials, emails, and personal info.",
    inputPlaceholder: "Email address or domain to scan"
  },
  "employer-workplace-risk-tracking": {
    ctaText: "Track Workplace Reputation Risks",
    modalTitle: "Activate Workplace Risk Tracking",
    modalSubtitle: "Track employer review sites and whistle-blower boards before issues escalate.",
    inputPlaceholder: "Company name, Glassdoor/Indeed profile link"
  },
  "monthly-snapshot-reports-reputation-logs": {
    ctaText: "Get Monthly Reputation Reports",
    modalTitle: "Request Monthly Reporting Plan",
    modalSubtitle: "Receive comprehensive monthly sentiment audits, rank tracking, and incident logs.",
    inputPlaceholder: "Company or personal brand name"
  },

  // ==========================================
  // 5. Reputation Management
  // ==========================================
  "professionals": {
    ctaText: "Protect Professional Reputation",
    modalTitle: "Request Professional Reputation Defense",
    modalSubtitle: "Tell us about negative search results or smear content hurting your career.",
    inputPlaceholder: "Link to damaging search result or article"
  },
  "public-figures": {
    ctaText: "Protect Public Figure Brand",
    modalTitle: "Consult on Public Figure Brand Defense",
    modalSubtitle: "Confidential crisis management and reputation defense for high-visibility individuals.",
    inputPlaceholder: "Link to smear campaign, defamatory page, or Wikipedia"
  },
  "business-owners": {
    ctaText: "Protect Business Reputation",
    modalTitle: "Request Business Reputation Defense",
    modalSubtitle: "Safeguard your company revenue, online ratings, and customer trust.",
    inputPlaceholder: "Company website or negative search result"
  },
  "reputation-management-packages": {
    ctaText: "Choose a Reputation Package",
    modalTitle: "Explore Management Packages",
    modalSubtitle: "Get a tailored proposal covering removal, suppression, and positive brand building.",
    inputPlaceholder: "Brand name or overview of issues"
  },
  "search-cleanup": {
    ctaText: "Clean Up Google Search Results",
    modalTitle: "Request Google Search Cleanup",
    modalSubtitle: "Submit the negative links ranking on Google Page 1 for removal or suppression.",
    inputPlaceholder: "Negative URL ranking on Google search"
  },
  "website-creation": {
    ctaText: "Build Branded Authority Website",
    modalTitle: "Request Custom Website Build",
    modalSubtitle: "Launch high-ranking, SEO-optimized personal or corporate sites to control Google Page 1.",
    inputPlaceholder: "Target search query or desired domain name"
  },
  "website-creation-for-business-owners": {
    ctaText: "Build Business Authority Website",
    modalTitle: "Request Business Website Solution",
    modalSubtitle: "Establish trusted online web assets that rank above competitor complaints.",
    inputPlaceholder: "Business name or current website"
  },
  "website-creation-for-professionals": {
    ctaText: "Build Professional Authority Profile",
    modalTitle: "Request Professional Portfolio Site",
    modalSubtitle: "Create an authoritative personal portfolio that dominates your branded search queries.",
    inputPlaceholder: "Professional name and industry"
  },

  // ==========================================
  // 6. Search Result Cleanup
  // ==========================================
  "google-suppression-de-indexing": {
    ctaText: "De-Index Harmful Google Results",
    modalTitle: "Request Google De-Indexing & Suppression",
    modalSubtitle: "Submit the damaging URLs appearing on Google for de-indexing review.",
    inputPlaceholder: "URL appearing in Google search results"
  },
  "wikipedia-page-creation": {
    ctaText: "Create Verified Wikipedia Page",
    modalTitle: "Request Wikipedia Notability Evaluation",
    modalSubtitle: "Provide biographical or company background to assess Wikipedia eligibility.",
    inputPlaceholder: "Subject name, current bio, or existing drafts"
  },
  "autocomplete-fix": {
    ctaText: "Fix Negative Google Autocomplete",
    modalTitle: "Request Google Autocomplete Correction",
    modalSubtitle: "Specify the harmful predictive search terms appearing beside your name or brand.",
    inputPlaceholder: "Harmful search prediction (e.g. 'Brand Name scam')"
  },
  "news-article-removal": {
    ctaText: "Get Damaging News Articles Removed",
    modalTitle: "Request News Article Removal",
    modalSubtitle: "Submit links to outdated, defamatory, or retracted news stories for legal takedown.",
    inputPlaceholder: "Link to news article"
  },
  "reddit-forum-result-cleanup": {
    ctaText: "Remove Reddit & Forum Threads",
    modalTitle: "Request Forum & Reddit Takedown",
    modalSubtitle: "Submit the offending Reddit posts, comments, or forum threads for removal.",
    inputPlaceholder: "https://www.reddit.com/r/... or forum thread URL"
  },
  "youtube-video-result-suppression": {
    ctaText: "Suppress Harmful YouTube Videos",
    modalTitle: "Request YouTube Video Takedown",
    modalSubtitle: "Provide links to copyright-infringing, defamatory, or harassing YouTube videos.",
    inputPlaceholder: "https://www.youtube.com/watch?v=..."
  },

  // ==========================================
  // 7. Reputation Audit
  // ==========================================
  "google-business-profile-audit": {
    ctaText: "Audit Google Business Profile",
    modalTitle: "Request Google Business Profile Audit",
    modalSubtitle: "Submit your Google Maps URL for an in-depth audit of reviews, ranking, and vulnerabilities.",
    inputPlaceholder: "Google Maps / Business Profile URL"
  },
  "personal-reputation-audit": {
    ctaText: "Get Personal Reputation Audit",
    modalTitle: "Request Personal Reputation Audit",
    modalSubtitle: "Receive a comprehensive diagnostic of what appears when people Google your name.",
    inputPlaceholder: "Full Name and City / State / Country"
  },

  // ==========================================
  // 8. Industries
  // ==========================================
  "lawyers": {
    ctaText: "Protect Legal Practice Reputation",
    modalTitle: "Request Legal Practice Brand Defense",
    modalSubtitle: "Remove fake client complaints, Avvo defamation, and preserve attorney ratings.",
    inputPlaceholder: "Law firm website or negative review URL"
  },
  "doctors-medical-practices": {
    ctaText: "Protect Medical Practice Reputation",
    modalTitle: "Request Medical Practice Reputation Cleanup",
    modalSubtitle: "Defend your practice against HIPAA-violating reviews, Healthgrades attacks, and false claims.",
    inputPlaceholder: "Practice website or negative review URL"
  },
  "dentists": {
    ctaText: "Protect Dental Practice Reputation",
    modalTitle: "Request Dental Practice Review Defense",
    modalSubtitle: "Remove defamatory dental reviews and restore 5-star Google & Yelp standing.",
    inputPlaceholder: "Dental clinic website or negative review URL"
  },
  "real-estate-agents": {
    ctaText: "Protect Real Estate Brand",
    modalTitle: "Request Real Estate Reputation Defense",
    modalSubtitle: "Clean up Zillow, Google, and social media attacks affecting client listings.",
    inputPlaceholder: "Agent website or negative review URL"
  },
  "restaurants-hospitality": {
    ctaText: "Protect Restaurant Reputation",
    modalTitle: "Request Restaurant Reputation Defense",
    modalSubtitle: "Eradicate fraudulent Yelp, Google, and TripAdvisor smear campaigns.",
    inputPlaceholder: "Restaurant website, Yelp, or Google listing"
  },
  "car-dealerships": {
    ctaText: "Protect Dealership Reputation",
    modalTitle: "Request Dealership Reputation Defense",
    modalSubtitle: "Protect Google, DealerRater, and Edmunds ratings from competitor sabotage.",
    inputPlaceholder: "Dealership website or review listing"
  },
  "executives-hnw-individuals": {
    ctaText: "Protect Executive Reputation",
    modalTitle: "Request Executive Reputation Advisory",
    modalSubtitle: "Private, NDA-backed protection for C-suite leaders and high-net-worth families.",
    inputPlaceholder: "Executive name, company, or issue description"
  },
  "contractors-home-services": {
    ctaText: "Protect Contractor Reputation",
    modalTitle: "Request Contractor Review Defense",
    modalSubtitle: "Remove malicious reviews on Angi, BBB, Google, and Nextdoor.",
    inputPlaceholder: "Company website, Angi, or Google listing"
  },
  "financial-advisors-wealth-managers": {
    ctaText: "Protect Wealth Advisor Brand",
    modalTitle: "Request Financial Advisor Brand Defense",
    modalSubtitle: "Clean up unauthorized search results, BrokerCheck disputes, and preserve client trust.",
    inputPlaceholder: "Advisor name, firm website, or target URL"
  },
  "plastic-surgeons-aesthetic-medicine": {
    ctaText: "Protect Aesthetic Practice Reputation",
    modalTitle: "Request Aesthetic Practice Review Defense",
    modalSubtitle: "Protect your surgical reputation on RealSelf, Google, and social platforms.",
    inputPlaceholder: "Practice website or target review link"
  }
};

export function getServiceCta(slug: string, name: string): ServiceCtaConfig {
  if (SERVICE_CTA_CONFIG[slug]) {
    return SERVICE_CTA_CONFIG[slug];
  }
  const isRemoval = /removal|takedown|suppression|cleanup/i.test(name);
  return {
    ctaText: isRemoval ? `Get ${name.replace(/\s*Removal\s*$/i, '')} Removed` : `Request ${name}`,
    modalTitle: isRemoval ? `Request ${name} Removal` : `Request ${name}`,
    modalSubtitle: "Fill out the details below and our team will get to work.",
    inputPlaceholder: "Link to the post, review, or content"
  };
}
