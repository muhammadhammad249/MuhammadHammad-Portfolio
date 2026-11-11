export interface PlatformPreset {
  id: string;
  name: string;
  domain: string;
}

export interface GoalPreset {
  id: string;
  label: string;
  modifier: string;
  suggestedPlatformIds: string[];
}

export const PLATFORMS: PlatformPreset[] = [
  { id: 'instagram', name: 'Instagram', domain: 'instagram.com' },
  { id: 'facebook', name: 'Facebook', domain: 'facebook.com' },
  { id: 'x', name: 'X', domain: 'x.com' },
  { id: 'tiktok', name: 'TikTok', domain: 'tiktok.com' },
  { id: 'youtube', name: 'YouTube', domain: 'youtube.com' },
  { id: 'reddit', name: 'Reddit', domain: 'reddit.com' },
  { id: 'linkedin', name: 'LinkedIn', domain: 'linkedin.com' },
  { id: 'pinterest', name: 'Pinterest', domain: 'pinterest.com' },
  { id: 'telegram', name: 'Telegram', domain: 't.me' },
  { id: 'amazon', name: 'Amazon', domain: 'amazon.com' },
  { id: 'ebay', name: 'eBay', domain: 'ebay.com' },
  { id: 'etsy', name: 'Etsy', domain: 'etsy.com' },
  { id: 'aliexpress', name: 'AliExpress', domain: 'aliexpress.com' },
];

export const GOAL_PRESETS: GoalPreset[] = [
  {
    id: 'impersonation',
    label: 'Impersonation or fake profiles',
    modifier: '(fake OR impersonator OR unofficial)',
    suggestedPlatformIds: ['instagram', 'facebook', 'x', 'tiktok', 'telegram'],
  },
  {
    id: 'copied-content',
    label: 'Copied or stolen content',
    modifier: '(stolen OR leak OR pirated OR reupload)',
    suggestedPlatformIds: ['telegram', 'reddit', 'youtube', 'tiktok'],
  },
  {
    id: 'counterfeit',
    label: 'Counterfeit or marketplace misuse',
    modifier: '(replica OR counterfeit OR fake OR knockoff)',
    suggestedPlatformIds: ['amazon', 'ebay', 'etsy', 'aliexpress'],
  },
  {
    id: 'complaints',
    label: 'Complaints and scam mentions',
    modifier: '(scam OR fraud OR rip-off OR complaint)',
    suggestedPlatformIds: ['reddit', 'x', 'youtube'],
  },
];
