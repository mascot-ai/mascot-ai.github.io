// Narration for the three product demo videos. One source for the voiceover
// (scripts/demo-video/record.mjs reads `say`) and the on-page transcript.
// Keep every claim true of the shipped app; the counselor video follows docs/counselor/SPEC.md.
export const DEMO_VIDEOS = {
  student: {
    id: 'student',
    title: 'Mascot AI for students',
    audience: 'Students',
    summary: 'Follow Maya, a junior, from a voice conversation to a college list, essays and a deadline plan.',
    segments: [
      { id: 'dashboard', say: "This is Mascot AI, your AI college counselor. Meet Maya, a junior who wants to study computer science. This is her dashboard: how far along her profile is, her matches, her essays, and what is coming up." },
      { id: 'talk', say: "Maya builds her profile by talking. Instead of filling out forms, she has a voice conversation with Mascot about her activities, what she is proud of, and what she wants from college. Mascot listens, takes notes, and turns the conversation into a story she can write from." },
      { id: 'profile', say: "Her profile fills in as she talks: grades, test scores, activities, honors, and the story behind them. She can edit any of it at any time." },
      { id: 'matches', say: "From that profile, Mascot builds a college list and sorts it into reach, target and safety. Every school comes with the reasons it fits and an estimate of her chances." },
      { id: 'universities', say: "She can also search thousands of schools. Saving a school is always free, and saved schools feed her planner." },
      { id: 'essays', say: "Her essays live here. Mascot suggests what to write about, checks a draft against the school it is for, and flags grammar. It never writes the essay for her." },
      { id: 'planner', say: "The planner keeps every deadline in one place: supplements, test dates and scholarships." },
      { id: 'counselors', say: "If Maya works with a private counselor, she links with them here and chooses exactly what they can see. She can change that, or end the link, whenever she wants." },
      { id: 'outro', say: "Writing is always free. Start with the free plan at mascot a i dot com." },
    ],
  },
  parent: {
    id: 'parent',
    title: 'Mascot AI for parents',
    audience: 'Parents',
    summary: "See what a student shares, follow their progress and manage their plan, without running the process.",
    segments: [
      { id: 'dashboard', say: "This is the parent dashboard. Linda is Maya's mom. She sees each student she is linked to and how far along they are." },
      { id: 'overview', say: "Open a student to see where things stand: how complete the profile is, how many schools are matched, essays in progress, and recent activity. It is read only: parents can look, but they cannot edit. From here a parent can also manage the student's plan and billing." },
      { id: 'matches', say: "Matches show the reach, target and safety schools Mascot picked, and why." },
      { id: 'essays', say: "Essays show every draft and, when the student allows it, the feedback from their counselor." },
      { id: 'planner', say: "The planner shows the deadlines coming up, so nothing catches the family by surprise." },
      { id: 'outro', say: "The student stays in charge. They decide what each parent sees, and they can change it at any time. Parents can suggest schools for the list, too." },
    ],
  },
  counselor: {
    id: 'counselor',
    title: 'Mascot AI for counselors',
    audience: 'Counselors',
    summary: 'Run a private counseling practice with students who arrive already prepared.',
    segments: [
      { id: 'today', say: "This is Mascot for counselors. Dana runs Bright Path Admissions. Today shows what needs her attention: essays waiting for review, requests to join, deadlines coming up, and students by stage." },
      { id: 'students', say: "Students join by invitation or with a join code, and they always approve the link. Each student chooses what they share with you." },
      { id: 'student', say: "Open Maya and you see her profile, matches, essays and planner. Mascot built that record from her conversations, so you know who she is before your first meeting." },
      { id: 'notes', say: "Add notes for yourself or your team, set a stage, and see who else works with her." },
      { id: 'review', say: "Essays arrive in a review queue. Comment on a highlight, or suggest a rewrite. Mascot never writes the student's essay, and neither do you, unless the student turns on direct editing. Every edit is attributed." },
      { id: 'colleges', say: "Search any school, keep notes your team can share, see which of your students saved it or were matched to it, and recommend it to a student with a reason." },
      { id: 'team', say: "Teams add counselors with different roles, and assign each student a primary counselor." },
      { id: 'reports', say: "Reports show outcomes by school without naming a student, and your records export as spreadsheets." },
      { id: 'billing', say: "You can pay for the AI of the students who need it from one monthly pool, and the rest keep using their own plan." },
      { id: 'outro', say: "Scout is free for one student. See plans for your practice at mascot a i dot com slash counselors." },
    ],
  },
};

// The voiceover spells the site out so the voice says it right; captions and transcripts write it normally.
export const captionText = (say) =>
  say.replace('mascot a i dot com slash counselors', 'mascot-ai.com/counselors').replace('mascot a i dot com', 'mascot-ai.com');
