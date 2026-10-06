# Student Study Planner Application

A comprehensive full-stack web application designed to help university students organize their academic coursework, manage task deadlines, allocate available study hours, and generate personalized study schedules using custom planning algorithms.

---

## 1. Project Overview & Objectives

### Main Objectives
* **Academic Time Management:** Provide an intuitive platform for tracking courses, assignments, and exams.
* **Smart Study Scheduling:** Automatically generate tailored study schedules based on student availability and deadline priorities.
* **Progress Tracking & Analytics:** Deliver visual metrics and per-subject statistics to ensure balanced study progress.

---

## 2. Core Planned Features

* **Course Entry:** Manage enrolled subjects, credit units, and course details.
* **Assignment and Exam Entry:** Track assignments, projects, quizzes, and final exams with priority tagging.
* **Deadline Tracking:** Real-time visibility into upcoming academic deadlines.
* **Available Study-Hour Entry:** Flexible input of daily and weekly available study slots.
* **Personalized Study Schedule Generation:** Algorithmic schedule generation based on task effort, urgency, and user availability.
* **Reminders:** Alerts for upcoming study sessions, deadlines, and pending tasks.
* **Study Progress Tracking:** Interactive logs for completed study blocks and tasks.
* **Per-Subject Study-Time Statistics:** Detailed analytics illustrating study distribution across subjects.

---

## 3. Technology Stack

* **Frontend Framework:** Next.js (App Router), React, TypeScript
* **Styling:** Tailwind CSS
* **Database & Auth Backend:** Supabase (PostgreSQL)

---

## 4. Project Structure

```text
student-study-planner/
│
├── app/                  # Next.js App Router pages and layouts
│   ├── login/            # Authentication login page placeholder
│   ├── register/         # User registration page placeholder
│   ├── dashboard/        # Main student dashboard placeholder
│   ├── courses/          # Course management page placeholder
│   ├── tasks/            # Assignment & exam tracking placeholder
│   ├── schedule/         # Interactive study schedule placeholder
│   ├── progress/         # Analytics and progress page placeholder
│   └── profile/          # User profile settings placeholder
│
├── components/           # Reusable UI and feature components
│   ├── ui/               # Base UI components (buttons, inputs, cards)
│   ├── dashboard/        # Dashboard specific widgets
│   ├── courses/          # Course components
│   ├── tasks/            # Task listing and form components
│   ├── schedule/         # Schedule timeline & calendar components
│   └── progress/         # Charts and analytics components
│
├── lib/                  # Utilities, database clients, and algorithms
│   ├── supabase/         # Supabase client setup & helper functions
│   ├── utils/            # Shared formatting and calculation helpers
│   └── algorithms/       # Personalized schedule generation logic
│
├── types/                # Shared TypeScript interfaces & types
├── public/               # Static assets (images, icons)
│
├── docs/                 # Project documentation directory
│   ├── requirements/     # Requirement specifications
│   ├── diagrams/         # System architecture & database diagrams
│   ├── testing/          # Test plans and reports
│   └── user-guide/       # Application user documentation
│
├── README.md             # Project documentation
├── .gitignore            # Git exclusion rules
├── package.json          # Node.js dependencies and scripts
└── .env.example          # Environment variables template
```

---

## 5. Project Team (University Final-Year Group)

| Member Name | Role | Contact / GitHub |
| :--- | :--- | :--- |
| **Team Member 1 (Lead)** | Full-Stack Developer | `member1@example.com` |
| **Team Member 2** | Frontend & UI/UX Developer | `member2@example.com` |
| **Team Member 3** | Backend & Supabase Specialist | `member3@example.com` |
| **Team Member 4** | Algorithm & Logic Developer | `member4@example.com` |
| **Team Member 5** | QA & Technical Writer | `member5@example.com` |

---

## 6. Installation & Prerequisites

### Prerequisites
* **Node.js:** v18.x or later
* **npm:** v9.x or later
* **Git**

### Step-by-Step Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username-or-org>/student-study-planner.git
   cd student-study-planner
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 7. Development Instructions

To start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

---

## 8. Environment Variable Configuration

1. Create a local `.env.local` file by copying the sample configuration:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and configure your Supabase URL and anon key:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
> **Security Notice:** Never commit `.env` or `.env.local` to Git. Keep credentials safe.

---

## 9. Git & GitHub Collaborative Workflow

### Branching Strategy
Direct pushes to `main` are strictly restricted for feature additions. All team members must develop features on separate dedicated branches.

#### Branch Naming Conventions:
* `feature/authentication`
* `feature/courses`
* `feature/tasks`
* `feature/study-schedule`
* `feature/dashboard`
* `feature/progress`

### How Team Members Work on Features:
1. Fetch latest changes from `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create and switch to a new feature branch:
   ```bash
   git checkout -b feature/courses
   ```
3. Commit progress with descriptive commit messages:
   ```bash
   git add .
   git commit -m "Add course entry form component structure"
   ```
4. Push branch to GitHub:
   ```bash
   git push -u origin feature/courses
   ```
5. Open a **Pull Request (PR)** on GitHub targeting the `main` branch.
6. Obtain code review approval from team members before merging.
