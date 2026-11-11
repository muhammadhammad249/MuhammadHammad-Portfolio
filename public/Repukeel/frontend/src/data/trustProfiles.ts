import { socialBrands } from './socialBrands';

export interface TrustProfile {
  name: string;
  label: string;
  url: string;
}

export interface TrustProfilesConfig {
  linkedin: TrustProfile;
  googleReviews: TrustProfile;
}

/**
 * Trust profile links (E-E-A-T).
 * Note: googleReviews.url is intentionally left empty until the exact
 * Google Business Profile review URL is supplied by the user.
 * The UI renders links only when url is non-empty.
 */
export const trustProfiles: TrustProfilesConfig = {
  linkedin: {
    name: 'LinkedIn',
    label: 'RepuKeel on LinkedIn',
    url: socialBrands.linkedin.href,
  },
  googleReviews: {
    name: 'Google Reviews',
    label: 'Read our Google reviews',
    url: '', // Must remain empty until exact URL is provided
  },
};

export default trustProfiles;
