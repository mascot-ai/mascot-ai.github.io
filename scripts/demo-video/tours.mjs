// What the cursor does while each narration segment plays. Keys match src/data/demoVideos.js segment ids.
// `h` is the helper bag from record.mjs: nav(label), click(locator), scroll(px), wait(ms), goto(path), ids.
export const ACCOUNTS = {
  student: 'maya.chen@mascot-ai.com',
  parent: 'parent.chen@mascot-ai.com',
  counselor: 'demo.counselor@mascot-ai.com',
};

export const TOURS = {
  student: {
    dashboard: async (h) => { await h.wait(1200); await h.scroll(260); await h.wait(600); await h.scroll(-260); },
    talk: async (h) => { await h.nav('Talk to Mascot'); await h.wait(1500); },
    profile: async (h) => { await h.nav('My Profile'); await h.wait(1200); await h.scroll(420); await h.wait(500); await h.scroll(420); },
    matches: async (h) => { await h.nav('My Matches'); await h.wait(1300); await h.scroll(520); await h.wait(600); await h.scroll(300); },
    universities: async (h) => { await h.nav('Universities'); await h.wait(1200); await h.click(h.page.getByPlaceholder(/Search by university/i)); await h.page.keyboard.type('Stanford', { delay: 110 }); await h.page.keyboard.press('Enter'); await h.wait(2200); },
    essays: async (h) => { await h.nav('Essays'); await h.wait(1500); await h.click(h.page.getByText('Stanford: why this school').first()); await h.wait(2500); },
    planner: async (h) => { await h.nav('Planner'); await h.wait(1500); await h.scroll(300); },
    counselors: async (h) => { await h.nav('Counselors'); await h.wait(1800); },
    outro: async (h) => { await h.nav('Dashboard'); await h.wait(1500); },
  },
  parent: {
    dashboard: async (h) => { await h.wait(1500); },
    overview: async (h) => { await h.click(h.page.getByText('Maya Chen').first()); await h.wait(2000); await h.scroll(380); await h.wait(500); await h.scroll(-380); },
    matches: async (h) => { await h.tab('Matches'); await h.wait(1200); await h.scroll(400); },
    essays: async (h) => { await h.tab('Essays'); await h.wait(1500); },
    planner: async (h) => { await h.tab('Planner'); await h.wait(1500); },
    outro: async (h) => { await h.tab('Overview'); await h.wait(1200); },
  },
  counselor: {
    today: async (h) => { await h.wait(1500); await h.scroll(300); },
    students: async (h) => { await h.nav('Students'); await h.wait(1500); await h.scroll(300); },
    student: async (h) => { await h.click(h.page.getByText('Maya Chen').first()); await h.wait(1500); await h.tab('Profile'); await h.wait(900); await h.tab('Matches'); await h.wait(900); await h.tab('Essays'); await h.wait(900); },
    notes: async (h) => { await h.tab('Notes'); await h.wait(2500); await h.tab('Overview'); await h.wait(800); await h.scroll(300); },
    review: async (h) => { await h.nav('Reviews'); await h.wait(1500); await h.goto(`/app/reviews/${h.ids.returnedRound}`); await h.wait(3500); },
    colleges: async (h) => { await h.nav('Universities'); await h.wait(900); await h.click(h.page.getByPlaceholder(/Search by university/i)); await h.page.keyboard.type('Stanford', { delay: 80 }); await h.page.keyboard.press('Enter'); await h.wait(1300); await h.click(h.page.getByRole('button', { name: /View School Details/i }).first()); await h.wait(1200); await h.click(h.page.getByText('Saved by', { exact: true }).first()); await h.wait(1800); await h.page.keyboard.press('Escape'); await h.wait(400); },
    team: async (h) => { await h.nav('Team'); await h.wait(2500); },
    reports: async (h) => { await h.nav('Reports'); await h.wait(2000); await h.scroll(300); },
    billing: async (h) => { await h.nav('AI usage'); await h.wait(2800); },
    outro: async (h) => { await h.nav('Today'); await h.wait(1200); },
  },
};
