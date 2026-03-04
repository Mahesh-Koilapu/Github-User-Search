# GitHub Search Application - Project Summary

## ✅ All Features Implemented

### Core Features
| Feature | Status |
|---------|--------|
| User Input Form | ✅ |
| Search Button | ✅ |
| Prevents Empty Submissions | ✅ |
| User Profile Display | ✅ |
| Top 5 Repositories | ✅ |
| Loading Indicator | ✅ |
| Error Handling | ✅ |
| Responsive Layout | ✅ |
| Login/Logout with JWT | ✅ |
| Protected Routes | ✅ |

### Bonus Features
| Feature | Status |
|---------|--------|
| Debounced Search | ✅ |
| Dark Mode Toggle | ✅ |
| LocalStorage Persistence | ✅ |

---

## Project Structure

```
github-search-application/
├── backend/                    # Express.js Backend
│   ├── controllers/            # Route handlers
│   ├── db/                     # SQLite database
│   ├── middleware/             # Auth middleware
│   ├── routes/                 # API routes
│   └── utils/                  # JWT utilities
│
└── frontend/                   # React + Vite Frontend
    └── src/
        ├── components/          # Reusable UI components
        │   ├── Header.jsx      # Navigation header
        │   ├── ProtectedRoute.jsx  # Auth guard
        │   └── ThemeInitializer.jsx
        │
        ├── context/            # React Context
        │   └── ThemeContext.jsx   # Dark mode state
        │
        ├── pages/              # Page components
        │   ├── Dashboard.jsx   # Main search page
        │   └── Login.jsx       # Login/Register page
        │
        ├── services/           # API services
        │   ├── authApi.js      # Authentication API
        │   └── githubApi.js    # GitHub API
        │
        ├── App.jsx             # Main app component
        ├── main.jsx           # Entry point
        └── index.css          # Global styles
```

---

## How to Run

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

---

## Features Explained

### 1. Debounced Search
The search automatically triggers 500ms after you stop typing. This reduces unnecessary API calls to GitHub.

### 2. Dark Mode
Click the 🌙/☀️ button in the header to toggle between light and dark themes. Your preference is saved in localStorage.

### 3. Protected Routes
Only logged-in users can access the dashboard. Unauthenticated users are redirected to the login page.

### 4. GitHub API Integration
- Fetches user profile (name, avatar, bio, location, followers, following, public repos)
- Fetches top 5 repositories sorted by stars

