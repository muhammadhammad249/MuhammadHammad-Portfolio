# SEO-12: Structured Data (JSON-LD) Audit & Proposal

**Date**: 26 Oct 2026  
**Status**: Pending Human Approval (Approval Gate)  

---

## 1. Audit of Current Schema

### Currently Implemented Schema (`frontend/src/app/layout.tsx`)
A global `@type: Organization` schema is rendered in `<head>` sitewide:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RepuKeel",
  "alternateName": ["Repukeel", "Repukeel Reputation"],
  "url": "https://repukeel.com",
  "logo": "https://repukeel.com/icon.jpg",
  "description": "RepuKeel specializes in online reputation management, DMCA takedowns, and global brand protection.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+923087525510",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.facebook.com/RepuKeel/",
    "https://x.com/Repukeel",
    "https://www.linkedin.com/company/repukeel",
    "https://www.instagram.com/repukeel/"
  ]
}
```

### Unsupported / Dangerous Markup Check
- **`AggregateRating`**: None found (PASS). No rating markup exists without verified third-party review profiles.
- **`Review`**: None found (PASS).

---

## 2. Proposed Schema Additions

### A. WebSite Schema (Homepage `/`)
Add a clean `@type: WebSite` definition to clarify site identity:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RepuKeel",
  "url": "https://repukeel.com"
}
```

### B. FAQPage Schema (`/services`)
Now that FAQ answers are reliably server-rendered in HTML (completed under SEO-08), we can add structured `FAQPage` schema for the 4 core service FAQs:
1. *How fast can you remove harmful content?*
2. *Is your service completely confidential?*
3. *What platforms do you work with?*
4. *Do you offer a money-back guarantee?*

### C. BlogPosting Schema (`/blogs/[slug]`)
Add standard `BlogPosting` schema to dynamic blog articles:
- `headline`: Blog title
- `description`: Blog meta excerpt
- `author`: "RepuKeel Team"
- `publisher`: RepuKeel Organization
- `mainEntityOfPage`: Canonical blog post URL

---

## 3. Human Approval Gate
Once approved, we will:
1. Apply the `WebSite` schema to `page.tsx`.
2. Apply `FAQPage` JSON-LD to `src/app/services/page.tsx`.
3. Apply `BlogPosting` JSON-LD to `src/app/blogs/[slug]/page.tsx`.
