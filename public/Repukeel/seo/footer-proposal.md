# SEO-01: Footer Links Optimization Proposal

**Date**: 26 Oct 2026  
**File to modify**: `frontend/src/app/components/Footer.tsx`  
**Status**: Pending Human Approval (Approval Gate)

---

## 1. Problem Summary
The current footer has **7 severe duplicate targets** where 2 to 3 completely different anchor texts point to the same URL. Additionally, several anchor texts do not describe the destination page (e.g., "DMCA Takedown Service" points specifically to TikTok removal, "Anti-Piracy Protection" points to YouTube suppression, "Intellectual Property Protection" points to Career Professionals).

Because the footer is rendered sitewide across all 85 pages, this dilutes internal anchor relevance signals and confuses search engine crawlers.

---

## 2. Detailed Link-by-Link Audit & Proposals

### Column 2: Brand Protection Solutions
| Current Anchor Text | Current Href | Issue | Proposed Anchor & Target | Reason |
| :--- | :--- | :--- | :--- | :--- |
| **Intellectual Property Protection** | `/reputation-management/professionals` | Mismatch (page is for professional individuals) | **Brand & IP Protection** &rarr; `/protection` | Retargets to the actual dedicated Brand Protection page (`/protection`). |
| **AI Brand Monitoring** | `/monitoring-alerts/social-media-reputation-monitoring` | Duplicate with Trademark Monitoring | **Social Media Monitoring** &rarr; `/monitoring-alerts/social-media-reputation-monitoring` | Accurately describes the target H1 ("Social Media Reputation Monitoring"). |
| **Trademark Monitoring** | `/monitoring-alerts/social-media-reputation-monitoring` | Duplicate target | **Dark Web & Leak Monitoring** &rarr; `/monitoring-alerts/dark-web-data-leak-monitoring` | Retargets to an existing, high-value monitoring service page. |
| **Impersonation Protection** | `/dating-reputation/social-media-takedowns` | Mismatch (page is Dating Social Takedowns) | **Social Media Takedowns** &rarr; `/dating-reputation/social-media-takedowns` | Matches exact H1 of the destination page. |
| **Anti-Counterfeiting Solutions** | `/content-removal/fake-review-removal` | Mismatch (page is Fake Reviews) | **Fake Review Removal** &rarr; `/content-removal/fake-review-removal` | Accurately describes the target review removal page. |
| **Online Reputation Management (ORM)** | `/services` | Good match | **Online Reputation Management** &rarr; `/services` | Keep. |
| **Application Protection** | `/dating-reputation/tea-app-checker-removal` | Mismatch (page is Tea App) | **Tea App Content Removal** &rarr; `/dating-reputation/tea-app-checker-removal` | Accurately matches the Tea App service. |
| **Anti-Piracy Protection** | `/search-result-cleanup/youtube-video-result-suppression` | Duplicate (3 links share this target) | **YouTube & Video Suppression** &rarr; `/search-result-cleanup/youtube-video-result-suppression` | Accurately matches the YouTube suppression page. |

---

### Column 3: Content Protection Solutions
| Current Anchor Text | Current Href | Issue | Proposed Anchor & Target | Reason |
| :--- | :--- | :--- | :--- | :--- |
| **Copyright Protection** | `/search-result-cleanup/youtube-video-result-suppression` | Duplicate target | **Stolen Image Protection** &rarr; `/dating-reputation/image-protection` | Retargets to Image Protection; eliminates duplicate target. |
| **DMCA Takedown Service** | `/content-removal/tiktok-content-removal` | Mismatch (page is TikTok specific) | **TikTok Content Removal** &rarr; `/content-removal/tiktok-content-removal` | Matches exact H1 and service intent. |
| **Leaked Content Removal** | `/dating-reputation/awdtsg-removal` | Mismatch / Duplicate | **AWDTSG Post Removal** &rarr; `/dating-reputation/awdtsg-removal` | Accurately names the AWDTSG group removal service. |
| **Adult Content Protection** | `/dating-reputation/image-protection` | Duplicate target | **Mugshot Removal & Suppression** &rarr; `/content-removal/mugshot-removal-suppression` | Connects a major unlinked content removal service. |
| **Article & Blog Removal** | `/search-result-cleanup/news-article-removal` | Duplicate with Negative Article Removal | **News Article Removal** &rarr; `/search-result-cleanup/news-article-removal` | Exact match to target H1. |
| **Search Engine De-Indexing** | `/search-result-cleanup/google-suppression-de-indexing` | Good match | **Google De-Indexing & Suppression** &rarr; `/search-result-cleanup/google-suppression-de-indexing` | Exact match. |
| **Social Media Content Removal** | `/content-removal/instagram-content-removal` | Mismatch / Duplicate | **Instagram Content Removal** &rarr; `/content-removal/instagram-content-removal` | Exact match to target H1. |

---

### Column 4: Review & Record Removal (Formerly "Use Cases")
All 7 links in Column 4 currently point to duplicate URLs from Column 2 & 3. We propose retargeting them to real, existing high-priority services that currently have zero footer links:

| Current Anchor Text | Current Duplicate Href | Proposed Unique Anchor & Target | Target H1 in Codebase |
| :--- | :--- | :--- | :--- |
| **Remove Leaked OnlyFans Content** | `/dating-reputation/image-protection` | **Google Review Removal** &rarr; `/content-removal/google-review-removal` | Google Review Removal |
| **Remove Leaked Private Content** | `/dating-reputation/awdtsg-removal` | **Trustpilot Review Removal** &rarr; `/content-removal/trustpilot-review-removal` | Trustpilot Review Removal |
| **Brand Defamation Removal** | `/content-removal/fake-review-removal` | **Ripoff Report Removal** &rarr; `/content-removal/ripoff-report-removal` | Ripoff Report Removal |
| **Fake Profile & Impersonation Removal** | `/content-removal/twitter-x-content-removal` | **Twitter / X Content Removal** &rarr; `/content-removal/twitter-x-content-removal` | Twitter / X Content Removal |
| **e-Learning Content Protection** | `/search-result-cleanup/youtube-video-result-suppression` | **Reddit & Forum Cleanup** &rarr; `/search-result-cleanup/reddit-forum-result-cleanup` | Reddit & Forum Result Cleanup |
| **Copyright Image & Video Removal** | `/content-removal/instagram-content-removal` | **Glassdoor Review Cleanup** &rarr; `/job-reputation/glassdoor-employer-review-cleanup` | Glassdoor & Employer Review Cleanup |
| **Negative Article Removal** | `/search-result-cleanup/news-article-removal` | **Background Check Cleanup** &rarr; `/job-reputation/background-check-cleanup` | Background Check Cleanup |

---

## 3. Verification Criteria
Once approved, we will apply these updates to `Footer.tsx` and run:
`node scripts/check-footer.js`
This script checks every href in the built footer and will verify:
1. Zero duplicate targets across different anchor texts.
2. Every link has a 1:1 match with its destination page H1/Title.
3. Zero broken links.
