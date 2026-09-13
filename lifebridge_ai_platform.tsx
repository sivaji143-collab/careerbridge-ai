import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Search, Compass, Target, Bookmark, MessageSquare, Briefcase, 
  Bell, CheckCircle2, Circle, ArrowRight, User, Award, Layers, RefreshCw, 
  AlertCircle, AlertTriangle, FileX, SlidersHorizontal, CheckCheck, MapPin, 
  DollarSign, ChevronRight, Send, X, ExternalLink, Heart, Clock, TrendingUp,
  Brain, Cpu, ShieldCheck, Plus, Trash2, ArrowUpRight, Zap, Check, HelpCircle
} from 'lucide-react';

const INITIAL_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Google AI Internship',
    company: 'Google',
    category: 'Internship',
    location: 'Remote',
    stipend: '₹1.2L/month',
    matchScore: 92,
    matchReasons: ['Python matches', 'Machine Learning matches', 'B.Tech AI/ML matches', 'Career goal matches'],
    missingSkills: ['AWS'],
    logoBg: 'bg-red-50 text-red-600 border-red-200',
    logoText: 'G',
    deadline: 'Tomorrow',
    isSaved: true,
    status: 'Saved',
    description: 'Work on cutting-edge LLMs and multimodal AI agents alongside Google Research engineers in an immersive 12-week summer internship.'
  },
  {
    id: 'opp-2',
    title: 'AWS ML Scholarship',
    company: 'AWS',
    category: 'Scholarship',
    location: 'Remote',
    stipend: '₹50,000',
    matchScore: 88,
    matchReasons: ['Machine Learning background', 'B.Tech CSE student', 'Strong math foundation'],
    missingSkills: ['Cloud Infrastructure', 'Docker'],
    logoBg: 'bg-amber-50 text-amber-600 border-amber-200',
    logoText: 'AWS',
    deadline: '5 days left',
    isSaved: true,
    status: 'Saved',
    description: 'Full scholarship package for Udacity AWS Machine Learning Nanodegree plus 1-on-1 mentorship from AWS Principal Scientists.'
  },
  {
    id: 'opp-3',
    title: 'Smart India Hackathon 2026',
    company: 'Government of India',
    category: 'Hackathon',
    location: 'Pan India',
    stipend: 'Free (Prize Pool ₹10L)',
    matchScore: 78,
    matchReasons: ['Team problem solving', 'AI prototyping interest'],
    missingSkills: ['Full Stack Integration'],
    logoBg: 'bg-orange-50 text-orange-600 border-orange-200',
    logoText: 'SIH',
    deadline: '12 days left',
    isSaved: true,
    status: 'Applied',
    description: 'Nationwide initiative to provide students a platform to solve pressing problems of our daily lives with AI and hardware innovations.'
  },
  {
    id: 'opp-4',
    title: 'TCS NQT',
    company: 'TCS',
    category: 'Job',
    location: 'Pan India',
    stipend: '₹6–12 LPA',
    matchScore: 81,
    matchReasons: ['Data Structures skills', 'CSE Core alignment'],
    missingSkills: ['System Design'],
    logoBg: 'bg-blue-50 text-blue-600 border-blue-200',
    logoText: 'TCS',
    deadline: '3 weeks left',
    isSaved: true,
    status: 'Interview',
    description: 'National Qualifier Test for freshers targeting High-Paid Digital and Prime engineering roles across TCS R&D divisions.'
  },
  {
    id: 'opp-5',
    title: 'Microsoft Explore',
    company: 'Microsoft',
    category: 'Internship',
    location: 'Redmond / Hybrid',
    stipend: '₹1.5L/month',
    matchScore: 76,
    matchReasons: ['Software Engineering interest', 'Academic record'],
    missingSkills: ['C++', 'System Design'],
    logoBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    logoText: 'MS',
    deadline: 'Closed',
    isSaved: false,
    status: 'Applied',
    description: 'Designed specifically for 1st and 2nd year students to gain combined exposure to Product Management and Software Engineering.'
  },
  {
    id: 'opp-6',
    title: 'Amazon SDE Role',
    company: 'Amazon',
    category: 'Job',
    location: 'Bengaluru',
    stipend: '₹28 LPA',
    matchScore: 85,
    matchReasons: ['Python', 'DSA Proficiency', 'Problem Solving'],
    missingSkills: ['Distributed Systems'],
    logoBg: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    logoText: 'AZ',
    deadline: 'Closing soon',
    isSaved: false,
    status: 'Interview',
    description: 'Join Amazon Web Services AI infrastructure team developing highly scaleable microservices and ML serving pipelines.'
  },
  {
    id: 'opp-7',
    title: 'Accenture Virtual Internship',
    company: 'Accenture',
    category: 'Internship',
    location: 'Remote',
    stipend: 'Certificate',
    matchScore: 72,
    matchReasons: ['AI Ethics', 'Analytics Basics'],
    missingSkills: ['Business Intelligence'],
    logoBg: 'bg-purple-50 text-purple-600 border-purple-200',
    logoText: 'AC',
    deadline: 'Always Open',
    isSaved: false,
    status: 'Applied',
    description: 'Self-paced virtual work experience program giving practical insights into data architecture and technology consulting.'
  },
  {
    id: 'opp-8',
    title: 'Infosys Springboard AI',
    company: 'Infosys',
    category: 'Course',
    location: 'Online',
    stipend: 'Free Certification',
    matchScore: 68,
    matchReasons: ['Beginner AI modules'],
    missingSkills: ['PyTorch'],
    logoBg: 'bg-sky-50 text-sky-600 border-sky-200',
    logoText: 'INF',
    deadline: 'Open',
    isSaved: false,
    status: 'Applied',
    description: 'Empowering young talent with hands-on labs in deep learning, natural language processing, and neural network foundations.'
  },
  {
    id: 'opp-9',
    title: 'Wipro Graduate Fellow',
    company: 'Wipro',
    category: 'Job',
    location: 'Hyderabad',
    stipend: '₹7 LPA',
    matchScore: 94,
    matchReasons: ['Perfect alignment on core CSE', 'SQL & Python background'],
    missingSkills: [],
    logoBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    logoText: 'WIP',
    deadline: 'Accepted',
    isSaved: false,
    status: 'Selected',
    description: 'Elite fellowship offer for high-performing engineering graduates with focus on Enterprise GenAI deployments.'
  }
];

const SKILL_DATABASE = {
  'AI/ML Engineer': {
    skills: [
      { name: 'Python', level: 'Advanced', percent: 90 },
      { name: 'Machine Learning', level: 'Intermediate', percent: 70 },
      { name: 'SQL', level: 'Intermediate', percent: 65 },
      { name: 'AWS', level: 'Beginner', percent: 30 },
      { name: 'Docker', level: 'Beginner', percent: 25 },
      { name: 'Data Structures', level: 'Advanced', percent: 85 }
    ],
    gaps: [
      { skill: 'AWS', priority: 'High Priority', desc: 'Cloud deployment needed for model hosting' },
      { skill: 'Docker', priority: 'High Priority', desc: 'Containerization standard for MLOps' },
      { skill: 'System Design', priority: 'Medium', desc: 'Scalable architecture concepts' },
      { skill: 'Advanced ML', priority: 'Medium', desc: 'Deep learning frameworks (PyTorch)' }
    ],
    roadmap: [
      { title: 'Learn Skills', duration: '3–6 months', desc: 'Master Python, Math & Core ML Foundations', status: 'completed' },
      { title: 'Build Projects', duration: '2–4 months', desc: 'Deploy 3 End-to-End LLM & Computer Vision Apps', status: 'current' },
      { title: 'Get Certified', duration: '1–2 months', desc: 'Earn AWS ML Specialty & Deep Learning certificates', status: 'upcoming' },
      { title: 'Apply & Get Hired', duration: 'Ongoing', desc: 'Target top tier AI internships & entry roles', status: 'upcoming' }
    ]
  },
  'Software Engineer': {
    skills: [
      { name: 'Python', level: 'Advanced', percent: 90 },
      { name: 'Data Structures', level: 'Advanced', percent: 88 },
      { name: 'SQL', level: 'Intermediate', percent: 65 },
      { name: 'System Design', level: 'Beginner', percent: 35 },
      { name: 'Git & DevOps', level: 'Intermediate', percent: 60 },
      { name: 'Machine Learning', level: 'Beginner', percent: 40 }
    ],
    gaps: [
      { skill: 'System Design', priority: 'High Priority', desc: 'High scale backend design' },
      { skill: 'Docker & Kubernetes', priority: 'High Priority', desc: 'Microservices infrastructure' },
      { skill: 'Java / C++', priority: 'Medium', desc: 'Low level memory management' }
    ],
    roadmap: [
      { title: 'Learn CS Fundamentals', duration: '2–4 months', desc: 'Master Algorithms & Data Structures', status: 'completed' },
      { title: 'Full Stack Projects', duration: '3 months', desc: 'Build reactive web applications with SQL', status: 'current' },
      { title: 'System Design & DevOps', duration: '2 months', desc: 'Learn scalable cloud infrastructure', status: 'upcoming' },
      { title: 'Technical Interviewing', duration: 'Ongoing', desc: 'LeetCode grind & mock interviews', status: 'upcoming' }
    ]
  }
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'explore', 'roadmap', 'saved', 'applications', 'assistant', 'profile', 'states'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic User & Goal State
  const [careerGoal, setCareerGoal] = useState('AI/ML Engineer');
  const [profileData, setProfileData] = useState({
    name: 'Alex Rivera',
    degree: 'B.Tech CSE (AI&ML)',
    college: 'Indian Institute of Technology',
    year: '3rd Year (2026)',
    skills: 'Python, ML, SQL, Data Structures',
    targetRole: 'AI/ML Engineer',
    locationPref: 'Remote / Hybrid',
    completedItems: {
      basicInfo: true,
      education: true,
      skills: true,
      careerGoal: true,
      experience: false,
      interests: false,
      locationPref: false
    }
  });

  // Data Collections State
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [selectedOppModal, setSelectedOppModal] = useState(null);

  // Chat Assistant State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'user', text: 'What should I learn next?' },
    { 
      sender: 'ai', 
      text: "Based on your profile and goals, I recommend:\n\n1. AWS Fundamentals (high priority)\n2. Complete a Machine Learning project\n3. Improve your DSA with 5 LeetCode/day\n\nThis will help you become more competitive for AI/ML roles."
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Notification Banner
  const [notificationToast, setNotificationToast] = useState(null);

  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Saved & Applications Actions
  const toggleSaveOpportunity = (id, e) => {
    if (e) e.stopPropagation();
    setOpportunities(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.isSaved;
        showToast(nextState ? `Saved "${item.title}"` : `Removed "${item.title}" from saved`);
        return { ...item, isSaved: nextState };
      }
      return item;
    }));
  };

  const updateApplicationStatus = (id, newStatus) => {
    setOpportunities(prev => prev.map(item => {
      if (item.id === id) {
        showToast(`Updated ${item.title} → ${newStatus}`);
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  // Calculated Profile Percentage
  const profileCompletionPercent = useMemo(() => {
    const total = Object.keys(profileData.completedItems).length;
    const completed = Object.values(profileData.completedItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [profileData]);

  // Handle Send Chat
  const handleSendChat = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "I analyzed your current career path. Focus on strengthening Cloud fundamentals and containerization to increase your match percentage for high-paying roles!";
      if (query.toLowerCase().includes('aws') || query.toLowerCase().includes('cloud')) {
        replyText = "AWS Certified Machine Learning Specialty is a huge plus! I suggest starting with S3, EC2, and SageMaker model hosting tutorials.";
      } else if (query.toLowerCase().includes('internship') || query.toLowerCase().includes('apply')) {
        replyText = "The Google AI Internship closes tomorrow! You have a 92% match rating. Make sure your resume emphasizes Python and Machine Learning projects.";
      } else if (query.toLowerCase().includes('resume') || query.toLowerCase().includes('profile')) {
        replyText = "Your profile is currently " + profileCompletionPercent + "% complete. Adding your GitHub work experience and location preferences will boost AI matching efficiency.";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
      setIsTyping(false);
    }, 1000);
  };

  // Filtered Opportunities
  const filteredOpps = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesCategory = categoryFilter === 'All' || opp.category === categoryFilter;
      const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            opp.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [opportunities, categoryFilter, searchQuery]);

  const savedOppsList = useMemo(() => opportunities.filter(o => o.isSaved), [opportunities]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white pb-12">
      {/* Toast Alert */}
      {notificationToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-bounce">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium">{notificationToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 bg-clip-text text-transparent">
                LifeBridge AI
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                PRO AI PLATFORM
              </span>
            </div>
          </div>

          {/* Nav Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Dashboard Showcase', icon: Layers },
              { id: 'explore', label: 'Opportunities', icon: Compass },
              { id: 'roadmap', label: 'Career Roadmap', icon: Target },
              { id: 'applications', label: 'Tracker', icon: Briefcase },
              { id: 'assistant', label: 'AI Coach', icon: MessageSquare },
              { id: 'states', label: 'System States', icon: AlertCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-blue-700 shadow-xs font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition border border-slate-200 text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                AR
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none">{profileData.name}</p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{profileData.degree}</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1580px] mx-auto px-3 sm:px-6 pt-6">

        {/* ========================================================= */}
        {/* VIEW 1: UNIFIED ALL-IN-ONE SHOWCASE DASHBOARD (REF IMAGE)  */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">

            {/* ROW 1 GRID: Hero Banner (2 cols wide) | AI Opportunity Matching | Skill Gap Analysis | Career Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* CARD 1: Hero Banner (Lg Left - 3 Cols on 12-col grid) */}
              <div className="lg:col-span-3 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl flex flex-col justify-between border border-blue-900/40 group min-h-[380px]">
                {/* Background Tech Silhouette Graphic */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path d="M0 300 L120 250 L240 340 L400 200 L400 500 L0 500 Z" fill="url(#heroGrad)" />
                    <circle cx="280" cy="180" r="70" fill="#60a5fa" opacity="0.15" />
                    {/* Futuristic Grid Lines & City Nodes */}
                    <line x1="0" y1="400" x2="400" y2="400" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="100" y1="0" x2="100" y2="500" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
                    <line x1="260" y1="0" x2="260" y2="500" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
                  </svg>
                </div>

                {/* Floating Tags (As per reference image) */}
                <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
                  {['Internships', 'Jobs', 'Hackathons', 'Scholarships', 'Certifications', 'Courses'].map((tag, idx) => (
                    <span 
                      key={tag}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-xs transition transform hover:scale-105 ${
                        idx % 2 === 0 
                          ? 'bg-blue-500/20 text-cyan-200 border-cyan-400/30' 
                          : 'bg-indigo-500/20 text-purple-200 border-indigo-400/30'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 my-auto">
                  <div className="flex items-center space-x-2 text-cyan-300 mb-2">
                    <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wider uppercase">LifeBridge AI</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                    Your Career. <br />
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                      Our AI.
                    </span> <br />
                    A Brighter Future.
                  </h1>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mb-6 font-light">
                    Discover opportunities • Build skills • Achieve your goals
                  </p>
                </div>

                {/* Action CTA */}
                <div className="relative z-10 pt-2">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center justify-center space-x-2 group/btn transition-all duration-200"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* CARD 2: AI Opportunity Matching (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">AI Opportunity Matching</h2>
                    <span className="p-1 rounded-lg bg-blue-50 text-blue-600"><Brain className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Find opportunities that match your profile</p>

                  {/* Profile Summary Card */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/60 mb-3 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                      AR
                    </div>
                    <div className="text-xs overflow-hidden">
                      <p className="font-bold text-slate-900 truncate">Your Profile</p>
                      <p className="text-[11px] text-blue-700 font-medium truncate">{profileData.degree}</p>
                      <p className="text-[10px] text-slate-500 truncate">Skills: {profileData.skills}</p>
                      <p className="text-[10px] text-slate-500 truncate">Goal: <span className="text-slate-700 font-semibold">{profileData.targetRole}</span></p>
                    </div>
                  </div>

                  {/* Top Matches Preview */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Top Matches</div>
                    {opportunities.slice(0, 3).map((opp) => (
                      <div 
                        key={opp.id} 
                        onClick={() => setSelectedOppModal(opp)}
                        className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5 overflow-hidden pr-2">
                          <div className={`w-7 h-7 rounded-lg ${opp.logoBg} flex items-center justify-center text-[10px] font-bold border flex-shrink-0`}>
                            {opp.logoText}
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">{opp.title}</h4>
                            <p className="text-[10px] text-slate-500">{opp.company} • {opp.location}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex-shrink-0">
                          {opp.matchScore}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Glowing Circular AI Graphic (Matching Reference Visual) */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
                  <div className="relative w-full h-24 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <line x1="20" y1="20" x2="100" y2="50" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="180" y1="20" x2="100" y2="50" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="40" y1="80" x2="100" y2="50" stroke="#818cf8" strokeWidth="1" />
                        <line x1="160" y1="80" x2="100" y2="50" stroke="#818cf8" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-cyan-500/50 border-2 border-white/40 animate-pulse">
                      AI
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: Skill Gap Analysis (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Skill Gap Analysis</h2>
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600"><Cpu className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Know what to learn, grow faster</p>

                  {/* Split view: Your Skills vs Skill Gaps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    
                    {/* Your Skills Progress */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/50">
                      <h3 className="text-xs font-bold text-slate-800 mb-2">Your Skills</h3>
                      <div className="space-y-2">
                        {SKILL_DATABASE[careerGoal].skills.slice(0, 4).map((item) => (
                          <div key={item.name}>
                            <div className="flex justify-between text-[11px] mb-0.5 font-medium">
                              <span className="text-slate-700">{item.name}</span>
                              <span className="text-slate-400 text-[10px]">{item.level}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${item.percent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skill Gaps Priorities */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/50">
                      <h3 className="text-xs font-bold text-slate-800 mb-2">Skill Gaps</h3>
                      <div className="space-y-1.5">
                        {SKILL_DATABASE[careerGoal].gaps.slice(0, 3).map((gap) => (
                          <div key={gap.skill} className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-white border border-slate-100">
                            <span className="font-semibold text-slate-800">{gap.skill}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              gap.priority === 'High Priority' 
                                ? 'bg-red-100 text-red-700 border border-red-200' 
                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}>
                              {gap.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Robot Avatar Visual */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end">
                  <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-700">AI Coach Sync</span>
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                      🤖
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 4: Career Roadmap (3 Cols) */}
              <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 border border-indigo-900/50 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-white text-base">Career Roadmap</h2>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold">
                      🚩 {careerGoal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">Your step-by-step path to success</p>

                  {/* Connected Vertical Timeline Path */}
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:via-cyan-400 before:to-slate-700">
                    {SKILL_DATABASE[careerGoal].roadmap.map((step, idx) => (
                      <div key={step.title} className="relative">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${
                          step.status === 'completed' 
                            ? 'bg-emerald-500 border-white text-white' 
                            : step.status === 'current'
                            ? 'bg-cyan-400 border-white text-slate-900 animate-pulse'
                            : 'bg-slate-800 border-slate-600 text-slate-400'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-bold text-white">{step.title}</h4>
                            <span className="text-[9px] text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-tight mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Path destination banner */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-200">
                  <span className="text-[11px] font-medium">Goal Destination:</span>
                  <span className="font-bold text-white flex items-center space-x-1 bg-cyan-500/20 px-2 py-1 rounded-lg border border-cyan-400/30">
                    <span>🏆 {careerGoal}</span>
                  </span>
                </div>
              </div>

            </div>


            {/* ROW 2 GRID: AI Career Assistant | Explore Opportunities | Application Tracker | Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* CARD 5: AI Career Assistant (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">AI Career Assistant</h2>
                    <span className="p-1 rounded-lg bg-blue-50 text-blue-600"><MessageSquare className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Ask anything. Get personalized guidance.</p>

                  {/* Robot Header Avatar */}
                  <div className="flex items-center space-x-3 bg-blue-50/70 p-2.5 rounded-2xl border border-blue-100 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center text-xl shadow-xs">
                      🤖
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">LifeBridge AI Bot</p>
                      <p className="text-[10px] text-emerald-600 font-medium flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-ping" />
                        Online & Ready
                      </p>
                    </div>
                  </div>

                  {/* Chat Bubbles Scroll Area */}
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                            : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60 whitespace-pre-line'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 text-slate-500 rounded-2xl p-3 rounded-bl-none border border-slate-200 text-xs flex items-center space-x-1.5">
                          <span className="animate-bounce">•</span>
                          <span className="animate-bounce delay-100">•</span>
                          <span className="animate-bounce delay-200">•</span>
                          <span className="ml-1 text-[10px]">Analyzing career data...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Controls */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
                    className="flex items-center space-x-2"
                  >
                    <input 
                      type="text" 
                      placeholder="Ask me anything..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                    <button 
                      type="submit"
                      className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* CARD 6: Explore Opportunities (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Explore Opportunities</h2>
                    <span className="p-1 rounded-lg bg-cyan-50 text-cyan-600"><Compass className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Internships, jobs, hackathons, scholarships</p>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {['All', 'Internship', 'Job', 'Hackathon', 'Scholarship'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition ${
                          categoryFilter === cat
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Opportunities Grid List */}
                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {filteredOpps.slice(0, 4).map((opp) => (
                      <div 
                        key={opp.id}
                        className="p-3 rounded-2xl border border-slate-200/60 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition"
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center space-x-2">
                            <div className={`w-7 h-7 rounded-lg ${opp.logoBg} flex items-center justify-center text-[10px] font-bold border`}>
                              {opp.logoText}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">{opp.title}</h4>
                              <p className="text-[10px] text-slate-500">{opp.company}</p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => toggleSaveOpportunity(opp.id, e)}
                            className={`p-1 rounded-full transition ${opp.isSaved ? 'text-red-500 fill-red-500' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            <Heart className="w-3.5 h-3.5" fill={opp.isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                          <span>{opp.category} • {opp.location}</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {opp.matchScore}% match
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-slate-700">{opp.stipend}</span>
                          <button 
                            onClick={() => setSelectedOppModal(opp)}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-0.5"
                          >
                            <span>View Details</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Browse All Opportunities →
                  </button>
                </div>
              </div>

              {/* CARD 7: Application Tracker Kanban Board (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Application Tracker</h2>
                    <span className="p-1 rounded-lg bg-emerald-50 text-emerald-600"><Briefcase className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Track your applications and stay organized</p>

                  {/* 4 Colored Columns Container (As in Ref Image) */}
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    
                    {/* Saved Column */}
                    <div className="bg-emerald-50/70 p-1.5 rounded-xl border border-emerald-100 flex flex-col justify-between min-h-[220px]">
                      <div className="text-[10px] font-bold text-emerald-800 border-b border-emerald-200/60 pb-1 flex items-center justify-between px-1">
                        <span>Saved</span>
                        <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[9px] flex items-center justify-center font-extrabold">
                          {opportunities.filter(o => o.status === 'Saved').length}
                        </span>
                      </div>
                      <div className="space-y-1.5 mt-2 flex-1 overflow-y-auto pr-0.5">
                        {opportunities.filter(o => o.status === 'Saved').slice(0, 2).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => updateApplicationStatus(item.id, 'Applied')}
                            className="bg-white p-1.5 rounded-lg border border-emerald-200/80 text-left text-[9px] shadow-2xs hover:shadow-xs cursor-pointer transition"
                            title="Click to move to Applied"
                          >
                            <p className="font-bold text-slate-900 truncate">{item.title}</p>
                            <p className="text-[8px] text-slate-500 truncate">{item.company} • {item.matchScore}%</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applied Column */}
                    <div className="bg-blue-50/70 p-1.5 rounded-xl border border-blue-100 flex flex-col justify-between min-h-[220px]">
                      <div className="text-[10px] font-bold text-blue-800 border-b border-blue-200/60 pb-1 flex items-center justify-between px-1">
                        <span>Applied</span>
                        <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-900 text-[9px] flex items-center justify-center font-extrabold">
                          {opportunities.filter(o => o.status === 'Applied').length}
                        </span>
                      </div>
                      <div className="space-y-1.5 mt-2 flex-1 overflow-y-auto pr-0.5">
                        {opportunities.filter(o => o.status === 'Applied').slice(0, 2).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => updateApplicationStatus(item.id, 'Interview')}
                            className="bg-white p-1.5 rounded-lg border border-blue-200/80 text-left text-[9px] shadow-2xs hover:shadow-xs cursor-pointer transition"
                            title="Click to move to Interview"
                          >
                            <p className="font-bold text-slate-900 truncate">{item.title}</p>
                            <p className="text-[8px] text-slate-500 truncate">{item.company} • {item.matchScore}%</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interview Column */}
                    <div className="bg-purple-50/70 p-1.5 rounded-xl border border-purple-100 flex flex-col justify-between min-h-[220px]">
                      <div className="text-[10px] font-bold text-purple-800 border-b border-purple-200/60 pb-1 flex items-center justify-between px-1">
                        <span>Interview</span>
                        <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-900 text-[9px] flex items-center justify-center font-extrabold">
                          {opportunities.filter(o => o.status === 'Interview').length}
                        </span>
                      </div>
                      <div className="space-y-1.5 mt-2 flex-1 overflow-y-auto pr-0.5">
                        {opportunities.filter(o => o.status === 'Interview').slice(0, 2).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => updateApplicationStatus(item.id, 'Selected')}
                            className="bg-white p-1.5 rounded-lg border border-purple-200/80 text-left text-[9px] shadow-2xs hover:shadow-xs cursor-pointer transition"
                            title="Click to move to Selected"
                          >
                            <p className="font-bold text-slate-900 truncate">{item.title}</p>
                            <p className="text-[8px] text-slate-500 truncate">{item.company} • {item.matchScore}%</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Column */}
                    <div className="bg-teal-50/70 p-1.5 rounded-xl border border-teal-100 flex flex-col justify-between min-h-[220px]">
                      <div className="text-[10px] font-bold text-teal-800 border-b border-teal-200/60 pb-1 flex items-center justify-between px-1">
                        <span>Selected</span>
                        <span className="w-4 h-4 rounded-full bg-teal-200 text-teal-900 text-[9px] flex items-center justify-center font-extrabold">
                          {opportunities.filter(o => o.status === 'Selected').length}
                        </span>
                      </div>
                      <div className="space-y-1.5 mt-2 flex-1 overflow-y-auto pr-0.5">
                        {opportunities.filter(o => o.status === 'Selected').slice(0, 2).map(item => (
                          <div 
                            key={item.id} 
                            className="bg-white p-1.5 rounded-lg border border-teal-200/80 text-left text-[9px] shadow-2xs"
                          >
                            <p className="font-bold text-slate-900 truncate">{item.title}</p>
                            <p className="text-[8px] text-emerald-600 font-bold truncate">🎉 Offered</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Open Full Tracker Board →
                  </button>
                </div>
              </div>

              {/* CARD 8: Notifications Feed (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Notifications</h2>
                    <span className="p-1 rounded-lg bg-amber-50 text-amber-600"><Bell className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Stay updated. Never miss an opportunity.</p>

                  <div className="space-y-2.5">
                    {[
                      { icon: AlertTriangle, color: 'text-amber-500 bg-amber-50', title: 'Your saved internship closes tomorrow', sub: 'Google AI Internship', time: '2h ago' },
                      { icon: User, color: 'text-blue-500 bg-blue-50', title: `Your profile is only ${profileCompletionPercent}% complete`, sub: 'Complete your profile for better matches', time: '5h ago' },
                      { icon: Sparkles, color: 'text-emerald-500 bg-emerald-50', title: 'New 94% match found!', sub: 'Amazon SDE (Your skills match well)', time: '8h ago' },
                      { icon: Award, color: 'text-purple-500 bg-purple-50', title: 'Recommended course available', sub: 'AWS Fundamentals (High priority)', time: '12h ago' },
                      { icon: CheckCircle2, color: 'text-teal-500 bg-teal-50', title: 'Application status updated', sub: 'TCS NQT → Interview', time: '1d ago' }
                    ].map((item, i) => {
                      const IconComp = item.icon;
                      return (
                        <div key={i} className="flex items-start space-x-2.5 p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                          <div className={`p-1.5 rounded-xl ${item.color} flex-shrink-0 mt-0.5`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">{item.title}</h4>
                            <p className="text-[10px] text-slate-500 truncate">{item.sub}</p>
                          </div>
                          <span className="text-[9px] text-slate-400 flex-shrink-0">{item.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400">All alerts up to date</span>
                </div>
              </div>

            </div>


            {/* ROW 3 GRID: Profile Completion | Saved Opportunities | Real-time Updates | Error & Empty States */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* CARD 9: Profile Completion (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Profile Completion</h2>
                    <span className="p-1 rounded-lg bg-blue-50 text-blue-600"><User className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Complete your profile for better recommendations</p>

                  <div className="flex items-center justify-center py-2">
                    {/* SVG Circular Gauge */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-500 transition-all duration-1000 ease-out"
                          strokeDasharray={`${profileCompletionPercent}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-slate-900">{profileCompletionPercent}%</span>
                        <span className="text-[9px] font-semibold text-slate-500 uppercase">Profile</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Checklist */}
                  <div className="space-y-1.5 mt-2">
                    {[
                      { key: 'basicInfo', label: 'Basic Information' },
                      { key: 'education', label: 'Education' },
                      { key: 'skills', label: 'Skills' },
                      { key: 'careerGoal', label: 'Career Goal' },
                      { key: 'workExperience', label: 'Work Experience' },
                      { key: 'interests', label: 'Interests' },
                      { key: 'locationPref', label: 'Location Preference' }
                    ].map((item) => {
                      const isChecked = profileData.completedItems[item.key];
                      return (
                        <div 
                          key={item.key} 
                          onClick={() => {
                            setProfileData(prev => ({
                              ...prev,
                              completedItems: {
                                ...prev.completedItems,
                                [item.key]: !prev.completedItems[item.key]
                              }
                            }));
                          }}
                          className="flex items-center space-x-2 text-xs cursor-pointer select-none hover:opacity-80 transition"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                          )}
                          <span className={`text-[11px] ${isChecked ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Complete Profile →
                  </button>
                </div>
              </div>

              {/* CARD 10: Saved Opportunities (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Saved Opportunities</h2>
                    <span className="p-1 rounded-lg bg-red-50 text-red-500"><Heart className="w-4 h-4 fill-red-500" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Keep track of your favorite opportunities</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 max-h-[230px] overflow-y-auto pr-1">
                    {savedOppsList.length === 0 ? (
                      <div className="col-span-2 text-center py-8 text-slate-400 text-xs">
                        No saved opportunities yet. Click the heart icon on any opportunity card!
                      </div>
                    ) : (
                      savedOppsList.map((opp) => (
                        <div key={opp.id} className="p-2.5 rounded-2xl border border-slate-200/60 bg-slate-50 flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div className={`w-6 h-6 rounded-md ${opp.logoBg} flex items-center justify-center text-[9px] font-bold border`}>
                              {opp.logoText}
                            </div>
                            <button 
                              onClick={(e) => toggleSaveOpportunity(opp.id, e)}
                              className="text-red-500 hover:text-slate-400 transition"
                            >
                              <Heart className="w-3.5 h-3.5 fill-red-500" />
                            </button>
                          </div>
                          <div className="mt-2">
                            <h4 className="text-[11px] font-bold text-slate-900 truncate">{opp.title}</h4>
                            <p className="text-[9px] text-slate-500">{opp.company}</p>
                          </div>
                          <div className="mt-2">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                              {opp.matchScore}% match
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All Saved →
                  </button>
                </div>
              </div>

              {/* CARD 11: Real-time Updates & Sync (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Real-time Updates</h2>
                    <span className="p-1 rounded-lg bg-cyan-50 text-cyan-600"><RefreshCw className="w-4 h-4 animate-spin" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Your data, always in sync</p>

                  {/* Interactive Status List */}
                  <div className="space-y-2 mb-3">
                    {[
                      { title: 'Saved opportunities', desc: 'Updates instantly' },
                      { title: 'Application status', desc: 'Real-time sync' },
                      { title: 'Profile changes', desc: 'Live across all devices' },
                      { title: 'Dashboard statistics', desc: 'Always up to date' }
                    ].map((st, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                          <p className="font-semibold text-slate-800 text-[11px]">{st.title}</p>
                          <p className="text-[9px] text-slate-400">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Preview Frame (Matching Reference Image mockup) */}
                  <div className="bg-slate-900 text-white rounded-2xl p-3 border border-slate-800 shadow-inner">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 mb-2">
                      <span>LifeBridge AI</span>
                      <Bell className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                      <p className="text-[10px] font-bold text-cyan-300">Application status updated</p>
                      <p className="text-[9px] text-slate-300 mt-0.5">Your application to Amazon SDE is now in Interview stage.</p>
                      <span className="text-[8px] text-slate-400 mt-1 block text-right">Just now</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-center text-[10px] text-slate-400">
                  ⚡ Connected to Supabase Engine
                </div>
              </div>

              {/* CARD 12: Error & Empty States Showcase (3 Cols) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-slate-900 text-base">Error & Empty States</h2>
                    <span className="p-1 rounded-lg bg-amber-50 text-amber-600"><AlertCircle className="w-4 h-4" /></span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Smooth experience, even when things go wrong</p>

                  {/* 2x2 Grid of State Mini-cards matching reference visual */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    
                    {/* State 1: No Opportunities */}
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center">
                      <Search className="w-4 h-4 text-blue-500 mb-1" />
                      <p className="text-[10px] font-bold text-slate-800">No Opportunities</p>
                      <p className="text-[8px] text-slate-400 leading-tight my-1">Try adjusting your filters</p>
                      <button 
                        onClick={() => setCategoryFilter('All')}
                        className="text-[8px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white"
                      >
                        Reset
                      </button>
                    </div>

                    {/* State 2: Loading */}
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-1" />
                      <p className="text-[10px] font-bold text-slate-800">Loading...</p>
                      <p className="text-[8px] text-slate-400 leading-tight">Fetching live items</p>
                    </div>

                    {/* State 3: Error */}
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mb-1" />
                      <p className="text-[10px] font-bold text-slate-800">Something wrong</p>
                      <button 
                        onClick={() => showToast('Data reloaded successfully')}
                        className="text-[8px] font-bold px-2 py-0.5 rounded bg-amber-500 text-white mt-1"
                      >
                        Retry
                      </button>
                    </div>

                    {/* State 4: 404 */}
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center">
                      <FileX className="w-4 h-4 text-red-500 mb-1" />
                      <p className="text-[10px] font-bold text-slate-800">404 Not Found</p>
                      <button 
                        onClick={() => setActiveTab('dashboard')}
                        className="text-[8px] font-bold px-2 py-0.5 rounded bg-slate-800 text-white mt-1"
                      >
                        Home
                      </button>
                    </div>

                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => setActiveTab('states')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View Full State Previews →
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: EXPLORE OPPORTUNITIES DETAIL PAGE                 */}
        {/* ========================================================= */}
        {activeTab === 'explore' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Explore All Opportunities</h1>
                <p className="text-xs text-slate-500">Discover internships, hackathons, jobs, and scholarships tailored to your skills</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search titles or companies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none w-64"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex space-x-2 border-b border-slate-100 pb-3 overflow-x-auto">
              {['All', 'Internship', 'Job', 'Hackathon', 'Scholarship', 'Course'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    categoryFilter === cat 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Opportunities List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOpps.map((opp) => (
                <div key={opp.id} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl ${opp.logoBg} flex items-center justify-center font-bold text-sm border shadow-xs`}>
                          {opp.logoText}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug">{opp.title}</h3>
                          <p className="text-xs text-slate-500">{opp.company}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => toggleSaveOpportunity(opp.id, e)}
                        className={`p-1.5 rounded-full ${opp.isSaved ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <Heart className="w-4 h-4" fill={opp.isSaved ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 my-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{opp.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-800">{opp.stipend}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline: {opp.deadline}</span>
                      </div>
                    </div>

                    {/* Match reasoning pill */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-extrabold text-emerald-800 uppercase">AI Match Analysis</span>
                        <span className="text-xs font-black text-emerald-700">{opp.matchScore}%</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {opp.matchReasons.map((reason, i) => (
                          <span key={i} className="text-[9px] bg-white text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200 font-medium">
                            ✓ {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedOppModal(opp)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center space-x-1"
                  >
                    <span>View Details & Apply</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: CAREER ROADMAP & SKILL GAP ENGINE VIEW            */}
        {/* ========================================================= */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Career Roadmap & Skill Gap Engine</h1>
                <p className="text-xs text-slate-500">Personalized learning journey generated by LifeBridge AI</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-700">Target Role:</span>
                <select 
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="bg-slate-100 font-bold border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-blue-700 focus:outline-none"
                >
                  <option value="AI/ML Engineer">AI/ML Engineer</option>
                  <option value="Software Engineer">Software Engineer</option>
                </select>
              </div>
            </div>

            {/* Visual Curved Pathway Card */}
            <div className="bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 border border-indigo-900/40 shadow-xl">
              <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold">
                  Target: {careerGoal}
                </span>
                <h2 className="text-xl font-extrabold mt-2">Your Milestones</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {SKILL_DATABASE[careerGoal].roadmap.map((step, idx) => (
                  <div key={idx} className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-slate-300">{step.desc}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-700 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        step.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {step.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: APPLICATION KANBAN TRACKER                       */}
        {/* ========================================================= */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Application Kanban Board</h1>
              <p className="text-xs text-slate-500">Manage your active recruitment processes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Saved', 'Applied', 'Interview', 'Selected'].map((status) => {
                const items = opportunities.filter(o => o.status === status);
                return (
                  <div key={status} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 min-h-[400px]">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                      <h3 className="font-bold text-slate-800 text-sm">{status}</h3>
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-bold">
                        {items.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                          <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                          <p className="text-[10px] text-slate-500">{item.company} • {item.location}</p>
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                              {item.matchScore}% Match
                            </span>
                            <div className="flex space-x-1">
                              {status !== 'Selected' && (
                                <button 
                                  onClick={() => {
                                    const nextMap = { 'Saved': 'Applied', 'Applied': 'Interview', 'Interview': 'Selected' };
                                    updateApplicationStatus(item.id, nextMap[status]);
                                  }}
                                  className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                                >
                                  Advance →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: AI CAREER ASSISTANT CHAT                          */}
        {/* ========================================================= */}
        {activeTab === 'assistant' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-4xl mx-auto space-y-4">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">LifeBridge AI Personal Career Coach</h1>
                <p className="text-xs text-slate-500">Real-time guidance tailored to your profile ({profileData.degree})</p>
              </div>
            </div>

            <div className="h-96 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 whitespace-pre-line shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Ask about resume tips, AWS preparation, hackathon ideas..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={() => handleSendChat()}
                className="px-5 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: SYSTEM STATES & ERROR PAGES SHOWCASE               */}
        {/* ========================================================= */}
        {activeTab === 'states' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">System Error & Empty States Preview</h1>
              <p className="text-xs text-slate-500">Clean UI fallbacks for seamless user experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
                <Search className="w-8 h-8 text-blue-500 mx-auto" />
                <h3 className="font-bold text-sm text-slate-900">No Opportunities Found</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">Try adjusting your active filters or check back later for new updates.</p>
                <button onClick={() => setCategoryFilter('All')} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">
                  Browse All Opportunities
                </button>
              </div>

              {/* Card 2 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="font-bold text-sm text-slate-900">Loading Data...</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">Please wait while our AI matches your profile with global opportunities.</p>
              </div>

              {/* Card 3 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                <h3 className="font-bold text-sm text-slate-900">Something Went Wrong</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">We couldn't load the real-time data stream. Please try again.</p>
                <button onClick={() => showToast('Re-established server connection')} className="px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-xl">
                  Retry Connection
                </button>
              </div>

              {/* Card 4 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
                <FileX className="w-8 h-8 text-red-500 mx-auto" />
                <h3 className="font-bold text-sm text-slate-900">404 Page Not Found</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">The requested opportunity page or route does not exist.</p>
                <button onClick={() => setActiveTab('dashboard')} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
                  Go Home Dashboard
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 7: PROFILE EDITING PAGE                               */}
        {/* ========================================================= */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-xl font-bold text-slate-900">User Profile Settings</h1>
                <p className="text-xs text-slate-500">Profile Completion: {profileCompletionPercent}%</p>
              </div>
              <button 
                onClick={() => { showToast('Profile changes saved'); setActiveTab('dashboard'); }}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Save Changes
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Degree Program</label>
                <input 
                  type="text" 
                  value={profileData.degree}
                  onChange={(e) => setProfileData(prev => ({ ...prev, degree: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Current Skills (comma separated)</label>
                <input 
                  type="text" 
                  value={profileData.skills}
                  onChange={(e) => setProfileData(prev => ({ ...prev, skills: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* OPPORTUNITY DETAIL MODAL DIALOG                          */}
      {/* ========================================================= */}
      {selectedOppModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative space-y-4">
            <button 
              onClick={() => setSelectedOppModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-2xl ${selectedOppModal.logoBg} flex items-center justify-center font-extrabold text-base border`}>
                {selectedOppModal.logoText}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{selectedOppModal.title}</h3>
                <p className="text-xs text-slate-500">{selectedOppModal.company} • {selectedOppModal.location}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 flex justify-between items-center text-xs">
              <span className="font-semibold text-blue-900">Stipend / Package:</span>
              <span className="font-bold text-blue-700">{selectedOppModal.stipend}</span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-1">Description</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedOppModal.description}</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-900">AI Match Rating</span>
                <span className="text-sm font-black text-emerald-700">{selectedOppModal.matchScore}%</span>
              </div>
              <div className="space-y-1">
                {selectedOppModal.matchReasons.map((r, idx) => (
                  <p key={idx} className="text-[11px] text-emerald-800">✓ {r}</p>
                ))}
              </div>
            </div>

            <div className="pt-2 flex space-x-3">
              <button 
                onClick={() => {
                  updateApplicationStatus(selectedOppModal.id, 'Applied');
                  setSelectedOppModal(null);
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Apply Now
              </button>
              <button 
                onClick={(e) => {
                  toggleSaveOpportunity(selectedOppModal.id, e);
                  setSelectedOppModal(null);
                }}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                {selectedOppModal.isSaved ? 'Unsave' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}