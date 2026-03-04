'use client';

import { useState, useEffect } from 'react';
import { 
  Terminal, Search, Settings, Bell, Sparkles, CloudUpload, 
  CheckCircle, Clock, Upload, User, GitBranch, FileJson, 
  GraduationCap, LayoutDashboard, Wand2, Folder, Menu, X,
  ChevronRight, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Types for our data
interface PortfolioData {
  personalInfo: {
    bio: string;
    [key: string]: any;
  };
  projects: any[];
  education: any[];
  [key: string]: any;
}

export default function AdminPage() {
  const [view, setView] = useState<'upload' | 'analyzing' | 'review'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [progress, setProgress] = useState(0);
  const [proposedData, setProposedData] = useState<PortfolioData | null>(null);
  const [currentData, setCurrentData] = useState<PortfolioData | null>(null);

  // Mock fetching current data
  useEffect(() => {
    // In a real app, fetch this from an API
    const fetchData = async () => {
        try {
            // We can add an endpoint to get current data if needed, 
            // or just rely on the AI endpoint to return it or the diff.
            // For now, we'll just start with null and let the AI endpoint handle the merge logic.
        } catch (e) {
            console.error(e);
        }
    };
    fetchData();
  }, []);

  const handleAnalyze = async () => {
    if (!resumeText) return;
    
    setView('analyzing');
    
    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (p > 90) clearInterval(interval);
      setProgress(p);
    }, 100);

    try {
      const response = await fetch('/api/admin/ai-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) throw new Error('Failed to update');
      
      const result = await response.json();
      setProposedData(result.data);
      
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setView('review'), 500);
    } catch (error) {
      console.error(error);
      setView('upload');
      alert('Error analyzing resume');
    }
  };

  const handlePublish = async () => {
    // In a real app, we would send the *approved* data back to the server to save.
    // Since our current API saves immediately, we can just show a success message 
    // or refactor the API to separate "propose" and "save".
    // For this demo, we'll assume the API already saved it (as per previous implementation)
    // or we can add a "save" endpoint.
    // Given the previous step's API implementation saves immediately, we'll just show success.
    alert('Changes published successfully!');
    setView('upload');
    setResumeText('');
  };

  return (
    <div className="min-h-screen bg-[#142111] font-sans text-slate-100 antialiased selection:bg-[#39c91d] selection:text-[#142111]">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#39c91d]/20 px-6 py-3 bg-[#142111]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#39c91d]">
              <div className="size-6 flex items-center justify-center">
                <Terminal className="text-3xl" />
              </div>
              <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">Portfolio Admin</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-slate-400 hover:text-[#39c91d] text-sm font-medium transition-colors" href="#">Dashboard</a>
              <a className="text-[#39c91d] text-sm font-bold leading-normal border-b-2 border-[#39c91d] pb-0.5" href="#">Resume AI</a>
              <a className="text-slate-400 hover:text-[#39c91d] text-sm font-medium transition-colors" href="#">Projects</a>
              <a className="text-slate-400 hover:text-[#39c91d] text-sm font-medium transition-colors" href="#">Stats</a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <div className="hidden sm:flex flex-col min-w-40 h-10 max-w-64 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#39c91d]/10 border border-[#39c91d]/20">
                <div className="text-[#39c91d] flex items-center justify-center pl-4">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-slate-100 placeholder:text-[#39c91d]/50 text-sm px-3 focus:outline-none" 
                  placeholder="Search updates..." 
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg size-10 bg-[#39c91d]/10 text-[#39c91d] border border-[#39c91d]/20 hover:bg-[#39c91d]/20 transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center rounded-lg size-10 bg-[#39c91d]/10 text-[#39c91d] border border-[#39c91d]/20 hover:bg-[#39c91d]/20 transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
            <div className="relative h-10 w-10 rounded-full border-2 border-[#39c91d] overflow-hidden">
                <Image src="https://picsum.photos/seed/samarth/100/100" alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex flex-col gap-4 shrink-0">
            <div className="bg-[#39c91d]/5 border border-[#39c91d]/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-[#39c91d] w-5 h-5" />
                <h3 className="font-bold text-lg text-white">AI Assistant</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">Upload your latest resume. Our AI will analyze your experience and suggest portfolio improvements.</p>
              
              {/* Upload Section */}
              {view === 'upload' && (
                <div className="relative">
                    <textarea 
                        className="w-full h-32 bg-[#39c91d]/5 border-2 border-dashed border-[#39c91d]/30 rounded-lg p-4 text-xs text-slate-300 focus:outline-none focus:border-[#39c91d] resize-none"
                        placeholder="Paste resume text here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />
                    <Button 
                        onClick={handleAnalyze}
                        disabled={!resumeText}
                        className="w-full mt-2 bg-[#39c91d] text-[#142111] hover:bg-[#39c91d]/90 font-bold"
                    >
                        Analyze
                    </Button>
                </div>
              )}
              
              {view !== 'upload' && (
                  <div className="border-2 border-dashed border-[#39c91d]/30 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-[#39c91d]/5 opacity-50">
                    <CloudUpload className="text-[#39c91d] w-8 h-8 mb-2" />
                    <p className="text-xs font-semibold text-[#39c91d]">Resume Uploaded</p>
                  </div>
              )}
            </div>

            <div className="bg-[#39c91d]/5 border border-[#39c91d]/10 rounded-xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Analysis Progress</h4>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#39c91d] bg-[#39c91d]/20">
                        {view === 'upload' ? 'Ready' : view === 'analyzing' ? 'Parsing' : 'Complete'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[#39c91d]">{progress}%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#39c91d]/20">
                    <div 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#39c91d] transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <ul className="text-xs space-y-2">
                  <li className={cn("flex items-center gap-2", progress > 20 ? "text-[#39c91d]" : "text-slate-600")}>
                    {progress > 20 ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    Extracting text
                  </li>
                  <li className={cn("flex items-center gap-2", progress > 50 ? "text-[#39c91d]" : "text-slate-600")}>
                    {progress > 50 ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    Mapping skills
                  </li>
                  <li className={cn("flex items-center gap-2", progress > 80 ? "text-[#39c91d]" : "text-slate-600")}>
                    {progress > 80 ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    Drafting &quot;About Me&quot;
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-slate-100 tracking-tight">Proposed Updates</h1>
                <p className="text-slate-400">Based on uploaded resume</p>
              </div>
              <Button 
                onClick={handlePublish}
                disabled={view !== 'review'}
                className="bg-[#39c91d] hover:bg-[#39c91d]/90 text-[#142111] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#39c91d]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4" />
                Review & Publish
              </Button>
            </div>

            {/* AI Propose Cards */}
            {view === 'review' && proposedData ? (
                <div className="grid grid-cols-1 gap-6">
                
                {/* About Me */}
                <div className="bg-[#39c91d]/5 border border-[#39c91d]/20 rounded-xl overflow-hidden">
                    <div className="bg-[#39c91d]/10 px-4 py-3 flex justify-between items-center border-b border-[#39c91d]/20">
                    <div className="flex items-center gap-2">
                        <User className="text-[#39c91d] w-5 h-5" />
                        <span className="font-bold text-sm text-white">Section: About Me</span>
                    </div>
                    <span className="text-[10px] bg-[#39c91d]/20 text-[#39c91d] px-2 py-1 rounded font-bold uppercase">AI Refined</span>
                    </div>
                    <div className="p-5 grid md:grid-cols-2 gap-4">
                    <div className="opacity-50">
                        <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Current</p>
                        <p className="text-sm leading-relaxed text-slate-300">
                            {/* Placeholder for current bio, in real app fetch from currentData */}
                            Detail-oriented and motivated B.Tech IT student...
                        </p>
                    </div>
                    <div className="bg-[#39c91d]/10 p-3 rounded-lg border border-[#39c91d]/30">
                        <p className="text-[10px] font-bold uppercase text-[#39c91d] mb-2">Suggested</p>
                        <p className="text-sm leading-relaxed text-slate-100">
                            {proposedData.personalInfo.bio}
                        </p>
                    </div>
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-[#39c91d]/5 border border-[#39c91d]/20 rounded-xl overflow-hidden">
                    <div className="bg-[#39c91d]/10 px-4 py-3 flex justify-between items-center border-b border-[#39c91d]/20">
                    <div className="flex items-center gap-2">
                        <GitBranch className="text-[#39c91d] w-5 h-5" />
                        <span className="font-bold text-sm text-white">Section: Projects</span>
                    </div>
                    <span className="text-[10px] bg-[#39c91d]/20 text-[#39c91d] px-2 py-1 rounded font-bold uppercase">{proposedData.projects.length} Identified</span>
                    </div>
                    <div className="p-5">
                    <div className="space-y-4">
                        {proposedData.projects.map((project: any, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-[#142111]/50 border border-[#39c91d]/10">
                                <div className="size-10 rounded bg-[#39c91d]/20 flex items-center justify-center text-[#39c91d] shrink-0">
                                    <FileJson className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                    <h4 className="font-bold text-sm text-white">{project.title}</h4>
                                    <div className="h-5 w-5 rounded bg-[#39c91d] flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#142111]" />
                                    </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 italic">{project.tech}</p>
                                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                                        {Array.isArray(project.description) ? project.description[0] : project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-[#39c91d]/5 border border-[#39c91d]/20 rounded-xl overflow-hidden">
                    <div className="bg-[#39c91d]/10 px-4 py-3 flex justify-between items-center border-b border-[#39c91d]/20">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="text-[#39c91d] w-5 h-5" />
                        <span className="font-bold text-sm text-white">Section: Academic Highlights</span>
                    </div>
                    <span className="text-[10px] bg-[#39c91d]/20 text-[#39c91d] px-2 py-1 rounded font-bold uppercase">Sync Required</span>
                    </div>
                    <div className="p-5">
                        {proposedData.education.map((edu: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#39c91d]/5 rounded-lg border border-[#39c91d]/20 mb-2 last:mb-0">
                                <div>
                                <p className="text-sm font-bold text-white">{edu.institution}</p>
                                <p className="text-xs text-slate-500">{edu.degree} • {edu.year}</p>
                                </div>
                                <div className="flex gap-2">
                                <button className="px-3 py-1.5 text-xs font-bold border border-[#39c91d]/40 rounded hover:bg-[#39c91d]/10 text-slate-300">Ignore</button>
                                <button className="px-3 py-1.5 text-xs font-bold bg-[#39c91d] text-[#142111] rounded">Add</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#39c91d]/10 rounded-xl bg-[#39c91d]/5">
                    <Wand2 className="w-12 h-12 text-[#39c91d]/30 mb-4" />
                    <p className="text-slate-500">Upload a resume to see proposed updates</p>
                </div>
            )}
            
          </div>
        </main>

        {/* Bottom Toolbar (Mobile friendly) */}
        <footer className="md:hidden sticky bottom-0 w-full bg-[#142111] border-t border-[#39c91d]/20 p-4 flex justify-around z-10">
          <button className="text-[#39c91d] flex flex-col items-center">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-1">Overview</span>
          </button>
          <button className="text-[#39c91d] flex flex-col items-center">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] mt-1">Resume AI</span>
          </button>
          <button className="text-slate-500 flex flex-col items-center">
            <Folder className="w-5 h-5" />
            <span className="text-[10px] mt-1">Projects</span>
          </button>
          <button className="text-slate-500 flex flex-col items-center">
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1">Profile</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
