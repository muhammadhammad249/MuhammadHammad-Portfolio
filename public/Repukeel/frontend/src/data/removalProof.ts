export interface RemovalProofEntry {
  id: string;
  platform: 'Google' | 'Trustpilot';
  image: string;
  alt: string;
  caption: string;
  verifiedOn: string;
  outcomeLabel: string;
  clientConsent: boolean;
  redacted: boolean;
}

/**
 * Proof of Review Removals data store.
 * Starts EMPTY by default.
 * Entries only render when clientConsent === true, redacted === true,
 * and the image file actually exists in public/.
 */
export const removalProofEntries: RemovalProofEntry[] = [];

export default removalProofEntries;
