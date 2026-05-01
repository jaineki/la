// types.ts — All shared type definitions

export interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  twinkle: number;
}

export interface SkillData {
  icon: string;
  name: string;
  level: number; // percentage 0–100
}

export interface ProjectData {
  href: string;
  icon: string;
  title: string;
  sub: string;
  badge?: string;
}

export interface SocialData {
  href: string;
  icon: string;
  iconColor: string;
  name: string;
  handle: string;
}

export interface StatData {
  count: number;
  label: string;
}

export interface ChatApiResponse {
  status: boolean;
  response?: string;
  reply?: string;
  error?: string;
}
