import { College } from "../types/college";

export const colleges: College[] = [
  {
    id: "1",
    name: "Stanford University",
    location: "Stanford, CA",
    courses: ["Computer Science", "Engineering", "Business"],
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    tuitionRange: "$50,000 - $60,000",
    acceptanceRate: "5%",
    studentPopulation: "16,000",
    rankings: {
      academic: 98,
      studentSatisfaction: 95,
      placement: 97,
    },
    programs: undefined,
    virtualTours: []
  },
  {
    id: "2",
    name: "MIT",
    location: "Cambridge, MA",
    courses: ["Engineering", "Physics", "Mathematics"],
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    tuitionRange: "$55,000 - $65,000",
    acceptanceRate: "6%",
    studentPopulation: "11,000",
    rankings: {
      academic: 99,
      studentSatisfaction: 96,
      placement: 98,
    },
    programs: undefined,
    virtualTours: []
  },
  {
    id: "3",
    name: "Harvard University",
    location: "Cambridge, MA",
    courses: ["Law", "Medicine", "Business"],
    rating: 4.9,
    imageUrl: "/Assets/images/Harvard University.jpg",
    tuitionRange: "$54,000 - $64,000",
    acceptanceRate: "4.6%",
    studentPopulation: "20,000",
    rankings: {
      academic: 97,
      studentSatisfaction: 94,
      placement: 96,
    },
    programs: undefined,
    virtualTours: []
  },
];
