"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/lib/audio";
import { SEEDED_TRENDS, TrendDetails, searchTrend } from "@/lib/agents/orchestrator";
import { db } from "@/lib/db";
import { 
  Search, 
  TrendingUp, 
  BookMarked, 
  History, 
  Clock, 
  TrendingDown, 
  Share2, 
  ExternalLink,
  ChevronRight, 
  Terminal, 
  Zap, 
  Compass, 
  User 
} from "lucide-react";

export default function NewsPlanetHome() {
  const router = useRouter();
  
  // Dashboard states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [userRole, setUserRole] = useState<"Explorer" | "Analyst" | "Admin">("Explorer");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Simulated agent pipeline loading state
  const [agentPipelineActive, setAgentPipelineActive] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Seeded records mapping
  const trendsList = Object.values(SEEDED_TRENDS);

  // Categories
  const categories = ["All", "Technology", "Business", "Sports", "Entertainment", "India", "Global"];

  // Sync state with local state definitions on load
  useEffect(() => {
    const loadState = async () => {
      const favs = await db.getFavorites();
      setFavorites(favs);
      const history = await db.getSearchHistory();
      setSearchHistory(history);
    };
    loadState();
  }, []);

  // Filter trends based on category
  const filteredTrends = trendsList.filter(t => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "India") return t.country === "India";
    if (selectedCategory === "Global") return t.country === "Global";
    return t.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Handle Search Submission
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    audio.playClickChime();
    
    // Register search in mock DB
    await db.addSearchQuery(searchQuery);
    const updatedHistory = await db.getSearchHistory();
    setSearchHistory(updatedHistory);

    // Initialize agent loading pipeline simulator!
    setAgentLogs([]);
    setCurrentAgentIndex(0);
    setPipelineProgress(0);
    setAgentPipelineActive(true);
  };

  // Agent Pipeline Simulator timeline logs
  const AGENT_MESSAGES = [
    { name: "Trend Discovery Agent", msg: "Scanning news API, Google Trends, and social volume thresholds..." },
    { name: "Trend Discovery Agent", msg: "Identified query anomaly. Initializing full semantic analysis pipeline." },
    { name: "Research Agent", msg: "Querying NewsAPI databases, Wikipedia abstracts, and blog summaries..." },
    { name: "Research Agent", msg: "Retrieved 1,200 unique articles. Cleaning duplicates and extracting entities." },
    { name: "Timeline Agent", msg: "Re-sequencing timeline structures. Isolating core day-by-day actions." },
    { name: "Social Pulse Agent", msg: "Scraping social comments (Reddit, YouTube, Twitter API streams)..." },
    { name: "Social Pulse Agent", msg: "Aggregated 15,200 conversational rows. Parsing semantic context." },
    { name: "Sentiment Agent", msg: "Calculating polarity indexes. Processing Positive / Negative token structures." },
    { name: "Meme Decoder Agent", msg: "Locating structural internet jokes, templates, and inside humor connections..." },
    { name: "Prediction Agent", msg: "Applying forecasting math models. Longevity & Velocity calculation complete." },
    { name: "Summary Agent", msg: "Synthesizing multi-level outputs (30s, 2m, ELIF10, Expert detail panels)..." },
    { name: "Orchestrator Core", msg: "All agent states: RESOLVED. Syncing database records. Zooming camera." }
  ];

  useEffect(() => {
    if (!agentPipelineActive) return;

    let logCounter = 0;
    const interval = setInterval(() => {
      if (logCounter < AGENT_MESSAGES.length) {
        const item = AGENT_MESSAGES[logCounter];
        setAgentLogs(prev => [
          ...prev, 
          `[${new Date().toLocaleTimeString()}] [${item.name}] || ${item.msg}`
        ]);
        
        // Progress calculator
        logCounter++;
        setCurrentAgentIndex(logCounter);
        setPipelineProgress(Math.floor((logCounter / AGENT_MESSAGES.length) * 100));
        
        audio.playHoverChime();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setAgentPipelineActive(false);
          // Route user directly to the trend page!
          const trendId = searchQuery.replace(/\s+/g, '-').toLowerCase();
          router.push(`/news/trend/${trendId}`);
          setSearchQuery("");
        }, 800);
      }
    }, 450); // Fast pulse for hacker console feel

    return () => clearInterval(interval);
  }, [agentPipelineActive, searchQuery]);

  // Scroll to bottom in simulated log console
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [agentLogs]);

  // Toggle Favorite
  const handleFavoriteToggle = async (trendId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid card click triggers
    audio.playClickChime();

    const isFav = favorites.includes(trendId);
    if (isFav) {
      await db.removeFavorite(trendId);
      setFavorites(prev => prev.filter(id => id !== trendId));
    } else {
      await db.addFavorite(trendId);
      setFavorites(prev => [...prev, trendId]);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#050816] overflow-x-hidden font-sans">
      
      {/* Header Widget HUD */}
      <header className="relative w-full p-4 border-b border-glow-cyan/20 bg-secondary-navy/40 backdrop-blur-md flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { audio.playClickChime(); router.push("/"); }}
            className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950/40 border border-cyan-400/30 text-cyan-400 text-xs font-mono rounded hover:bg-cyan-900/40 hover:border-cyan-400 transition"
          >
            <Compass className="w-3.5 h-3.5" />
            GALAXY VIEW
          </button>
          
          <div className="h-4 w-[1px] bg-cyan-400/20" />
          
          <h2 className="text-xl font-bold font-orbitron font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent select-text">
            NEWS PLANET
          </h2>
        </div>

        {/* HUD Info panels */}
        <div className="flex items-center gap-3 font-mono text-xs text-cyan-400/80">
          
          {/* Favorites tab trigger */}
          <button 
            onClick={() => { audio.playClickChime(); setIsHistoryOpen(true); }}
            className="flex items-center gap-1.5 px-3 py-1 hover:text-white transition"
          >
            <History className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">CONSOLE DATA</span>
          </button>

          {/* User profile selection */}
          <div className="relative">
            <button 
              onClick={() => { audio.playClickChime(); setIsProfileOpen(!isProfileOpen); }}
              className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded hover:border-cyan-400/40 transition"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>{userRole.toUpperCase()}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0B1220] border border-cyan-500/20 rounded shadow-2xl z-50 p-1">
                {(["Explorer", "Analyst", "Admin"] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      audio.playClickChime();
                      setUserRole(role);
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-cyan-900/30 rounded text-xs transition ${
                      userRole === role ? "text-cyan-400 font-bold" : "text-slate-400"
                    }`}
                  >
                    {role} Console
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content grid */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-6 relative z-10 select-text">
        
        {/* Hero search bar widget */}
        <div className="glass-panel border-glow-cyan p-6 sm:p-8 rounded-lg mt-2 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-xl sm:text-2xl font-bold font-orbitron text-white">
            🔎 WHY IS IT TRENDING?
          </h3>
          <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
            Enter a person, company, event, meme, or technology. Our 8 specialized AI agents will investigate, sequence, decode, and summarize it for you.
          </p>

          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mt-5 relative flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="e.g. Why is Coldplay trending? Why is OpenAI trending?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#050816]/80 text-white placeholder-slate-500 text-sm pl-4 pr-10 py-3 rounded border border-white/10 hover:border-cyan-400/40 focus:border-cyan-400 focus:outline-none transition font-sans"
              />
              <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-bold text-sm tracking-wide rounded hover:from-cyan-300 hover:to-indigo-400 shadow-md shadow-cyan-400/20 active:scale-95 transition"
            >
              RUN AGENTS
            </button>
          </form>
          
          <div className="flex flex-wrap gap-2 justify-center mt-3.5">
            <span className="text-[10px] uppercase font-mono text-cyan-400/40 py-1">Hot keys:</span>
            {["OpenAI", "Coldplay", "NVIDIA", "Labubu", "Wimbledon"].map(h => (
              <button
                key={h}
                onClick={() => {
                  setSearchQuery(`Why is ${h} trending?`);
                  audio.playHoverChime();
                }}
                className="text-[10px] font-mono bg-white/5 px-2 py-0.5 border border-white/5 rounded text-indigo-300 hover:text-cyan-300 hover:border-cyan-500/20 transition"
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Daily global dashboard digest summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* Filter Category Tabs bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mt-4">
              <h4 className="text-sm font-bold font-orbitron tracking-wider text-cyan-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                TRENDING CORE FEED
              </h4>

              <span className="text-[11px] font-mono text-cyan-400/50">
                FOUND: {filteredTrends.length} NODES
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    audio.playClickChime();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1 rounded text-xs font-semibold border transition ${
                    selectedCategory === cat
                      ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.15)]"
                      : "bg-[#0B1220]/20 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Trending Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <AnimatePresence mode="popLayout">
                {filteredTrends.map(t => {
                  const isSaved = favorites.includes(t.id);
                  return (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => {
                        audio.playWarpSweep();
                        router.push(`/news/trend/${t.id}`);
                      }}
                      className="glass-panel border-glow-cyan bg-secondary-navy/20 p-5 rounded-lg border border-white/5 hover:border-cyan-500/30 hover:bg-secondary-navy/40 transition duration-300 cursor-pointer group flex flex-col justify-between gap-4 select-none relative"
                    >
                      <div>
                        {/* Title & Favorite badge */}
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/20 rounded">
                            {t.category.toUpperCase()}
                          </span>
                          
                          <button
                            onClick={(e) => handleFavoriteToggle(t.id, e)}
                            className="text-slate-500 hover:text-purple-400 p-1 rounded-full transition"
                          >
                            <BookMarked className={`w-4 h-4 ${isSaved ? "text-purple-400 fill-purple-400" : ""}`} />
                          </button>
                        </div>

                        <h5 className="text-base font-bold text-white group-hover:text-cyan-300 transition font-orbitron mt-2.5">
                          {t.title}
                        </h5>
                        
                        <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                          {t.summary['30s']}
                        </p>
                      </div>

                      {/* Score metrics */}
                      <div className="border-t border-white/5 pt-3 mt-1 flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>POPULARITY: <strong className="text-glow-cyan text-cyan-400 font-bold">{t.popularity}</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{t.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

          {/* Daily Digest Column Sidebar */}
          <div className="flex flex-col gap-4">
            
            <div className="border-b border-white/5 pb-2 mt-4">
              <h4 className="text-sm font-bold font-orbitron tracking-wider text-purple-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                DAILY DATELINE DIGEST
              </h4>
            </div>

            {/* Daily Summary Box */}
            <div className="glass-panel-purple border-glow-purple p-5 rounded-lg flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono text-purple-300">SYSTEM AGENTS INDEX: ACTIVE</span>
                <span className="text-[9px] font-mono text-purple-400/80">JULY 21, 2026</span>
              </div>
              
              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <p className="font-semibold text-white">🔥 KEY FOCUS POINTS today:</p>
                <div className="space-y-2.5 mt-2">
                  <div className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>API server rushes</strong>: Coldplay concert tickets sellout forces regulatory scans in India.</span>
                  </div>
                  <div className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Hardware constraints</strong>: NVIDIA peaks in global capitalization on Blackwell demand spikes.</span>
                  </div>
                  <div className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Reasoning models</strong>: OpenAI launches GPT-5.5, redefining autonomous coding agents.</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#050816]/70 border border-white/5 p-3 rounded font-mono text-[10px] text-slate-400 leading-relaxed mt-1">
                <div className="text-cyan-400 tracking-wider">NETWORK CONVERGENCE STATISTICS:</div>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <div>VOL VELOCITY: <span className="text-emerald-400 font-bold">+890%</span></div>
                  <div>AGENT LOADS: <span className="text-white font-bold">2.4 TB/s</span></div>
                  <div>SECTOR STABILITY: <span className="text-cyan-300 font-bold">99.98%</span></div>
                  <div>PEAK SOURCE: <span className="text-white font-bold">MUM/SF/LON</span></div>
                </div>
              </div>
            </div>

            {/* Quick guide widgets */}
            <div className="glass-panel p-4 rounded-lg flex flex-col gap-2.5 border border-white/5 text-xs text-slate-400 leading-relaxed">
              <span className="text-[10px] font-mono text-cyan-400 text-glow-cyan uppercase font-bold">Agent Protocols Info:</span>
              <p>MindVerse employs 8 parallel LLM agent containers. Our Discovery scanner identifies trends, then passes the context to scraping nodes, chronological timeline compilers, public sentiment counters, and cultural meme decoders.</p>
            </div>

          </div>
        </div>

      </main>

      {/* sliding Drawer sidebar: Bookmarks and History */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            {/* Backdrop click barrier */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-[#050816] z-40 cursor-pointer"
            />
            
            {/* Console Panel Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-[#0B1220] border-l border-cyan-500/20 z-50 p-5 flex flex-col justify-between shadow-2xl select-none"
            >
              <div className="flex flex-col gap-5 overflow-y-auto flex-1">
                
                {/* Header title */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h4 className="font-orbitron font-bold text-white text-sm flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    SYSTEM TERMINAL DATA
                  </h4>
                  <button 
                    onClick={() => setIsHistoryOpen(false)}
                    className="text-slate-400 hover:text-white font-mono text-xs"
                  >
                    [ESC]
                  </button>
                </div>

                {/* Favorites Bookmark list */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">SAVED BOOKMARKS ({favorites.length})</span>
                  {favorites.length === 0 ? (
                    <div className="text-[11px] font-mono text-slate-500 border border-dashed border-white/5 p-3 rounded text-center">
                      [NO SAVED TREND NODES]
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {favorites.map(id => {
                        const trend = trendsList.find(t => t.id === id);
                        return (
                          <div 
                            key={id}
                            onClick={() => {
                              audio.playWarpSweep();
                              router.push(`/news/trend/${id}`);
                              setIsHistoryOpen(false);
                            }}
                            className="font-mono text-[11px] bg-slate-950/40 hover:bg-cyan-950/30 border border-white/5 p-2 rounded cursor-pointer flex justify-between items-center group transition"
                          >
                            <span className="text-slate-300 font-bold group-hover:text-cyan-400 max-w-[80%] truncate">
                              {trend ? trend.title : id}
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Search Queries History */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">SEARCH QUERIES PATHS</span>
                  {searchHistory.length === 0 ? (
                    <div className="text-[11px] font-mono text-slate-500 border border-dashed border-white/5 p-3 rounded text-center">
                      [SEARCH REGISTRY EMPTY]
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {searchHistory.map((query, index) => (
                        <div 
                          key={index}
                          onClick={() => {
                            setSearchQuery(query);
                            setIsHistoryOpen(false);
                            audio.playHoverChime();
                          }}
                          className="font-mono text-[11px] hover:bg-cyan-950/10 border border-white/5 p-2 rounded cursor-pointer flex items-center gap-2 group transition text-slate-400 hover:text-slate-300"
                        >
                          <Clock className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                          <span className="truncate">{query}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Console log status bar at drawer bottom */}
              <div className="border-t border-white/10 pt-4 font-mono text-[10px] text-cyan-400/40">
                SECURE AUTH SECTOR: {userRole.toUpperCase()} USER
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full-Screen Simulated HUD Agent Processing Terminal loading console */}
      <AnimatePresence>
        {agentPipelineActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050816]/98 z-50 p-4 sm:p-8 flex flex-col justify-between select-none"
          >
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-glow-cyan/20 pb-4">
              <div>
                <h3 className="text-lg font-bold font-orbitron tracking-widest text-cyan-300 animate-pulse flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  MINDVERSE AI AGENTS CORE ORCHESTRATION
                </h3>
                <p className="text-[10px] font-mono text-slate-400 mt-1">QUERY: &quot;{searchQuery}&quot; // COORD: SYNCING...</p>
              </div>
              
              <div className="text-right font-mono text-xs text-glow-cyan text-cyan-400">
                PROGRESS: {pipelineProgress}%
              </div>
            </div>

            {/* Simulated Live agent log stream */}
            <div className="flex-1 my-6 overflow-y-auto bg-slate-950/80 border border-cyan-500/10 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2 flex flex-col scrollbar-thin">
              {agentLogs.length === 0 ? (
                <div className="text-cyan-400/60 animate-pulse">[ESTABLISHING INFERENCE CHANNELS...]</div>
              ) : (
                agentLogs.map((log, idx) => (
                  <div key={idx} className={`${idx === agentLogs.length - 1 ? "text-cyan-400 font-bold" : "text-glow-cyan/80 text-[#a5f3fc]"}`}>
                    {log}
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* HUD Status matrix */}
            <div className="border-t border-glow-cyan/20 pt-4 flex flex-col gap-4">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
                {[
                  "Discovery", "Research", "Timeline", "Social",
                  "Sentiment", "Meme", "Prediction", "Summary"
                ].map((name, idx) => {
                  const isActive = idx === Math.min(Math.floor(currentAgentIndex / 1.5), 7);
                  const isDone = Math.min(Math.floor(currentAgentIndex / 1.5), 7) > idx;

                  return (
                    <div
                      key={name}
                      className={`text-center py-2 px-1 border font-mono text-[10px] rounded transition-all duration-300 ${
                        isActive 
                          ? "border-cyan-400 bg-cyan-950/20 text-cyan-300 text-glow-cyan animate-pulse shadow-[0_0_12px_rgba(76,201,240,0.15)]"
                          : isDone
                            ? "border-indigo-500/40 bg-indigo-950/10 text-slate-500"
                            : "border-white/5 bg-transparent text-slate-600"
                      }`}
                    >
                      <div>A.{idx + 1}</div>
                      <div className="truncate mt-1.5 font-bold">{name.toUpperCase()}</div>
                    </div>
                  );
                })}
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-[#050816] rounded-full h-2 overflow-hidden border border-white/5">
                <div
                  style={{ width: `${pipelineProgress}%` }}
                  className="bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                />
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer system diagnostics bar */}
      <footer className="w-full p-4 border-t border-white/5 text-center font-mono text-[10px] text-cyan-400/30">
        [MINDVERSE OPERATING DATABASE HUB: STABLE // REGISTRY SECTOR: AP-9]
      </footer>

    </div>
  );
}
