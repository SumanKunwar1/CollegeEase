import type { CollegeDetails } from "../types/collegeDetails";

export const collegesData: CollegeDetails[] = [
  {
    id: "1",
    name: "Stanford University",
    location: "Stanford, CA",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    foundedYear: 1885,
    description:
      "Stanford University is a world-renowned institution known for its rigorous academic programs, cutting-edge research, and vibrant student community. Located in the heart of Silicon Valley, it provides unmatched opportunities for innovation and collaboration.",
    mission:
      "To promote learning and advance knowledge through research, creative work, and teaching.",
    globalRanking: 3,
    programs: {
      undergraduate: [
        {
          name: "Computer Science",
          type: "undergraduate",
          duration: "4 years",
          description:
            "Comprehensive program covering software development, algorithms, and computer systems",
        },
        {
          name: "Business Administration",
          type: "undergraduate",
          duration: "4 years",
          description:
            "Focus on business fundamentals, management, and entrepreneurship",
        },
      ],
      postgraduate: [
        {
          name: "Master of Business Administration (MBA)",
          type: "postgraduate",
          duration: "2 years",
          description:
            "Advanced business education with focus on leadership and innovation",
        },
        {
          name: "Master of Science in Computer Science",
          type: "postgraduate",
          duration: "2 years",
          description: "Advanced computing concepts and research opportunities",
        },
      ],
      doctorate: [
        {
          name: "PhD in Computer Science",
          type: "doctorate",
          duration: "4-5 years",
          description:
            "Research-focused program in computing and related fields",
        },
      ],
    },
    admissionRequirements: [
      {
        level: "undergraduate",
        requirements: [
          "High School Diploma or Equivalent",
          "SAT/ACT Scores (Optional)",
          "Personal Statement",
          "Letters of Recommendation",
        ],
      },
      {
        level: "postgraduate",
        requirements: [
          "Bachelor's Degree in Relevant Field",
          "GRE/GMAT Scores",
          "Statement of Purpose",
          "Academic Transcripts",
        ],
      },
    ],
    tuition: [
      {
        level: "undergraduate",
        range: "$50,000 - $60,000",
        notes: "Per academic year, includes basic fees",
      },
      {
        level: "postgraduate",
        range: "$55,000 - $65,000",
        notes: "Per academic year, varies by program",
      },
    ],
    facilities: [
      "State-of-the-art Research Labs",
      "Extensive Library System",
      "Modern Sports Complex",
      "Student Housing",
      "Innovation Hub",
    ],
    studentReviews: [
      {
        id: "1",
        studentName: "John D.",
        program: "Computer Science",
        review:
          "The best decision I ever made. The faculty is world-class, and the networking opportunities are amazing.",
        rating: 5,
      },
      {
        id: "2",
        studentName: "Emily W.",
        program: "Artificial Intelligence",
        review:
          "The research opportunities here are outstanding. I got to work on AI projects from my first year.",
        rating: 4.8,
      },
    ],
    careerStats: {
      placementRate: "95%",
      topEmployers: ["Google", "Apple", "Microsoft", "Tesla", "Amazon"],
      averageSalary: "$120,000",
    },
    applicationDeadlines: {
      fall: "September 15",
      spring: "March 30",
    },
    alumniCount: 300000,
  },
];
