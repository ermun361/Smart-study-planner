# 📚 Smart Study Planner

**Smart Study Planner** is a high-performance web application designed to help students manage their time intelligently. Unlike traditional to-do lists, this app uses a custom algorithm to generate a dynamic study schedule based on subject difficulty, exam dates, and user availability.

## 🚀 The Problem
Many students struggle with time management, often leading to "cramming" before exams, burnout, and poor retention of information. Existing digital planners are often too manual, requiring users to decide exactly what to study and when.

## ✨ The Solution
This application automates the planning process. By inputting subjects and deadlines, the **Smart Study Planner** calculates a logical distribution of study sessions, prioritizing harder subjects and upcoming exams to ensure a balanced and effective preparation phase.

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS (Posh, responsive UI)
- **State Management:** Zustand (with Persistence for local data saving)
- **Routing:** React Router DOM v6
- **Icons:** Lucide-React
- **Date Handling:** date-fns
- **UI Components:** react-calendar
- **External API:** Advice Slip API (Daily Motivation)

## ✨ Core Features
## ✨ Core Features

*   **Modern Landing Page (New):** A high-conversion homepage featuring a 3D-tilted dashboard mockup and responsive "Gatekeeper" access logic.
*   **Secure Authentication (New):** A full Login/Sign-up flow with protected routes that prevent unauthorized access to user data.
*   **Weighted Analytics Dashboard (New):** Advanced progress tracking that weights "Hard" subjects (3pts) more heavily than "Easy" ones for a true reflection of effort.
*   **Gamified Study Streaks (New):** A logic-driven streak engine that tracks consecutive days of task completion with visual "fire" (🔥) rewards.
*   **Intelligent Dashboard:** View daily tasks, upcoming exams, and a motivational "Hero" section (Now integrated with weighted stats).
*   **Dynamic Task Generator:** Automatically creates study sessions based on a subject's difficulty rating (Easy, Medium, Hard).
*   **Subject Manager:** Full CRUD (Create, Read, Update, Delete) capability for managing your curriculum.
*   **Task Interaction:** Ability to "Complete" or "Skip" study sessions, with skip logic automatically rescheduling tasks.
*   **Persistent Data:** Your study plan and login sessions stay with you—even after a page refresh—thanks to Zustand Persistence.

## 📅 Roadmap 

### Week 1: Foundation & CRUD ✅
- [x] Project setup and theme configuration.
- [x] Subject Management (Add/Delete subjects).
- [x] Data persistence with Zustand.

### Week 2: The "Smart" Engine ✅
- [x] Implement the study task generation algorithm with weighted scheduling and anti-repeat logic
- [x] Integrate the visual Calendar component with task mapping.
- [x] Build multi-page architecture with React Router and an adaptive Sidebar shell
- [x] Finalize CRUD (Edit/Update logic) and Task Skip rescheduling logic.
- [x] Integrated the Motivation API with a graceful fallback and instant-load UX strategy.
- [x] Engineered Mobile Responsiveness across all views using adaptive grids and touch-friendly components.

### Week 3: Analytics & Polish ⏳
- [x] **Weighted Progress Engine:** Engineered a point-based analytics system to prioritize high-effort subjects.
- [x] **Authentication & Guarding:** Implemented a secure-route architecture and custom Login/Sign-up UI.
- [x] **Gamification Logic:** Developed a consecutive study streak algorithm using `date-fns`.
- [x] **Product Landing Page:** Created a high-end, responsive landing page with mobile-optimized layouts.
- [x] **Humanized UI/UX:** Refined components with  consistent branding.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ermun361/Smart-study-planner.git