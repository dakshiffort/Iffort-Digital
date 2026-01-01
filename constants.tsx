import { Service, CaseStudy, Client } from './types';
import { 
  Target, 
  Megaphone, 
  Search, 
  Video, 
  BarChart3, 
  Zap, 
  Layers, 
  Globe 
} from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 'demand-gen',
    title: 'Demand & Lead Generation',
    description: 'Forget random acts of marketing. We build targeted, multi-channel campaigns that create genuine demand and deliver a pipeline ready for prime time.',
    iconName: 'Target'
  },
  {
    id: 'content-strategy',
    title: 'Content & GTM Strategy',
    description: 'We craft stories, case studies, and go-to-market plans that make your brand the smartest voice in the room. This isn\'t just content; it\'s your authority, bottled.',
    iconName: 'Layers'
  },
  {
    id: 'seo-geo',
    title: 'AI-Powered SEO & GEO',
    description: 'Search has changed. Our AI-first SEO and Generative Engine Optimization ensures you are the answer, getting you cited and chosen in a world of zero-click results.',
    iconName: 'Search'
  },
  {
    id: 'video-production',
    title: 'B2B AI Video Production',
    description: 'Let\'s kill the talking-head webinar. Our AI-enhanced videos simplify complex topics and make technical subjects engaging and watchable.',
    iconName: 'Video'
  }
];

export const CLIENTS: string[] = [
  "SHRM", "HP", "KOGO", "Circles.Life", "Business Standard",
  "Channelplay", "Reckitt", "PropertyGuru", "Cowrks", "Mozark"
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'mozark',
    client: 'Mozark',
    category: 'Rebranding & Deep-Tech',
    title: 'Rebranding a Deep-Tech Leader for Global Enterprise Dominance',
    description: 'Transitioning a brand identity from a niche "Network Testing" utility to a holistic, enterprise-grade Global Digital Intelligence Powerhouse.',
    stats: [
      { label: 'Impact', value: 'Enterprise Grade' },
      { label: 'Asset', value: 'Unified Brand' }
    ],
    tags: ['Rebranding', 'Design System', 'Deep-Tech'],
    image: '/assets/mozark-case-study.png',
    content: {
      challenge: 'While Mozark possessed sophisticated product suites, their brand identity was rooted in startup origins. Visual fragmentation made it difficult for customers to perceive their products as an integrated ecosystem, hindering enterprise contracts with Tier-1 Telcos.',
      approach: 'We engineered a scalable 4-Pillar Strategic Framework rooted in their operational philosophy: Measure, Observe, Care, and Act. We implemented a product-led color recognition system and a modular visual architecture symbolizing interoperability.',
      result: 'The rebrand accelerated sales velocity by simplifying technical narratives. The new "Enterprise-Grade" aesthetic improved trust metrics during high-stakes negotiations, allowing Mozark to compete and win on the global stage.',
      quote: "We didn't just change a logo; we engineered a visual language for scale."
    }
  },
  {
    id: 'shrm',
    client: 'SHRM India',
    category: 'Lead Gen & HRTech',
    title: 'Scaling the Giants: A Blueprint for Global HRTech Dominance',
    description: 'Achieving predictable, high-intent growth in two of the world\'s most competitive emerging markets (India & MENA).',
    stats: [
      { label: 'Qualified Leads', value: '45,000+' },
      { label: 'YoY Growth', value: '40%' },
      { label: 'Budget', value: '1.3 Cr Optimized' }
    ],
    tags: ['Lead Gen', 'Performance Marketing', 'HRTech'],
    image: 'https://picsum.photos/seed/shrm/800/600',
    content: {
      challenge: 'The hurdle wasn\'t just visibility - it was velocity and validity. SHRM needed to scale lead volume aggressively without diluting quality or losing control of CPL across diverse landscapes.',
      approach: 'We started with intent, surgically mapping Ideal Customer Profiles (ICPs). We deployed a multi-layered messaging framework and implemented "algorithmic governance" to scale budgets only when ICP alignment was proven.',
      result: 'A transformed acquisition engine delivering 45,000+ qualified leads and 40% YoY growth. We solidified the client\'s presence as a dominant HR force in two global regions while maintaining lean CPL.',
    }
  },
  {
    id: 'cowrks',
    client: 'Cowrks',
    category: 'Performance & Revenue',
    title: 'Scaling Revenue & Lead Quality for a Premium Coworking Leader',
    description: 'Transforming digital presence into a high-efficiency revenue engine, achieving 5X ROAS in less than one year.',
    stats: [
      { label: 'Revenue', value: '₹8.25 Cr+' },
      { label: 'ROAS', value: '5X' },
      { label: 'MQLs', value: '1,059' }
    ],
    tags: ['Revenue Ops', 'PPC', 'Real Estate'],
    image: 'https://picsum.photos/seed/cowrks/800/600',
    content: {
      challenge: 'Despite premium facilities, marketing spend was fragmented with no "single source of truth" for attribution. It was difficult to identify which campaigns drove profit versus noise.',
      approach: 'We established "tracking integrity" by integrating Salesforce with Google Ads/GA4. We restructured the funnel (TOFU/MOFU/BOFU) and implemented Product-Wise Campaign Mapping to shift budgets to high-margin products like Flexi-Offices.',
      result: 'Generated over ₹8.25 Crores in attributed revenue with a 5X ROAS. We synchronized marketing with the sales floor to ensure every rupee spent was an investment in high-yield revenue.',
      quote: "We didn't just increase lead volume; we synchronized marketing with the sales floor."
    }
  },
  {
    id: 'hp',
    client: 'HP India',
    category: 'Content Strategy & Events',
    title: 'Defining the Narrative for a Global IT Leader’s Flagship Event',
    description: 'Serving as the Content Fulfillment Center to develop the strategic DNA for a massive enterprise event.',
    stats: [
      { label: 'Deliverables', value: '360° Content' },
      { label: 'Stakeholders', value: 'Multi-Region' }
    ],
    tags: ['Content Strategy', 'Events', 'Enterprise IT'],
    image: 'https://picsum.photos/seed/hp/800/600',
    content: {
      challenge: 'A global enterprise event involves hundreds of stakeholders. Without a unified "North Star," brand messaging becomes fragmented. The challenge was distilling complex IT solutions into a cohesive narrative for C-suite executives.',
      approach: 'We developed a "Strategic Event Framework" and an "Event Manifesto" (Creative Bible). This ensured total alignment across executive messaging, editorial content, multimedia, and social assets.',
      result: 'A flagship event where every keynote and visual asset felt like part of a single, powerful story. We enabled a global organization to speak with one voice on its most important stage.',
    }
  },
  {
    id: 'channelplay',
    client: 'Channelplay',
    category: 'B2B Lead Engine',
    title: 'Engineering a Global B2B Lead Engine for Retail & Distribution',
    description: 'Building a consistent pipeline for high-value service contracts and proprietary tech solutions across India and MENA.',
    stats: [
      { label: 'Outcome', value: 'Consistent SQLs' },
      { label: 'Coverage', value: 'India & MENA' }
    ],
    tags: ['ABM', 'Lead Gen', 'B2B Services'],
    image: 'https://picsum.photos/seed/channelplay/800/600',
    content: {
      challenge: 'Complex B2B decision-making cycles for high-touch services and in-house tech products required a sophisticated approach to reach C-suite executives.',
      approach: 'We built a unified "Lead Generation Engine" using Google Search, LinkedIn Marketing, and Account-Based Marketing (ABM). We supported this with a content-first philosophy using whitepapers and webinars.',
      result: 'Shifted from a "cold-outreach" model to an "inbound-authority" model. Established a daily stream of inbound inquiries and a predictable SQL pipeline for high-value contracts.',
    }
  },
  {
    id: 'reckitt',
    client: 'Reckitt Benckiser',
    category: 'FMCG & Event Marketing',
    title: 'From Conversions to Acquisitions: Driving Growth for a Leading Hygiene Brand at DWTC',
    description: 'Introducing RB’s cleaning solutions to decision-makers in Hospitality and F&B through a strategic, 45-day multi-touch campaign and exclusive event.',
    stats: [
      { label: 'Qualified Leads', value: '55+' },
      { label: 'Attendees', value: '15+ CXOs' },
      { label: 'Campaign', value: '45 Days' }
    ],
    tags: ['ABM', 'Event Marketing', 'Lead Gen'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
    content: {
      challenge: 'RB needed to reach niche decision-makers (CXOs, Facility Managers) in the Hospitality and F&B sectors. The challenge was establishing clear value to encourage these busy leaders to attend an offline "Business Breakfast" at DWTC.',
      approach: 'We executed a 45-day multi-touch campaign including AI-powered data scraping, cold calling, and LinkedIn ABM. We managed the entire offline experience, including sales collaterals and logistics, to ensure a premium engagement.',
      result: 'Generated 55+ qualified leads (27% Hospitality, 23% F&B, 23% Cleaning). We successfully convened 15+ client-side decision-makers at the event, creating a direct pipeline for RB’s professional solutions.',
      quote: "We didn't just generate leads; we engineered a high-value networking marketplace."
    }
  }
];

export const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Framework', href: '#framework' },
  { name: 'Work', href: '#work' },
];