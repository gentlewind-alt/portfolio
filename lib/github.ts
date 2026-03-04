import { Repo } from './types';

export async function getRepos(username: string): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch repos for ${username}: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos: Repo[] = await res.json();
    
    if (!Array.isArray(repos)) {
        console.warn('GitHub API response is not an array');
        return [];
    }

    // Filter out forks and sort by stars
    return repos
      .filter((repo: any) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6); // Limit to top 6 repos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
