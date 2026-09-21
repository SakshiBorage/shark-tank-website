// One-off generator: produces server/seed.json from the exact seed() logic
// that used to live client-side in the .dc.html file's seed() function.
// Re-run with `node server/scripts/build-seed.mjs` if the seed data ever needs updating.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

function seed() {
  const M = [
    ['m1', 'Srija Chittaluru', 'CEO', ['Vision & narrative', 'Pitch delivery', 'Judge Q&A'], 'Owns the story arc end to end. Wants the final deck locked 48h before pitch.', 'Deep work'],
    ['m4', 'Aditya Verma', 'CGO', ['Growth strategy', 'GTM plan', 'Market sizing'], 'Owns TAM/SAM/SOM and the acquisition narrative in the deck.', 'Available'],
    ['m2', 'Dhiksha M', 'COO', ['Execution', 'Timeline', 'Standups'], 'Runs the daily standup at 9:15. Escalates blockers the same day.', 'Available'],
    ['m3', 'Swarna Nagasri Geethanjali', 'CFO', ['Financial model', 'Unit economics', 'Funding ask'], 'Model v2 needs the revised CAC from growth before it can be finalised.', 'Deep work'],
    ['m5', 'Sakshi Borage', 'CRO', ['Revenue model', 'Pricing', 'Partnerships'], 'Testing two pricing ladders against the survey panel.', 'In meetings'],
    ['m6', 'Almas Shaikh', 'CAIO', ['AI architecture', 'Product demo', 'Tech feasibility'], 'Demo must run offline on the presentation laptop. No live API calls on stage.', 'Deep work'],
    ['m7', 'Kushal Chaudhari', 'CRO', ['Customer research', 'Interviews', 'Competitor scan'], 'Second CRO on the team, focused on customer-side revenue evidence.', 'Available']
  ].map(([id, name, role, responsibilities, notes, status]) => ({ id, name, role, responsibilities, notes, status }));

  const P = [
    ['p1', 'Ideation', '2026-09-08', '2026-09-16', 'Done'],
    ['p2', 'Idea Approval', '2026-09-16', '2026-09-21', 'Active'],
    ['p3', 'Research & Validation', '2026-09-21', '2026-09-29', 'Upcoming'],
    ['p4', 'Build', '2026-09-29', '2026-10-05', 'Upcoming'],
    ['p5', 'Pitch Prep', '2026-10-05', '2026-10-09', 'Upcoming'],
    ['p6', 'Dry Runs', '2026-10-09', '2026-10-11', 'Upcoming'],
    ['p7', 'Presentation', '2026-10-12', '2026-10-12', 'Upcoming']
  ].map(([id, name, start, end, status]) => ({ id, name, start, end, status, notes: '' }));

  const D = [
    ['d1', 'Pitch Deck', 'm1', '2026-10-09', 'Drafting', 'Team review', 1, 'Master narrative deck, 12 slides max.'],
    ['d2', 'Financial Model', 'm3', '2026-10-02', 'Drafting', 'Not reviewed', 2, 'Three-year projection with unit economics tab.'],
    ['d3', 'Market Sizing Brief', 'm4', '2026-09-26', 'In Review', 'CEO review', 2, 'TAM/SAM/SOM with sources cited on every figure.'],
    ['d4', 'Product Demo', 'm6', '2026-10-07', 'Not Started', 'Not reviewed', 1, 'Offline build, 90 second happy path.'],
    ['d5', 'Customer Research Pack', 'm7', '2026-09-28', 'Drafting', 'Not reviewed', 1, '15 interviews, coded into three themes.'],
    ['d6', 'Revenue & Pricing Model', 'm5', '2026-10-03', 'Not Started', 'Not reviewed', 1, 'Two pricing ladders with take-rate assumptions.']
  ].map(([id, name, ownerId, due, status, review, version, notes]) => ({
    id, name, ownerId, due, status, review, version, notes,
    history: [`v${version} drafted · ${due}`]
  }));

  const T = [
    ['t1', 'Lock Money-Mitra problem statement', 'One paragraph, no jargon, that survives the judge question "who exactly is hurting today?".', 'm1', ['m4'], 'Review', 'High', '2026-09-14', '2026-09-17', [], 'd1'],
    ['t2', 'Submit idea for mentor approval', 'Package the one-pager and submit through the Odyssey portal before the approval window closes.', 'm2', ['m1'], 'In Progress', 'High', '2026-09-16', '2026-09-18', ['t1'], null],
    ['t3', 'TAM / SAM / SOM with cited sources', 'Bottom-up sizing for Indian retail investors holding idle savings balances.', 'm4', ['m3'], 'In Progress', 'High', '2026-09-15', '2026-09-19', [], 'd3'],
    ['t4', 'Run 15 customer interviews', 'Target salaried 25-40 with idle savings. Record objections verbatim.', 'm7', ['m5'], 'In Progress', 'High', '2026-09-14', '2026-09-22', [], 'd5'],
    ['t5', 'Competitor scan: 8 fintech products', 'Feature, fee and trust comparison. Note where each one loses users.', 'm7', [], 'Not Started', 'Medium', '2026-09-21', '2026-09-24', [], 'd5'],
    ['t6', 'Draft revenue model v1', 'Take-rate vs subscription. Show which one survives at 10k users.', 'm5', ['m3'], 'Not Started', 'High', '2026-09-22', '2026-09-26', ['t4'], 'd6'],
    ['t7', 'Unit economics: CAC & payback', 'Needs final acquisition-channel mix from growth before numbers can be trusted.', 'm3', ['m4'], 'Blocked', 'High', '2026-09-18', '2026-09-25', ['t3'], 'd2'],
    ['t8', 'AI feasibility note', 'What the recommendation engine can honestly do by Oct 5, and what we will not claim.', 'm6', [], 'Review', 'Medium', '2026-09-13', '2026-09-17', [], 'd4'],
    ['t9', 'Demo scope freeze', 'Pick the single 90 second flow. Everything else gets cut.', 'm6', ['m1'], 'Not Started', 'High', '2026-09-29', '2026-10-01', ['t8'], 'd4'],
    ['t10', 'GTM plan: first 1,000 users', 'Channel by channel with cost per channel and a two-week test plan.', 'm4', ['m5'], 'Not Started', 'High', '2026-09-24', '2026-09-30', ['t3'], 'd3'],
    ['t11', 'Deck skeleton (12 slides)', 'Slide titles only. Each slide gets one sentence it must prove.', 'm1', ['m2'], 'Not Started', 'Medium', '2026-10-01', '2026-10-04', ['t6', 't10'], 'd1'],
    ['t12', 'Financial model v2 review', 'CFO walks the team through assumptions line by line.', 'm3', ['m1', 'm5'], 'Not Started', 'Medium', '2026-10-02', '2026-10-05', ['t7'], 'd2'],
    ['t13', 'Dry run 1 with full deck', 'Timed, no notes, judges played by two members.', 'm2', ['m1', 'm4', 'm6'], 'Not Started', 'High', '2026-10-09', '2026-10-09', ['t11'], 'd1'],
    ['t14', 'Q&A prep: 20 hardest questions', 'Write the answer we would hate to be asked, then answer it.', 'm1', ['m3', 'm7'], 'Not Started', 'Medium', '2026-10-07', '2026-10-10', [], 'd1'],
    ['t15', 'Weekly progress summary to mentor', 'Two paragraphs: what moved, what is stuck.', 'm2', [], 'Done', 'Low', '2026-09-12', '2026-09-15', [], null]
  ].map(([id, title, desc, ownerId, collaborators, status, priority, start, due, deps, deliverableId]) => ({
    id, title, desc, ownerId, collaborators, status, priority, start, due, deps, deliverableId,
    notes: '', activity: [`Created 15 Sep · Dhiksha M`], lastEditedBy: 'Dhiksha M'
  }));

  const MS = [
    ['s1', 'Idea approved by mentor', '2026-09-21', 'm1', 'p2', 'Upcoming'],
    ['s2', 'Validation evidence complete', '2026-09-29', 'm7', 'p3', 'Upcoming'],
    ['s3', 'Financial model locked', '2026-10-05', 'm3', 'p4', 'Upcoming'],
    ['s4', 'Deck v1 complete', '2026-10-08', 'm1', 'p5', 'Upcoming'],
    ['s5', 'Final dry run passed', '2026-10-11', 'm2', 'p6', 'Upcoming'],
    ['s6', 'Shark Tank presentation', '2026-10-12', 'm1', 'p7', 'Upcoming']
  ].map(([id, title, date, ownerId, phaseId, status]) => ({ id, title, date, ownerId, phaseId, status, notes: '' }));

  const MT = [
    ['g1', 'Kickoff & role split', '2026-09-10', '18:30', ['m1','m2','m3','m4','m5','m6','m7'],
      'Roles, cadence, idea shortlist', 'Agreed on daily 9:15 standup and a Thursday deep-dive.',
      'Money-Mitra selected over two alternatives.', 'Each C-level writes their own responsibility list by Friday.'],
    ['g2', 'Idea pressure test', '2026-09-15', '19:00', ['m1','m2','m4','m7'],
      'Problem statement, who is hurting, why now', 'Problem statement still too broad. Narrowed to salaried 25-40 with idle savings.',
      'Narrow the target segment before sizing.', 'Aditya to redo sizing bottom-up; Kushal to add 5 more interviews.'],
    ['g3', 'Standup', '2026-09-16', '09:15', ['m1','m2','m3','m4','m5','m6','m7'],
      'Blockers before approval submission', 'CFO blocked on CAC. Demo scope still open.',
      'Submit for approval today even with model pending.', 'Dhiksha submits portal form by 14:00.']
  ].map(([id, title, date, time, attendees, agenda, notes, decisions, actionItems]) => ({
    id, title, date, time, attendees, agenda, notes, decisions, actionItems, followUps: ''
  }));

  const DEC = [
    ['x1', 'Go with Money-Mitra as the venture', '2026-09-10', 'm1', 'Strongest overlap between the team\'s finance and AI skills and a problem we can evidence with interviews in two weeks.', 'Campus logistics marketplace; AI study planner.', 'Commits research and demo effort to fintech. Regulatory questions become a standing risk.', 'Agreed'],
    ['x2', 'Narrow target to salaried 25-40 with idle savings', '2026-09-15', 'm4', 'Broad "everyone with a bank account" framing collapsed under questioning. This segment is reachable and has a measurable idle balance.', 'Students; small business owners.', 'Sizing and interview script both get rewritten. Interview count resets to 15.', 'Agreed'],
    ['x3', 'No live API calls during the demo', '2026-09-16', 'm6', 'Venue wifi is unreliable and a failed call on stage costs more than a slightly less impressive demo.', 'Live demo with mobile hotspot fallback.', 'Demo must be pre-seeded and run offline. Adds two days of build work.', 'Agreed'],
    ['x4', 'Hold pricing decision until interviews close', '2026-09-16', 'm5', 'Pricing set before willingness-to-pay evidence would be guesswork the judges will catch.', 'Pick take-rate now and defend it.', 'Revenue model v1 slips to Sep 26. Deck skeleton waits on it.', 'Proposed']
  ].map(([id, title, date, decidedBy, reasoning, alternatives, consequences, status]) => ({ id, title, date, decidedBy, reasoning, alternatives, consequences, status }));

  const LG = [
    ['l1', '2026-09-16', 'm2', 'Approval package submitted. CFO still blocked on CAC.',
      'Standup at 9:15 with all seven. Portal submission completed at 13:40.',
      'Idea submitted for mentor approval. Sizing rewrite underway.',
      'CFO cannot close unit economics until growth lands the channel mix. Demo scope still undefined.',
      'Mentor feedback window is 3 working days, not 1 — approval milestone moves to Sep 21.', 2, 1],
    ['l2', '2026-09-15', 'm4', 'Idea pressure test exposed a soft problem statement.',
      'Idea pressure test, 19:00, four attendees.',
      'Target segment narrowed to salaried 25-40 with idle savings.',
      'Old sizing work is unusable. Interview script needs rewriting.',
      'Two competitors already target this segment on trust, not returns.', 3, 1],
    ['l3', '2026-09-14', 'm7', 'First interviews run. Objection pattern is clearly trust, not returns.',
      'No formal meeting. Two async reviews.',
      'Interview guide v2 approved by CEO.',
      'Recruiting interviewees is slower than planned — 4 of 15 done.',
      'Every interviewee asked "where does my money actually sit?" unprompted.', 2, 0],
    ['l4', '2026-09-12', 'm2', 'Responsibilities locked for all seven roles.',
      'Deep dive, 90 minutes.',
      'Two CRO roles split: Sakshi on revenue model, Kushal on customer evidence.',
      'Overlap between the two CRO scopes caused duplicate work in week one.',
      'Odyssey rubric weights evidence higher than polish.', 4, 2]
  ].map(([id, date, author, happened, meetings, progress, problems, newInfo, created, completed]) => ({
    id, date, author, happened, meetings, progress, problems, newInfo, notes: '', created, completed
  }));

  const FB = [
    ['f1', "Users don't immediately understand why this is better than existing alternatives.", 'Internal review', '2026-09-15', 'Open'],
    ['f2', 'Mentor: the sizing needs a bottom-up build, not a top-down percentage of the market.', 'Mentor check-in', '2026-09-15', 'Open'],
    ['f3', 'Interviewees keep asking where their money physically sits — address custody on slide 4.', 'Customer interviews', '2026-09-14', 'Open'],
    ['f4', 'Deck opening was too slow in the first read-through. Lead with the problem.', 'Srija Chittaluru', '2026-09-12', 'Done']
  ].map(([id, text, source, date, status]) => ({ id, text, source, date, status }));

  const UP = [
    ['u1', 'm7', 'Finished 4 of 15 interviews. Trust, not returns, is the recurring objection.', 'On track', '2026-09-16T18:20'],
    ['u2', 'm3', 'Cannot close unit economics until growth lands the channel mix.', 'Blocked', '2026-09-16T11:05'],
    ['u3', 'm2', 'Approval package submitted through the portal.', 'Completed', '2026-09-16T13:45']
  ].map(([id, author, text, status, ts]) => ({ id, author, text, status, ts }));

  return {
    venture: { name: 'Money-Mitra', pitch: 'Make money from existing money', status: 'Pending approval' },
    overview: {
      mission: 'Help salaried Indians put idle savings to work without learning finance.',
      problem: 'Money sits idle in savings accounts earning below inflation. People know they are losing value but do not trust or understand the alternatives.',
      audience: 'Salaried professionals aged 25-40 in Indian metros with idle balances in savings accounts.',
      solution: 'A guided layer over existing accounts that moves idle balances into better-yielding, low-risk instruments with plain-language explanations.',
      value: 'Better returns on money you already have, without moving banks, picking funds, or learning jargon.',
      direction: 'Narrowing to one segment and proving willingness to pay before locking pricing. Idea still pending mentor approval.',
      updatedBy: 'Srija Chittaluru', updatedAt: '2026-09-16T09:40'
    },
    feedback: FB, updates: UP,
    presentation: '2026-10-12T10:00',
    currentUser: 'm4',
    members: M, phases: P, tasks: T, milestones: MS, meetings: MT, decisions: DEC, logs: LG, deliverables: D,
    activity: [
      { text: 'Dhiksha M submitted the idea for mentor approval', ts: '2026-09-16T13:40' },
      { text: 'Almas Shaikh logged decision: no live API calls during the demo', ts: '2026-09-16T10:20' },
      { text: 'Swarna Nagasri Geethanjali marked Unit economics: CAC & payback as Blocked', ts: '2026-09-16T09:30' },
      { text: 'Aditya Verma narrowed the target segment to salaried 25-40', ts: '2026-09-15T20:10' },
      { text: 'Kushal Chaudhari added 4 customer interviews to the research pack', ts: '2026-09-14T18:05' }
    ],
    todayOverride: null,
    savedAt: null
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'seed.json');
writeFileSync(outPath, JSON.stringify(seed(), null, 2) + '\n');
console.log('Wrote', outPath);
