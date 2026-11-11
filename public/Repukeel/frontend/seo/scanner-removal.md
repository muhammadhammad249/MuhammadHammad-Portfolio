# Scanner Removal Inventory & Approval Gate

**Branch:** `feature/tools-hub`  
**Date:** 2026-10-27  

---

## 1. Inventory of Matches

Searched pattern: `scanner|start scan|piracy scanner` across `src`, `components`, `public`, `lib`, and root.

| File | Line | Snippet | Action Taken |
|---|---|---|---|
| `src/app/scanner/page.tsx` | 5-417 | Scanner page implementation, forms, "Start Scan" buttons | Deleted (`src/app/scanner/` removed) |
| `src/app/scanner/layout.tsx` | 1-18 | Metadata with title "AI Scanner \| RepuKeel" and canonical `/scanner` | Deleted (`src/app/scanner/` removed) |
| `src/app/sitemap.ts` | 16 | `'/scanner',` | Removed from sitemap routes |
| `src/app/components/Navbar.tsx` | 73 | `{ name: 'AI Scanner', path: '/scanner' }` | Replaced with `{ name: 'Free Tools', path: '/tools' }` |
| `src/app/components/Footer.tsx` | 370+ | Quick Links list | Added `<Link href="/tools">Free Tools</Link>` |
| `next.config.mjs` | 3-28 | Redirects configuration | Added 301 permanent redirect: `/scanner` -> `/tools/search-query-builder` |
| `public/dmca-homepage.html` | 547, 585 | Static reference `<a href="#">AI Scanner</a>` | Legacy static HTML preview file (preserved/non-production) |
| `src/app/faq/page.tsx` | 38-43 | FAQ category 'AI Scanner' and 3 Q&As | **HELD FOR APPROVAL GATE** (Not modified) |
| `src/app/HomeClient.tsx` | 272 | "Our AI and expert team scan hundreds of platforms..." | **HELD FOR APPROVAL GATE** (Not modified) |

---

## 2. Permanent Redirect

Added to `next.config.mjs`:
```js
{
  source: '/scanner',
  destination: '/tools/search-query-builder',
  permanent: true,
}
```
- Exactly one hop.
- Preserves search engine authority from the indexed `/scanner` route.

---

## 3. Approval Gate: Copy Modifications

Per requirements, the following existing copy items in `faq/page.tsx` and `HomeClient.tsx` mention the old "AI Scanner" / "scan" claims and were **NOT** edited. Here are the proposed replacements for your approval:

### Item A: `src/app/faq/page.tsx` (Lines 38-43)
**Current:**
```typescript
{
  title: 'AI Scanner',
  items: [
    { q: 'What is the RepuKeel AI Scanner?', a: 'It is a tool on our website that helps you spot where your name, images or brand may be exposed online, so you can decide what to act on.' },
    { q: 'Is the AI Scanner free?', a: 'It is free to try from our website. A scan is a starting point, not a full case review.' },
    { q: 'Do humans review the results?', a: 'Yes. For any case you bring to us, our team verifies the findings before any removal request is filed.' },
  ],
}
```

**Proposed Replacement:**
```typescript
{
  title: 'Free Tools',
  items: [
    { q: 'What is the RepuKeel Search Query Builder?', a: 'It is a free tool in our Free Tools hub that helps you build targeted search queries to check for potential misuse of your brand or content across major search engines.' },
    { q: 'Are your brand protection tools free?', a: 'Yes. Our query builder and utility tools run entirely in your browser with no account or payment required.' },
    { q: 'Do you offer human assistance if I find infringing content?', a: 'Yes. If you find infringing material, impersonation, or defamatory content, our specialist team can review your case and manage the formal removal process.' },
  ],
}
```

### Item B: `src/app/HomeClient.tsx` (Line 272)
**Current:**
```typescript
{ n: '02', title: 'We Scan Everything', desc: 'Our AI and expert team scan hundreds of platforms to find every instance of the problem before any action is taken.', ... }
```

**Proposed Replacement:**
```typescript
{ n: '02', title: 'Comprehensive Investigation', desc: 'Our expert team investigates across platforms to identify instances of infringement or exposure before taking targeted legal action.', ... }
```
