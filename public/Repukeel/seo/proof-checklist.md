# Review Removal Proof: Redaction & Compliance Checklist

This checklist must be completed for every review removal screenshot placed into `public/proof/` before adding an entry into [`src/data/removalProof.ts`](file:///C:/Users/Ash/Repukeel/frontend/src/data/removalProof.ts).

---

## Per-Image Verification Steps

For each screenshot (e.g., `public/proof/google-review-01.png`):

- [ ] **1. Crop & Focus on Platform Removal Status**
  - Crop tightly around the platform status indicators (e.g. "Review no longer available", "This review has been removed for policy violation", or the empty star rating slot).
  - Remove all peripheral screen content, bookmarks, browser tabs, or unrelated interface elements.

- [ ] **2. Redact Reviewer Personal Data**
  - Blur or black out the reviewer's display name completely.
  - Blur or black out the reviewer's avatar/profile photo.
  - Redact any specific usernames, handles, or local guide badges.

- [ ] **3. Redact Client & Business Identifiers**
  - Redact the client's business name, address, phone number, and store number.
  - Redact any text inside the review body that identifies specific staff members, locations, transaction IDs, or proprietary circumstances.

- [ ] **4. Preserve / Include Verification Date**
  - Ensure the screenshot clearly captures the date or timestamp (e.g., "Checked October 2026") or add the verified date to `verifiedOn` in `removalProof.ts`.

- [ ] **5. Client Consent Confirmation**
  - Confirm written client permission to display the redacted outcome in case study materials.
  - Mark `clientConsent: true` in `src/data/removalProof.ts` only after explicit confirmation.

- [ ] **6. Factual Accuracy & No Causation Overclaim**
  - Confirm the review was legitimately removed or made unavailable by the platform.
  - Use neutral outcome labels (e.g., "Review no longer available" or "Removed following policy report").
  - Do NOT use prohibited buzzwords ("fake", "defamatory", "false", "illegal") in public-facing captions unless legally verified.
  - Mark `redacted: true` in `src/data/removalProof.ts`.

---

## Data Entry Template (`src/data/removalProof.ts`)

```typescript
{
  id: 'google-proof-01',
  platform: 'Google',
  image: '/proof/google-removal-01.png',
  alt: 'Google Maps review page showing a removed review; client details hidden',
  caption: 'Google Maps review removed following content policy dispute.',
  verifiedOn: 'October 2026',
  outcomeLabel: 'Review no longer available',
  clientConsent: true,
  redacted: true,
}
```
