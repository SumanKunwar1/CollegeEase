import type { Job } from "../types/jobTypes";

export const jobListings: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Exciting opportunity for a skilled software engineer to join our innovative team.",
    salary: "$100,000 - $150,000 per year",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in JavaScript, React, and Node.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams to define and implement new features",
      "Optimize application for maximum speed and scalability",
      "Write clean, maintainable, and efficient code",
    ],
    whyJoinUs:
      "Join our innovative team and work on cutting-edge projects that impact millions of users. We offer competitive salaries, excellent benefits, and opportunities for professional growth.",
  },
  {
    id: 2,
    title: "Data Scientist Intern",
    company: "Data Insights Co.",
    location: "New York, NY",
    type: "Internship",
    description:
      "Join our data science team for a summer internship and gain valuable experience.",
    salary: "$25 - $35 per hour",
    requirements: [
      "Currently pursuing a degree in Data Science, Statistics, or related field",
      "Strong programming skills in Python or R",
      "Familiarity with machine learning algorithms",
      "Excellent analytical and problem-solving skills",
    ],
    responsibilities: [
      "Assist in data collection, cleaning, and preprocessing",
      "Develop and implement machine learning models",
      "Collaborate with the team on data visualization projects",
      "Present findings and insights to stakeholders",
    ],
    whyJoinUs:
      "Gain hands-on experience in a fast-paced data science environment. Work alongside industry experts and build your professional network. Potential for full-time offers for outstanding performers.",
  },
];
