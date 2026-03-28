import { useState } from "react";
import '../App.css'

function LeetcodePage() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);   // ← added

  const loadLeaderboard = async () => {
    try {
      if (!input) {
        alert("Enter usernames");
        return;
      }

      const usernames = input
        .split(",")
        .map((u) => u.trim())
        .filter((u) => u.length > 0);

      setLoading(true);                             // ← added
      const res = await fetch("http://localhost:3000/api/compare/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernames }),
      });

      const result = await res.json();
      setUsers(result.userdata || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);                            // ← added
    }
  };

  const getClass = (rank) => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "";
  };

  return (
    <div className="app">
      <h1 className="title">🏆 LeetCode Leaderboard</h1>

      <div className="input-section">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter usernames (comma separated)"
        />

        <button className="btn" onClick={loadLeaderboard} disabled={loading}>
          {loading ? "Loading..." : "Compare"}     {/* ← changed */}
        </button>
      </div>

      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Total Solved</th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) =>
            user.error ? (                          // ← added: handle not-found users
              <tr key={user.username}>
                <td>—</td>
                <td colSpan={6} style={{ color: "red" }}>
                  {user.username}: {user.error}
                </td>
              </tr>
            ) : (
              <tr key={user.username} className={getClass(user.rank)}>
                <td>
                  {user.rank === 1
                    ? "🥇"
                    : user.rank === 2
                    ? "🥈"
                    : user.rank === 3
                    ? "🥉"
                    : `#${user.rank}`}
                </td>

                <td className="user-cell">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.username}`
                    }
                    alt="avatar"
                    className="avatar"
                  />
                  <a href={`https://leetcode.com/${user.username}`} target="_blank" rel="noreferrer">
                    {user.username}
                  </a>
                </td>

                <td>{user.score}</td>
                <td>{user.totalSolved}</td>
                <td>{user.easy}</td>
                <td>{user.medium}</td>
                <td>{user.hard}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeetcodePage;