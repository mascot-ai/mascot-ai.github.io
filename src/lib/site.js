// Shared external links + copy constants. One place to change them.
export const BETA_FORM_URL = 'https://forms.gle/Jbpa86AMPhssyeoi8';
export const APP_URL = 'https://dev.mascot-ai.com';
export const APP_LOGIN_URL = 'https://dev.mascot-ai.com';
export const CONTACT_EMAIL = 'pranrosh@gmail.com'; // TODO: branded address?
export const TOTAL_UNIVERSITIES = '4,800+';

// GA4 Measurement ID for the "Mascot AI Website" property (account "Mascot AI").
// The tag only loads in production builds (see BaseLayout).
export const GA_ID = 'G-YFSFMPDLCH';

export const NAV_LINKS = [
  { href: '/features/', label: 'For Students' },
  { href: '/parents/', label: 'For Parents' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
];

// Navigator tier limits from project_counselor_backend/scripts/seed_platform_config.py
// (platform_config v2.0.0: four meters -- school_saves/voice_minutes/match_runs/
// ai_credits). Confirm the live platform_config before launch.
export const PRICING = {
  navigatorMonthly: '$39.99',
  navigatorAnnual: '$383.88', // ~$31.99/mo
  navigatorLive: false, // flip to true when the plus tier is purchasable
};

export const ADDONS = [
  { name: '+10 school saves', price: '$9.99', grants: '10 school saves' },
  { name: '+30 voice minutes', price: '$19.99', grants: '30 voice minutes' },
  { name: '+1 AI match run', price: '$3.99', grants: '1 match run' },
  { name: '+10 AI credits', price: '$9.99', grants: '10 AI actions: essay help, analysis, grammar' },
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
