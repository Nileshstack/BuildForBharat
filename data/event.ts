export const REGISTER_URL =
  "https://unstop.com/p/build-for-bharat-2026-software-hardware-hackathon-kiet-group-of-institutions-delhi-ncr-1767548";
export const REGISTRATION_OPEN = true;
export const registrationDeadline = "2026-10-15T23:59:00+05:30";
export const registrationMode: "manual" | "auto" = "manual";

export type ScheduleType = "ceremony" | "build" | "break" | "eval" | "fun" | "night";
export type FAQCategory = "General" | "Teams" | "Submission" | "Venue" | "Judging";

export interface EventData {
  name: string;
  heroLabel: string;
  heroRotator: string[];
  tagline: string;
  subtitle: string;
  aboutIntro: string;
  location: string;
  pillars: Array<{ title: string; description: string }>;
  closingQuote: string;
  organisers: string[];
  venue: string;
  dates: { start: string; end: string; display: string };
  duration: string;
  format: string;
  rounds: string;
  fee: string;
  prizePool: string;
  teamSize: { min: number; max: number; note: string };
  expectedTeams: string;
  stages: Array<{
    name: string;
    start: string;
    end: string;
    description: string;
    evaluationCriteria?: string[];
  }>;
  finaleFormat: { presentationMinutes: number; questionMinutes: number };
  daySchedule: Array<{
    day: string;
    date: string;
    items: Array<{ start: string; end: string | null; label: string; type: ScheduleType }>;
  }>;
  speakerSessions: Array<{ phase: string; title: string }>;
  tracks: Array<{
    name: string;
    description: string;
    examples: string[];
    focus: string[];
    evaluationFocus: string;
  }>;
  trackRule: string;
  innovationAreas: Array<{ title: string; description: string }>;
  aiChallenge: {
    principle: string;
    aiIdeas: string[];
    mlIdeas: string[];
    chain: string[];
  };
  judging: {
    weights: Array<{ parameter: string; hardware: number; software: number }>;
    corePrinciple: string;
  };
  deliverables: { items: string[]; note: string };
  finalRoundMustExplain: string[];
  designPrinciples: Array<{ title: string; description: string }>;
  generalRules: Array<{ title: string; detail: string; isPlaceholder: boolean }>;
  techGuidance: { note: string; categories: Array<{ name: string; suggestions: string[] }> };
  objectives: Array<{ title: string; description: string }>;
  eligibility: string;
  prizes: { perTrack: Array<{ place: string; amount: string }>; additional: string };
  faqs: Array<{ question: string; answer: string; category: FAQCategory; isPlaceholder: boolean }>;
  contacts: Array<{ role: string; name: string; value: string; isPlaceholder: boolean }>;
  organiserCards: Array<{ name: string; description: string; linkLabel: string; url: string | null; isPlaceholder: boolean }>;
  problemStatements: {
    revealAt: string;
    items: Array<{ id: string; track: string; title: string; description: string }>;
  };
}

export const event: EventData = {
  name: "Build for Bharat 2026",
  heroLabel: "A National-Level Hackathon",
  heroRotator: [
    "Reimagining services with AI",
    "Reimagining services with IoT",
    "Reimagining services with Hardware",
    "Reimagining services with Software",
    "Reimagining services with UI-UX",
  ],
  tagline: "Design. Innovate. Integrate.",
  subtitle: "Reimagining Government Digital Services for the Next Billion Citizens",
  aboutIntro:
    "Build for Bharat brings diverse student teams together to rethink public services and turn citizen-first ideas into working solutions.",
  location: "Ghaziabad, UP",
  pillars: [
    { title: "Design", description: "Understand citizens first, then shape clear, accessible experiences around their needs." },
    { title: "Innovate", description: "Explore purposeful software, hardware, and intelligent approaches to real challenges." },
    { title: "Integrate", description: "Connect ideas, people, and technology into solutions built to make a difference." },
  ],
  closingQuote: "Understand the Problem. Innovate with Technology. Build with Purpose. Create Impact.",
  organisers: ["KML × Technocrats Club", "KIET Deemed to be University, Ghaziabad"],
  venue: "Central Library (1st Floor) & Auditorium",
  dates: {
    start: "2026-10-30T09:00:00+05:30",
    end: "2026-10-31T14:00:00+05:30",
    display: "30–31 Oct 2026",
  },
  duration: "~30 hours",
  format: "Offline",
  rounds: "Multi-round",
  fee: "₹249",
  prizePool: "₹1,20,000",
  teamSize: { min: 2, max: 4, note: "Confirm team size before publishing." },
  expectedTeams: "60-70",
  stages: [
    {
      name: "PPT Submission & Screening",
      start: "2026-10-08T14:00:00+05:30",
      end: "2026-10-15T00:00:00+05:30",
      description: "Submit a proposal for initial screening.",
      evaluationCriteria: [
        "Problem relevance",
        "Innovation",
        "Feasibility",
        "Potential citizen impact",
      ],
    },
    {
      name: "Offline Shortlisting",
      start: "2026-10-30T10:00:00+05:30",
      end: "2026-10-30T20:01:00+05:30",
      description:
        "Choose a track, research the problem and users, define the solution, and build a prototype. Submit problem analysis, workflow, architecture, design, and a functional prototype; the mid-event jury shortlists teams.",
    },
    {
      name: "Finale",
      start: "2026-10-30T20:30:00+05:30",
      end: "2026-10-31T10:00:00+05:30",
      description:
        "Present for 10 minutes with a live demo, followed by 4 minutes of jury Q&A. The top 3 teams per track win.",
    },
  ],
  finaleFormat: { presentationMinutes: 10, questionMinutes: 4 },
  daySchedule: [
    {
      day: "Day 1",
      date: "2026-10-30",
      items: [
        { start: "2026-10-30T09:00:00+05:30", end: "2026-10-30T09:30:00+05:30", label: "Final Reporting & Check-in", type: "ceremony" },
        { start: "2026-10-30T09:30:00+05:30", end: "2026-10-30T11:00:00+05:30", label: "Inauguration: welcome, briefing, and keynotes", type: "ceremony" },
        { start: "2026-10-30T11:20:00+05:30", end: "2026-10-30T11:20:00+05:30", label: "Round 1 begins; problem statements released", type: "build" },
        { start: "2026-10-30T11:20:00+05:30", end: "2026-10-30T14:00:00+05:30", label: "Build Phase I", type: "build" },
        { start: "2026-10-30T14:00:00+05:30", end: "2026-10-30T15:00:00+05:30", label: "Lunch", type: "break" },
        { start: "2026-10-30T15:00:00+05:30", end: "2026-10-30T17:00:00+05:30", label: "Build Phase II", type: "build" },
        { start: "2026-10-30T17:00:00+05:30", end: "2026-10-30T18:30:00+05:30", label: "Round 1 Evaluation", type: "eval" },
        { start: "2026-10-30T18:30:00+05:30", end: "2026-10-30T19:00:00+05:30", label: "Round 1 Results & Shortlisting", type: "eval" },
        { start: "2026-10-30T19:00:00+05:30", end: "2026-10-30T21:00:00+05:30", label: "Build Phase III", type: "build" },
        { start: "2026-10-30T21:00:00+05:30", end: "2026-10-30T22:00:00+05:30", label: "Dinner", type: "break" },
        { start: "2026-10-30T22:00:00+05:30", end: "2026-10-30T23:30:00+05:30", label: "Cultural Evening", type: "fun" },
        { start: "2026-10-30T23:30:00+05:30", end: "2026-10-31T07:00:00+05:30", label: "Night Arc: overnight build", type: "night" },
      ],
    },
    {
      day: "Day 2",
      date: "2026-10-31",
      items: [
        { start: "2026-10-31T00:00:00+05:30", end: "2026-10-31T07:00:00+05:30", label: "Night Arc continues", type: "night" },
        { start: "2026-10-31T07:00:00+05:30", end: "2026-10-31T09:00:00+05:30", label: "Breakfast", type: "break" },
        { start: "2026-10-31T09:00:00+05:30", end: "2026-10-31T10:30:00+05:30", label: "Final Evaluation: jury, presentations, and live demos", type: "eval" },
        { start: "2026-10-31T10:30:00+05:30", end: "2026-10-31T11:00:00+05:30", label: "Jury Deliberation", type: "eval" },
        { start: "2026-10-31T11:00:00+05:30", end: "2026-10-31T14:00:00+05:30", label: "Expert Sessions & Closing Ceremony: results and awards", type: "ceremony" },
      ],
    },
  ],
  speakerSessions: [
    { phase: "Inauguration", title: "AI, Emerging Technologies & Innovation: Building the Future with Technology" },
    { phase: "Inauguration", title: "Software & Hardware: From Ideas to Working Solutions" },
    { phase: "Before results", title: "Product & Innovation: From Idea to Impact" },
    { phase: "Before results", title: "Technology & Future: Building Solutions for the Real World" },
  ],
  tracks: [
    {
      name: "Software",
      description:
        "Build digital services that help citizens access information, complete tasks, and connect with public systems through thoughtful software.",
      examples: ["Web/mobile apps", "AI-powered platforms", "Intelligent systems", "Automation tools", "Data-driven apps"],
      focus: ["Problem understanding", "Originality", "Innovation", "Functionality", "UX", "Scalability", "Applicability"],
      evaluationFocus:
        "Problem clarity, user experience, working functionality, responsible AI/ML use, scalability, and practical applicability.",
    },
    {
      name: "Hardware",
      description:
        "Prototype connected, embedded, and physical systems that respond to real citizen needs with useful sensing, automation, or assistive capability.",
      examples: ["IoT devices", "Smart/embedded systems", "Robotics", "Sensor-based systems", "Automation devices", "Assistive tech"],
      focus: ["Problem understanding", "Originality", "Hardware innovation", "Functional prototyping", "Engineering", "Reliability", "Applicability"],
      evaluationFocus:
        "Problem clarity, engineering quality, functional prototyping, reliability, originality, and practical applicability.",
    },
  ],
  trackRule:
    "Technology choice is unrestricted. The track defines the solution's primary nature and evaluation focus; a software solution may use hardware, and a hardware solution may use software.",
  innovationAreas: [
    { title: "AI & Intelligent Systems", description: "Apply AI and machine learning to make citizen services more useful and responsive." },
    { title: "Smart Hardware & IoT", description: "Connect sensors, devices, and physical systems to address real-world needs." },
    { title: "Human-Centred & Accessible Design", description: "Make public-facing services understandable and usable by more people." },
    { title: "Automation & Real-Time Solutions", description: "Reduce friction with timely information and reliable automated workflows." },
    { title: "Emerging Technology & Innovation", description: "Use emerging approaches thoughtfully to unlock practical new capabilities." },
  ],
  aiChallenge: {
    principle: "AI must solve a clearly identified citizen problem, not act as a decorative chatbot.",
    aiIdeas: ["Chatbot", "Natural-language search", "Document summarisation", "Scheme recommendation", "Voice assistant", "Multilingual translation", "RAG assistant"],
    mlIdeas: ["Recommendation", "Service prediction", "Fraud/anomaly detection", "Document classification", "Behaviour analysis", "Intelligent prioritisation"],
    chain: ["Problem", "Data", "AI/ML Approach", "Output", "Real-World Benefits"],
  },
  judging: {
    weights: [
      { parameter: "Problem Understanding", hardware: 15, software: 15 },
      { parameter: "Design Quality", hardware: 20, software: 15 },
      { parameter: "AI/ML Innovation", hardware: 10, software: 20 },
      { parameter: "Functionality & Implementation", hardware: 15, software: 15 },
      { parameter: "Scalability & Practical Applicability", hardware: 5, software: 5 },
      { parameter: "Technical Feasibility", hardware: 15, software: 10 },
      { parameter: "Innovation & Creativity", hardware: 15, software: 15 },
      { parameter: "Presentation & Demo", hardware: 5, software: 5 },
    ],
    corePrinciple: "Functionality over concepts. Intelligence over complexity. Impact over Screens.",
  },
  deliverables: {
    items: ["UI/UX prototype", "Working frontend/backend", "APIs & data layer", "AI/ML component", "Hardware/IoT prototype", "Automation/cloud/real-time integration", "End-to-end app", "Deployment or demo environment", "Technical documentation & architecture"],
    note: "Not every solution needs every component.",
  },
  finalRoundMustExplain: ["Existing problem", "User research", "Problem reframing", "Proposed solution", "UI/UX or hardware design", "Originality", "AI/ML integration", "Architecture", "Accessibility & inclusivity", "Expected citizen impact", "Live demo"],
  designPrinciples: [
    { title: "User-Centred", description: "Start from citizens' needs, contexts, and lived experiences." },
    { title: "Simple & Usable", description: "Make essential tasks clear, direct, and easy to complete." },
    { title: "Accessible & Inclusive", description: "Design for different abilities, languages, and levels of access." },
    { title: "Innovative", description: "Use original thinking to improve how a real problem is addressed." },
    { title: "Functional & Reliable", description: "Make the core experience work consistently, not only in a presentation." },
    { title: "Secure & Responsible", description: "Handle data and automated decisions with care and accountability." },
    { title: "Scalable & Practical", description: "Choose an approach that can work beyond a single demonstration." },
    { title: "Impact-Oriented", description: "Connect the solution to a measurable benefit for citizens." },
  ],
  generalRules: [
    { title: "Participant conduct", detail: "Organizer code-of-conduct details to be added.", isPlaceholder: true },
    { title: "Original work and attribution", detail: "Attribution and reuse guidance to be confirmed by organizers.", isPlaceholder: true },
    { title: "Tools and AI use", detail: "Tool-use and AI disclosure guidance to be confirmed by organizers.", isPlaceholder: true },
    { title: "Hardware safety", detail: "Safety guidance for physical prototypes to be added by organizers.", isPlaceholder: true },
    { title: "Submission and demo logistics", detail: "Final file formats and presentation instructions to be announced.", isPlaceholder: true },
  ],
  techGuidance: {
    note: "Suggestions only; technology choices are not mandatory.",
    categories: [
      { name: "Hardware/IoT/Embedded", suggestions: ["Microcontrollers", "Sensors", "Edge devices", "Embedded systems"] },
      { name: "Frontend", suggestions: ["Web applications", "Mobile applications", "Accessible interfaces"] },
      { name: "Backend", suggestions: ["APIs", "Databases", "Cloud services"] },
      { name: "AI/ML", suggestions: ["Machine learning", "Language models", "Computer vision", "Retrieval-augmented generation"] },
      { name: "Product Design", suggestions: ["User research", "Prototyping", "Interaction design"] },
    ],
  },
  objectives: [
    { title: "Understand Citizens", description: "Investigate the people and contexts behind a service challenge." },
    { title: "Reframe Problems", description: "Turn broad challenges into focused, testable problem statements." },
    { title: "Design Inclusive Services", description: "Create experiences that account for diverse needs and abilities." },
    { title: "Build Working Solutions", description: "Translate ideas into demonstrable software or hardware prototypes." },
    { title: "Apply Technology with Purpose", description: "Choose tools that directly support the intended citizen outcome." },
    { title: "Explore Responsible AI", description: "Use intelligent systems transparently and in service of a real need." },
    { title: "Collaborate Across Disciplines", description: "Bring varied skills together to solve connected challenges." },
    { title: "Measure Potential Impact", description: "Explain how a solution could improve access, quality, or reliability." },
  ],
  eligibility: "All UG/PG students, any stream.",
  prizes: {
    perTrack: [
      { place: "1st", amount: "₹25,000" },
      { place: "2nd", amount: "₹20,000" },
      { place: "3rd", amount: "₹15,000" },
    ],
    additional: "Participation certificates",
  },
  faqs: [
    { question: "What is Build for Bharat 2026?", answer: "A national-level hackathon focused on reimagining government digital services for the next billion citizens.", category: "General", isPlaceholder: false },
    { question: "When and where is the event?", answer: "The offline event takes place on 30–31 October 2026 at the Central Library (1st Floor) and Auditorium, KIET Deemed to be University, Ghaziabad.", category: "General", isPlaceholder: false },
    { question: "Who can participate and how large can a team be?", answer: "All undergraduate and postgraduate students from any stream are eligible. Teams are listed as 2–4 members; organizers should confirm this team-size detail.", category: "Teams", isPlaceholder: true },
    { question: "What should teams submit for the screening stage?", answer: "Submit a presentation covering the problem, relevance, innovation, feasibility, and potential citizen impact.", category: "Submission", isPlaceholder: false },
    { question: "When are the problem statements released?", answer: "Problem statements are scheduled to be revealed on 30 October 2026 at 11:20 AM IST.", category: "Submission", isPlaceholder: false },
    { question: "Is the hackathon online or offline?", answer: "The event is offline at the Central Library (1st Floor) and Auditorium, KIET Deemed to be University, Ghaziabad, UP.", category: "Venue", isPlaceholder: false },
    { question: "How are software and hardware projects evaluated?", answer: "Judges use track-specific weightings across problem understanding, design, innovation, implementation, feasibility, applicability, and presentation.", category: "Judging", isPlaceholder: false },
    { question: "What is the judging principle?", answer: "Functionality over concepts. Intelligence over complexity. Impact over Screens.", category: "Judging", isPlaceholder: false },
  ],
  contacts: [
    { role: "Student coordinator", name: "Name to be announced", value: "Contact details to be announced", isPlaceholder: true },
    { role: "Faculty coordinator", name: "Name to be announced", value: "Contact details to be announced", isPlaceholder: true },
  ],
  organiserCards: [
    { name: "KML", description: "Organizing team", linkLabel: "Website link to be added", url: null, isPlaceholder: true },
    { name: "Technocrats Club", description: "Student organizing club", linkLabel: "Website link to be added", url: null, isPlaceholder: true },
  ],
  problemStatements: {
    revealAt: "2026-10-30T11:20:00+05:30",
    items: [],
  },
};