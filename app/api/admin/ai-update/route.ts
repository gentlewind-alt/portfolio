import { GoogleGenAI } from "@google/genai";
import { updatePortfolioData, getPortfolioData } from '@/lib/data';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();
    const currentData = await getPortfolioData();

    const prompt = `
      You are an AI assistant that converts resumes into portfolio data.

      Extract:

      - personal information
      - skills
      - projects
      - work experience
      - education
      - certifications

      Return STRICT JSON only in this structure:

      {
        "personalInfo": {
          "name": "",
          "title": "",
          "email": "",
          "phone": "",
          "location": "",
          "bio": "",
          "age": 0,
          "github": "",
          "linkedin": "",
          "instagram": ""
        },
        "education": [
          {
            "institution": "",
            "degree": "",
            "year": "",
            "details": ""
          }
        ],
        "skills": [
          {
            "category": "",
            "items": ""
          }
        ],
        "projects": [
          {
            "title": "",
            "tech": "",
            "description": []
          }
        ]
      }

      Resume:
      ${resumeText}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error('No response text from AI');
    }

    const updatedData = JSON.parse(text);
    
    await updatePortfolioData(updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('AI Update Error:', error);
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}
