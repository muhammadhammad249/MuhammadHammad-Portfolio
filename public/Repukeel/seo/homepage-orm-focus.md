# Homepage Online Reputation Management (ORM) Focus Audit

This document audits all copy elements on the RepuKeel homepage ([`frontend/src/app/page.tsx`](file:///C:/Users/Ash/Repukeel/frontend/src/app/page.tsx) and [`frontend/src/app/HomeClient.tsx`](file:///C:/Users/Ash/Repukeel/frontend/src/app/HomeClient.tsx)), classifies their topical focus (ORM, Copyright/DMCA, or Mixed), and proposes ORM-focused replacements that align with existing service page statements.

> [!IMPORTANT]
> **APPROVAL GATE:** In accordance with the project instructions, **no copy edits have been applied to the homepage**. The H1, metadata, section headings, and copy remain untouched pending your formal approval.

---

## 1. Homepage Copy Inventory & Proposed ORM Alignments

| Location (File:Line) | Exact Current Text | Category | Proposed ORM-Focused Replacement / Action | Notes & Rationale |
| :--- | :--- | :---: | :--- | :--- |
| `page.tsx:6` | `title: 'RepuKeel \| Online Reputation Management Company Worldwide'` | ORM / Mixed | Keep as-is or adjust superlative: `'RepuKeel \| Online Reputation Management & Content Removal'` | Awaiting approval on superlative "Worldwide". |
| `page.tsx:7` | `description: 'At RepuKeel Reputation, we remove harmful online content, repair search results, and protect your reputation — fast, confidentially, and with proven results.'` | ORM | Keep as-is | Strong ORM focus covering review removal and search suppression. |
| `HomeClient.tsx:24-29` | `Best Online`<br>`Reputation Management`<br>`Company`<br>`WorldWide` (H1) | ORM / Mixed (Superlative) | `Trusted Online`<br>`Reputation Management`<br>`& Review Removal`<br>`Experts` | Retains keyword hierarchy while eliminating unverified superlatives ("Best", "WorldWide"). |
| `HomeClient.tsx:30-32` | `At RepuKeel Reputation, we remove harmful online content — from fake Google reviews and Trustpilot reviews to mugshots and fake reviews — repair search results, and protect your reputation fast, confidentially, and with proven results.` | ORM | Keep as-is | Already tightly focused on core ORM use cases (Google, Trustpilot, mugshots). |
| `HomeClient.tsx:35` | `Get Protection Now →` (linking to `/protection`) | Copyright / Mixed | `Request Free Analysis →` (linking to `/request-free-analysis`) or `Restore Your Reputation →` (linking to `/reputation-management`) | "Get Protection" reads like antivirus/DMCA; ORM users search for reputation analysis and review disputes. |
| `HomeClient.tsx:40` | Pill badge: `'No Win, No Fee'` | Mixed / Guarantee | `Policy-Backed Removals` or `Guaranteed Evaluation` | Softens absolute claim while reinforcing legal policy compliance. |
| `HomeClient.tsx:40` | Pill badge: `'Global Coverage'` | Mixed / Stat | `Multi-Platform Coverage` | More concrete description of covering Google, Trustpilot, social, and search engines. |
| `HomeClient.tsx:182` | `Increase sales with our brand protection solutions` (H2) | Mixed (Brand Protection) | `Restore Customer Trust with Proven Online Reputation Solutions` | Centers on customer conversion, trust, and reputation repair rather than intellectual property defense. |
| `HomeClient.tsx:183` | `Achieve comprehensive visibility of online threats with round-the-clock monitoring and enforcement.` | Mixed | `Remove damaging reviews, suppress negative search results, and protect your personal or business brand.` | Replaces generic threat monitoring language with concrete ORM outcomes. |
| `HomeClient.tsx:244` | `Review of the Trusted Copyright Removal program` (under Google Reviews card) | Copyright / DMCA | `Review of Online Reputation & Review Removal Services` | Legacy text referencing copyright removal program directly conflicts with the ORM positioning. |
| `HomeClient.tsx:263-265` | `How We Protect You in 4 Simple Steps` | Mixed | `How We Restore Your Reputation in 4 Simple Steps` | Clear, direct ORM phrasing. |
| `HomeClient.tsx:273` | Step 1: `Contact Us: Reach out with a brief description of your situation...` | ORM | Keep as-is | Universal intake step. |
| `HomeClient.tsx:274` | Step 2: `We Scan Everything: Our AI and expert team scan hundreds of platforms to find every instance of the problem before any action is taken.` | ORM / Audit | `Reputation Audit: Our team scans search engines, review sites, and public databases to identify every piece of harmful content.` | Directly echoes the `/reputation-audit` service page methodology. |
| `HomeClient.tsx:275` | Step 3: `Takedowns Filed: Notices and platform reports are filed simultaneously across all identified sources — same day, no delays.` | Copyright / DMCA | `Disputes & Removals Filed: Formal policy disputes, de-indexing requests, and legal notices are submitted directly to platform trust & safety teams.` | Moves away from DMCA-only framing to platform content violation disputes (Google, Trustpilot, Bing). |
| `HomeClient.tsx:276` | Step 4: `Confirmed & Monitored: Every removal is verified and documented. Ongoing monitoring catches any re-uploads automatically.` | ORM | `Verified & Monitored: Every removal is confirmed live on search and review platforms. Ongoing monitoring alerts you to new threats.` | Concrete verification language. |
| `HomeClient.tsx:313-316` | `Why Thousands Choose RepuKeel` | Mixed / Stat | `Why Businesses and Professionals Choose RepuKeel` | Replaces unverified "Thousands" with specific client segments. |
| `HomeClient.tsx:323` | Feature: `Same-Day Action: Most notices are filed within hours of receiving your case — not days or weeks.` | Mixed | `Prompt Case Review: Case assessments and dispute preparations begin promptly upon intake.` | Grounded in operational reality without over-promising automated same-day outcomes for complex cases. |
| `HomeClient.tsx:343` | Stat grid: `500K+ DMCA Takedowns Filed` | Copyright / DMCA | `Content & Review Removals Filed` or `Reputation Inquiries Handled` | Directly aligns the primary stat with ORM / review removal instead of copyright takedowns. |
| `HomeClient.tsx:364` | `Trusted by Creators Worldwide` (Testimonials H2) | Copyright / Creator | `Trusted by Businesses, Executives, and Professionals` | Shifts target audience from creator copyright defense to businesses and individuals needing reputation defense. |
| `HomeClient.tsx:368` | Testimonial 1 (Sarah M.): `stolen copies of my course videos within 24 hours` | Copyright / Piracy | Soften / Replace with review/reputation scenario when provided, or keep as secondary creator representation. | Legacy testimonial represents copyright takedowns. |
| `HomeClient.tsx:370` | Testimonial 3 (Jessica T.): `copied content across multiple platforms` | Copyright / Piracy | Soften / Replace with search suppression / negative article scenario. | Legacy testimonial represents copyright takedowns. |
| `HomeClient.tsx:434` | FAQ 1: `What is a DMCA takedown?` | Copyright / DMCA | `How does online review removal work?` (or move DMCA question to position 3) | On an ORM-focused homepage, FAQ #1 should address fake reviews (Google, Trustpilot) rather than copyright law. |
| `HomeClient.tsx:436` | FAQ 3: `Do you handle reputation damage as well as copyright?` | Mixed (Copyright-first) | `Can you remove negative search results from Google?` or `What review platforms do you cover?` | Replaces question that assumes RepuKeel is a copyright company with a question answering key ORM customer objections. |
| `HomeClient.tsx:455` | Blog section subtitle: `Expert guides on reputation management, DMCA takedowns, and brand protection.` | Mixed | `Expert guides on online reputation management, review removal, and search suppression.` | Centers blog promo on reputation pillars. |

---

## 2. Sitewide Footer & Template DMCA Phrasing (Report Only)

As instructed, the following items are reported for visibility across templates; **no edits are proposed or applied**:

1. **Sitewide Emergency Strip ([`Footer.tsx:468`](file:///C:/Users/Ash/Repukeel/frontend/src/app/components/Footer.tsx#L468)):**
   - Heading: `"24/7 Emergency DMCA Support"`
   - Subtext: `"Need immediate takedown assistance? Our legal team is available around the clock."`
2. **Sitewide Footer Column 2 Heading ([`Footer.tsx:89`](file:///C:/Users/Ash/Repukeel/frontend/src/app/components/Footer.tsx#L89)):**
   - Heading: `"Brand Protection Solutions"`
3. **Contact Page Emergency Hours ([`contact/page.tsx:135`](file:///C:/Users/Ash/Repukeel/frontend/src/app/contact/page.tsx#L135)):**
   - Subtext: `"Emergency Support: 24/7"`
4. **Active Protection Routes (Preserved with Zero URL Changes):**
   - `/protection` (Brand & IP Protection)
   - `/blogs/dmca-takedown-claims-guide` (DMCA Guide)
