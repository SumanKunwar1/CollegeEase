import { Mentor } from "../types/findmentor";

export const mentorData: Mentor = {
  id: "1",
  name: "Sarah Mitchell",
  title: "Senior Software Engineer at Google",
  university: "Stanford University",

  location: "San Francisco, CA",
  imageUrl:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
  bio: "With over 10 years of experience in software engineering and a passion for mentoring, I help aspiring developers navigate their career paths and master modern technologies. My approach focuses on practical, hands-on learning combined with strong theoretical foundations.",
  availability: "Mon-Fri, 4PM-8PM PST",
  pricePerHour: 120,
  expertise: [
    { skill: "Full-Stack Development" },
    { skill: "System Design" },
    { skill: "React & Modern JavaScript" },
    { skill: "Cloud Architecture" },
    { skill: "Career Development" },
    { skill: "Interview Preparation" },
  ],
  mentorStyle: [
    { style: "Project-based learning" },
    { style: "Interactive sessions" },
    { style: "Practical exercises" },
    { style: "Regular feedback" },
  ],
  testimonials: [
    {
      rating: 5,
      text: "Sarah's mentoring transformed my career. Her practical approach and deep technical knowledge helped me land my dream job at a top tech company.",
      author: "Alex Chen",
      title: "Software Engineer",
    },
    {
      rating: 5,
      text: "The best investment in my career growth. Sarah's mentoring style is engaging and she truly cares about her mentees' success.",
      author: "Maria Garcia",
      title: "Full-Stack Developer",
    },
  ],
  slice: function (_arg0: number): unknown {
    throw new Error("Function not implemented.");
  },
  map: function (): import("react").ReactNode {
    throw new Error("Function not implemented.");
  },
  find: function (): unknown {
    throw new Error("Function not implemented.");
  },
};
