"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/lib/audio";
import { SEEDED_TRENDS } from "@/lib/agents/orchestrator";
import {
  getFavoritesAction,
  addFavoriteAction,
  removeFavoriteAction,
  getSearchHistoryAction,
  addSearchQueryAction,
} from "@/app/actions";
import {
  Search,
  TrendingUp,
  BookMarked,
  History,
  Clock,
  ExternalLink,
  ChevronRight,
  Terminal,
  Zap,
  User,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [userRole, setUserRole] = useState<"Explorer" | "Analyst" | "Admin">("Explorer");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [agentPipelineActive, setAgentPipelineActive] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const trendsList = Object.values(SEEDED_TRENDS);
  const categories = ["All", "Technology", "Business", "Sports", "Entertainment", "Politics", "Science", "Gaming", "India", "Global"];

  useEffect(() => {
    const loadState = async () => {
      const favs = await getFavoritesAction();
      setFavorites(favs);
      const history = await getSearchHistoryAction();
      setSearchHistory(history);
    };
    loadState();
  }, []);

  const filteredTrends = trendsList.filter((t) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "India") return t.country === "India";
    if (selectedCategory === "Global") return t.country === "Global";
    return t.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    audio.playClickChime();
    await addSearchQueryAction(searchQuery);
    const updatedHistory = await getSearchHistoryAction();
    setSearchHistory(updatedHistory);

    setAgentLogs([]);
    setCurrentAgentIndex(0);
    setPipelineProgress(0);
    setAgentPipelineActive(true);
  };

  const AGENT_MESSAGES = [
    { name: "Trend Discovery Agent", msg: "Scanning news APIs, Google Trends, and social volume thresholds..." },
    { name: "Trend Discovery Agent", msg: "Identified query signal. Initializing full semantic analysis pipeline." },
    { name: "Research Agent", msg: "Querying news databases, Wikipedia abstracts, and blog summaries..." },
    { name: "Research Agent", msg: "Retrieved 1,200 unique articles. Cleaning duplicates and extracting entities." },
    { name: "Timeline Agent", msg: "Re-sequencing timeline structures. Isolating core day-by-day actions." },
    { name: "Social Pulse Agent", msg: "Scraping social comments (Reddit, YouTube, Twitter API streams)..." },
    { name: "Social Pulse Agent", msg: "Aggregated 15,200 conversational rows. Parsing semantic context." },
    { name: "Sentiment Agent", msg: "Calculating polarity indexes. Processing Positive / Negative token structures." },
    { name: "Meme Decoder Agent", msg: "Locating structural internet jokes, templates, and inside humor connections..." },
    { name: "Prediction Agent", msg: "Applying forecasting math models. Longevity & Velocity calculation complete." },
    { name: "Summary Agent", msg: "Synthesizing multi-level outputs (30s, 2m, ELI10, Expert detail panels)..." },
    { name: "Orchestrator Core", msg: "All agent states: RESOLVED. Loading trend analysis..." },
  ];

  useEffect(() => {
    if (!agentPipelineActive) return;
    let logCounter = 0;
    const interval = setInterval(() => {
      if (logCounter < AGENT_MESSAGES.length) {
        const item = AGENT_MESSAGES[logCounter];
        setAgentLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [${item.name}] || ${item.msg}`,
        ]);
        logCounter++;
        setCurrentAgentIndex(logCounter);
        setPipelineProgress(Math.floor((logCounter / AGENT_MESSAGES.length) * 100));
        audio.playHoverChime();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setAgentPipelineActive(false);
          const trendId = searchQuery.replace(/\s+/g, "-").toLowerCase();
          router.push(`/trend/${trendId}`);
          setSearchQuery("");
        }, 800);
      }
    }, 420);
    return () => clearInterval(interval);
  }, [agentPipelineActive, searchQuery]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [agentLogs]);

  const handleFavoriteToggle = async (trendId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playClickChime();
    const isFav = favorites.includes(trendId);
    if (isFav) {
      await removeFavoriteAction(trendId);
      setFavorites((prev) => prev.filter((id) => id !== trendId));
    } else {
      await addFavoriteAction(trendId);
      setFavorites((prev) => [...prev, trendId]);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#050816] overflow-x-hidden font-sans">
      {/* Header */}
      <header className="relative w-full px-4 py-3 border-b border-white/5 bg-[#0B1220]/60 backdrop-blur-md flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-xl font-extrabold font-orbitron tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              MINDVERSE
            </span>
            <span className="ml-2 text-[10px] font-mono text-cyan-400/40 hidden sm:inline">
              // WHY IS IT TRENDING?
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-cyan-400/80">
          <button
            onClick={() => { audio.playClickChime(); setIsHistoryOpen(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:text-white transition"
          >
            <History className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">CONSOLE</span>
          </button>

          <div className="relative">
            <button
              onClick={() => { audio.playClickChime(); setIsProfileOpen(!isProfileOpen); }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded hover:border-cyan-400/40 transition"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>{userRole.toUpperCase()}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#0B1220] border border-cyan-500/20 rounded shadow-2xl z-50 p-1">
                {(["Explorer", "Analyst", "Admin"] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => { audio.playClickChime(); setUserRole(role); setIsProfileOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-cyan-900/30 rounded text-xs transition ${userRole === role ? "text-cyan-400 font-bold" : "text-slate-400"}`}
                  >
                    {role} Mode
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-6 relative z-10 select-text">

        {/* Search hero */}
        <div className="glass-panel border-glow-cyan p-6 sm:p-8 rounded-lg mt-2 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h1 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white tracking-wide">
            🔎 WHY IS IT TRENDING?
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mt-2 leading-relaxed">
            Enter a person, company, event, meme, or technology. Our 8 specialized AI agents investigate, sequence, decode, and summarize it — from timeline to sentiment to meme culture.
          </p>

          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mt-5 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                id="trend-search-input"
                type="text"
                placeholder='e.g. "Why is OpenAI trending?" or "Why is Coldplay trending?"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050816]/80 text-white placeholder-slate-500 text-sm pl-4 pr-10 py-3 rounded border border-white/10 hover:border-cyan-400/40 focus:border-cyan-400 focus:outline-none transition font-sans"
              />
              <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              id="run-agents-btn"
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-bold text-sm tracking-wide rounded hover:from-cyan-300 hover:to-indigo-400 shadow-md shadow-cyan-400/20 active:scale-95 transition whitespace-nowrap"
            >
              RUN AGENTS
            </button>
          </form>

          <div className="flex flex-wrap gap-2 justify-center mt-3.5">
            <span className="text-[10px] uppercase font-mono text-cyan-400/40 py-1">Quick search:</span>
            {["OpenAI", "Coldplay", "NVIDIA", "Labubu", "Wimbledon"].map((h) => (
              <button
                key={h}
                onClick={() => { setSearchQuery(`Why is ${h} trending?`); audio.playHoverChime(); }}
                className="text-[10px] font-mono bg-white/5 px-2 py-0.5 border border-white/5 rounded text-indigo-300 hover:text-cyan-300 hover:border-cyan-500/20 transition"
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Trending grid + Daily Digest */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">

            <div className="flex items-center justify-between border-b border-white/5 pb-2 mt-2">
              <h2 className="text-sm font-bold font-orbitron tracking-wider text-cyan-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                TRENDING NOW
              </h2>
              <span className="text-[11px] font-mono text-cyan-400/50">
                {filteredTrends.length} TOPICS
              </span>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { audio.playClickChime(); setSelectedCategory(cat); }}
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

            {/* Trend cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              <AnimatePresence mode="popLayout">
                {filteredTrends.map((t) => {
                  const isSaved = favorites.includes(t.id);
                  return (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => { audio.playWarpSweep(); router.push(`/trend/${t.id}`); }}
                      className="glass-panel border-glow-cyan bg-secondary-navy/20 p-5 rounded-lg border border-white/5 hover:border-cyan-500/30 hover:bg-secondary-navy/40 transition duration-300 cursor-pointer group flex flex-col justify-between gap-4 select-none"
                    >
                      <div>
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
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition font-orbitron mt-2.5">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                          {t.summary["30s"]}
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>SCORE: <strong className="text-cyan-400 font-bold">{t.popularity}</strong></span>
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

          {/* Daily Digest sidebar */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-white/5 pb-2 mt-2">
              <h2 className="text-sm font-bold font-orbitron tracking-wider text-purple-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                DAILY DIGEST
              </h2>
            </div>

            <div className="glass-panel-purple border-glow-purple p-5 rounded-lg flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono text-purple-300">AI AGENTS: ACTIVE</span>
                <span className="text-[9px] font-mono text-purple-400/80">TODAY</span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <p className="font-semibold text-white">🔥 Top stories right now:</p>
                <div className="space-y-2.5 mt-2">
                  {[
                    { bold: "API server rushes", text: "Coldplay ticket sellout forces regulatory scans in India." },
                    { bold: "Hardware conquest", text: "NVIDIA peaks in global market cap on Blackwell demand." },
                    { bold: "Reasoning models", text: "OpenAI launches GPT-5.5, redefining autonomous AI agents." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>{item.bold}</strong>: {item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#050816]/70 border border-white/5 p-3 rounded font-mono text-[10px] text-slate-400 leading-relaxed">
                <div className="text-cyan-400 tracking-wider mb-1.5">SYSTEM METRICS:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>VELOCITY: <span className="text-emerald-400 font-bold">+890%</span></div>
                  <div>AGENTS: <span className="text-white font-bold">8 ONLINE</span></div>
                  <div>UPTIME: <span className="text-cyan-300 font-bold">99.98%</span></div>
                  <div>SOURCES: <span className="text-white font-bold">MUM/SF/LON</span></div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-lg flex flex-col gap-2 border border-white/5 text-xs text-slate-400 leading-relaxed">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">HOW IT WORKS</span>
              <p>Search any trend. Eight specialized AI agents run in parallel — discovering, researching, sequencing timelines, analyzing social sentiment, decoding memes, and predicting longevity — then synthesize it all into clear explanations.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Console Drawer (bookmarks + history) */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-[#050816] z-40 cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-[#0B1220] border-l border-cyan-500/20 z-50 p-5 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex flex-col gap-5 overflow-y-auto flex-1">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h4 className="font-orbitron font-bold text-white text-sm flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    CONSOLE DATA
                  </h4>
                  <button onClick={() => setIsHistoryOpen(false)} className="text-slate-400 hover:text-white font-mono text-xs">
                    [ESC]
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                    SAVED BOOKMARKS ({favorites.length})
                  </span>
                  {favorites.length === 0 ? (
                    <div className="text-[11px] font-mono text-slate-500 border border-dashed border-white/5 p-3 rounded text-center">[NO SAVED TRENDS]</div>
                  ) : (
                    <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                      {favorites.map((id) => {
                        const trend = trendsList.find((t) => t.id === id);
                        return (
                          <div
                            key={id}
                            onClick={() => { audio.playWarpSweep(); router.push(`/trend/${id}`); setIsHistoryOpen(false); }}
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

                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    SEARCH HISTORY
                  </span>
                  {searchHistory.length === 0 ? (
                    <div className="text-[11px] font-mono text-slate-500 border border-dashed border-white/5 p-3 rounded text-center">[NO SEARCH HISTORY]</div>
                  ) : (
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {searchHistory.map((query, index) => (
                        <div
                          key={index}
                          onClick={() => { setSearchQuery(query); setIsHistoryOpen(false); audio.playHoverChime(); }}
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

              <div className="border-t border-white/10 pt-4 font-mono text-[10px] text-cyan-400/40">
                MODE: {userRole.toUpperCase()} // MINDVERSE AI SYSTEM
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Agent Pipeline Fullscreen Overlay */}
      <AnimatePresence>
        {agentPipelineActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050816]/98 z-50 p-4 sm:p-8 flex flex-col justify-between select-none"
          >
            <div className="flex justify-between items-center border-b border-cyan-400/20 pb-4">
              <div>
                <h3 className="text-lg font-bold font-orbitron tracking-widest text-cyan-300 animate-pulse flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  AI AGENTS RUNNING
                </h3>
                <p className="text-[10px] font-mono text-slate-400 mt-1">
                  QUERY: &quot;{searchQuery}&quot; // PROCESSING...
                </p>
              </div>
              <div className="text-right font-mono text-xs text-cyan-400">
                {pipelineProgress}%
              </div>
            </div>

            <div className="flex-1 my-6 overflow-y-auto bg-slate-950/80 border border-cyan-500/10 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2 flex flex-col">
              {agentLogs.length === 0 ? (
                <div className="text-cyan-400/60 animate-pulse">[ESTABLISHING INFERENCE CHANNELS...]</div>
              ) : (
                agentLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={idx === agentLogs.length - 1 ? "text-cyan-400 font-bold" : "text-[#a5f3fc]"}
                  >
                    {log}
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>

            <div className="border-t border-cyan-400/20 pt-4 flex flex-col gap-4">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {["Discovery", "Research", "Timeline", "Social", "Sentiment", "Meme", "Prediction", "Summary"].map((name, idx) => {
                  const isActive = idx === Math.min(Math.floor(currentAgentIndex / 1.5), 7);
                  const isDone = Math.min(Math.floor(currentAgentIndex / 1.5), 7) > idx;
                  return (
                    <div
                      key={name}
                      className={`text-center py-2 px-1 border font-mono text-[9px] rounded transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400 bg-cyan-950/20 text-cyan-300 animate-pulse"
                          : isDone
                          ? "border-indigo-500/40 bg-indigo-950/10 text-slate-500"
                          : "border-white/5 text-slate-600"
                      }`}
                    >
                      <div>A.{idx + 1}</div>
                      <div className="truncate mt-1 font-bold">{name.toUpperCase()}</div>
                    </div>
                  );
                })}
              </div>
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

      <footer className="w-full p-4 border-t border-white/5 text-center font-mono text-[10px] text-cyan-400/30">
        MINDVERSE // AI TREND INTELLIGENCE SYSTEM
      </footer>
    </div>
  );
}
