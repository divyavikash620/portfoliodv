const LEETCODE_QUERY = `query userData($u: String!) {
  matchedUser(username: $u) {
    username
    submitStats { acSubmissionNum { difficulty count } }
    userCalendar { submissionCalendar totalActiveDays streak }
    badges { id }
  }
}`;

function iso(ts) {
  return new Date(ts * 1000).toISOString().slice(0, 10);
}

export async function fetchLeetCode(username) {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({ query: LEETCODE_QUERY, variables: { u: username } }),
    });
    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;

    const stats = {};
    for (const s of user.submitStats?.acSubmissionNum || []) {
      stats[s.difficulty.toLowerCase()] = s.count;
    }

    const calendar = JSON.parse(user.userCalendar?.submissionCalendar || "{}");
    const days = Object.entries(calendar)
      .map(([ts, count]) => ({ date: iso(Number(ts)), count: Number(count) }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));

    return {
      solved: stats.all ?? 0,
      easy: stats.easy ?? 0,
      medium: stats.medium ?? 0,
      hard: stats.hard ?? 0,
      activeDays: user.userCalendar?.totalActiveDays ?? days.length,
      streak: user.userCalendar?.streak ?? 0,
      badges: (user.badges || []).length,
      days,
    };
  } catch {
    return null;
  }
}

export async function fetchGitHub(username) {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    const json = await res.json();
    if (!json?.contributions) return null;
    const days = json.contributions.map((d) => ({ date: d.date, count: d.count }));
    return {
      total: json.total?.lastYear ?? days.reduce((a, d) => a + d.count, 0),
      activeDays: days.filter((d) => d.count > 0).length,
      days,
    };
  } catch {
    return null;
  }
}

export async function fetchGfg(username) {
  try {
    const res = await fetch(`https://www.geeksforgeeks.org/user/${encodeURIComponent(username)}/`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    const html = await res.text();
    const solved = html.match(/total_problems_solved\\?":\s*(\d+)/);
    const score = html.match(/\\?"score\\?":\s*(\d+)/);
    const monthly = html.match(/monthly_score\\?":\s*(\d+)/);
    if (!solved) return null;
    return {
      solved: Number(solved[1]),
      score: score ? Number(score[1]) : null,
      monthlyScore: monthly ? Number(monthly[1]) : null,
    };
  } catch {
    return null;
  }
}
