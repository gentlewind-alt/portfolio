import { getRepos } from '@/lib/github';
import { getMovies } from '@/lib/letterboxd';
import { getPortfolioData } from '@/lib/data';
import { HomeClient } from '@/components/HomeClient';

export default async function Home() {
  const githubUsername = process.env.GITHUB_USERNAME || 'samarthrawat18';
  const letterboxdUsername = process.env.LETTERBOXD_USERNAME || 'samarthrawat18';

  const [repos, movies, portfolioData] = await Promise.all([
    getRepos(githubUsername),
    getMovies(letterboxdUsername),
    getPortfolioData(),
  ]);

  return <HomeClient repos={repos} movies={movies} portfolioData={portfolioData} />;
}
