# DevInsight 🏆

A full-stack developer profile analyzer and leaderboard system that ranks GitHub and LeetCode profiles using a weighted scoring algorithm.

**Live Demo:** [github-profile-analyzer-roan.vercel.app](https://github-profile-analyzer-roan.vercel.app)

---

## Features

- **GitHub Leaderboard** — Ranks developers by stars, forks, repositories, and followers
- **LeetCode Leaderboard** — Ranks developers by problems solved across easy, medium, and hard difficulty
- **Combined Leaderboard** — Unified ranking using a normalized weighted score (LeetCode 60% + GitHub 40%)
- **Sort by Column** — Click any column header to sort ascending or descending
- **Clickable Profiles** — Direct links to GitHub and LeetCode profiles
- **Multi-user Comparison** — Compare any number of developers simultaneously

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router

**Backend**
- Node.js
- Express.js

**APIs**
- GitHub REST API
- LeetCode GraphQL API

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## How It Works

### Scoring

**GitHub Score**
```
score = (stars × 3) + (forks × 2) + (repos × 1) + (followers × 2)
```

**LeetCode Score**
```
score = (easy × 1) + (medium × 3) + (hard × 5)
```

**Combined Score**

Both scores are normalized to a 0–100 scale relative to the group, then weighted:
```
combined = (LC normalized × 0.6) + (GH normalized × 0.4)
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- GitHub Personal Access Token

### Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file:
```
GITHUB_TOKEN=your_github_token_here
```

Start the server:
```bash
node server.js
```

### Frontend Setup
```bash
cd Frontend/leaderboard-app
npm install
npm run dev
```

---

## Project Structure

```
DevInsight/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── githubController.js
│   │   │   ├── leetcodeController.js
│   │   │   └── combinedController.js
│   │   ├── routes/
│   │   └── app.js
│   └── server.js
└── Frontend/
    └── leaderboard-app/
        └── src/
            ├── pages/
            │   ├── GitHubPage.jsx
            │   ├── LeetcodePage.jsx
            │   └── CombinedPage.jsx
            └── App.jsx
```

---

## Author

**Vedant** — [github.com/Ghoul-07](https://github.com/Ghoul-07)
