import { Video, Users, MessageCircle, BookOpen } from "lucide-react";
import type { GroupSession, Feature, Review } from "../types/groupsession";

// Define a global features list
export const featuresList: Feature[] = [
  {
    icon: Video,
    title: "Live Interactive Sessions",
    description: "Engage in real-time with mentors and peers",
  },
  {
    icon: Users,
    title: "Group Learning",
    description: "Learn from others' questions and experiences",
  },
  {
    icon: MessageCircle,
    title: "Q&A Opportunities",
    description: "Get your specific questions answered",
  },
  {
    icon: BookOpen,
    title: "Session Materials",
    description: "Access recordings and resources afterward",
  },
];

// Define a global reviews list
export const reviewsList: Review[] = [
  {
    text: "The interview prep session was incredibly helpful. I learned so much from other participants' questions too!",
    author: "Alex Chen",
    rating: 5,
  },
  {
    text: "Great value for money. The mentor was extremely knowledgeable and answered all our questions.",
    author: "Sarah Thompson",
    rating: 5,
  },
  {
    text: "The college application workshop helped me understand exactly what admissions officers look for.",
    author: "Michael Rodriguez",
    rating: 5,
  },
  {
    text: "The mock interviews were incredibly realistic and helped me prepare for the real thing.",
    author: "David Kim",
    rating: 5,
  },
  {
    text: "James's system design explanations were clear and practical.",
    author: "Lisa Wang",
    rating: 5,
  },
  {
    text: "This session gave me the confidence I needed for my upcoming interviews.",
    author: "Tom Martinez",
    rating: 5,
  },
  {
    text: "Dr. Chen's insights into the application process were invaluable.",
    author: "Maria Garcia",
    rating: 5,
  },
  {
    text: "The personal statement tips helped me craft a compelling narrative.",
    author: "James Lee",
    rating: 5,
  },
  {
    text: "Excellent overview of what medical schools are looking for.",
    author: "Rachel Cohen",
    rating: 5,
  },
];

export const sessions: GroupSession[] = [
  {
    id: 1,
    title: "Mastering College Applications",
    mentor: "Dr. Emily Rodriguez",
    date: "March 15, 2024",
    time: "2:00 PM EST",
    duration: "90 minutes",
    participants: 25,
    price: "$29",
    tags: ["College Prep", "Applications", "Essay Writing"],
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    description:
      "Join Dr. Emily Rodriguez for an intensive workshop on mastering your college applications. Learn insider tips on crafting compelling essays, highlighting your achievements effectively, and understanding what top universities are looking for in candidates. This interactive session includes personalized feedback opportunities and a comprehensive Q&A section.",
    features: featuresList,
    reviews: reviewsList.slice(0, 3),
  },
  {
    id: 2,
    title: "Tech Interview Preparation",
    mentor: "James Wilson",
    date: "March 18, 2024",
    time: "6:00 PM EST",
    duration: "120 minutes",
    participants: 20,
    price: "$39",
    tags: ["Coding", "Interview Prep", "Career"],
    imageUrl:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=400",
    description:
      "Master technical interviews with industry expert James Wilson. Learn effective problem-solving strategies, common algorithms, and system design principles. This hands-on session includes mock interviews and real-world coding challenges.",
    features: featuresList,
    reviews: reviewsList.slice(3, 6),
  },
  {
    id: 3,
    title: "Medical School Application Workshop",
    mentor: "Dr. Sarah Chen",
    date: "March 20, 2024",
    time: "3:00 PM EST",
    duration: "90 minutes",
    participants: 30,
    price: "$34",
    tags: ["Medical School", "MCAT", "Applications"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
    description:
      "Get comprehensive guidance on your medical school application journey with Dr. Sarah Chen. Learn strategies for MCAT preparation, crafting compelling personal statements, and navigating the application process. Includes tips for interviews and choosing the right schools.",
    features: featuresList,
    reviews: reviewsList.slice(6, 9),
  },
];
