import { useState, useEffect } from 'react';

const FALLBACK_STATS = {
  public_repos: 18,
  followers: 12,
  following: 15,
  stars: 34,
  commitsThisYear: '450+',
  loading: false,
  error: null,
};

export function useGitHubStats(username = 'muhammadhammad249') {
  const [stats, setStats] = useState({ ...FALLBACK_STATS, loading: true });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('GitHub API response not ok');
        const userData = await userRes.json();

        // Fetch user repos to compute total stars
        let totalStars = 0;
        try {
          const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
          if (reposRes.ok) {
            const repos = await reposRes.json();
            if (Array.isArray(repos)) {
              totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
            }
          }
        } catch {}

        if (!cancelled) {
          setStats({
            public_repos: userData.public_repos ?? FALLBACK_STATS.public_repos,
            followers: userData.followers ?? FALLBACK_STATS.followers,
            following: userData.following ?? FALLBACK_STATS.following,
            stars: Math.max(totalStars, FALLBACK_STATS.stars),
            commitsThisYear: '480+',
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setStats({
            ...FALLBACK_STATS,
            loading: false,
            error: err.message,
          });
        }
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return stats;
}

