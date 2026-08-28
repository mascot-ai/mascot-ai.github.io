// Shared external links + copy constants. One place to change them.
export const BETA_FORM_URL = 'https://forms.gle/Jbpa86AMPhssyeoi8';
export const APP_URL = 'https://dev.mascot-ai.com';
export const APP_LOGIN_URL = 'https://dev.mascot-ai.com';
export const CONTACT_EMAIL = 'pranrosh@gmail.com'; // TODO: branded address?
export const TOTAL_UNIVERSITIES = '4,800+';

export const NAV_LINKS = [
  { href: '/features/', label: 'Features' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
];

// Navigator tier limits from project_counselor_backend/scripts/seed_platform_config.py
// (config v1.1.0). Add-on prices set by the product team 2026-08-28 and supersede
// the seed values. Confirm the live platform_config before launch.
export const PRICING = {
  navigatorMonthly: '$39.99',
  navigatorAnnual: '$383.88', // ~$31.99/mo
  navigatorLive: false, // flip to true when the plus tier is purchasable
};

export const ADDONS = [
  { name: '+30 Voice Minutes', price: '$19.99', grants: '30 voice minutes' },
  { name: 'AI Credit', price: '$1.99', grants: 'one AI action: essay help, analysis, and more' },
  { name: '+1 AI Match Run', price: '$3.99', grants: '1 match run' },
  { name: '+10 School Saves', price: '$9.99', grants: '10 saved-school slots' },
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
