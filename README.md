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
- **Intelligent Dashboard:** View daily tasks, upcoming exams, and a motivational "Hero" section.
- **Dynamic Task Generator:** Automatically creates study sessions based on a subject's difficulty rating (Easy, Medium, Hard).
- **Interactive Calendar:** A visual overview of deadlines and daily study loads with smart status indicators.
- **Subject Manager:** Full CRUD (Create, Read, Update, Delete) capability for managing your curriculum.
- **Task Interaction:** Ability to "Complete" or "Skip" study sessions, with skip logic automatically rescheduling tasks.
- **Persistent Data:** Your study plan stays with you—even after a page refresh—thanks to Zustand Local Storage integration.

## 📅 Roadmap (3-Week Sprint)

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
- [ ] Create the Progress Analytics dashboard.
- [ ] Integrate the Motivation API.
- [ ] Final UI/UX refinements, Framer Motion animations, and deployment.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ermun361/Smart-study-planner.git