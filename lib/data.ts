import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    age: number;
    github: string;
    linkedin: string;
    instagram: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    details: string;
  }>;
  skills: Array<{
    category: string;
    items: string;
  }>;
  projects: Array<{
    title: string;
    tech: string;
    description: string[];
  }>;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // Fallback data if file doesn't exist
    return {
      personalInfo: {
        name: "Samarth Singh Rawat",
        title: "Full Stack Developer & ML Enthusiast",
        email: "samarthrawat18@email.com",
        phone: "+91 8984100922",
        location: "Odisha, India",
        bio: "Detail-oriented and motivated B.Tech IT student at KIIT Bhubaneswar with hands-on experience in Machine Learning, IoT Systems and Data Structures.",
        age: 20,
        github: "samarthrawat18",
        linkedin: "",
        instagram: "samarthrawat18"
      },
      education: [
        {
          institution: "Kalinga Institute of Industrial Technology (KIIT)",
          degree: "B.Tech in Information Technology",
          year: "Expected May 2026",
          details: "Bhubaneswar, Odisha • 7th Semester CPI: 8.11"
        }
      ],
      skills: [],
      projects: []
    };
  }
}

export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}
