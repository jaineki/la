// data.ts — All portfolio content / data

import type { SkillData, ProjectData, SocialData, StatData } from './types';

export const SKILLS: SkillData[] = [
  { icon: 'fab fa-js',       name: 'JavaScript',  level: 50 },
  { icon: 'fab fa-python',   name: 'Python',      level: 45 },
  { icon: 'fab fa-node-js',  name: 'Node.js',     level: 30 },
  { icon: 'fas fa-database', name: 'SQL / NoSQL', level: 60 },
  { icon: 'fab fa-html5',    name: 'HTML5',       level: 30 },
  { icon: 'fab fa-css3-alt', name: 'CSS3 / Flex', level: 60 },
];

export const PROJECTS: ProjectData[] = [
  {
    href:  'https://autobotnsekako.onrender.com/',
    icon:  'fas fa-robot',
    title: 'AUTOBOT · AI AUTOMATION',
    sub:   'smart reply engine',
    badge: 'LIVE',
  },
  {
    href:  'https://shareselov.onrender.com',
    icon:  'fas fa-share-alt',
    title: 'AUTO SHARE BOOST',
    sub:   'viral acceleration',
    badge: 'LIVE',
  },
];

export const SOCIALS: SocialData[] = [
  {
    href:       'https://www.facebook.com/quart.hade',
    icon:       'fab fa-facebook-f',
    iconColor:  '#1877f2',
    name:       'FACEBOOK',
    handle:     'quart.hade',
  },
  {
    href:       'https://discord.com/users/goatbot61',
    icon:       'fab fa-discord',
    iconColor:  '#7289da',
    name:       'DISCORD',
    handle:     'goatbot61',
  },
];

export const STATS: StatData[] = [
  { count: 2,   label: 'YRS EXP' },
  { count: 6,   label: 'SKILLS'  },
  { count: 2,   label: 'PROJECTS'},
  { count: 100, label: 'FAITH %' },
];

export const TYPEWRITER_PHRASES: string[] = [
  'Making Tools',
  'Automation Maker',
  'AI Enthusiast',
  'Faith-Driven Builder',
  'Code & Coffee',
];

export const WHATSAPP_NUMBER = '639243901969';
export const MUSIC_SRC = 'https://raw.githubusercontent.com/Tuxedoun/Nn/4c60fdbf78292b82c5c03e04923acccc74e4bd5e/cry.mp3';
export const AVATAR_SRC = 'https://media1.tenor.com/m/epNgwNHaSSsAAAAC/tenor.gif';
export const API_BASE_URL = '/api'; // proxied by Vite dev server → Vercel serverless
