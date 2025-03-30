type ProgramLevel = "undergraduate" | "postgraduate";

type Program = {
  name: string;
  type: ProgramLevel;
  duration: string;
  description: string;
};

type CollegePrograms = {
  [K in ProgramLevel]: Program[];
};

interface College {
  id: number;
  name: string;
  location: string;
  rating: number;
  foundedYear: number;
  imageUrl: string;
  description: string;
  globalRanking: number;
  alumniCount: number;
  programs: CollegePrograms;
  studentReviews: Array<{
    id: string;
    studentName: string;
    program: string;
    rating: number;
    review: string;
  }>;
  careerStats: {
    placementRate: string;
    averageSalary: string;
  };
  applicationDeadlines: {
    [key: string]: string;
  };
  tuition: Array<{
    level: string;
    range: string;
    notes: string;
  }>;
}

export const collegesData: College[] = [
  {
    id: 1,
    name: "University of Technology",
    location: "Tech City, USA",
    rating: 4.5,
    foundedYear: 1950,
    imageUrl:
      "https://images.unsplash.com/photo-1632058948829-9e93440392e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description:
      "A leading institution in technology and engineering, known for its innovative research and industry partnerships.",
    globalRanking: 50,
    alumniCount: 50000,
    studentReviews: [
      {
        id: "review-1",
        studentName: "Alice Johnson",
        program: "Computer Science",
        rating: 5,
        review:
          "The computer science program is top-notch, with excellent faculty and resources.",
      },
      {
        id: "review-2",
        studentName: "Bob Williams",
        program: "Electrical Engineering",
        rating: 4,
        review:
          "Great campus and facilities, but some courses could be more challenging.",
      },
    ],
    careerStats: {
      placementRate: "95%",
      averageSalary: "$120,000",
    },
    applicationDeadlines: {
      fall: "August 15",
      spring: "December 1",
    },
    tuition: [
      {
        level: "undergraduate",
        range: "$40,000 - $50,000",
        notes: "Per academic year",
      },
      {
        level: "postgraduate",
        range: "$45,000 - $55,000",
        notes: "Per academic year",
      },
    ],
    programs: {
      undergraduate: [
        {
          name: "Computer Science",
          type: "undergraduate",
          duration: "4 years",
          description:
            "A comprehensive program covering all aspects of computer science.",
        },
        {
          name: "Electrical Engineering",
          type: "undergraduate",
          duration: "4 years",
          description:
            "Focuses on the design and development of electrical systems and devices.",
        },
      ],
      postgraduate: [
        {
          name: "Masters in Computer Science",
          type: "postgraduate",
          duration: "2 years",
          description:
            "Advanced studies in computer science with a focus on research.",
        },
      ],
    },
  },
  {
    id: 1,
    name: "Arts Institute of Design",
    location: "Creative District, USA",
    rating: 4.8,
    foundedYear: 1980,
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description:
      "A premier arts institution dedicated to fostering creativity and innovation in design and visual arts.",
    globalRanking: 150,
    alumniCount: 20000,
    studentReviews: [
      {
        id: "review-3",
        studentName: "Charlie Brown",
        program: "Graphic Design",
        rating: 5,
        review:
          "The graphic design program is amazing, with state-of-the-art facilities and inspiring instructors.",
      },
      {
        id: "review-4",
        studentName: "Diana Green",
        program: "Fashion Design",
        rating: 4,
        review:
          "The fashion design program is challenging but rewarding, with great opportunities for internships.",
      },
    ],
    careerStats: {
      placementRate: "90%",
      averageSalary: "$80,000",
    },
    applicationDeadlines: {
      fall: "July 1",
      spring: "November 15",
    },
    tuition: [
      {
        level: "undergraduate",
        range: "$35,000 - $45,000",
        notes: "Per academic year",
      },
      {
        level: "postgraduate",
        range: "$40,000 - $50,000",
        notes: "Per academic year",
      },
    ],
    programs: {
      undergraduate: [
        {
          name: "Graphic Design",
          type: "undergraduate",
          duration: "4 years",
          description:
            "A comprehensive program covering all aspects of graphic design.",
        },
        {
          name: "Fashion Design",
          type: "undergraduate",
          duration: "4 years",
          description:
            "Focuses on the design and creation of clothing and accessories.",
        },
      ],
      postgraduate: [
        {
          name: "Masters in Fine Arts",
          type: "postgraduate",
          duration: "2 years",
          description:
            "Advanced studies in fine arts with a focus on individual artistic development.",
        },
      ],
    },
  },
];
