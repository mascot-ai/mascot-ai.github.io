// Blog taxonomy + author. Imported by the /blog/ pages and the sitemap.

export const PILLARS = {
  'essay-topic': 'Essay topics',
  'college-list': 'Building a college list',
  profile: 'Your profile',
  timeline: 'Application timeline',
  'ai-admissions': 'AI and admissions',
};

// Anonymous byline. One place to change it: the post header, the author box, and
// the Article schema all read from here. Never add a person's name.
export const AUTHOR = {
  byline:
    'Written by the Mascot AI counseling team. Reviewed by a private school administrator with years of college advising experience.',
  bio: 'Team members hold roles at schools, so we describe them by role instead of by name. Facts are checked against primary sources such as the Common App, NCES College Navigator, and each college\'s admissions site. If you want to check the advice against someone you trust, that is the right instinct.',
  standardsPath: '/editorial-standards/',
};
