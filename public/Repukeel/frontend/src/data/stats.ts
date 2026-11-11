export interface StatItem {
  id: string;
  value: string;
  label: string;
  basis: string;
  asOf: string;
  sourceUrl?: string;
  status: 'verified' | 'unverified';
  softenedWording?: string;
}

/**
 * Single source of truth for site-wide statistics and metrics.
 * Note: Visible numbers remain unchanged until first-party evidence
 * or third-party profiles are provided and approved.
 */
export const stats: Record<string, StatItem> = {
  contentRemoved: {
    id: 'content-removed',
    value: '500K+',
    label: 'Content Pieces Removed',
    basis: 'Unverified - awaiting first-party case records from client',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Extensive Content Pieces Removed',
  },
  clientsProtected: {
    id: 'clients-protected',
    value: '2K+',
    label: 'Clients Protected',
    basis: 'Unverified - awaiting client count documentation',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Trusted by Businesses & Individuals',
  },
  successRate: {
    id: 'success-rate',
    value: '99%',
    label: 'Success Rate',
    basis: 'Unverified - awaiting case outcome logs',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'High Resolution Rate',
  },
  countriesCovered: {
    id: 'countries-covered',
    value: '150+',
    label: 'Countries Covered',
    basis: 'Unverified - awaiting geographic jurisdiction data',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'International Coverage',
  },
  responseTime: {
    id: 'response-time',
    value: '24h',
    label: 'Response Time',
    basis: 'Unverified - based on internal intake SLA',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Rapid Intake Response',
  },
  clientRating: {
    id: 'client-rating',
    value: '4.9★',
    label: 'Client Rating',
    basis: 'Unverified - pending Google Business Profile review confirmation',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Top-Rated by Clients',
  },
  googleReviews: {
    id: 'google-reviews',
    value: '4.96',
    label: '25 Reviews',
    basis: 'Unverified - pending exact Google Business Profile review URL',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Verified Client Reviews on Google',
  },
  platformsCovered: {
    id: 'platforms-covered',
    value: '20+',
    label: 'Platforms Covered',
    basis: 'Unverified - catalog lists 50+ subservices across 8 categories',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Major Search & Review Platforms Covered',
  },
  yearsExperience: {
    id: 'years-experience',
    value: '7+',
    label: 'Years of Experience',
    basis: 'Unverified - awaiting founding date documentation',
    asOf: '2026-10',
    status: 'unverified',
    softenedWording: 'Years of Proven Industry Experience',
  },
};

export default stats;
