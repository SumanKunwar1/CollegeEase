import type { IndustryTrendCategory } from "../types/industrytrend";

export const industryTrends: IndustryTrendCategory[] = [
  {
    category: "Technology",
    trends: [
      {
        id: "ai-machine-learning",
        title: "AI & Machine Learning",
        description:
          "The rise of AI is creating new roles in data science, ML engineering, and AI ethics.",
        impact: "High demand for AI specialists across industries",
        imageUrl:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
        details: {
          overview:
            "Artificial Intelligence (AI) and Machine Learning (ML) are transforming industries by automating processes, improving decision-making, and enabling new capabilities. From healthcare to finance, AI is driving innovation and creating demand for skilled professionals.",
          keyPoints: [
            "AI is revolutionizing industries such as healthcare, finance, and manufacturing",
            "Machine Learning algorithms are becoming more sophisticated and accessible",
            "Ethical considerations in AI development are gaining importance",
            "The demand for AI and ML specialists is growing rapidly across sectors",
          ],
          supportLinks: [
            {
              label: "AI in Healthcare",
              url: "https://example.com/ai-healthcare",
            },
            {
              label: "AI Ethics Guidelines",
              url: "https://example.com/ai-ethics",
            },
            {
              label: "Machine Learning Courses",
              url: "https://example.com/ml-courses",
            },
          ],
        },
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity",
        description:
          "Growing threats drive demand for security experts and privacy specialists.",
        impact: "Critical skills gap in cybersecurity workforce",
        imageUrl:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
        details: {
          overview:
            "With the increasing number of cyber threats, organizations are investing heavily in cybersecurity. This has led to a surge in demand for professionals skilled in threat detection, encryption, and network security.",
          keyPoints: [
            "Cyber attacks are becoming more sophisticated and frequent",
            "Data privacy regulations are driving the need for compliance experts",
            "Cloud security is a growing concern for businesses of all sizes",
            "There's a significant shortage of skilled cybersecurity professionals",
          ],
          supportLinks: [
            {
              label: "Cybersecurity Best Practices",
              url: "https://example.com/cybersecurity-best-practices",
            },
            {
              label: "Privacy Laws and Regulations",
              url: "https://example.com/privacy-laws",
            },
            {
              label: "Cybersecurity Certification Programs",
              url: "https://example.com/cybersecurity-certifications",
            },
          ],
        },
      },
    ],
  },
  {
    category: "Healthcare",
    trends: [
      {
        id: "digital-health",
        title: "Digital Health",
        description:
          "Telemedicine and health tech revolutionizing patient care.",
        impact: "New roles combining healthcare and tech expertise",
        imageUrl:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
        details: {
          overview:
            "Digital health technologies, including telemedicine, wearable devices, and health apps, are transforming how healthcare is delivered. These innovations are improving patient outcomes and creating new career opportunities.",
          keyPoints: [
            "Telemedicine is becoming a standard part of healthcare delivery",
            "Wearable devices are providing real-time health data to patients and providers",
            "AI and big data are being used to improve diagnostics and treatment plans",
            "There's a growing need for professionals with both healthcare and technology skills",
          ],
          supportLinks: [
            {
              label: "Telemedicine Trends",
              url: "https://example.com/telemedicine-trends",
            },
            {
              label: "Wearable Health Devices",
              url: "https://example.com/wearable-devices",
            },
            {
              label: "Digital Health Careers",
              url: "https://example.com/digital-health-careers",
            },
          ],
        },
      },
      {
        id: "biotechnology",
        title: "Biotechnology",
        description:
          "Advances in genomics and personalized medicine create new opportunities.",
        impact: "Growing demand for biotech researchers",
        imageUrl:
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=400",
        details: {
          overview:
            "Biotechnology is driving breakthroughs in genomics, personalized medicine, and drug development. This field is creating new opportunities for researchers and scientists to develop innovative treatments and therapies.",
          keyPoints: [
            "Gene editing technologies like CRISPR are revolutionizing medical treatments",
            "Personalized medicine is becoming more accessible and effective",
            "Bioinformatics is playing a crucial role in analyzing complex biological data",
            "There's increasing collaboration between biotech and AI companies",
          ],
          supportLinks: [
            {
              label: "Genomics Research",
              url: "https://example.com/genomics-research",
            },
            {
              label: "Personalized Medicine Advancements",
              url: "https://example.com/personalized-medicine",
            },
            {
              label: "Biotech Career Paths",
              url: "https://example.com/biotech-careers",
            },
          ],
        },
      },
    ],
  },
];
