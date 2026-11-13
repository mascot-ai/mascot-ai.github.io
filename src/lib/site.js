// Shared external links + copy constants. One place to change them.
export const APP_LOGIN_URL = 'https://app.mascot-ai.com';
export const APP_REGISTER_URL = 'https://app.mascot-ai.com/register';
// Register link tagged so GA4 can attribute signups to the page/CTA that sent them.
export const registerUrl = (content) =>
  `${APP_REGISTER_URL}?utm_source=website&utm_medium=cta&utm_content=${encodeURIComponent(content)}`;
export const CONTACT_EMAIL = 'team@mascot-ai.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/mascotailabs/';
export const TIKTOK_URL = 'https://www.tiktok.com/@mascotailabsinc';
export const TOTAL_UNIVERSITIES = '4,800+';
export const BRAND = 'Mascot AI College Coach';
export const SITE_ORG_ID = 'https://mascot-ai.com/#org';

// GA4 Measurement ID for the "Mascot AI Website" property (account "Mascot AI").
// The tag only loads in production builds (see BaseLayout).
export const GA_ID = 'G-YFSFMPDLCH';

export const NAV_LINKS = [
  { href: '/features/', label: 'For Students' },
  { href: '/parents/', label: 'For Parents' },
  { href: '/counselors/', label: 'For Counselors' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/blog/', label: 'Guides' },
  { href: '/about/', label: 'About' },
];

// Prices and limits from project_counselor_backend/scripts/seed_platform_config.py
// (platform_config v3.1.0). Explorer: 5 Match Scores, 15 voice coaching minutes, 2 coach
// credits for life, 1 match run a month. Navigator: 20 Match Scores, 60 voice coaching
// minutes, 5 coach credits a month, unlimited match runs. Saving schools is free.
export const PRICING = {
  navigatorMonthly: '$39.99',
  navigatorSemiannual: '$199.99', // ~$33.33/mo
  navigatorAnnual: '$383.88', // ~$31.99/mo
  sixMonthPass: '$199.99', // one time, never renews
  navigatorLive: true, // Navigator is purchasable (live with the prod launch)
};

// One-time bundles for any student. They never expire.
export const PACKS = [
  { name: 'Essay Pack', price: '$19', grants: '2 coach credits and 15 voice coaching minutes' },
  { name: '4 Essay Pack', price: '$49', grants: '8 coach credits and 60 voice coaching minutes' },
];

// Top-ups for students on a paid plan.
export const ADDONS = [
  { name: '+10 Match Scores', price: '$9.99', grants: '10 Match Scores: your odds at 10 more schools' },
  { name: '+30 voice coaching minutes', price: '$19.99', grants: '30 voice coaching minutes' },
  { name: '+1 match run', price: '$3.99', grants: '1 match run' },
  { name: '+10 coach credits', price: '$19.99', grants: '10 coach credits: essay feedback, analysis, grammar' },
];

// Narrative topics Mascot tracks in conversation. Labels verbatim from
// counselor-frontend/src/utils/narrativeTopics.js (NARRATIVE_TOPIC_LABELS).
export const STORY_TOPICS = [
  'Proudest Accomplishment',
  'Leadership Experience',
  'Biggest Challenge',
  'Community Impact',
  'Future Goals',
  'Dream School',
  'Schools to Avoid',
];
