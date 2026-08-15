"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/lib/audio";
import { getTrend, searchTrend, TrendDetails, RelatedTopicNode } from "@/lib/agents/orchestrator";
import { 
  checkFavoriteAction,
  addFavoriteAction,
  removeFavoriteAction,
} from "@/app/actions";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { 
  ChevronLeft, 
  BookMarked, 
  Share2, 
  TrendingUp, 
  Smile, 
  Meh, 
  Frown, 
  HelpCircle, 
  Clock, 
  Activity, 
  MessageSquare, 
  Sparkles, 
  Network, 
  Terminal, 
  Layers, 
  UserCheck, 
  Cpu, 
  CheckCircle2, 
  Globe 
} from "lucide-react";

export default function TrendAnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const trendId = params.id as string;

  // States
  const [details, setDetails] = useState<TrendDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  
  // Custom synth controls
  const [summaryMode, setSummaryMode] = useState<'30s' | '2m' | '5m' | 'expert'>('2m');
  const [explainLevel, setExplainLevel] = useState<'eli10' | 'general' | 'expert'>('general');
  const [expandedTimelineDay, setExpandedTimelineDay] = useState<string | null>(null);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [showAgentLogs, setShowAgentLogs] = useState(false);

  // Live streaming comments
  const [liveComments, setLiveComments] = useState<any[]>([]);
  const nextCommentIdRef = useRef(100);

  // Fetch trend data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulating a minor load delay
      let data = await getTrend(trendId);
      if (!data) {
        // If not seeded, reconstruct on-the-fly!
        const cleanedQuery = trendId.replace(/-/g, " ");
        data = await searchTrend(cleanedQuery);
      }
      setDetails(data);
      
      // Load favorite status
      const favFlag = await checkFavoriteAction(data.id);
      setIsSaved(favFlag);
      
      // Load initial social comments
      setLiveComments(data.socialPulse);
      setLoading(false);
    };
    
    if (trendId) {
      fetchData();
    }
  }, [trendId]);

  // Live social stream tick effect
  useEffect(() => {
    if (!details || loading) return;

    const mockAuthors = ["u/sci_guy", "@cyber_nomad", "youtube_commenter_213", "tech_watcher", "news_oracle", "u/opinion_shaper"];
    const mockSentiments: Array<"positive" | "negative" | "neutral" | "mixed"> = ["positive", "neutral", "negative", "mixed"];

    const interval = setInterval(() => {
      const topicName = details.title.replace("Why is ", "").replace(" trending?", "");
      const mockQuotes = [
        `Following this closely. ${topicName} represents a massive redirection of capital.`,
        `Not sure how to feel. There is a lot of PR hype surrounding ${topicName} right now.`,
        `This will probably fade by next week, but the immediate technological impact is real.`,
        `Can anyone suggest good technical papers or GitHub directories to read more about this?`,
        `Wow, this explains the server downtime I observed yesterday. Makes total sense.`,
        `I don't think standard frameworks are ready to adapt to this scale of updates.`
      ];

      const newComment = {
        platform: ["reddit", "twitter", "youtube", "forum"][Math.floor(Math.random() * 4)],
        author: mockAuthors[Math.floor(Math.random() * mockAuthors.length)],
        content: mockQuotes[Math.floor(Math.random() * mockQuotes.length)],
        timestamp: "Just now",
        sentiment: mockSentiments[Math.floor(Math.random() * mockSentiments.length)]
      };

      setLiveComments(prev => [newComment, ...prev.slice(0, 5)]);
    }, 4500); // Live tick

    return () => clearInterval(interval);
  }, [details, loading]);

  if (loading || !details) {
    return (
      <div className="min-h-screen bg-space-black flex flex-col items-center justify-center font-mono text-cyan-400">
        <Cpu className="w-12 h-12 animate-spin mb-4" />
        <div>DECODING AI AGENTS FEED DATA PACKETS...</div>
      </div>
    );
  }

  // Sentiment chart formatting
  const sentimentChartData = [
    { name: "Positive", value: details.sentiment.positive, color: "#00E5FF" },
    { name: "Neutral", value: details.sentiment.neutral, color: "#4CC9F0" },
    { name: "Negative", value: details.sentiment.negative, color: "#EF4444" },
    { name: "Mixed", value: details.sentiment.mixed, color: "#7B61FF" }
  ];

  // Dynamic Summary Text selection based on Tone selectors
  const getSummaryContent = () => {
    if (explainLevel === 'eli10') {
      const topic = details.title.replace("Why is ", "").replace(" trending?", "").replace(" Launch", "");
      return `Imagine a group of smart robot helpers playing together. That is like ${topic}! First, people got excited because it could do homework and fix computer problems super fast. Then, too many people tried to talk to it at the same time and the computer got tired and stopped working for a little bit. Now, companies are using these helpers to do big jobs, but some people are worried that the helpers will do all the work and humans won't have jobs anymore!`;
    }
    
    // Default mappings
    if (summaryMode === '30s') return details.summary['30s'];
    if (summaryMode === '5m') return details.summary['5m'];
    if (summaryMode === 'expert') return details.summary['expert'];
    return details.summary['2m'];
  };

  // Toggle Bookmark favorite
  const handleBookmarkToggle = async () => {
    audio.playClickChime();
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (nextSaved) {
      await addFavoriteAction(details.id);
    } else {
      await removeFavoriteAction(details.id);
    }
  };

  // Handle Share link copy
  const handleShareClick = () => {
    audio.playClickChime();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShowShareAlert(true);
      setTimeout(() => setShowShareAlert(false), 2500);
    }
  };

  // Related Node Click warp speed loader
  const handleRelatedNodeClick = (nodeId: string) => {
    audio.playWarpSweep();
    router.push(`/trend/${nodeId}`);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#050816] overflow-x-hidden font-sans">
      
      {/* Share HUD Notification */}
      <AnimatePresence>
        {showShareAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed top-6 inset-x-0 mx-auto w-max z-50 glass-panel border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-mono text-xs px-4 py-2 rounded shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            TELEMETRY LINK COPIED TO SYSTEM CLIPBOARD INDEX.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header HUD control bar */}
      <header className="relative w-full p-4 border-b border-white/5 bg-secondary-navy/40 backdrop-blur-md flex justify-between items-center z-20 select-none">
        <button
          onClick={() => { audio.playClickChime(); router.push("/"); }}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
          BACK TO FEED
        </button>

        <div className="font-mono text-[10px] text-cyan-400/50">
          TREND INTELLIGENCE WORKSTATION // SYSTEM ONLINE
        </div>
      </header>

      {/* Main Analysis Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-6 relative z-10 select-text">
        
        {/* HERO TITLE SECTION - TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          <div className="lg:col-span-2 glass-panel border-glow-cyan p-6 rounded-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-24 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex flex-wrap gap-2 items-center text-xs font-mono text-slate-400">
                <span className="text-cyan-400 text-glow-cyan bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded font-bold">
                  {details.category.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  {details.country === "Global" ? "GLOBAL COVERAGE" : `REGION: ${details.country.toUpperCase()}`}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {details.duration} VELOCITY
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white mt-4 tracking-wide select-text">
                {details.title}
              </h1>
            </div>

            {/* Actions: Save / Share / Logs */}
            <div className="flex flex-wrap gap-3 mt-8 border-t border-white/5 pt-4">
              <button
                onClick={handleBookmarkToggle}
                className={`py-2 px-4 rounded font-mono text-xs border flex items-center gap-2 cursor-pointer transition ${
                  isSaved 
                    ? "bg-purple-950/40 border-purple-500 text-purple-300 font-bold" 
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-purple-400/40"
                }`}
              >
                <BookMarked className="w-4 h-4" />
                {isSaved ? "SAVED KEY" : "SAVE NODE"}
              </button>

              <button
                onClick={handleShareClick}
                className="py-2 px-4 rounded font-mono text-xs bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-400/40 flex items-center gap-2 cursor-pointer transition"
              >
                <Share2 className="w-4 h-4" />
                SHARE TELEMETRY
              </button>

              <button
                onClick={() => { audio.playClickChime(); setShowAgentLogs(!showAgentLogs); }}
                className={`py-2 px-4 rounded font-mono text-xs border flex items-center gap-2 cursor-pointer transition ${
                  showAgentLogs
                    ? "bg-cyan-950/30 border-cyan-400 text-cyan-300"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400/40"
                }`}
              >
                <Terminal className="w-4 h-4" />
                {showAgentLogs ? "HIDE AGENT DICTIONARY" : "VIEW AGENT LOGS"}
              </button>
            </div>

          </div>

          {/* Popularity circular index widget */}
          <div className="glass-panel border-glow-cyan p-6 rounded-lg text-center flex flex-col justify-between items-center relative overflow-hidden bg-secondary-navy/40">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CRITICAL TREND DENSITY</span>
            
            <div className="relative my-4 flex items-center justify-center">
              {/* Radial glow background */}
              <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 blur-xl animate-pulse" />
              
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-[#050816]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-cyan-400 transition-all duration-1000"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 62}
                  strokeDashoffset={2 * Math.PI * 62 * (1 - details.popularity / 1000)}
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="absolute text-center">
                <span className="text-3xl font-extrabold font-orbitron text-glow-cyan text-white block">
                  {details.popularity}
                </span>
                <span className="text-[9px] font-mono text-cyan-400/70 mt-1 uppercase block">POPULARITY INDEX</span>
              </div>
            </div>

            <div className="w-full text-left font-mono text-[9px] text-slate-400 border-t border-white/5 pt-3 leading-relaxed grid grid-cols-2 gap-2 mt-1">
              <div>INFERENCE RAMP: <span className="text-emerald-400 font-bold">STEEP</span></div>
              <div>STABILITY: <span className="text-cyan-300 font-semibold">RESOLVED</span></div>
            </div>
          </div>

        </div>

        {/* AGENTS DIAGNOSTIC TERMINAL LOGS DRAWER */}
        <AnimatePresence>
          {showAgentLogs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-panel border-cyan-500/30 p-5 rounded-lg font-mono text-xs bg-slate-950/80 text-[#a5f3fc] space-y-2 border shadow-inner">
                <div className="text-white font-bold border-b border-white/10 pb-1.5 mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-300" />
                  INFRASTRUCTURE INFERENCE TRACE LOGS (8 AGENTS):
                </div>
                {details.agentLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                    <span className="text-purple-400 font-bold shrink-0">{log.agentName}:</span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI SUMMARY BOX MODULE */}
        <div className="glass-panel border-glow-cyan p-6 rounded-lg relative">
          <div className="absolute top-3 right-3 text-[9px] font-mono text-cyan-400/30 select-none">SYNTHESIS ENGINE</div>
          
          {/* selectors bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between border-b border-white/5 pb-4">
            
            {/* Tone selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold shrink-0">EXPLANATION MODE:</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'eli10', label: 'ELIF 10 (Simple)' },
                  { id: 'general', label: 'General citizen' },
                  { id: 'expert', label: 'Expert Analyst' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { audio.playClickChime(); setExplainLevel(item.id as any); }}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono border transition ${
                      explainLevel === item.id 
                        ? "bg-purple-950/50 border-purple-400 text-purple-300 font-bold" 
                        : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Length selector */}
            {explainLevel !== 'eli10' && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold shrink-0">LENGTH:</span>
                <div className="flex gap-1.5">
                  {[
                    { id: '30s', label: '30s brief' },
                    { id: '2m', label: '2 min' },
                    { id: '5m', label: '5 min' },
                    { id: 'expert', label: 'Expert telemetry' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => { audio.playClickChime(); setSummaryMode(item.id as any); }}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono border transition ${
                        summaryMode === item.id 
                          ? "bg-cyan-950/50 border-cyan-400 text-cyan-300 font-bold" 
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {item.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Render summary text */}
          <div className="mt-5 text-sm leading-relaxed text-slate-200 min-h-[90px] font-sans antialiased font-medium select-text">
            <p>{getSummaryContent()}</p>
          </div>
        </div>

        {/* CHRONOLOGICAL INTERACTIVE HORIZONTAL TIMELINE */}
        <div className="glass-panel border-glow-cyan p-6 rounded-lg">
          <h3 className="text-sm font-bold font-orbitron tracking-wider text-cyan-300 flex items-center gap-2 border-b border-white/5 pb-3">
            <Layers className="w-4 h-4 text-purple-400" />
            CHRONOLOGICAL EVENT PIPELINE [AGENT SEQUENCED]
          </h3>

          {/* Timeline cards horizontal scroll list */}
          <div className="flex items-stretch gap-5 overflow-x-auto py-5 px-1 scrollbar-thin select-none">
            {details.timeline.map((event, idx) => {
              const isExpanded = expandedTimelineDay === event.day;
              return (
                <div
                  key={event.day}
                  onClick={() => {
                    audio.playClickChime();
                    setExpandedTimelineDay(isExpanded ? null : event.day);
                  }}
                  className={`w-64 shrink-0 glass-panel p-4 pb-5 rounded border border-white/5 hover:border-cyan-400/40 hover:bg-slate-950/20 active:scale-[98%] cursor-pointer transition select-none flex flex-col justify-between gap-3 ${
                    isExpanded ? "ring-1 ring-cyan-400/50 scale-[101%] border-cyan-400/20 shadow-md shadow-cyan-400/5" : ""
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 border border-cyan-500/10 rounded w-max">
                      {event.day.toUpperCase()}
                    </div>

                    <h4 className="text-xs font-bold text-white font-orbitron mt-2.5 line-clamp-1 group-hover:text-cyan-200">
                      {event.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/10 pt-2.5 text-[10px] text-slate-300 font-mono leading-relaxed"
                      >
                        <span className="text-[#a5f3fc] font-semibold tracking-wider">TELEMETRY DETAIL:</span>
                        <p className="mt-1 text-slate-400 block">{event.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-[9px] font-mono text-slate-500 text-glow-cyan text-right">
                    {isExpanded ? "[Click to Collapse]" : "[Click to Expand]"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE SECTION GRID: Sentiment breakdown & Live commentary stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Sentiment dashboard */}
          <div className="glass-panel border-glow-cyan p-6 rounded-lg flex flex-col justify-between gap-4">
            <h3 className="text-sm font-bold font-orbitron tracking-wider text-cyan-300 flex items-center gap-2 border-b border-white/5 pb-3">
              <Activity className="w-4 h-4 text-emerald-400" />
              PUBLIC SENTIMENT INDEX
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              
              {/* Radial donut chart */}
              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="99%" height="99%">
                  <PieChart>
                    <Pie
                      data={sentimentChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {sentimentChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0B1220",
                        borderColor: "rgba(76,201,240,0.2)",
                        color: "white",
                        fontFamily: "monospace",
                        fontSize: "11px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Exact rates details */}
              <div className="space-y-2">
                {[
                  { name: "Positive", val: details.sentiment.positive, color: "bg-[#00E5FF]", icon: Smile },
                  { name: "Neutral", val: details.sentiment.neutral, color: "bg-[#4CC9F0]", icon: Meh },
                  { name: "Negative", val: details.sentiment.negative, color: "bg-[#EF4444]", icon: Frown },
                  { name: "Mixed", val: details.sentiment.mixed, color: "bg-[#7B61FF]", icon: HelpCircle }
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <item.icon className="w-3.5 h-3.5 text-slate-500" />
                      {item.name}
                    </span>
                    <strong className="text-white text-glow-cyan">{item.val}%</strong>
                  </div>
                ))}
              </div>

            </div>

            <div className="text-[10px] font-mono text-slate-500 bg-[#050816]/70 border border-white/5 p-3 rounded mt-1 text-center shrink-0">
              SENTIMENT BIAS: <strong className="text-glow-cyan text-cyan-400">POSITIVE DOMINANT ({details.sentiment.positive}%)</strong>
            </div>
          </div>

          {/* Social pulse ticker */}
          <div className="glass-panel border-glow-cyan p-6 rounded-lg flex flex-col justify-between gap-4">
            <h3 className="text-sm font-bold font-orbitron tracking-wider text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3">
              <MessageSquare className="w-4 h-4 text-purple-400 animate-pulse" />
              LIVE SOCIAL PULSE TICKER
            </h3>

            {/* List stream */}
            <div className="flex-1 max-h-52 overflow-y-auto space-y-2 pr-1 font-mono text-[10px] leading-relaxed">
              <AnimatePresence>
                {liveComments.map((comment, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-white/5 bg-slate-950/20 p-2.5 rounded flex flex-col gap-1.5 transition hover:border-cyan-500/10"
                  >
                    <div className="flex justify-between text-slate-500">
                      <span>{comment.platform.toUpperCase()}: <strong>{comment.author}</strong></span>
                      <span className="text-[8px]">{comment.timestamp}</span>
                    </div>

                    <p className="text-slate-300 font-sans italic text-[11px]">&quot;{comment.content}&quot;</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="text-[9px] font-mono text-slate-500 text-glow-purple text-center tracking-normal shrink-0 animate-pulse mt-1">
              [RECEIVING DIGITAL FEED DATA CONVERGENCE... 100% ONLINE]
            </div>
          </div>

        </div>

        {/* BOTTOM MATRIX BLOCK: Meme Decoder & Related Topics Network map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Meme decoder */}
          <div className="glass-panel border-glow-cyan p-6 rounded-lg flex flex-col justify-between gap-4">
            <h3 className="text-sm font-bold font-orbitron tracking-wider text-cyan-300 flex items-center gap-2 border-b border-white/5 pb-3">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              MEME DECODER [INTERNET ANALYSIS]
            </h3>

            <div className="flex-1 flex flex-col gap-3 font-mono text-xs">
              <div className="bg-[#050816]/70 border border-white/5 p-3.5 rounded">
                <span className="text-[9px] text-purple-400 uppercase tracking-widest block font-bold">TEMPLATE DETECTED:</span>
                <span className="text-sm text-glow-cyan text-cyan-400 font-bold block mt-1 font-orbitron">
                  {details.memeDecoder.memeName}
                </span>
                
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mt-3">CULTURAL ANCESTRY/ORIGIN:</span>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {details.memeDecoder.origin}
                </p>
              </div>

              <div className="flex-1 text-slate-300 font-sans text-xs bg-slate-950/20 border border-white/5 p-3.5 rounded leading-relaxed select-text">
                <span className="text-[9px] text-[#a5f3fc] uppercase tracking-widest block font-mono font-bold mb-1">DECODING WRITE-UP:</span>
                {details.memeDecoder.explanation}
              </div>
            </div>

            <div className="text-[10px] font-mono text-yellow-400/90 text-center uppercase tracking-wide shrink-0 border border-yellow-500/10 bg-yellow-950/10 p-2 rounded">
              {details.memeDecoder.popularityCode}
            </div>
          </div>

          {/* Related topics diagram network nodes map */}
          <div className="glass-panel border-glow-cyan p-6 rounded-lg flex flex-col justify-between gap-4">
            <h3 className="text-sm font-bold font-orbitron tracking-wider text-cyan-300 flex items-center gap-2 border-b border-white/5 pb-3">
              <Network className="w-4 h-4 text-cyan-400 animate-pulse" />
              RELATED GRAPH NODES [CLICK TO WARP CAMERA]
            </h3>

            {/* Custom SVG network graph */}
            <div className="flex-1 h-56 relative flex items-center justify-center">
              
              {/* Radial glow background */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />

              <svg width="100%" height="100%" viewBox="0 0 400 240" className="absolute inset-0">
                {/* SVG connection lines */}
                <line x1="200" y1="120" x2="80" y2="60" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="2" strokeDasharray="3 3" className="animate-pulse" />
                <line x1="200" y1="120" x2="320" y2="60" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="2" strokeDasharray="3 3" className="animate-pulse" />
                <line x1="200" y1="120" x2="100" y2="180" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="2" strokeDasharray="3 3" className="animate-pulse" />
                <line x1="200" y1="120" x2="300" y2="180" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="2" strokeDasharray="3 3" className="animate-pulse" />

                {/* Central main Node */}
                <circle cx="200" cy="120" r="16" fill="#050816" stroke="#7B61FF" strokeWidth="3" className="animate-pulse" />
                <text x="200" y="145" textAnchor="middle" fill="#7B61FF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  CENTRAL NODE
                </text>
              </svg>

              {/* Floating Buttons overlay matching coordinates! */}
              {/* Node 1: Left Top */}
              <div
                style={{ left: "15%", top: "20%" }}
                className="absolute"
              >
                <button
                  onClick={() => handleRelatedNodeClick(details.relatedTopics[0]?.id || "openai")}
                  className="px-2.5 py-1 text-[10px] font-mono border border-cyan-500/30 bg-[#0B1220] hover:border-cyan-400 hover:text-cyan-300 rounded shadow-md transition"
                >
                  {details.relatedTopics[0]?.label || "SUB-TOPIC 1"}
                </button>
              </div>

              {/* Node 2: Right Top */}
              <div
                style={{ right: "15%", top: "20%" }}
                className="absolute"
              >
                <button
                  onClick={() => handleRelatedNodeClick(details.relatedTopics[1]?.id || "nvidia")}
                  className="px-2.5 py-1 text-[10px] font-mono border border-cyan-500/30 bg-[#0B1220] hover:border-cyan-400 hover:text-cyan-300 rounded shadow-md transition"
                >
                  {details.relatedTopics[1]?.label || "SUB-TOPIC 2"}
                </button>
              </div>

              {/* Node 3: Left Bottom */}
              <div
                style={{ left: "20%", bottom: "20%" }}
                className="absolute"
              >
                <button
                  onClick={() => handleRelatedNodeClick(details.relatedTopics[2]?.id || "coldplay")}
                  className="px-2.5 py-1 text-[10px] font-mono border border-cyan-500/30 bg-[#0B1220] hover:border-cyan-400 hover:text-cyan-300 rounded shadow-md transition"
                >
                  {details.relatedTopics[2]?.label || "SUB-TOPIC 3"}
                </button>
              </div>

              {/* Node 4: Right Bottom */}
              <div
                style={{ right: "20%", bottom: "20%" }}
                className="absolute"
              >
                <button
                  onClick={() => handleRelatedNodeClick(details.relatedTopics[3]?.id || "labubu")}
                  className="px-2.5 py-1 text-[10px] font-mono border border-cyan-500/30 bg-[#0B1220] hover:border-cyan-400 hover:text-cyan-300 rounded shadow-md transition"
                >
                  {details.relatedTopics[3]?.label || "SUB-TOPIC 4"}
                </button>
              </div>

            </div>

            <div className="text-[10px] font-mono text-slate-500 text-glow-cyan text-center shrink-0 mt-1">
              [CLICK TO WARP SECTOR TRAIN PATHWAYS]
            </div>
          </div>

        </div>

      </main>

      {/* Footer statistics HUD bar */}
      <footer className="w-full p-4 border-t border-white/5 text-center font-mono text-[10px] text-cyan-400/30">
        MINDVERSE // AI TREND INTELLIGENCE SYSTEM
      </footer>

    </div>
  );
}
