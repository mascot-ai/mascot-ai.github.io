// Shared external links + copy constants. One place to change them.
export const BETA_FORM_URL = 'https://forms.gle/Jbpa86AMPhssyeoi8';
export const APP_URL = 'https://dev.mascot-ai.com';
export const APP_LOGIN_URL = 'https://dev.mascot-ai.com';
export const CONTACT_EMAIL = 'pranrosh@gmail.com'; // TODO: branded address?
export const TOTAL_UNIVERSITIES = '4,800+';

export const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

// From project_counselor_backend/scripts/seed_platform_config.py (config v1.1.0).
// Confirm against the live platform_config collection before launch.
export const PRICING = {
  navigatorMonthly: '$39.99',
  navigatorAnnual: '$383.88', // ~$31.99/mo
  navigatorLive: false, // flip to true when the plus tier is purchasable
};

export const ADDONS = [
  { name: '+30 Voice Minutes', price: '$4.99', grants: '30 voice minutes' },
  { name: '+1 AI Match Run', price: '$2.99', grants: '1 match run' },
  { name: 'Essay AI Slot', price: '$9.99', grants: '10 essay suggestions' },
  { name: '+10 University Save Slots', price: '$0.99', grants: '10 save slots' },
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
