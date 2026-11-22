// Narration for the three product demo videos. One source for the voiceover
// (scripts/demo-video/record.mjs reads `say`) and the on-page transcript. Entries with `external: true` are
// produced elsewhere and only use `say` as the transcript.
// Keep every claim true of the shipped app; the counselor video follows docs/counselor/SPEC.md.
export const DEMO_VIDEOS = {
  student: {
    id: 'student',
    title: 'Mascot AI for students',
    audience: 'Students',
    summary: 'A three minute tour: build a profile by talking, find schools that fit, coach your essays and keep every deadline.',
    // Produced outside this repo (music, on-screen text, no narration). `say` is the text alternative for the
    // transcript; record.mjs refuses to re-record it and the player shows no caption track.
    external: true,
    uploaded: '2026-11-20',
    segments: [
      { id: 'intro', say: "Mascot AI, your college coach, working alongside your counselor. Thousands of schools. A stack of essays. Four things it does: builds your profile, finds schools that fit, coaches your essays, and keeps you on deadline." },
      { id: 'profile', say: "Build your profile. Talk to Mascot in a 10-minute voice conversation that builds your profile as you speak, or type your answers. Your story is kept in your own words, with a Story Map of the experiences you have shared and how they connect. One dashboard shows your matches, favorites, profile and next steps." },
      { id: 'schools', say: "Find schools that fit. Mascot compares your profile against thousands of universities and sorts your matches into reach, target and safety, each with a match percentage, an estimated chance of admission and the reasons it fits. It shows your strengths and gives specific tips to improve your odds. You can also search and filter by state, type, level, enrollment, tuition and admission rate, and see admissions, costs and graduate outcomes before you apply." },
      { id: 'essays', say: "Coach your essays. Write in the essay workspace. Mascot reads your story, your prompt and the school, then says what fits and what to explore, with feedback on strengths, grammar and prompt relevance. You can brainstorm story ideas by voice or text." },
      { id: 'deadlines', say: "Stay on deadline. Each saved school becomes a checklist: essays, fee, transcript and submit. One timeline tracks tests and recommenders, and you can export deadlines to your calendar. Link with a counselor using a join code. Counselors see only what you share." },
      { id: 'outro', say: "What you just saw: a profile built from your own story, matches with reasons, an essay coach that reads your draft, a planner for every deadline, and your counselor in the loop. Build your profile. Find your fit. Write essays that sound like you. Start at app.mascot-ai.com." },
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
      { id: 'billing', say: "You can pay for the coaching of the students who need it from one monthly pool, and the rest keep using their own plan." },
      { id: 'outro', say: "Scout is free for one student. See plans for your practice at mascot a i dot com slash counselors." },
    ],
  },
};

// The voiceover spells the site out so the voice says it right; captions and transcripts write it normally.
export const captionText = (say) =>
  say.replace('mascot a i dot com slash counselors', 'mascot-ai.com/counselors').replace('mascot a i dot com', 'mascot-ai.com');
