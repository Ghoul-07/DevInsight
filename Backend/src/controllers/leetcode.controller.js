const axios = require("axios");

// ─── GraphQL Queries ──────────────────────────────────────────────────────────

const SOLVED_STATS_QUERY = `
  query userSolvedStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        userAvatar
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

// ─── Helper: single GraphQL request ──────────────────────────────────────────

async function leetcodeGraphQL(query, variables) {
  const { data } = await axios.post(
    "https://leetcode.com/graphql",
    { query, variables },
    {
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; profile-analyzer/1.0)",
      },
    }
  );

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data;
}

// ─── Controller ───────────────────────────────────────────────────────────────

async function leetcodeCompareController(req, res) {
  const { usernames } = req.body;

  if (!usernames || usernames.length === 0) {
    return res.status(400).json({ message: "Enter at least one username" });
  }

  try {
    const userdata = await Promise.all(
      usernames.map(async (username) => {
        try {
          const result = await leetcodeGraphQL(SOLVED_STATS_QUERY, { username });

          // User not found
          if (!result.matchedUser) {
            return { username, error: "User not found" };
          }

          const { profile, submitStatsGlobal } = result.matchedUser;
          const submissions = submitStatsGlobal.acSubmissionNum;

          const easy   = submissions.find((s) => s.difficulty === "Easy")?.count   ?? 0;
          const medium = submissions.find((s) => s.difficulty === "Medium")?.count ?? 0;
          const hard   = submissions.find((s) => s.difficulty === "Hard")?.count   ?? 0;
          const total  = submissions.find((s) => s.difficulty === "All")?.count    ?? 0;

          const score = easy * 1 + medium * 3 + hard * 5;  // same formula as before

          return {
            username,
            avatar:      profile.userAvatar || null,        // comes from GraphQL directly, no second request needed
            totalSolved: total,
            easy,
            medium,
            hard,
            ranking:     profile.ranking || Infinity,
            score,
          };
        } catch {
          return { username, error: "User not found" };
        }
      })
    );

    // Same sort logic as before — no changes needed here
    userdata.sort((a, b) => {
      if (b.score === a.score) return a.ranking - b.ranking;
      return b.score - a.score;
    });

    userdata.forEach((user, index) => {
      user.rank = index + 1;
    });

    res.status(200).json({ userdata });
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch users" });
  }
}

module.exports = { leetcodeCompareController };