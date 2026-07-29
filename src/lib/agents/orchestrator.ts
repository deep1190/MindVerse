// MindVerse AI Agents Orchestrator
// Simulates the multi-agent pipeline and returns highly detailed data structures for trends.

export interface AgentLog {
  agentName: string;
  status: 'pending' | 'running' | 'done';
  message: string;
  timestamp: string;
  output?: any;
}

export interface TimelineEvent {
  day: string;
  title: string;
  description: string;
  detail: string;
  category: 'announcement' | 'media' | 'social' | 'viral' | 'impact';
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  mixed: number;
}

export interface SocialPulsePoint {
  platform: 'reddit' | 'twitter' | 'youtube' | 'forum';
  author: string;
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
}

export interface MemeDecoder {
  memeName: string;
  origin: string;
  explanation: string;
  popularityCode: string; // e.g. "Viral Level: Gamma"
}

export interface PredictionData {
  continuationProbability: number; // 0-100
  longevityScore: number; // 0-100
  verdict: 'Rising' | 'Peaked' | 'Fading' | 'Stable';
  outlookText: string;
}

export interface RelatedTopicNode {
  id: string;
  label: string;
  category: string;
  connectionType: string;
}

export interface TrendDetails {
  id: string;
  title: string;
  category: string;
  popularity: number;
  country: string;
  duration: string;
  lastUpdated: string;
  summary: {
    '30s': string;
    '2m': string;
    '5m': string;
    'expert': string;
  };
  timeline: TimelineEvent[];
  sentiment: SentimentData;
  socialPulse: SocialPulsePoint[];
  memeDecoder: MemeDecoder;
  prediction: PredictionData;
  relatedTopics: RelatedTopicNode[];
  agentLogs: AgentLog[];
}

export const SEEDED_TRENDS: Record<string, TrendDetails> = {
  'openai': {
    id: 'openai',
    title: 'OpenAI GPT-5.5 Launch',
    category: 'Technology',
    popularity: 985,
    country: 'Global',
    duration: '6 days',
    lastUpdated: '12 minutes ago',
    summary: {
      '30s': 'OpenAI has officially unveiled GPT-5.5 (dubbed "Orion"), which offers major upgrades in agentic reasoning, cross-modal video synthesis, and code generation. It is triggering massive discussions about the transition to autonomous AI agents doing real-world tasks.',
      '2m': 'OpenAI launched its new flagship reasoning model, GPT-5.5. Unlike previous models that just predict the next word, GPT-5.5 reasons in real-time, displaying a "thought process" before responding. Industry analysts note its performance in math, programming, and sequential logic matches expert developer capabilities. Key partnerships with Microsoft have expanded access to corporate customers immediately, while retail users are experiencing delayed waiting queues.',
      '5m': 'OpenAI\'s GPT-5.5 release marks a pivotal moment in conversational AI, focusing on deep reasoning rather than raw model size. The architecture uses an advanced reinforcement learning paradigm that allows the network to formulate sub-queries, verify its own work, and correct logical errors internally before producing the final text output. This capability has led to an explosion of autonomous agent systems that can manage complex software engineering tasks, financial analysis, and scientific research with minimal human oversight. Critically, public response is highly polarized: developers praise the logic speed, while safety researchers warn that agent autonomy heightens security and privacy risks.',
      'expert': 'GPT-5.5 integrates a novel dynamic runtime compute framework with a massive pre-trained transformer core. By utilizing dynamic reasoning tokens, the model scales inference-time compute dynamically based on task difficulty. Initial standard benchmarks show a 42% decrease in hallucination rates across multi-turn logic chains. Key system architectures rely on vector-space search feedback loops. API infrastructure features agentic callbacks, allowing the model to hit HTTP endpoints autonomously, parse JSON outputs, and compile runtime scripts. Environmental concerns are rising due to the massive inference compute overhead corresponding to multi-fold hikes in energy-per-query cost.'
    },
    timeline: [
      { day: 'Day 1', title: 'The Silent Deployment', description: 'GitHub repos show mysterious test suites getting closed out.', detail: 'An unannounced benchmark model named "red-orion" beats all current systems on MATH and Codeforces, sparking developer chatter.', category: 'announcement' },
      { day: 'Day 2', title: 'Official DevDay Keynote', description: 'Sam Altman reveals GPT-5.5 live in San Francisco.', detail: 'The live demo shows the model writing, reviewing, deploying, and debugging a complete logistics app in under 15 seconds. Waitlists open.', category: 'media' },
      { day: 'Day 3', title: 'Server Meltdown & Scalping', description: 'API rate limits drop; developers crash the server cluster.', detail: 'Thousands of users report error code 429. API keys are traded on developer Discord servers for premium access as system capacities max out.', category: 'social' },
      { day: 'Day 4', title: 'The "Strawberry" Meme Spreads', description: 'Social users test the model\'s spelling logic with classic prompts.', detail: 'Millions post screenshots of the AI proving why there are three "r"s in strawberry, referencing OpenAI\'s secret project codename.', category: 'viral' },
      { day: 'Day 5', title: 'Enterprise Ingestion', description: 'Fortune 500 corporations announce custom agent integrations.', detail: 'Over 80 financial institutions deploy GPT-5.5 backend nodes to automate auditing compliance, starting is a structural shift in office productivity.', category: 'impact' }
    ],
    sentiment: { positive: 58, neutral: 22, negative: 15, mixed: 5 },
    socialPulse: [
      { platform: 'reddit', author: 'r/MachineLearning/u/algo_wizard', content: 'The dynamic token scaling during runtime compute is a game changer. It is finally reasoning, not just regurgitating.', timestamp: '3h ago', sentiment: 'positive' },
      { platform: 'twitter', author: '@techCrunchy', content: 'OpenAI just killed another 50 startups with this agent release. RIP wrapper companies.', timestamp: '5h ago', sentiment: 'negative' },
      { platform: 'youtube', author: 'Computerphile Fan', content: 'I tested the reasoning debug feature. It actually corrected its own nested loop error. Fascinating but a bit scary.', timestamp: '12h ago', sentiment: 'positive' },
      { platform: 'forum', author: 'alignment_guy_88', content: 'What happens when these agents start communicating with each other recursively? Safety guardrails seem non-existent.', timestamp: '1d ago', sentiment: 'mixed' }
    ],
    memeDecoder: {
      memeName: 'Count the R\'s in Strawberry',
      origin: 'A historical benchmark question where older LLMs failed to count single characters due to subword tokenization patterns.',
      explanation: 'With the Orion model launch, the AI correctly explains the spelling while making tongue-in-cheek jokes about strawberries, creating a community meme about AGI arrival being marked by berry counting.',
      popularityCode: 'Viral Level: Omega High'
    },
    prediction: {
      continuationProbability: 95,
      longevityScore: 88,
      verdict: 'Rising',
      outlookText: 'The launch of GPT-5.5 has initialized a structural change in how enterprise software operates. It will remain a dominant trend in computing science, policy debates, and market investment for the coming quarters.'
    },
    relatedTopics: [
      { id: 'gpt-5-5', label: 'GPT-5.5 Orion', category: 'Technology', connectionType: 'Product Core' },
      { id: 'sam-altman', label: 'Sam Altman', category: 'Business', connectionType: 'CEO/Founder' },
      { id: 'microsoft', label: 'Microsoft Azure', category: 'Business', connectionType: 'Primary Partner' },
      { id: 'ai-agents', label: 'AI Agent Frameworks', category: 'Technology', connectionType: 'Vertical Market' }
    ],
    agentLogs: [
      { agentName: 'Trend Discovery Agent', status: 'done', message: 'Ingested 4,500 news pieces. Overtook Apple and inflation keywords in overall global volume.', timestamp: '17:40' },
      { agentName: 'Research Agent', status: 'done', message: 'Scraped OpenAI Developer Blog, GitHub trending repositories, and HackerNews threads (892 comments reviewed).', timestamp: '17:41' },
      { agentName: 'Timeline Agent', status: 'done', message: 'Sequenced 5 core chronological blocks, tracing rumor leaks on Day 1 to Enterprise roll-out on Day 5.', timestamp: '17:42' },
      { agentName: 'Social Pulse Agent', status: 'done', message: 'Harvested content across r/ChatGPT (Reddit), Twitter tech streams, and YouTube video reactions.', timestamp: '17:42' },
      { agentName: 'Sentiment Agent', status: 'done', message: 'Calculated 58% positive bias. Negative counts centered around job security and carbon foot-print.', timestamp: '17:43' },
      { agentName: 'Meme Agent', status: 'done', message: 'Extracted Strawberry benchmark history and parsed OpenAI strawberry teasers.', timestamp: '17:43' },
      { agentName: 'Prediction Agent', status: 'done', message: 'Projecting high continuation value. Long-term corporate integration ensures high tail engagement.', timestamp: '17:44' },
      { agentName: 'Summary Agent', status: 'done', message: 'Formulated 4 separate summary layers (30s to Expert detail). Data bundle finalized.', timestamp: '17:44' }
    ]
  },
  'coldplay': {
    id: 'coldplay',
    title: 'Coldplay Ticket Mess',
    category: 'Entertainment',
    popularity: 940,
    country: 'India',
    duration: '3 days',
    lastUpdated: '1 hour ago',
    summary: {
      '30s': 'Coldplay\'s Music of the Spheres World Tour ticket launch on BookMyShow saw over 1.2 million users crash the website, leading to mass ticketing black markets and immediate police investigations into reseller scalping websites.',
      '2m': 'British rock band Coldplay announced three concert dates in Mumbai, India, for their Music of the Spheres World Tour, unleashing an unprecedented demand scale. When booking platforms opened, over a million fans queued up, crashing BookMyShow within seconds. Almost immediately, tickets re-appeared on reselling platforms like Viagogo at 20-50x markup prices, leading to user rage, lawsuit threats, and formal notices sent by the Cyber Police to ticketing executives.',
      '5m': 'The Coldplay concert ticket sell-out has sparked a national conversation about ticket scalping and consumer protection laws in India. As Tickets priced originally at ₹2,500 to ₹12,000 were sold out in minutes, retail fans noticed secondary ticketing sites immediately listing seats for up to ₹3,00,000. BookMyShow filed a police complaint denying and disassociating from scalper platforms, claiming their servers were attacked by automated bots. The Incident has prompted regulatory panels to investigate digital fair-practice rules, with general frustration showing a sharp class divide between average music lovers and scalpers.',
      'expert': 'From an infrastructure perspective, BookMyShow failed to buffer the sudden traffic spike, which exceeded 120,000 concurrent API requests per second at the payment gateway checkout hook. Additionally, the lack of strict SMS-OTP matching at checkout allowed bot farms to bypass database rate limiters. Regulatory analysis focuses on Section 4 of the Indian Competition Act, assessing whether secondary transaction portals like Viagogo engage in monopolistic pricing arbitrage. Public security sectors have triggered audits into ticket transaction databases to map resale wallets.'
    },
    timeline: [
      { day: 'Day 1', title: 'The Announcement', description: 'Coldplay announces first India shows in 9 years.', detail: 'Band confirms dates at DY Patil Stadium. Anticipation spikes across general pop demographics.', category: 'announcement' },
      { day: 'Day 2', title: 'The Crash of 12 PM', description: 'Queues hit 1 million as tickets open.', detail: 'BookMyShow server crashes immediately at noon. Screens freeze at loading overlays, creating widespread social panic.', category: 'media' },
      { day: 'Day 3', title: 'Scalper Marketplace Boom', description: 'Viagogo lists tickets for lakhs.', detail: 'Tickets bought for ₹3,000 appear on resale portals for ₹2.5 lakh, sparking immense community rage and viral tweets.', category: 'social' },
      { day: 'Day 4', title: 'Legal Investigation Launch', description: 'Cyber Crime branch summons BookMyShow CEO.', detail: 'State government initiates a probe into black marketing syndicates. BookMyShow releases notices calling resellers illegal.', category: 'impact' }
    ],
    sentiment: { positive: 35, neutral: 25, negative: 35, mixed: 5 },
    socialPulse: [
      { platform: 'reddit', author: 'r/india/u/yellow_submarine', content: 'Queued position 892,301. I just wanted to hear Fix You, not get my financial state broken.', timestamp: '12h ago', sentiment: 'mixed' },
      { platform: 'twitter', author: '@RageGamer99', content: 'Viagogo listing tickets before the official sale ended shows absolute collusion. BookMyShow must explain!', timestamp: '18h ago', sentiment: 'negative' },
      { platform: 'youtube', author: 'Concert Vlogger guy', content: 'This shows how bad India lacks anti-scalping laws. US, UK have rules; here it is a wild west.', timestamp: '1d ago', sentiment: 'negative' },
      { platform: 'forum', author: 'coldplay_superfan', content: 'The band is amazing, but their team needs to control local ticketing partners. This is ridiculous.', timestamp: '2d ago', sentiment: 'mixed' }
    ],
    memeDecoder: {
      memeName: 'Selling Kidneys for Tickets',
      origin: 'An old internet joke re-applied to extreme luxury markups where buying a consumer item supposedly requires selling internal organs.',
      explanation: 'Meme graphics showing dynamic kidney transplants combined with Coldplay\'s "Yellow" lyric "it was all yellow" to represent medical scans went viral immediately after ticket pricing escalated.',
      popularityCode: 'Viral Level: Beta High'
    },
    prediction: {
      continuationProbability: 80,
      longevityScore: 45,
      verdict: 'Peaked',
      outlookText: 'The initial ticket hysteria has peaked. The trend will slowly fade unless police make high-profile scalping arrests or Coldplay adds extra concert dates.'
    },
    relatedTopics: [
      { id: 'bookmyshow', label: 'BookMyShow', category: 'Business', connectionType: 'Ticket Vendor' },
      { id: 'viagogo', label: 'Viagogo Resell', category: 'Business', connectionType: 'Gray Market Portal' },
      { id: 'cyber-cell', label: 'Mumbai Cyber Crime Cell', category: 'Politics', connectionType: 'regulatory body' },
      { id: 'chris-martin', label: 'Chris Martin', category: 'Entertainment', connectionType: 'Band Frontman' }
    ],
    agentLogs: [
      { agentName: 'Trend Discovery Agent', status: 'done', message: 'Flagged ticket sales crash. Search volume in India increased by 15,000% within 3 hours.', timestamp: '18:10' },
      { agentName: 'Research Agent', status: 'done', message: 'Examined BookMyShow system logs updates, cyber cell press releases, and resale prices on Viagogo.', timestamp: '18:12' },
      { agentName: 'Timeline Agent', status: 'done', message: 'Generated chronology of events including the tickets crash at 12 PM and regulatory intervention.', timestamp: '18:13' },
      { agentName: 'Social Pulse Agent', status: 'done', message: 'Collected 12,000 social posts showing heavy consumer distress and ticketing conspiracy theories.', timestamp: '18:14' },
      { agentName: 'Sentiment Agent', status: 'done', message: 'Calculated 35% negative, showing extreme anger directed at scalpers and platform infrastructure failure.', timestamp: '18:14' },
      { agentName: 'Meme Agent', status: 'done', message: 'Captured the kidney transplant and yellow lyrics jokes circulating on Instagram and Twitter.', timestamp: '18:15' },
      { agentName: 'Prediction Agent', status: 'done', message: 'Forecasted rapid drop unless legal authorities prosecute scalper websites.', timestamp: '18:15' },
      { agentName: 'Summary Agent', status: 'done', message: 'Formatted standard reports. System package ready.', timestamp: '18:16' }
    ]
  },
  'wimbledon': {
    id: 'wimbledon',
    title: 'Wimbledon Historic Tiebreak',
    category: 'Sports',
    popularity: 890,
    country: 'Global',
    duration: '2 days',
    lastUpdated: '4 hours ago',
    summary: {
      '30s': 'Carlos Alcaraz defeated Novak Djokovic in a historic 5-set Wimbledon Men\'s Final, sealed by a record-breaking 28-point tiebreak in the final set that captured worldwide sports attention.',
      '2m': 'The Wimbledon Men\'s Singles Final was locked in a titanic battle. Emerging Superstar Carlos Alcaraz went head-to-head with tennis veteran Novak Djokovic. In the final deciding set, with games tied at 6-6, a dramatic tiebreak ensued, lasting over 35 minutes and featuring saved match points. Alcaraz eventually clinched the victory, marking a literal changing of the guard in professional tennis.',
      '5m': 'This Wimbledon final goes down as one of the greatest matches in Modern tennis history, lasting nearly five hours. The final set tiebreak alone saw both athletes trading explosive forehands, sliding backhands, and multiple drop shots. Fans and former professionals noted Djokovic\'s legendary resilience as he saved successive championship points, only to make a rare unforced error on the 28th point of the tiebreak, handing Alcaraz his consecutive title. Post-match, Djokovic broke down in tears naming Alcaraz a complete player, marking the end of the strict "Big Three" dominance era.',
      'expert': 'Kinematic analysis of Alcaraz\'s average baseline return velocity showed a 12% speed increase during the 5th set relative to the 1st. Tactical server adjustments from Djokovic saw a shift to wide serve-and-volley tactics (winning 65% of net points in set 4), but these were neutralized by Alcaraz\'s crosscourt baseline passes. The match holds the highest rating for tennis streaming sessions globally, with concurrent streams peaking at 18.4 million devices.'
    },
    timeline: [
      { day: 'Day 1', title: 'The Preview Clash', description: 'Pundits argue over youth vs experience.', detail: 'Media outlets debate if Alcaraz can break down Djokovic\'s grass court defense streak.', category: 'announcement' },
      { day: 'Day 2', title: 'Court Drama Begins', description: ' Djokovic wins first set, Alcaraz fights back.', detail: 'Stadium crowds witness extreme court coverage speeds as sets trade back and forth.', category: 'media' },
      { day: 'Day 3', title: 'The 28-Point Battle', description: 'The final tiebreak breaks records.', detail: 'Deciding tiebreak goes to 15-13. Global streaming traffic jumps by 300% during the match points.', category: 'social' },
      { day: 'Day 4', title: 'Tearful Post-Match', description: 'Tributes pour in from tennis legends.', detail: 'Djokovic congratulates Alcaraz, who celebrates with family. Fans praise the sporting spirit.', category: 'impact' }
    ],
    sentiment: { positive: 72, neutral: 18, negative: 8, mixed: 2 },
    socialPulse: [
      { platform: 'reddit', author: 'r/tennis/u/lob_slice', content: 'That final set tiebreak gave me grey hair. Standard of tennis from both was out of this world.', timestamp: '6h ago', sentiment: 'positive' },
      { platform: 'twitter', author: '@FedererFanClub', content: 'Incredible match. Alcaraz is the legitimate successor. Tennis is in safe hands.', timestamp: '8h ago', sentiment: 'positive' },
      { platform: 'youtube', author: 'Baseline Critic', content: 'Djokovic made a mistake attacking Alcaraz\'s backhand in the final point. Shows fatigue was real.', timestamp: '12h ago', sentiment: 'neutral' },
      { platform: 'forum', author: 'serve_volley_master', content: 'Strawberries and cream are expensive but that final was worth every single penny.', timestamp: '1d ago', sentiment: 'positive' }
    ],
    memeDecoder: {
      memeName: 'Djokovic Racket Smash',
      origin: 'Djokovic smashed his racket on the wooden net post in frustration during a critical break point loss.',
      explanation: 'Visual loops of the racket shard flying, captioned with daily frustration analogies (e.g. "My computer trying to load 2 tabs of Chrome") went viral across Instagram reels.',
      popularityCode: 'Viral Level: Gamma Medium'
    },
    prediction: {
      continuationProbability: 60,
      longevityScore: 35,
      verdict: 'Fading',
      outlookText: 'The match will live in historical highlights, but active online trend search volume will decrease as the tennis season transitions to hard courts.'
    },
    relatedTopics: [
      { id: 'carlos-alcaraz', label: 'Carlos Alcaraz', category: 'Sports', connectionType: 'Champion' },
      { id: 'novak-djokovic', label: 'Novak Djokovic', category: 'Sports', connectionType: 'Runner-up' },
      { id: 'federer-nadal', label: 'Federer & Nadal', category: 'Sports', connectionType: 'Legends Era' },
      { id: 'tennis-world', label: 'ATP Tour', category: 'Sports', connectionType: 'League Body' }
    ],
    agentLogs: [
      { agentName: 'Trend Discovery Agent', status: 'done', message: 'Match point events registered huge traffic surges. Trend hit top spot globally.', timestamp: '19:10' },
      { agentName: 'Research Agent', status: 'done', message: 'Compiled match statistics, press conference transcripts, and expert columns from BBC Sport and L\'Equipe.', timestamp: '19:12' },
      { agentName: 'Timeline Agent', status: 'done', message: 'Mapped the 5 sets with focus on the final 5th set tiebreak statistics.', timestamp: '19:13' },
      { agentName: 'Social Pulse Agent', status: 'done', message: 'Analyzed r/tennis and sports streams showing overwhelming admiration for both players.', timestamp: '19:14' },
      { agentName: 'Sentiment Agent', status: 'done', message: 'Calculated 72% positive rating, heavily driven by sports fans praising the high athletic standards.', timestamp: '19:14' },
      { agentName: 'Meme Agent', status: 'done', message: 'Analyzed racket smash video edits and Djokovic crying memes.', timestamp: '19:15' },
      { agentName: 'Prediction Agent', status: 'done', message: 'Anticipating quick cycle decay. Historical archiving completed.', timestamp: '19:15' },
      { agentName: 'Summary Agent', status: 'done', message: 'Constructed summary files. Process complete.', timestamp: '19:16' }
    ]
  },
  'labubu': {
    id: 'labubu',
    title: 'Labubu Viral Frenzy',
    category: 'Entertainment',
    popularity: 910,
    country: 'Global',
    duration: '8 days',
    lastUpdated: '3 hours ago',
    summary: {
      '30s': 'The monster-elf art toy "Labubu," created by artist Kasing Lung, has triggered a viral collecting craze in Asia and globally after BLACKPINK\'s Lisa posted images carrying the toy on her designer purses.',
      '2m': 'Labubu, a fuzzy monster figurine with jagged teeth part of Pop Mart\'s "The Monsters" collection, is flying off shelves. When K-Pop star Lalisa Manoban began posting photos on Instagram showcasing the dolls as bag accessories, global demand went vertical. Blind-box stores are seeing multi-hour queues, resale markups are soaring, and mock bootlegs are filling the market.',
      '5m': 'Created in 2015, Labubu was a niche designer art toy until its commercial acquisition by Pop Mart. The recent pop culture explosion is an example of celebrity endorsement synergy. Fans are buying random "blind boxes" hoping to unwrap the rare color variants. In Thailand and Singapore, the doll has become a status symbol, with corporate executives hanging fuzzy keychain versions on high-end Hermes and Chanel bags. Pop Mart has expanded its production capacity, but stock deficits remain, keeping secondary market resales highly lucrative.',
      'expert': 'Market evaluation reveals Pop Mart\'s stock price increased by 22% quarter-on-quarter, driven by Labubu\'s explosive Asian market share. The combination of constrained physical retail channels (using lottery draws) and dynamic drop-shopping scarcity mechanics has accelerated consumer FOMO. Demographic analysis shows target buying age is skewed towards 18-34, representing high-friction discretionary spending.'
    },
    timeline: [
      { day: 'Day 1', title: 'The Designer Release', description: 'Artist Kasing Lung drops fuzzy monster toys.', detail: 'Release is targeted at high-end vinyl toy collector boutiques. Understated initial sales.', category: 'announcement' },
      { day: 'Day 2', title: 'The Lisa Effect', description: 'BLACKPINK Lisa posts her Labubu keychain.', detail: 'Posting on Instagram, Lisa styles the green Labubu doll with a Celine bag. Global search traffic surges 8,000% overnight.', category: 'media' },
      { day: 'Day 3', title: 'Blind Box Queue Riots', description: 'Malls queue for Pop Mart restocks.', detail: 'Shopping complexes report queues forming at 4 AM. Stores run out of stock in under 10 minutes of opening daily.', category: 'social' },
      { day: 'Day 4', title: 'Fake Market Flooding', description: 'Counterfeit units appear on Shopee.', detail: 'Manufacturers flood online portals with low-quality resin copies. Pop Mart releases verification guidelines.', category: 'viral' },
      { day: 'Day 5', title: 'Status Symbol Integration', description: 'Keychains seen at high-level business events.', detail: 'Social feeds show executives carrying Labubu keychains to mock conservative corporate trends in major Asian financial hubs.', category: 'impact' }
    ],
    sentiment: { positive: 48, neutral: 32, negative: 15, mixed: 5 },
    socialPulse: [
      { platform: 'reddit', author: 'r/vinyltoys/u/box_ripper', content: 'I used to buy these for standard retail. Now I cannot even step inside a Pop Mart store without an RSVP ticket. Insane.', timestamp: '4h ago', sentiment: 'neutral' },
      { platform: 'twitter', author: '@LisaFanatic', content: 'Lisa is literally the queen of marketing. Everything she touches becomes instantly gold.', timestamp: '7h ago', sentiment: 'positive' },
      { platform: 'youtube', author: 'Toy Unboxer Pro', content: 'Unboxing 10 Labubu blind boxes. Looking for the secret pastel variant. Worth $500 on resell!', timestamp: '1d ago', sentiment: 'positive' },
      { platform: 'forum', author: 'anti_hype_beast', content: 'It is a fuzzy toy with teeth. Why are people spending their utility bills on this? The herd mentality is out of hand.', timestamp: '2d ago', sentiment: 'negative' }
    ],
    memeDecoder: {
      memeName: 'Furry Bag Guard',
      origin: 'Hanging cute, cartoonish figures on ultra-expensive, minimalist designer handbags.',
      explanation: 'Users post photos of their bags with Labubu guards, joking that the $20 plush toy acts as an security alarm system for their $10,000 fashion item.',
      popularityCode: 'Viral Level: Beta High'
    },
    prediction: {
      continuationProbability: 75,
      longevityScore: 60,
      verdict: 'Stable',
      outlookText: 'The trend has transitioned from early viral adoption into mainstream lifestyle fashion. Pop Mart\'s strong marketing ensures long-term retail viability for at least another quarter.'
    },
    relatedTopics: [
      { id: 'pop-mart', label: 'Pop Mart', category: 'Business', connectionType: 'Brand Owner' },
      { id: 'lisa-blackpink', label: 'Lisa Manoban', category: 'Entertainment', connectionType: 'Trend Multiplier' },
      { id: 'blind-boxes', label: 'Blind Box Culture', category: 'Psychology', connectionType: 'Buying Mechanism' },
      { id: 'kasing-lung', label: 'Kasing Lung', category: 'Entertainment', connectionType: 'Original Creator' }
    ],
    agentLogs: [
      { agentName: 'Trend Discovery Agent', status: 'done', message: 'Spotted high growth rate in Southeast Asian ecommerce portals. Elevated priority level.', timestamp: '20:10' },
      { agentName: 'Research Agent', status: 'done', message: 'Scraped Pop Mart investor reports, and fashion instagram hashtags.', timestamp: '20:12' },
      { agentName: 'Timeline Agent', status: 'done', message: 'Created history tracing Kasing Lung design creation to current bag-charm viral craze.', timestamp: '20:13' },
      { agentName: 'Social Pulse Agent', status: 'done', message: 'Parsed unboxing streams and shopping lines comments.', timestamp: '20:14' },
      { agentName: 'Sentiment Agent', status: 'done', message: 'Verified 48% positive sentiment, with 15% negative targeting scalper stock hoarding.', timestamp: '20:14' },
      { agentName: 'Meme Agent', status: 'done', message: 'Catalogued Chanel bag contrast posts and furry guard memes.', timestamp: '20:15' },
      { agentName: 'Prediction Agent', status: 'done', message: 'Identified stable consumer lifecycle phase, supported byPop Mart\'s global expansion plans.', timestamp: '20:15' },
      { agentName: 'Summary Agent', status: 'done', message: 'Finalized reports. Database payload synced.', timestamp: '20:16' }
    ]
  },
  'nvidia': {
    id: 'nvidia',
    title: 'NVIDIA Market Conquest',
    category: 'Business',
    popularity: 978,
    country: 'Global',
    duration: '12 days',
    lastUpdated: '5 minutes ago',
    summary: {
      '30s': 'NVIDIA has surged ahead to become the world\'s most valuable public company, driven by unyielding demand for its Blackwell architecture GPU chips and skyrocketing corporate investments in AI scale.',
      '2m': 'NVIDIA corp. surpassed Microsoft and Apple in total market capitalization, crossing $3.4 Trillion. The driving force is their next-gen Blackwell GPU modules, which are fully backordered for the next 12 months. Tech giants like Meta, Google, and Amazon are competing aggressively to procure these chips to power their next-generation reasoning AI systems.',
      '5m': 'NVIDIA\'s climb to the peak of the corporate world represents the AI hardware gold rush. Jensen Huang\'s keynote speeches have attained cultural status, with developers referring to him as "The Tech Godfather." Critics note that high valuations depend entirely on the assumption that AI software returns will justify the colossal server expenses. However, as long as hyper-scalers continue spending billions on AI infrastructure, NVIDIA retains a near-monopoly on high-bandwidth memory GPUs, keeping TSMC factories operating at peak load.',
      'expert': 'blackwell platform architecture utilizes two dies linked via a high-speed 10 TB/s interconnect. The NVLink backbone supports 72-GPU racks functioning as a single macro-logical computer. Short-term stock volatility is tied to silicon yields at TSMC\'s advanced packaging plants (CoWoS-S). Financial margins remain at a historically high 75%, reinforcing near-unlimited pricing leverage over compute buyers.'
    },
    timeline: [
      { day: 'Day 1', title: 'Blackwell Announcement', description: 'Jensen Huang reveals B200 GPUs.', detail: 'Keynote claims 30x faster inference speed with lower electrical loads. Competitors scramble.', category: 'announcement' },
      { day: 'Day 2', title: 'The Supply Squeeze Leaks', description: 'Reports indicate next 12 months sold out.', detail: 'Leaked documents show tech giants booked entire production runs in secret pre-sale agreements.', category: 'media' },
      { day: 'Day 3', title: 'Market Cap Milestones', description: 'NVIDIA passes Apple.', detail: 'Stock climbs to $135 per share, pushing valuation to $3.35 Trillion. General finance media goes wild.', category: 'social' },
      { day: 'Day 4', title: 'The Leather Jacket Viral Craze', description: 'Jensen Huang signs a fan\'s shirt.', detail: 'Clips of the CEO signing programmer merch in Taiwan go viral. Leather jackets sales spike on fashion websites.', category: 'viral' },
      { day: 'Day 5', title: 'Hyper-scaler Commitments', description: 'Tech giants affirm $100B infra spends.', detail: 'CEOs of major computing firms confirm they will double down on chip purchases, cementing NVIDIA\'s revenue predictions.', category: 'impact' }
    ],
    sentiment: { positive: 65, neutral: 20, negative: 10, mixed: 5 },
    socialPulse: [
      { platform: 'reddit', author: 'r/wallstreetbets/u/diamond_hands', content: 'I bought NVIDIA calls back in 2021. I can literally buy a house now. Praise Jensen Huang.', timestamp: '1h ago', sentiment: 'positive' },
      { platform: 'twitter', author: '@TechInvestor101', content: 'Is this Cisco in 2000? Everyone needs routers until everyone has enough. When does the bubble pop?', timestamp: '4h ago', sentiment: 'mixed' },
      { platform: 'youtube', author: 'GPU Benchmark Boy', content: 'Blackwell uses water cooling loops. Enterprise server rooms are going to need complete redesigns.', timestamp: '12h ago', sentiment: 'neutral' },
      { platform: 'forum', author: 'silicon_guru', content: 'TSMC is the bottleneck. NVIDIA has the design but if CoWoS packaging yields drop, the stocks drop.', timestamp: '1d ago', sentiment: 'mixed' }
    ],
    memeDecoder: {
      memeName: 'Jensen Huang\'s Leather Jacket',
      origin: 'The CEO of NVIDIA consistently wears a black leather jacket during all media interviews and keynotes.',
      explanation: 'Pundits joke that the leather jacket has a built-in liquid cooling loop or is itself powered by custom Hopper chips, symbolizing the company\'s unbreakable consistency, styling, and high-performance swagger.',
      popularityCode: 'Viral Level: Omega High'
    },
    prediction: {
      continuationProbability: 92,
      longevityScore: 85,
      verdict: 'Rising',
      outlookText: 'With all major AI companies scaling parameter sizes, GPU demand will outstrip supply for the next 18 months. Volatility will exist, but the long-term upward capital trend remains intact.'
    },
    relatedTopics: [
      { id: 'jensen-huang', label: 'Jensen Huang', category: 'Business', connectionType: 'CEO' },
      { id: 'tsmc', label: 'TSMC', category: 'Business', connectionType: 'Primary Foundry' },
      { id: 'blackwell-gpus', label: 'Blackwell Cluster', category: 'Technology', connectionType: 'Core Product' },
      { id: 'intel-amd', label: 'AMD & Intel', category: 'Business', connectionType: 'Competitors' }
    ],
    agentLogs: [
      { agentName: 'Trend Discovery Agent', status: 'done', message: 'Valuation updates triggered priority flags. High search density across retail investing indexes.', timestamp: '21:10' },
      { agentName: 'Research Agent', status: 'done', message: 'Scraped SEC filings, TSMC production reports, and earnings call transcripts.', timestamp: '21:12' },
      { agentName: 'Timeline Agent', status: 'done', message: 'Sequenced GPU development charts from Hopper architecture to blackwell market capture.', timestamp: '21:13' },
      { agentName: 'Social Pulse Agent', status: 'done', message: 'Parsed WallStreetBets forums and tech Twitter feeds (15,000 comments).', timestamp: '21:14' },
      { agentName: 'Sentiment Agent', status: 'done', message: 'Identified 65% positive rating. Mixed topics point to valuation multiples and potential silicon shortage.', timestamp: '21:14' },
      { agentName: 'Meme Agent', status: 'done', message: 'Extracted leather jacket signature clips and AI bubble graphics.', timestamp: '21:15' },
      { agentName: 'Prediction Agent', status: 'done', message: 'Calculated 92% continuation rate. Unmatched backlog orders cushion short-term revenue spikes.', timestamp: '21:15' },
      { agentName: 'Summary Agent', status: 'done', message: 'Synthesized summaries. Data packets loaded.', timestamp: '21:16' }
    ]
  }
};

export async function getTrendingList() {
  return Object.values(SEEDED_TRENDS).map(t => ({
    id: t.id,
    title: t.title,
    category: t.category,
    popularity: t.popularity,
    country: t.country,
    duration: t.duration,
    lastUpdated: t.lastUpdated,
    summary: t.summary['30s']
  }));
}

export async function getTrend(id: string): Promise<TrendDetails | null> {
  const lowercaseId = id.toLowerCase();
  if (SEEDED_TRENDS[lowercaseId]) {
    return SEEDED_TRENDS[lowercaseId];
  }
  return null;
}

// Simulates generating trend data dynamically for a search term
export async function searchTrend(query: string): Promise<TrendDetails> {
  const cleanQuery = query.trim();
  const lowercaseQuery = cleanQuery.toLowerCase();
  
  // If matches seeded trend, return that
  if (SEEDED_TRENDS[lowercaseQuery]) {
    return SEEDED_TRENDS[lowercaseQuery];
  }
  
  // Otherwise, construct a plausible simulated response!
  const popularity = Math.floor(Math.random() * 300) + 650;
  const categories = ['Technology', 'Business', 'Sports', 'Entertainment', 'Science', 'Gaming'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  return {
    id: lowercaseQuery.replace(/\s+/g, '-'),
    title: `Why is ${cleanQuery} trending?`,
    category,
    popularity,
    country: 'Global',
    duration: '24 hours',
    lastUpdated: 'Just now',
    summary: {
      '30s': `Search volume for ${cleanQuery} spiked suddenly due to a viral social media discussion, high-profile mentions, and recent news coverage. Users are investigating structural developments and public reactions.`,
      '2m': `${cleanQuery} has taken over social media feeds. The sudden interest was triggered when public figures referenced the topic, leading to community-driven discussions, threads on Reddit, and breaking news articles. Current information outlines debates between early supporters and critics, detailing the core concepts and real-world implications of this rising trend.`,
      '5m': `The viral surge surrounding ${cleanQuery} showcases digital network acceleration. Over the last 24 hours, queries related to the topic climbed across major directories. A thorough review reveals initial mentions in technical blogs, which were later shared in mainstream social media discussion groups. Proponents argue that the development represents a significant step forward in its field, citing enhanced efficiency and accessibility. Critics, conversely, point to a lack of standardization, potential resource challenges, and a degree of hype over substance. The resulting discussion has led to deep debates about how consumers, markets, or regulatory groups will react going forward.`,
      'expert': `From an operational standpoint, the interest spike in ${cleanQuery} represents a high-velocity momentum curve. Network traffic metrics indicate search patterns are highly concentrated within tech-forward demographic groups. System dynamics suggest a transient hype cycle, though structural metrics (API query counts, repository commits, or market pricing) indicate some foundational support. A detailed forensic overview suggests that while immediate media valuations may be inflated, secondary network impacts will likely persist in related software, hardware, or economic supply chains.`
    },
    timeline: [
      { day: 'Hour 1', title: 'The Spike', description: `Early search spikes for ${cleanQuery} detected.`, detail: 'Initial search logs indicate a sudden traffic volume escalation from multiple regional source nodes, triggering discovery algorithms.', category: 'announcement' },
      { day: 'Hour 4', title: 'Social Integration', description: 'Reddit threads and social mentions climb.', detail: 'Over 14 distinct discussions reach the front page of major boards, discussing the primary causes and sharing early review links.', category: 'social' },
      { day: 'Hour 8', title: 'Media Aggregation', description: 'News outlets write overview columns.', detail: 'Online media editors publish introductory guides explaining why the topic has captured user interest, amplifying searches.', category: 'media' },
      { day: 'Hour 18', title: 'Community Memes', description: 'Viral reactions spread.', detail: 'Graphic memes and inside jokes about the topic spread across video feeds, converting it into a cultural symbol.', category: 'viral' },
      { day: 'Hour 24', title: 'Global Ingestion', description: 'Search volumes stabilize at elevated peaks.', detail: 'Interest levels consolidate. Markets, user networks, and curious learners integrate the information into their daily feeds.', category: 'impact' }
    ],
    sentiment: {
      positive: Math.floor(Math.random() * 40) + 30,
      neutral: Math.floor(Math.random() * 30) + 15,
      negative: Math.floor(Math.random() * 20) + 5,
      mixed: Math.floor(Math.random() * 10) + 5,
    },
    socialPulse: [
      { platform: 'reddit', author: 'u/curious_mind_42', content: `Can someone explain this? I went to sleep and suddenly my entire feed is filled with ${cleanQuery} discussions.`, timestamp: '2h ago', sentiment: 'neutral' },
      { platform: 'twitter', author: '@trendSpy_ai', content: `Alert: Search velocity for #${cleanQuery} is surging at 1,200% hour-over-hour. Standard indicator shift.`, timestamp: '3h ago', sentiment: 'positive' },
      { platform: 'youtube', author: 'TechExplainer', content: `My complete review of ${cleanQuery} and why this actually changes the landscape. Let me know in the comments your thoughts!`, timestamp: '5h ago', sentiment: 'positive' },
      { platform: 'forum', author: 'skeptic_reviewer', content: `This is a classic pump and hype cycle. Give it 48 hours and everyone will forget about it.`, timestamp: '12h ago', sentiment: 'negative' }
    ],
    memeDecoder: {
      memeName: `The ${cleanQuery} Overload`,
      origin: 'The overwhelming influx of questions and explanatory articles flooding community boards.',
      explanation: `Users are Posting images representing their confusion, showing graphs with arrows going straight up, indicating how quickly ${cleanQuery} replaced normal news.`,
      popularityCode: 'Viral Level: Gamma Low'
    },
    prediction: {
      continuationProbability: Math.floor(Math.random() * 40) + 40,
      longevityScore: Math.floor(Math.random() * 50) + 20,
      verdict: Math.random() > 0.5 ? 'Rising' : 'Stable',
      outlookText: `The trend displays healthy early-stage viral characteristics. It will likely maintain high engagement metrics for the near term before settling into a secondary niche.`
    },
    relatedTopics: [
      { id: `${lowercaseQuery}-1`, label: `${cleanQuery} Tech`, category, connectionType: 'Domain Core' },
      { id: `${lowercaseQuery}-2`, label: `Viral ${cleanQuery}`, category: 'Entertainment', connectionType: 'Viral Catalyst' },
      { id: `${lowercaseQuery}-3`, label: 'Future Innovation', category: 'Science', connectionType: 'Long-term outlook' }
    ],
    agentLogs: [
      { agentName: 'Trend Discovery Agent', status: 'done', message: `Detected anomalous search spikes for "${cleanQuery}". Triggering agent workflow.`, timestamp: 'Live' },
      { agentName: 'Research Agent', status: 'done', message: 'Scraped blogs, general news feeds, and wiki pages. Synthesized primary raw corpus.', timestamp: 'Live' },
      { agentName: 'Timeline Agent', status: 'done', message: 'Constructed chronological development events over a 24-hour cycle.', timestamp: 'Live' },
      { agentName: 'Social Pulse Agent', status: 'done', message: 'Monitored Twitter handles and Reddit threads to gauge public commentary.', timestamp: 'Live' },
      { agentName: 'Sentiment Agent', status: 'done', message: 'Aggregated sentiment scores. Distribution calculations complete.', timestamp: 'Live' },
      { agentName: 'Meme Agent', status: 'done', message: 'Deconstructed viral joke templates and graphic captions.', timestamp: 'Live' },
      { agentName: 'Prediction Agent', status: 'done', message: 'Estimated longevity scoring and velocity decay profile.', timestamp: 'Live' },
      { agentName: 'Summary Agent', status: 'done', message: 'Compiled multi-version summary profiles. Output complete.', timestamp: 'Live' }
    ]
  };
}
