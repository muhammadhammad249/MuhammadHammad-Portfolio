# Bug & Dead-Code Report — chore/bug-sweep
**Date:** 2026-10-27 | **Branch:** `chore/bug-sweep`

---

## STEP 1 — SCAN FINDINGS

### 1A. Lint / TypeScript / Build

| Tool | Result |
|------|--------|
| `npm run lint` | ✅ 0 errors, 43 warnings (all pre-existing `/* eslint-disable */` directives — see 1B) |
| `npx tsc --noEmit` | ✅ 0 type errors |
| `npm run build` | ✅ Exit 0, all routes compiled |
| `npm audit --omit=dev` | ⚠️ 4 vulnerabilities: 1 moderate, 2 high, 1 critical (see 1C) |

#### 1B. Lint Warnings — Unused `eslint-disable` directives
Every file starting with `/* eslint-disable */` (43 files) produces one warning each.  
**These are safe to remove** — they suppress nothing and add noise.  
→ **Auto-fix:** remove the `/* eslint-disable */` first-line comment from all 43 files.

#### 1C. npm audit vulnerabilities
| Package | Severity | CVE / Advisory |
|---------|----------|----------------|
| `sharp < 0.35.5` | **High** | CVE-2026-96889 (librsvg) |
| `source-map-js 1.0.0–1.2.1` | **High** | GHSA-68fv-2mgg-jv7q (DoS) |
| (2 more bundled) | Moderate / Critical | Run `npm audit` for full list |

→ **Approval gate** — `npm audit fix` may bump Next.js peer deps. Needs testing.

---

### 1D. Dead / Unused Code

#### Unused npm dependencies (depcheck)
| Package | Status |
|---------|--------|
| `clsx` | Not imported anywhere in `src/` |
| `dotenv` | Not imported anywhere in `src/` |
| `lucide-react` | Not imported anywhere in `src/` |
| `tailwind-merge` | Not imported anywhere in `src/` |

→ **Approval gate** — removing packages; awaiting sign-off.

#### Unused SVG/image assets in `/public`
| File | Size | Used? |
|------|------|-------|
| `next.svg` | 1.3 KB | No (Next.js default) |
| `globe.svg` | 1 KB | No (Next.js default) |
| `window.svg` | 0.4 KB | No (Next.js default) |
| `file.svg` | 0.4 KB | No (Next.js default) |
| `vercel.svg` | 0.1 KB | No (Next.js default) |

→ **Approval gate** — image deletion; awaiting sign-off.

#### Oversized asset
| File | Size | Issue |
|------|------|-------|
| `public/logo.png` | **2.7 MB** | PNG logo should be ≤ 100 KB; causes slow LCP |

→ **Approval gate** — needs re-export as WebP or optimized PNG; do not delete.

---

### 1E. Code Bugs

| Severity | File | Line | Issue |
|----------|------|------|-------|
| **Med** | `src/app/api/notify/route.ts` | 15 | `console.log('[notify] SMTP config:…')` — leaks SMTP config shape to server logs on every email send. Intentional diagnostic but should be removed for production. → **Auto-fix** |
| **Med** | `src/app/HomeClient.tsx` | 233 | `<a href="#">REVIEWS</a>` — empty anchor, goes nowhere; bad for accessibility and SEO. → **Approval gate**: replace with real reviews URL or remove button |
| **Low** | `src/app/use-cases/[slug]/page.tsx` | 38 | Placeholder text: *"Use case detail content loading from data collection..."* — page renders thin/stub content for any `/use-cases/*` slug |

---

### 1F. Routes & Sitemap

#### Routes not in sitemap
| Route | Intentional? |
|-------|-------------|
| `/request-free-analysis` | Probably should be in sitemap |
| `/use-cases/[slug]` | Stub page — probably should be excluded intentionally |
| `/checkout` | Correct — utility page, no index |
| `/dashboard/*` | Correct — auth-only, no index |
| `/login`, `/signup`, etc. | Correct |

→ `/request-free-analysis` is a landing page — **Approval gate**: add to sitemap?

#### Sitemap URLs that do not exist as routes
- `/case-studies` — route **exists** ✅
- `/clients` — route **exists** ✅
- All dynamic `/{category}/{slug}` — served by `[category]/[slug]/page.tsx` ✅

#### Orphan / stub pages (content < 50 words visible)
| Route | Issue |
|-------|-------|
| `/use-cases/[slug]` | Shows placeholder text only: *"Use case detail content loading from data collection..."* |

---

### 1G. Repo Clutter

| Item | Status |
|------|--------|
| `.next/` in git | ✅ Not tracked (in .gitignore) |
| `node_modules/` in git | ✅ Not tracked |
| `.env` files in git | ✅ None tracked |
| Backup files (`*.bak`, `*old*`) | ✅ None found |
| Empty files | ✅ None found |
| Empty folders | ✅ None found |
| Default Next.js SVGs in `/public` | ⚠️ 5 unused files (see 1D) |

---

## STEP 2 — AUTO-FIXES APPLIED

| # | Fix | Files |
|---|-----|-------|
| 1 | Remove `/* eslint-disable */` from 43 files that have no actual violations | All listed in lint output |
| 2 | Remove `console.log` from `api/notify/route.ts` line 15 | `route.ts` |

---

## STEP 3 — APPROVAL GATE

Please approve or reject each item below:

| # | Item | Proposal | Reason |
|---|------|----------|--------|
| A | `npm audit fix` | Run to patch `sharp` + `source-map-js` | High/critical vulns; test build after |
| B | Remove 4 unused npm deps (`clsx`, `dotenv`, `lucide-react`, `tailwind-merge`) | `npm uninstall` | Not used anywhere in codebase |
| C | Delete 5 default Next.js SVGs from `/public` (`next.svg`, `globe.svg`, etc.) | Delete | Never referenced in any page |
| D | Optimize `public/logo.png` (2.7 MB → target < 100 KB) | Re-export as WebP/optimized PNG | Major LCP impact |
| E | `<a href="#">REVIEWS</a>` in `HomeClient.tsx` line 233 | Replace href with real Google Reviews URL or remove button | Broken link, bad UX/SEO |
| F | Add `/request-free-analysis` to sitemap | Add | Real landing page, missing from sitemap |
| G | `/use-cases/[slug]` stub page | Options: (1) fill with real content, (2) return 404 for unknown slugs, (3) redirect to `/services`. **Do not delete** — may have inbound links | Page currently shows placeholder text to all visitors |

---

## STEP 4 — VERIFY (after auto-fixes)

| Check | Before | After |
|-------|--------|-------|
| `npm run lint` errors | 0 | 0 |
| `npm run lint` warnings | 43 | 0 (target) |
| `npx tsc --noEmit` errors | 0 | 0 |
| `npm run build` | ✅ | ✅ |
| `console.log` in production code | 1 | 0 |
| Empty `href="#"` in pages | 1 | (awaiting approval) |

*Screenshots and link crawl not run — no headless browser in environment.*
