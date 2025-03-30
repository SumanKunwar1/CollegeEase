import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Review {
  text: string;
  author: string;
  rating: number;
}

export interface GroupSession {
  id: number;
  title: string;
  mentor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  price: string;
  tags: string[];
  imageUrl: string;
  description: string;
  features: Feature[];
  reviews: Review[];
}
