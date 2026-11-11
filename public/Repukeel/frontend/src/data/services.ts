import { getServiceCta } from './serviceCtaConfig';

export type SubService = {
  slug: string;
  name: string;
  categorySlug: string;
  heading: string;
  intro: string;
  bodySections: { heading: string; text: string }[];
  bulletPoints: string[];
  image: string;
  ctaText?: string;
  modalTitle?: string;
  modalSubtitle?: string;
  inputPlaceholder?: string;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  subServices: SubService[];
};

const rawCategories: Category[] = [
  {
    slug: "content-removal",
    name: "Content Removal",
    icon: "📄",
    subServices: [
      {
        slug: "tiktok-content-removal",
        name: "TikTok Content Removal",
        categorySlug: "content-removal",
        heading: "TikTok Content Removal",
        intro: "A single TikTok video can reach millions of viewers within hours, turning a misleading clip, false accusation, or targeted attack into a lasting reputation problem. Our team acts fast to get harmful TikTok content taken down before it spreads further.",
        bodySections: [
          { heading: "How We Handle TikTok Takedowns", text: "We evaluate the content against TikTok's Community Guidelines, copyright policy, and harassment rules to identify the fastest valid removal path. Where a direct report isn't enough, we escalate through formal legal channels and platform compliance contacts to push for permanent removal — not just a temporary suppression." },
          { heading: "Stopping Reposts and Duplicates", text: "Once the original video comes down, we continue monitoring for stitched versions, duplicated uploads, and screen-recorded reposts so the same content doesn't resurface under a new account." }
        ],
        bulletPoints: ["Policy-violation and harassment reporting", "Legal escalation for defamatory or false content", "Repost and duplicate-account monitoring", "Direct platform compliance contact"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "mugshot-removal-suppression",
        name: "Mugshot Removal & Suppression",
        categorySlug: "content-removal",
        heading: "Mugshot Removal & Suppression",
        intro: "Arrest photos posted by mugshot publishing sites can follow you long after a case is dismissed, expunged, or resolved. These sites often rank highly on Google for your name, creating a lasting false impression.",
        bodySections: [
          { heading: "Direct Removal and Legal Options", text: "We contact mugshot publishers directly to request takedown, and where applicable, use state-specific mugshot laws and expungement documentation to compel removal rather than relying on paid 'removal fee' services many of these sites offer." },
          { heading: "When Direct Removal Isn't Possible", text: "If a site refuses to take a photo down, we deploy suppression strategies to push the page off the first pages of Google so it's no longer the first thing people see about you." }
        ],
        bulletPoints: ["Direct outreach to mugshot publishing sites", "Expungement and legal-basis removal requests", "Search suppression when removal isn't possible", "Ongoing monitoring for re-publication"],
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "bbb-review-removal",
        name: "BBB Review Removal",
        categorySlug: "content-removal",
        heading: "BBB Review Removal",
        intro: "A false or unverified complaint on the Better Business Bureau can damage trust with customers and partners who check your BBB profile before doing business with you.",
        bodySections: [
          { heading: "Challenging Unverified Complaints", text: "We prepare and submit formal disputes to BBB using their internal review process, presenting evidence that the complaint violates their content standards, is unverifiable, or is factually inaccurate." }
        ],
        bulletPoints: ["Formal BBB dispute filing", "Evidence-based complaint challenges", "Rating impact minimization", "Response drafting for legitimate complaints"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "facebook-review-removal",
        name: "Facebook Review Removal",
        categorySlug: "content-removal",
        heading: "Facebook Review Removal",
        intro: "Fake or malicious Facebook reviews can quietly erode your business page's star rating and scare away potential customers before they ever contact you.",
        bodySections: [
          { heading: "Our Removal Process", text: "We report reviews that violate Facebook's Community Standards — including reviews from non-customers, competitor attacks, and spam — and escalate through Meta's business support channels when standard reporting stalls." }
        ],
        bulletPoints: ["Community Standards violation reporting", "Fake and non-customer review flagging", "Meta Business Support escalation", "Rating recovery tracking"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "instagram-content-removal",
        name: "Instagram Content Removal",
        categorySlug: "content-removal",
        heading: "Instagram Content Removal",
        intro: "Harmful posts, comments, or Story content on Instagram can spread quickly through shares and reposts, making early action essential to limiting the damage.",
        bodySections: [
          { heading: "Fast-Track Takedowns", text: "We use Instagram's reporting tools alongside copyright and impersonation claims where relevant, and escalate through Meta's formal legal request process for content that standard reporting doesn't resolve." }
        ],
        bulletPoints: ["Community Guidelines and impersonation reporting", "Copyright-based takedown requests", "Story and Reel content removal", "Repost tracking after takedown"],
        image: "https://images.unsplash.com/photo-1499750310107-5766b524b439?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "fake-review-removal",
        name: "Fake Review Removal",
        categorySlug: "content-removal",
        heading: "Fake Review Removal",
        intro: "Fabricated reviews — whether from competitors, bots, or people with no real experience with your business — distort your reputation and violate nearly every platform's content policy.",
        bodySections: [
          { heading: "Proving a Review Is Fake", text: "We investigate reviewer history, posting patterns, and platform-specific red flags to build a case that a review violates authenticity guidelines, then file the appropriate takedown request with the platform." }
        ],
        bulletPoints: ["Cross-platform fake review investigation", "Authenticity-violation reporting", "Competitor attack identification", "Platform-specific escalation paths"],
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "travel-hospitality-review-removal",
        name: "Travel & Hospitality Review Removal",
        categorySlug: "content-removal",
        heading: "Travel & Hospitality Review Removal",
        intro: "For hotels, restaurants, and travel businesses, a handful of unfair reviews on platforms like TripAdvisor can outweigh dozens of genuine positive experiences in a potential guest's eyes.",
        bodySections: [
          { heading: "Platform-Specific Strategy", text: "We work within each travel platform's dispute process — TripAdvisor, Booking.com, Expedia, and similar sites each have different standards for what qualifies as a removable review — to challenge content that breaches their guidelines." }
        ],
        bulletPoints: ["TripAdvisor, Booking.com & Expedia disputes", "Guest-verification challenges", "Policy-violation reporting", "Ongoing review monitoring"],
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "trustpilot-review-removal",
        name: "Trustpilot Review Removal",
        categorySlug: "content-removal",
        heading: "Trustpilot Review Removal",
        intro: "Trustpilot reviews often rank highly in search results for your business name, making even a single fabricated or exaggerated review highly visible to prospective customers.",
        bodySections: [
          { heading: "Disputing Trustpilot Content", text: "We submit formal flags through Trustpilot's guideline system, focusing on reviews that lack proof of a genuine transaction, contain unverifiable claims, or breach Trustpilot's content standards." }
        ],
        bulletPoints: ["Formal Trustpilot guideline disputes", "Transaction-verification challenges", "Defamatory content flagging", "Rating trend monitoring"],
        image: "https://images.unsplash.com/photo-1543269664-7eef42226eba?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "ripoff-report-removal",
        name: "Ripoff Report Removal",
        categorySlug: "content-removal",
        heading: "Ripoff Report Removal",
        intro: "Ripoff Report posts are notoriously difficult to remove and often rank near the top of search results, making them one of the most damaging types of online content for individuals and businesses alike.",
        bodySections: [
          { heading: "A Realistic, Layered Approach", text: "Because Ripoff Report rarely removes posts outright, we combine legal escalation where content is defamatory, arbitration options the site offers, and aggressive search suppression to minimize visibility while pursuing removal." }
        ],
        bulletPoints: ["Legal escalation for defamatory posts", "Site arbitration program guidance", "Search suppression as a parallel strategy", "Long-term visibility monitoring"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "indeed-review-removal",
        name: "Indeed Review Removal",
        categorySlug: "content-removal",
        heading: "Indeed Review Removal",
        intro: "Negative employer reviews on Indeed can affect recruiting and hiring, especially when a review is posted by someone who was never actually employed at the company.",
        bodySections: [
          { heading: "Employer Review Disputes", text: "We file employer disputes directly with Indeed, providing evidence when a reviewer cannot be verified as a former employee or when the content violates Indeed's review guidelines." }
        ],
        bulletPoints: ["Employer verification disputes", "Guideline-violation flagging", "Response strategy for legitimate reviews", "Recruiting-impact monitoring"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "twitter-x-content-removal",
        name: "Twitter / X Content Removal",
        categorySlug: "content-removal",
        heading: "Twitter / X Content Removal",
        intro: "A single viral post on X (Twitter) can spread through quote-tweets and screenshots within minutes, making rapid response critical to limiting long-term damage.",
        bodySections: [
          { heading: "Rapid Response Process", text: "We report content that violates X's rules on harassment, impersonation, or private information, and pursue legal removal requests for defamatory material that standard reporting doesn't resolve." }
        ],
        bulletPoints: ["Platform rules-violation reporting", "Legal takedown requests", "Screenshot and quote-tweet tracking", "Impersonation account removal"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "google-review-removal",
        name: "Google Review Removal",
        categorySlug: "content-removal",
        heading: "Google Review Removal",
        intro: "Google reviews are often the first thing a potential customer sees, and a small number of fake or malicious reviews can significantly drag down your average rating.",
        bodySections: [
          { heading: "Google Business Profile Disputes", text: "We flag reviews that violate Google's policies — including conflict-of-interest reviews, fake accounts, and off-topic rants — through Google Business Profile support, escalating persistent cases through Google's official appeal process." }
        ],
        bulletPoints: ["Google policy-violation flagging", "Fake account identification", "Formal appeal escalation", "Rating recovery tracking"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "dating-reputation",
    name: "Dating Reputation",
    icon: "🔥",
    subServices: [
      {
        slug: "awdtsg-removal",
        name: "AWDTSG Removal",
        categorySlug: "dating-reputation",
        heading: "AWDTSG Removal",
        intro: "Being listed on group-run 'are we dating the same guy' pages can expose private photos and unverified claims to thousands of members without any chance to respond.",
        bodySections: [
          { heading: "How We Get Posts Removed", text: "We submit removal requests directly to group administrators and platform trust & safety teams, citing privacy violations, harassment policy breaches, and unverified defamatory claims." }
        ],
        bulletPoints: ["Group administrator removal requests", "Platform harassment-policy escalation", "Privacy violation claims", "Repost monitoring across mirror groups"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "awdtsg-checker-search",
        name: "AWDTSG Checker & Search",
        categorySlug: "dating-reputation",
        heading: "AWDTSG Checker & Search",
        intro: "Before you can address a harmful post, you need to know it exists. We search across regional and national groups to find out whether you've been named.",
        bodySections: [
          { heading: "What Our Search Covers", text: "We check public and private groups across major platforms, along with associated forums and screenshot-sharing sites, to give you a full picture of your exposure before deciding on next steps. If you find a thread, we can [remove AWDTSG posts](/dating-reputation/awdtsg-removal)." }
        ],
        bulletPoints: ["Cross-platform group search", "Screenshot and forum tracking", "Full exposure report", "Recommended next steps"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "image-protection",
        name: "Image Protection",
        categorySlug: "dating-reputation",
        heading: "Image Protection",
        intro: "Photos shared in dating contexts can end up reposted without consent across forums, group chats, and social platforms. We help you regain control.",
        bodySections: [
          { heading: "Protecting Your Photos", text: "We use reverse image search to locate unauthorized reposts, file takedown requests based on privacy and consent violations, and set up ongoing monitoring to catch new instances early." }
        ],
        bulletPoints: ["Reverse image search across the web", "Consent-violation takedown requests", "Ongoing reupload monitoring", "Platform-specific privacy reporting"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "social-media-takedowns",
        name: "Social Media Takedowns",
        categorySlug: "dating-reputation",
        heading: "Social Media Takedowns",
        intro: "Dating-related callouts often spread from one platform to several, turning a single post into a coordinated pile-on across Instagram, TikTok, and X.",
        bodySections: [
          { heading: "Coordinated Multi-Platform Removal", text: "We track where a post has spread and file simultaneous takedown requests across every platform it appears on, rather than addressing one post at a time while others continue circulating. We also assist with [removing AWDTSG posts](/dating-reputation/awdtsg-removal) when callouts spread to private groups." }
        ],
        bulletPoints: ["Multi-platform tracking", "Simultaneous takedown filing", "Harassment-policy escalation", "Cross-platform monitoring"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "monitoring-packages",
        name: "Monitoring Packages",
        categorySlug: "dating-reputation",
        heading: "Monitoring Packages",
        intro: "Ongoing monitoring gives you an early warning if your name or photos are posted again after an initial removal, so you're never caught off guard.",
        bodySections: [
          { heading: "What's Included", text: "Our monitoring packages track relevant groups, forums, and platforms on a recurring basis and alert you immediately if new content appears, with a direct link to request removal." }
        ],
        bulletPoints: ["Recurring group and forum scans", "Instant alert on new mentions", "Direct removal request pipeline", "Flexible monitoring tiers"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "dating-coach-support",
        name: "Dating Coach Support",
        categorySlug: "dating-reputation",
        heading: "Dating Coach Support",
        intro: "Beyond removal, many clients want guidance on rebuilding confidence and navigating dating profiles after a reputational incident.",
        bodySections: [
          { heading: "Support Alongside Removal", text: "We connect clients with coaching resources focused on privacy-conscious dating practices and profile presentation, working alongside our removal and monitoring services." }
        ],
        bulletPoints: ["Privacy-conscious dating guidance", "Profile presentation support", "Coordinated with removal timeline", "Confidential, one-on-one support"],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "tea-app-checker-removal",
        name: "Tea App Checker & Removal",
        categorySlug: "dating-reputation",
        heading: "Tea App Checker & Removal",
        intro: "The Tea app allows users to post reviews and warnings about people they've dated, which can include unverified or exaggerated claims with real reputational consequences.",
        bodySections: [
          { heading: "Checking and Removing Tea App Content", text: "We search the app for mentions of your name, then submit removal requests based on the app's content policies for content that is false, unverifiable, or violates their posting guidelines. If you were posted in groups, see [AWDTSG removal](/dating-reputation/awdtsg-removal)." }
        ],
        bulletPoints: ["Full Tea app search", "Policy-based removal requests", "False claim documentation", "Ongoing re-post monitoring"],
        image: "https://images.unsplash.com/photo-1499750310107-5766b524b439?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "job-reputation",
    name: "Job Reputation",
    icon: "💼",
    subServices: [
      {
        slug: "background-check-cleanup",
        name: "Background Check Cleanup",
        categorySlug: "job-reputation",
        heading: "Background Check Cleanup",
        intro: "Outdated, inaccurate, or expunged records can still surface on background check reports, potentially costing you job offers you're otherwise qualified for.",
        bodySections: [
          { heading: "Correcting Background Check Errors", text: "We work with data providers and background check companies under applicable consumer reporting laws to dispute outdated, inaccurate, or legally sealed information." }
        ],
        bulletPoints: ["Data provider dispute filing", "Consumer reporting law compliance", "Expunged record removal", "Follow-up verification"],
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "licensing-risk-removal",
        name: "Licensing Risk Removal",
        categorySlug: "job-reputation",
        heading: "Licensing Risk Removal",
        intro: "For licensed professionals, negative online content can complicate license renewals, board reviews, or new state applications even when the underlying issue was resolved long ago.",
        bodySections: [
          { heading: "Protecting Your Professional Standing", text: "We identify content that could affect licensing board perception and pursue removal or suppression, while helping you prepare accurate context for any board inquiries." }
        ],
        bulletPoints: ["Licensing-risk content audit", "Removal and suppression strategy", "Board inquiry preparation support", "Multi-state license considerations"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "glassdoor-employer-review-cleanup",
        name: "Glassdoor & Employer Review Cleanup",
        categorySlug: "job-reputation",
        heading: "Glassdoor & Employer Review Cleanup",
        intro: "A handful of harsh or fabricated Glassdoor reviews can shape how candidates and business partners perceive your company culture before they ever speak with you.",
        bodySections: [
          { heading: "Disputing Employer Reviews", text: "We file formal disputes for reviews that violate Glassdoor's guidelines — including reviews from non-employees or content containing personal attacks — and advise on responding professionally to legitimate feedback." }
        ],
        bulletPoints: ["Glassdoor guideline-violation disputes", "Non-employee review challenges", "Response strategy guidance", "Rating trend tracking"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "linkedin-search-visibility-repair",
        name: "LinkedIn & Search Visibility Repair",
        categorySlug: "job-reputation",
        heading: "LinkedIn & Search Visibility Repair",
        intro: "Recruiters routinely Google candidates before an interview — if the top results don't reflect your professional standing, it can cost you the opportunity before you're even considered.",
        bodySections: [
          { heading: "Rebuilding Your Professional Search Presence", text: "We optimize your LinkedIn presence and coordinate suppression of unfavorable results so that your professional profile and credible sources appear where recruiters look first." }
        ],
        bulletPoints: ["LinkedIn profile optimization", "Search result suppression strategy", "Professional content amplification", "Recruiter-view search audit"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "employer-response-reference-repair",
        name: "Employer Response & Reference Repair",
        categorySlug: "job-reputation",
        heading: "Employer Response & Reference Repair",
        intro: "A difficult exit from a previous role — whether from a dismissal, investigation, or dispute — shouldn't have to define your next opportunity.",
        bodySections: [
          { heading: "Managing the Narrative", text: "We help clients prepare accurate, professional context for reference checks and address any online content tied to a past employment dispute that could unfairly affect future opportunities." }
        ],
        bulletPoints: ["Reference-check preparation", "Employment dispute content review", "Professional narrative guidance", "Confidential case handling"],
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "monitoring-alerts",
    name: "Monitoring & Alerts",
    icon: "📊",
    subServices: [
      {
        slug: "awdtsg-monitoring-scan-alerts",
        name: "AWDTSG Monitoring & Scan Alerts",
        categorySlug: "monitoring-alerts",
        heading: "AWDTSG Monitoring & Scan Alerts",
        intro: "New posts on dating-callout groups can appear at any time. Continuous scanning means you find out immediately rather than by accident.",
        bodySections: [
          { heading: "Real-Time Scanning", text: "We run recurring scans across relevant groups and forums, sending instant alerts with direct links whenever your name or photos are mentioned. We also offer [AWDTSG post removal](/dating-reputation/awdtsg-removal) when you need a post taken down." }
        ],
        bulletPoints: ["Recurring group scans", "Instant mention alerts", "Direct link to flagged content", "Fast-track removal option"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "social-media-reputation-monitoring",
        name: "Social Media Reputation Monitoring",
        categorySlug: "monitoring-alerts",
        heading: "Social Media Reputation Monitoring",
        intro: "Reputational threats often begin quietly on social media before they go viral — early detection is the difference between a minor issue and a major crisis.",
        bodySections: [
          { heading: "24/7 Social Tracking", text: "We monitor major platforms for new mentions, tags, and posts referencing your name or brand, flagging anything that could escalate so you can respond before it spreads." }
        ],
        bulletPoints: ["Continuous cross-platform tracking", "Escalation-risk flagging", "Real-time alert delivery", "Sentiment trend reporting"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "dark-web-data-leak-monitoring",
        name: "Dark Web & Data Leak Monitoring",
        categorySlug: "monitoring-alerts",
        heading: "Dark Web & Data Leak Monitoring",
        intro: "Leaked personal or business data circulating on dark web forums can lead to identity theft, extortion attempts, or targeted harassment if it goes unnoticed.",
        bodySections: [
          { heading: "Dark Web Scanning", text: "We scan known dark web marketplaces and leak databases for your information, alerting you immediately if your data appears so you can take protective action." }
        ],
        bulletPoints: ["Dark web marketplace scanning", "Leak database monitoring", "Immediate breach alerts", "Guidance on protective next steps"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "employer-workplace-risk-tracking",
        name: "Employer & Workplace Risk Tracking",
        categorySlug: "monitoring-alerts",
        heading: "Employer & Workplace Risk Tracking",
        intro: "Employers face reputational exposure from employee reviews, workplace complaints, and internal disputes that surface publicly.",
        bodySections: [
          { heading: "Proactive Workplace Monitoring", text: "We track employer review sites and relevant forums for new complaints or reviews, giving HR and leadership teams early visibility into emerging workplace reputation risks." }
        ],
        bulletPoints: ["Employer review site tracking", "Early complaint detection", "HR-focused alert reporting", "Trend analysis over time"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "monthly-snapshot-reports-reputation-logs",
        name: "Monthly Snapshot Reports & Reputation Logs",
        categorySlug: "monitoring-alerts",
        heading: "Monthly Snapshot Reports & Reputation Logs",
        intro: "Ongoing reputation management works best when it's measurable. Monthly reports give you a clear record of what's changed and what's being actively managed.",
        bodySections: [
          { heading: "What's In Your Report", text: "Each monthly snapshot summarizes new mentions, removal actions taken, search ranking changes, and outstanding items — giving you a full log of your reputation status over time." }
        ],
        bulletPoints: ["Monthly mention summary", "Removal action log", "Search ranking change tracking", "Outstanding-item follow-up list"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "reputation-management",
    name: "Reputation Management",
    icon: "🏅",
    subServices: [
      {
        slug: "professionals",
        name: "Professionals",
        categorySlug: "reputation-management",
        heading: "Reputation Management for Professionals",
        intro: "Doctors, lawyers, consultants, and other licensed professionals depend on trust — a single misleading review or article can affect referrals, licensing, and career growth.",
        bodySections: [
          { heading: "Tailored for Your Field", text: "We combine content removal, review management, and search visibility strategies designed around the standards and platforms specific to your profession." }
        ],
        bulletPoints: ["Profession-specific removal strategy", "Review and rating management", "Search result cleanup", "Ongoing reputation monitoring"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "public-figures",
        name: "Public Figures",
        categorySlug: "reputation-management",
        heading: "Reputation Management for Public Figures",
        intro: "Public visibility brings public scrutiny. We help public figures manage press coverage, social sentiment, and search results with discretion.",
        bodySections: [
          { heading: "Managing Public Perception", text: "Our approach blends media relations awareness, search suppression, and rapid-response content removal to help public figures maintain a narrative that reflects their actual record." }
        ],
        bulletPoints: ["Press and media monitoring", "Rapid-response content removal", "Search narrative management", "Confidential, discreet handling"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "business-owners",
        name: "Business Owners",
        categorySlug: "reputation-management",
        heading: "Reputation Management for Business Owners",
        intro: "Your business's online reputation directly affects revenue — from customer trust to investor confidence. We help you protect it at every level.",
        bodySections: [
          { heading: "A Full-Business Approach", text: "We manage review platforms, search results, and negative press coverage together, so your business is represented accurately across every channel customers use to evaluate you." }
        ],
        bulletPoints: ["Review platform management", "Search result cleanup", "Negative press response", "Positive visibility building"],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "reputation-management-packages",
        name: "Reputation Management Packages",
        categorySlug: "reputation-management",
        heading: "Reputation Management Packages",
        intro: "Every reputation situation is different — from a single urgent takedown to ongoing, long-term protection. Our packages are structured to match your needs.",
        bodySections: [
          { heading: "Choosing the Right Package", text: "We offer tiered packages ranging from one-time content removal to comprehensive ongoing management including monitoring, suppression, and visibility building, so you only pay for what you actually need." }
        ],
        bulletPoints: ["One-time and ongoing tiers", "Custom scope based on your case", "Transparent pricing structure", "Scalable as needs change"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "search-cleanup",
        name: "Search Cleanup",
        categorySlug: "reputation-management",
        heading: "Search Cleanup",
        intro: "What appears on the first page of Google for your name often matters more than what's technically true — we help make sure it reflects reality.",
        bodySections: [
          { heading: "How We Clean Up Search Results", text: "We combine removal of harmful content at the source with suppression techniques that elevate credible, positive, or neutral sources in search rankings." }
        ],
        bulletPoints: ["Source-level content removal", "Search suppression strategy", "Positive content amplification", "Ranking progress tracking"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "website-creation",
        name: "Website Creation",
        categorySlug: "reputation-management",
        heading: "Website Creation",
        intro: "A professional, well-optimized personal or business website is one of the strongest tools for controlling what appears when people search your name.",
        bodySections: [
          { heading: "Built for Reputation, Not Just Design", text: "We design websites with SEO structured specifically to rank for your name or brand, reinforcing accurate, positive information at the top of search results." }
        ],
        bulletPoints: ["SEO-optimized site structure", "Name and brand-focused content", "Mobile-responsive design", "Ongoing optimization support"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "website-creation-for-business-owners",
        name: "For Business Owners",
        categorySlug: "reputation-management",
        heading: "Website Creation for Business Owners",
        intro: "A dedicated business website reinforces credibility and gives customers a trustworthy first impression that ranks above negative third-party content.",
        bodySections: [
          { heading: "Business-Focused Build", text: "We build sites that highlight your services, testimonials, and credentials, structured to rank for your business name and key services in your local market." }
        ],
        bulletPoints: ["Business credibility design", "Local SEO structure", "Testimonial and service showcase", "Ongoing content support"],
        image: "https://images.unsplash.com/photo-1499750310107-5766b524b439?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "website-creation-for-professionals",
        name: "For Professionals",
        categorySlug: "reputation-management",
        heading: "Website Creation for Professionals",
        intro: "For individual professionals, a personal website establishes an authoritative, controlled source of information that search engines and clients trust.",
        bodySections: [
          { heading: "Personal Brand Build", text: "We design a professional profile site highlighting your credentials, experience, and achievements — optimized to appear prominently when your name is searched." }
        ],
        bulletPoints: ["Credential and bio showcase", "Name-optimized SEO", "Professional, credible design", "Search ranking support"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "search-result-cleanup",
    name: "Search Result Cleanup",
    icon: "🔍",
    subServices: [
      {
        slug: "google-suppression-de-indexing",
        name: "Google Suppression & De-Indexing",
        categorySlug: "search-result-cleanup",
        heading: "Google Suppression & De-Indexing",
        intro: "When harmful content can't be removed at the source, pushing it off the first page of Google — or de-indexing it entirely — is often the most effective path forward.",
        bodySections: [
          { heading: "Our Suppression Method", text: "We build and promote credible, authoritative content to outrank harmful pages, while pursuing de-indexing requests directly with Google for content that qualifies under their removal policies." }
        ],
        bulletPoints: ["Authoritative content promotion", "Google removal policy requests", "Ranking-position tracking", "Long-term suppression maintenance"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "wikipedia-page-creation",
        name: "Wikipedia Page Creation",
        categorySlug: "search-result-cleanup",
        heading: "Wikipedia Page Creation",
        intro: "A well-sourced Wikipedia page can become one of the top search results for your name, offering an accurate, neutral reference point.",
        bodySections: [
          { heading: "Meeting Wikipedia's Standards", text: "We research and draft content that meets Wikipedia's strict notability and sourcing guidelines, working within the platform's editorial process rather than promotional shortcuts that risk removal." }
        ],
        bulletPoints: ["Notability assessment", "Properly sourced drafting", "Editorial guideline compliance", "Post-publication monitoring"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "autocomplete-fix",
        name: "Autocomplete Fix",
        categorySlug: "search-result-cleanup",
        heading: "Autocomplete Fix",
        intro: "Negative autocomplete suggestions that appear the moment someone starts typing your name can shape perception before a single search result even loads.",
        bodySections: [
          { heading: "Addressing Autocomplete Suggestions", text: "We submit removal requests through Google's autocomplete policy for suggestions that violate their guidelines, while working on the underlying search behavior that drives harmful predictions." }
        ],
        bulletPoints: ["Autocomplete policy violation requests", "Search-pattern analysis", "Predictive suggestion monitoring", "Long-term correction tracking"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "news-article-removal",
        name: "News Article Removal",
        categorySlug: "search-result-cleanup",
        heading: "News Article Removal",
        intro: "Old news coverage — even when accurate at the time — can misrepresent who you are today, especially years after a story broke.",
        bodySections: [
          { heading: "Working With Publishers", text: "We contact publishers and editors directly to request updates, corrections, or removal where legally and ethically appropriate, and pursue de-indexing options when direct removal isn't possible." }
        ],
        bulletPoints: ["Direct publisher outreach", "Correction and update requests", "De-indexing where applicable", "Legal review for defamatory coverage"],
        image: "https://images.unsplash.com/photo-1499750310107-5766b524b439?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "reddit-forum-result-cleanup",
        name: "Reddit & Forum Result Cleanup",
        categorySlug: "search-result-cleanup",
        heading: "Reddit & Forum Result Cleanup",
        intro: "Reddit threads and forum posts often rank highly in search results and can contain outdated, unverified, or defamatory claims that are hard to contextualize.",
        bodySections: [
          { heading: "Reddit & Forum Strategy", text: "We report content that violates subreddit and platform rules, and pursue removal through moderator and admin channels, combined with suppression when a thread can't be taken down." }
        ],
        bulletPoints: ["Subreddit rule-violation reporting", "Moderator and admin escalation", "Forum-specific removal requests", "Suppression as a backup strategy"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "youtube-video-result-suppression",
        name: "YouTube & Video Result Suppression",
        categorySlug: "search-result-cleanup",
        heading: "YouTube & Video Result Suppression",
        intro: "Video content ranks prominently in Google search and can be especially damaging since viewers often judge based on thumbnails and titles alone.",
        bodySections: [
          { heading: "Video-Specific Removal & Suppression", text: "We pursue takedown through YouTube's Community Guidelines and copyright system where applicable, and build suppression strategies specifically for video-format search results." }
        ],
        bulletPoints: ["YouTube Community Guidelines reporting", "Copyright-based takedowns", "Video-format search suppression", "Thumbnail and title-driven impact review"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "reputation-audit",
    name: "Reputation Audit",
    icon: "🛡️",
    subServices: [
      {
        slug: "google-business-profile-audit",
        name: "Google Business Profile Audit",
        categorySlug: "reputation-audit",
        heading: "Google Business Profile Audit",
        intro: "Your Google Business Profile is often the first and most-viewed touchpoint for potential customers — small issues here can have an outsized impact.",
        bodySections: [
          { heading: "What We Review", text: "We audit your listing's accuracy, review composition, response history, photo quality, and category settings, then provide a prioritized action plan to strengthen it." }
        ],
        bulletPoints: ["Listing accuracy check", "Review composition analysis", "Response strategy review", "Prioritized improvement plan"],
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "personal-reputation-audit",
        name: "Personal Reputation Audit",
        categorySlug: "reputation-audit",
        heading: "Personal Reputation Audit",
        intro: "Before building a reputation strategy, it helps to know exactly what's out there — a full audit gives you a clear, honest picture.",
        bodySections: [
          { heading: "What's Included in Your Audit", text: "We search your name across search engines, social platforms, news archives, and relevant databases, compiling a complete report of what currently exists online about you and where the biggest risks lie. If your exposure includes dating groups, our [AWDTSG post removal](/dating-reputation/awdtsg-removal) service can help." }
        ],
        bulletPoints: ["Full-name search across platforms", "News and archive review", "Risk-prioritized findings report", "Recommended action plan"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    slug: "industries",
    name: "Industries",
    icon: "🏢",
    subServices: [
      {
        slug: "lawyers",
        name: "Lawyers",
        categorySlug: "industries",
        heading: "Reputation Management for Lawyers",
        intro: "For attorneys, online reputation directly affects client trust and referrals — a single unfair review or misleading article can outweigh years of case results.",
        bodySections: [
          { heading: "Built for Legal Professionals", text: "We manage review platforms like Avvo and Google, address bar-related search concerns, and help maintain a search presence that reflects your actual track record." }
        ],
        bulletPoints: ["Legal review platform management", "Search result cleanup", "Bar-sensitive content handling", "Client trust-focused strategy"],
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "doctors-medical-practices",
        name: "Doctors & Medical Practices",
        categorySlug: "industries",
        heading: "Reputation Management for Doctors & Medical Practices",
        intro: "Patients research providers extensively before booking — negative or fabricated reviews on healthcare platforms can directly affect patient volume.",
        bodySections: [
          { heading: "Healthcare-Specific Approach", text: "We manage reviews across Healthgrades, Zocdoc, Vitals, and Google, while ensuring all communication stays HIPAA-conscious and compliant with healthcare marketing regulations." }
        ],
        bulletPoints: ["Healthcare review platform management", "HIPAA-conscious response handling", "Patient trust reinforcement", "Search visibility optimization"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "dentists",
        name: "Dentists",
        categorySlug: "industries",
        heading: "Reputation Management for Dentists",
        intro: "For dental practices, local reviews are often the deciding factor between a new patient booking with you or a competitor down the street.",
        bodySections: [
          { heading: "Local Practice Focus", text: "We manage Google and dental-specific review platforms, address unfair reviews, and support local SEO so your practice appears strongly in nearby searches." }
        ],
        bulletPoints: ["Local review management", "Dental platform monitoring", "Local SEO support", "Patient trust building"],
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "real-estate-agents",
        name: "Real Estate Agents",
        categorySlug: "industries",
        heading: "Reputation Management for Real Estate Agents",
        intro: "In real estate, your name is your brand — buyers and sellers often choose an agent based almost entirely on online reviews and search presence.",
        bodySections: [
          { heading: "Agent-Focused Strategy", text: "We manage Zillow, Realtor.com, and Google reviews, and help build a search presence that highlights closed deals and client satisfaction over isolated complaints." }
        ],
        bulletPoints: ["Zillow & Realtor.com review management", "Local market search optimization", "Client testimonial amplification", "Complaint response strategy"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "restaurants-hospitality",
        name: "Restaurants & Hospitality",
        categorySlug: "industries",
        heading: "Reputation Management for Restaurants & Hospitality",
        intro: "A handful of one-star reviews can significantly affect foot traffic and bookings for restaurants, hotels, and hospitality businesses.",
        bodySections: [
          { heading: "Hospitality-Specific Management", text: "We manage Yelp, TripAdvisor, and Google reviews, address unfair or fake complaints, and help you respond professionally to legitimate feedback to show prospective guests you listen." }
        ],
        bulletPoints: ["Yelp & TripAdvisor management", "Fake review identification", "Guest response strategy", "Rating recovery tracking"],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "car-dealerships",
        name: "Car Dealerships",
        categorySlug: "industries",
        heading: "Reputation Management for Car Dealerships",
        intro: "Car buyers research dealership reputations extensively, and a wave of negative reviews after a single bad experience can affect sales for months.",
        bodySections: [
          { heading: "Dealership-Focused Approach", text: "We manage DealerRater, Google, and Cars.com reviews, address unverified complaints, and support a search presence that reflects your full customer base — not just the loudest critics." }
        ],
        bulletPoints: ["DealerRater & Cars.com management", "Unverified complaint disputes", "Sales-team response coaching", "Search reputation tracking"],
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "executives-hnw-individuals",
        name: "Executives & HNW Individuals",
        categorySlug: "industries",
        heading: "Reputation Management for Executives & HNW Individuals",
        intro: "Executives and high-net-worth individuals face unique exposure — from press coverage to public records — that requires a discreet, comprehensive approach.",
        bodySections: [
          { heading: "Discreet, High-Level Management", text: "We combine confidential monitoring, press and search management, and proactive suppression strategies tailored to the visibility and privacy concerns of high-profile individuals." }
        ],
        bulletPoints: ["Confidential monitoring", "Press and search coordination", "Proactive suppression strategy", "Privacy-focused handling"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "contractors-home-services",
        name: "Contractors & Home Services",
        categorySlug: "industries",
        heading: "Reputation Management for Contractors & Home Services",
        intro: "For contractors and home service providers, a single disputed job can generate a review that outweighs dozens of satisfied customers in a homeowner's search.",
        bodySections: [
          { heading: "Trade-Specific Support", text: "We manage Google, Angi, and HomeAdvisor reviews, dispute unverifiable complaints, and help you build a documented track record that stands up to isolated negative feedback." }
        ],
        bulletPoints: ["Angi & HomeAdvisor review management", "Dispute documentation support", "Local search visibility", "Customer trust building"],
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "financial-advisors-wealth-managers",
        name: "Financial Advisors & Wealth Managers",
        categorySlug: "industries",
        heading: "Reputation Management for Financial Advisors & Wealth Managers",
        intro: "In financial services, trust is the entire product — negative search results or unverified complaints can directly affect client acquisition and retention.",
        bodySections: [
          { heading: "Compliance-Aware Approach", text: "We manage search results and review platforms with full awareness of financial industry advertising and communication regulations, ensuring every action stays compliant." }
        ],
        bulletPoints: ["Compliance-conscious content strategy", "BrokerCheck & industry platform awareness", "Search result management", "Client trust reinforcement"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "plastic-surgeons-aesthetic-medicine",
        name: "Plastic Surgeons & Aesthetic Medicine",
        categorySlug: "industries",
        heading: "Reputation Management for Plastic Surgeons & Aesthetic Medicine",
        intro: "Aesthetic medicine is a highly visual, highly personal field — a single dissatisfied patient's review can carry outsized weight in a prospective patient's decision.",
        bodySections: [
          { heading: "Specialty-Focused Management", text: "We manage RealSelf, Healthgrades, and Google reviews with attention to patient privacy, and help build a search presence anchored in verified before-and-after results and credentials." }
        ],
        bulletPoints: ["RealSelf & Healthgrades management", "Patient privacy-conscious handling", "Credential and results showcase", "Search reputation monitoring"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const categories: Category[] = rawCategories.map(cat => ({
  ...cat,
  subServices: cat.subServices.map(sub => ({
    ...sub,
    ...getServiceCta(sub.slug, sub.name),
  }))
}));
