export type Project = {
  slug: string;
  order: 1 | 2 | 3;
  name: string;
  tagline: string;
  liveUrl: string;
  githubUrl?: string; // Omitting or leaving undefined hides the GitHub button
  problem: string;
  solution: string;
  features: string[];
  techStack: { layer: string; technology: string }[];
  highlights: string[];
  screenshots: { src: string; alt: string }[];
  verified: boolean;
  layoutType: "desktop" | "mobile";
};

export const projects: Project[] = [
  {
    slug: "cleanmess",
    order: 1,
    name: "CleanMess",
    tagline: "4 roommates. 1 room. Zero excuses. Keep the room clean. Keep the responsibility fair.",
    liveUrl: "https://cleanmess-app.web.app/",
    problem: "In shared living spaces—hostels, PG flats—chore charts fail when roommates leave for weekends or breaks. Roommates remaining behind absorb an unfair workload, while absent roommates escape chores entirely. Upon return, they either escape accountability or are overwhelmed by backlogs.",
    solution: "CleanMess is a mobile-responsive task-management web app compiled to native Android via Capacitor. It is built around a custom Deterministic Chore Rotation & Backlog Tracking Engine that maintains fairness by rerouting chores during absences and charging backlog items to the absent roommate.",
    features: [
      "Deterministic daily rotation: Sweep daily, mop every 2 days, clean toilet every 7 days (Asia/Kolkata IST) cycling roommates in a strict, predictable sequence.",
      "Absence & coverage system: Re-routes absent roommates' chores to present roommates as 'Cover' tasks, while logging chores as backlogs for the absentee.",
      "Backlog capping: Fairness protection limits backlog to a one-week maximum (2 sweeps, 1 mop, 1 toilet = 4 duties max) to prevent impossible pile-ups.",
      "Backlog clearing: Returning roommates clear one backlog chore per day, are skipped in normal rotation while clearing, and automatically rejoin once backlog reaches zero.",
      "Role-based access controls for Manager and Roommate roles via Firebase Auth."
    ],
    techStack: [
      { layer: "Frontend", technology: "React 19 (TypeScript) + Vite" },
      { layer: "Styling", technology: "Tailwind CSS (mobile-first)" },
      { layer: "Mobile Packaging", technology: "Capacitor JS (native Android compilation)" },
      { layer: "Backend / DB", technology: "Firebase Firestore (real-time NoSQL)" },
      { layer: "Authentication", technology: "Firebase Authentication (role-based)" },
      { layer: "Dev Tooling", technology: "Local mock Firebase environment for offline testing" }
    ],
    highlights: [
      "Deterministic Scheduling Algorithm: Custom chore distribution and backlog priority re-integration logic engineered to prevent scheduling race conditions.",
      "Absence Coverage Tracker: Keeps track of chore shifts during leaves and maps cover duties cleanly without chore loss."
    ],
    screenshots: [
      { src: "/images/projects/cleanmess/Screenshot 2026-08-21 020051.png", alt: "CleanMess home dashboard displaying current chore rotation and overall room status." },
      { src: "/images/projects/cleanmess/Screenshot 2026-08-21 020104.png", alt: "CleanMess duties list illustrating chore details and coverage tracking." },
      { src: "/images/projects/cleanmess/Screenshot 2026-08-21 020117.png", alt: "CleanMess roommates list detailing active/absent status and backlogs." },
      { src: "/images/projects/cleanmess/Screenshot 2026-08-21 020129.png", alt: "CleanMess chore completion logs and history." },
      { src: "/images/projects/cleanmess/Screenshot 2026-08-21 020146.png", alt: "CleanMess settings and roommate management configuration." }
    ],
    verified: true,
    layoutType: "desktop"
  },
  {
    slug: "beatmess",
    order: 2,
    name: "BeatMess",
    tagline: "Your music, your rules.",
    liveUrl: "https://beatmess-player.onrender.com/",
    githubUrl: "https://github.com/Sadik47x/beatmess-player",
    problem: "Traditional music players either require massive library connections (Spotify-scale) or provide no real music personalization or auto-scheduling for self-hosted libraries. Playlists require manual setup, and queues dry up quickly.",
    solution: "BeatMess is a premium music streaming player with a custom single-user personalized music recommendation engine, dynamic auto-refill queues, and progressive web app (PWA) mobile installation support.",
    features: [
      "Infinite auto-queue radio: Background job fetches recommended tracks automatically when the player's upcoming queue drops below 5 tracks.",
      "Implicit feedback scoring: Learns from direct listening behavior (likes, skips, partial listens, completions, and replays) to score user taste.",
      "Metadata tag cache: Queries MusicBrainz and Last.fm via a rate-limited queue worker, caching tags locally to power content-similarity matches.",
      "Home-page exclusion logic: Excludes recommended songs already displayed in home page rails from the auto-play queue to avoid repetitive playback.",
      "Progressive Web App: Native PWA support for direct mobile installation on Android and iOS devices."
    ],
    techStack: [
      { layer: "Frontend", technology: "React, TypeScript, Vite" },
      { layer: "Backend", technology: "Node.js (Express server)" },
      { layer: "Styling", technology: "Tailwind CSS" },
      { layer: "External APIs", technology: "MusicBrainz API, Last.fm API" },
      { layer: "Deployment", technology: "Render (using render.yaml blueprints)" }
    ],
    highlights: [
      "Implicit-Feedback Recommendation Engine: Analyzes fine-grained user interaction data (skip ratios, playback completion rates) to dynamically adjust candidate generation.",
      "Local Metadata Cache: Implements rate-limiting and local caching for MusicBrainz API requests, reducing load times and preventing external API lockouts."
    ],
    screenshots: [
      { src: "/images/projects/beatmess/Screenshot 2026-08-21 020327.png", alt: "BeatMess home interface displaying customized music recommendations and category rails." },
      { src: "/images/projects/beatmess/Screenshot 2026-08-21 020342.png", alt: "BeatMess playback interface showcasing album art, track details, and control systems." },
      { src: "/images/projects/beatmess/Screenshot 2026-08-21 020354.png", alt: "BeatMess queue showing recommended refill tracks based on listener activity." },
      { src: "/images/projects/beatmess/Screenshot 2026-08-21 020429.png", alt: "BeatMess user library and saved collections." },
      { src: "/images/projects/beatmess/Screenshot 2026-08-21 020454.png", alt: "BeatMess search system showing result categorization." },
      { src: "/images/projects/beatmess/Screenshot 2026-08-21 020507.png", alt: "BeatMess settings and player configuration options." }
    ],
    verified: true,
    layoutType: "desktop"
  },
  {
    slug: "railvista",
    order: 3,
    name: "RailVista",
    tagline: "India's next-generation railway reservation platform featuring visual coach layouts, smart seat selection, and a secure transactional booking engine.",
    liveUrl: "https://railvista-self.vercel.app/",
    githubUrl: "https://github.com/Sadik47x/railvista",
    problem: "Legacy railway reservation flows suffer from slow station and schedule lookups, blind coach layout seat assignments, double-booking race conditions during high-volume bookings, and inadequate server-side user data authorization.",
    solution: "RailVista is a full-stack Next.js railway reservation engine featuring sub-second schedules search, interactive coach seat maps, atomic seat-reservations PostgreSQL transactions, and robust data protection through Supabase RLS.",
    features: [
      "Optimized train search with intermediate-station routing algorithms.",
      "Interactive visual coach map showing physical seat positioning (Lower, Middle, Upper, Side Lower, Side Upper berths).",
      "Multi-passenger booking form and validation.",
      "Transactional fare breakdown with convenience fees and dynamic taxes.",
      "Digital ticket and boarding pass PDF receipt generation with 10-digit PNR.",
      "My Bookings dashboard containing self-serve ticket cancellations.",
      "Full admin dashboard displaying operational statistics and schedules management.",
      "Fully responsive mobile-friendly layouts."
    ],
    techStack: [
      { layer: "Frontend", technology: "Next.js 16 (App Router, React Server Components)" },
      { layer: "Language", technology: "TypeScript" },
      { layer: "Styling", technology: "Tailwind CSS v4" },
      { layer: "Database", technology: "Supabase / PostgreSQL" },
      { layer: "Authentication", technology: "Supabase Auth (cookie-based sessions, JWT claims)" },
      { layer: "Security", technology: "Row Level Security (RLS), UUID v4 primary keys" },
      { layer: "Deployment", technology: "Vercel" }
    ],
    highlights: [
      "Concurrency Safety: Employs a PostgreSQL partial unique index on seat_reservations(seat_id, journey_date) WHERE reservation_status = 'confirmed' preventing double booking.",
      "Security Audits: Verified against a penetration test suite ensuring RLS boundaries cannot be bypassed by direct parameter tampering.",
      "Search Optimization: Queries migrated to database stored procedures (get_train_schedules) eliminating N+1 queries and lowering response latency under 100ms.",
      "Scale: Pre-seeded with 100 stations, 50 trains (Vande Bharat, Rajdhani, Express), 577 coaches, and 37,620 seats."
    ],
    screenshots: [
      { src: "/images/projects/railvista/homepage.png", alt: "RailVista home page with train routing search system." },
      { src: "/images/projects/railvista/search.png", alt: "RailVista train schedules and search result layout." },
      { src: "/images/projects/railvista/seat-selection.png", alt: "RailVista interactive coach seat map layout selection." },
      { src: "/images/projects/railvista/ticket.png", alt: "RailVista generated digital ticket with PNR details." },
      { src: "/images/projects/railvista/admin-dashboard.png", alt: "RailVista admin panel detailing train capacity and operational stats." }
    ],
    verified: true,
    layoutType: "desktop"
  }
];
