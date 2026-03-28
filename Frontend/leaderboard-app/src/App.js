import { Routes, Route, NavLink } from 'react-router-dom'
import GitHubPage from "./pages/GitHubPage";
import LeetcodePage from "./pages/LeetcodePage";
import CombinedPage from './pages/CombinedPage';

function App() {
  return (
    <>
      <nav style={{
        display: "flex",
        gap: "8px",
        padding: "14px 24px",
        borderBottom: "1px solid #2a2a3d",
        background: "#0f0f17",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {[
          { to: "/",          label: "⭐ GitHub" },
          { to: "/leetcode",  label: "💻 LeetCode" },
          { to: "/combined",  label: "🏆 Combined" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            style={({ isActive }) => ({
              padding: "7px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              background: isActive ? "#1e1e30" : "transparent",
              color: isActive ? "#fff" : "#666",
              border: isActive ? "1px solid #2a2a3d" : "1px solid transparent",
              transition: "all 0.2s",
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path='/'          element={<GitHubPage />} />
        <Route path='/leetcode'  element={<LeetcodePage />} />
        <Route path='/combined'  element={<CombinedPage />} />
      </Routes>
    </>
  )
}

export default App;