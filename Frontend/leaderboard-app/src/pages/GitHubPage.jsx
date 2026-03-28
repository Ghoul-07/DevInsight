import { useState } from "react";
import "../App.css"

function GitHubPage(){

  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  const loadLeaderboard = async () => {
    try {
      if (!input) {
        alert("Enter usernames");
        return;
      }

      const usernames = input
        .split(",")
        .map(u => u.trim())
        .filter(u => u.length > 0);

      const res = await fetch("http://localhost:3000/api/compare/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ usernames })
      });

      const result = await res.json();
      setUsers(result.data);

    } catch (err) {
      console.error(err);
    }
  };

  // 🧠 helper for medal classes
  const getClass = (rank) => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "";
  };

  return (
    <div className="app">
      <h1 className="title">🏆 GitHub Leaderboard</h1>

      <div className="input-section">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter usernames (comma separated)"
        />

        <button className="btn" onClick={loadLeaderboard}>
          Compare
        </button>
      </div>

      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Followers</th>
            <th>Repos</th>
            <th>Stars</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.username} className={getClass(user.rank)}>
              <td>
                {user.rank === 1 ? "🥇" :
                 user.rank === 2 ? "🥈" :
                 user.rank === 3 ? "🥉" :
                 `#${user.rank}`}
              </td>

              <td className="user-cell">
                <img
                  src={`https://github.com/${user.username}.png `}
                  alt="avatar"
                  className="avatar"
                />
                {user.username}
              </td>

              <td>{user.score}</td>
              <td>{user.followers}</td>
              <td>{user.publicRepos}</td>
              <td>{user.totalStars}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GitHubPage;