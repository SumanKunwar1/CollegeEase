import type { ScholarshipDetails } from "../types/scholarship";

export const scholarshipsData: ScholarshipDetails[] = [
  {
    id: "1",
    coverImage: "",
    name: "Global Excellence Scholarship",
    provider: "International Education Foundation",
    type: "Merit-based",
    deadline: "2025-06-30",
    amount: "$50,000",
    eligibleCountries: [
      "United States",
      "Canada",
      "United Kingdom",
      "Australia",
      "Nepal",
    ],
    requirements: {
      minimumGPA: 3.0,
      preferredGPA: 3.5,
      competitiveGPA: 3.8,
      majorWeights: {
        "Computer Science": 1.2,
        Engineering: 1.15,
        Medicine: 1.1,
        Business: 1.0,
        Other: 0.9,
      },
      countryDiversity: {
        priority: ["Nepal", "India", "China"],
        weight: 1.15,
      },
    },
    vision: {
      purpose:
        "To empower exceptional students worldwide to pursue their academic dreams without financial barriers.",
      impact:
        "Supporting the next generation of global leaders and innovators through quality education.",
      goals:
        "Create a diverse, international network of scholars who will drive positive change in their communities.",
    },
    institution: {
      name: "International Education Foundation",
      history:
        "Established in 1990, the IEF has supported over 10,000 students globally.",
      achievements: [
        "Ranked #1 in educational impact by Global Education Review",
        "Over 90% graduation rate among scholarship recipients",
        "Alumni network spanning 50+ countries",
      ],
      accreditation: [
        "International Scholarship Council",
        "Global Education Standards Board",
        "Higher Education Quality Assurance",
      ],
    },
    statistics: {
      averageGPAAwarded: 3.6,
      totalApplications: 5000,
      acceptanceRate: 0.15,
      majorDistribution: {
        "Computer Science": 0.3,
        Engineering: 0.25,
        Medicine: 0.2,
        Business: 0.15,
        Other: 0.1,
      },
    },
    eligibility: {
      academicRequirements: [
        "Minimum GPA of 3.5 or equivalent",
        "Strong academic record in relevant field",
        "Research experience (for graduate programs)",
      ],
      financialNeed:
        "Demonstrated financial need may be considered but is not required",
      nationality: ["All nationalities eligible"],
      ageLimit: "Under 35 years at the time of application",
      studyLevel: ["Undergraduate", "Graduate", "Doctorate"],
      languageRequirements: [
        "IELTS 7.0 or equivalent",
        "TOEFL 100+ or equivalent",
      ],
      specialRequirements: [
        "Leadership experience",
        "Community service involvement",
        "Research publications (for PhD candidates)",
      ],
    },
    benefits: {
      coverage: [
        "Full tuition fees",
        "Monthly stipend for living expenses",
        "Annual research/book allowance",
        "Health insurance",
        "Travel allowance (one round trip)",
      ],
      additionalPerks: [
        "Mentorship program",
        "Internship opportunities",
        "Professional development workshops",
        "Alumni network access",
        "Conference attendance support",
      ],
    },
    applicationProcess: [
      "Complete online application form",
      "Submit academic transcripts",
      "Provide letters of recommendation",
      "Write personal statement",
      "Submit research proposal (for PhD)",
      "Interview (if shortlisted)",
    ],
    status: "Open",
  },
];
