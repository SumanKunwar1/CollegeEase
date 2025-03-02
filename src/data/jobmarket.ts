import type { Category } from "../types/jobmarket";

export const marketInsights: Category[] = [
  {
    title: "Tech Sector",
    description: "Master the technical skills most in demand by employers",
    insights: [
      {
        role: "Software Engineer",
        growth: "+25%",
        avgSalary: "$120,000",
        topLocations: ["San Francisco", "New York", "Seattle"],
        skills: ["React", "Python", "Cloud Computing"],
        demand: "High",
        imageUrl:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400",
        detailedAnalysis: {
          jobDescription:
            "Software Engineers design, develop, and maintain software systems and applications.",
          industryTrends:
            "The demand for Software Engineers continues to grow across various industries, with a particular focus on cloud computing, AI, and cybersecurity.",
          salaryRange: "$80,000 - $200,000",
          careerPath: [
            "Junior Developer",
            "Software Engineer",
            "Senior Software Engineer",
            "Tech Lead",
            "Software Architect",
          ],
          keyCompanies: ["Google", "Microsoft", "Amazon", "Facebook", "Apple"],
          futureOutlook:
            "The job market for Software Engineers is expected to remain strong, with continued growth in emerging technologies.",
        },
      },
      {
        role: "Data Scientist",
        growth: "+30%",
        avgSalary: "$130,000",
        topLocations: ["Boston", "Austin", "Chicago"],
        skills: ["Machine Learning", "SQL", "Python"],
        demand: "Very High",
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
        detailedAnalysis: {
          jobDescription:
            "Data Scientists analyze and interpret complex data to help organizations make better decisions.",
          industryTrends:
            "Data Science is rapidly evolving, with increasing focus on machine learning, AI, and big data analytics.",
          salaryRange: "$90,000 - $180,000",
          careerPath: [
            "Data Analyst",
            "Data Scientist",
            "Senior Data Scientist",
            "Lead Data Scientist",
            "Chief Data Officer",
          ],
          keyCompanies: ["IBM", "Amazon", "Microsoft", "Google", "Facebook"],
          futureOutlook:
            "The field of Data Science is expected to continue growing as more companies rely on data-driven decision making.",
        },
      },
    ],
  },
  // Add other categories (Healthcare, Business & Finance) here...
];
