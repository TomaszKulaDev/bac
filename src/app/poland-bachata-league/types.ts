import { ReactNode } from "react";

export interface StatCardProps {
  number: string;
  label: string;
}

export interface RankingCardProps {
  rank: number;
  name: string;
  points: number;
  image: string;
  category: string;
}

export interface EventCardProps {
  date: string;
  time?: string;
  title: string;
  location: string;
  category: string;
}

export interface NewsCardProps {
  date: string;
  title: string;
  image: string;
  excerpt: string;
}

export interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}
