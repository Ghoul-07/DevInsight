async function loadLeaderboard() {
  try {
    const input = document.getElementById("user-input").value;

    if (!input) {
      alert("Please enter at least one username");
      return;
    }

    // 🧠 convert string → array
    const usernames = input
      .split(",")
      .map(u => u.trim())
      .filter(u => u.length > 0);

    const res = await fetch("http://localhost:3000/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usernames }) // 👈 send to backend
    });

    const result = await res.json();
    const users = result.data;

    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";

    users.forEach(user => {
      let medalClass = "";
      let medal = "";

      if (user.rank === 1) {
        medalClass = "gold";
        medal = "🥇";
      } else if (user.rank === 2) {
        medalClass = "silver";
        medal = "🥈";
      } else if (user.rank === 3) {
        medalClass = "bronze";
        medal = "🥉";
      }

      const row = `
        <tr class="${medalClass}">
          <td>${medal || "#" + user.rank}</td>
          <td>
            <img src="https://github.com/${user.username}.png" width="30" style="border-radius:50%; vertical-align:middle; margin-right:8px;">
            ${user.username}
          </td>
          <td>${user.score}</td>
          <td>${user.followers}</td>
          <td>${user.publicRepos}</td>
          <td>${user.totalStars}</td>
        </tr>
      `;

      tbody.innerHTML += row;
    });

  } catch (err) {
    console.error("unable to load leaderboard", err);
  }
}