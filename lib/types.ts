export interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export interface Movie {
  title: string;
  link: string;
  pubDate: string;
  rating: number;
  image: string;
  year: string;
}
