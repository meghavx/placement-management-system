# College Placement Management Portal — Frontend

React + Vite + Tailwind CSS frontend for the College Placement Management
Portal, built strictly to the project's Frontend Engineering Specification
and the SRS functional requirements. Runs entirely on mock data — no
backend required to explore every page.

## Tech Stack
React 19 · Vite · Tailwind CSS 4 · React Router DOM 7 · Axios · lucide-react

## Setup

```powershell
cd pms-frontend
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Demo Logins
Password for all accounts: `password123`

| Role            | Email                        |
|-----------------|-------------------------------|
| Student         | student@college.edu           |
| Recruiter       | recruiter@techcorp.com        |
| Placement Admin | admin@college.edu             |
| Super Admin     | superadmin@college.edu        |

## Project Structure

```
src/
├── assets/          images/icons (currently empty — none required yet)
├── components/       shared, reusable UI components (Button, Table, Modal, ...)
├── layouts/          DashboardLayout, Navbar, Sidebar, ProtectedRoute, ...
├── pages/
│   ├── auth/          Login
│   ├── student/        6 pages
│   ├── recruiter/       8 pages
│   ├── admin/           8 pages (Placement Admin)
│   └── superAdmin/       5 pages
├── routes/            centralized route paths + role-based sidebar menus
├── services/          service layer (mock now, swap for Axios later)
├── data/              mock/dummy data, organized per module
├── hooks/             useAuth, usePagination, useSearch, useNotification, ...
├── constants/         roles, statuses, departments, routes, colors
└── utils/             formatDate, validators, getStatusColor, ...
```

## Backend Integration
Every page ends with a `Backend Integration Notes` comment describing the
endpoint, method, and request/response shape it expects. All data currently
flows through `src/services/*.js` — when the Spring Boot backend is ready,
only those service files (and `src/services/apiClient.js`) need to change;
no page or component should require modification.

## Build
```powershell
npm run build
npm run preview
```
