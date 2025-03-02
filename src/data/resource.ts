import { Resource, ResourceFilter } from "../types/resource";

export const resources: Resource[] = [
  {
    id: "1",
    title: "Complete Mentorship Guide 2024",
    type: "guide",
    category: "mentorship",
    description:
      "Comprehensive guide on building strong mentor-mentee relationships",
    detailedDescription: `This comprehensive guide covers everything you need to know about effective mentorship:

- Building strong relationships
- Setting clear expectations
- Communication strategies
- Goal setting and tracking
- Overcoming common challenges
- Best practices and case studies`,
    author: "Dr. Sarah Chen",
    downloadUrl: "/resources/mentorship-guide-2024.pdf",
    previewUrl: "/resources/mentorship-guide-preview",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400",
    datePublished: "2024-01-15",
    tags: ["mentorship", "leadership", "communication"],
    fileSize: "2.5 MB",
    downloadCount: 1234,
    rating: 4.8,
    reviewCount: 156,
    requirements: [
      "Basic understanding of mentorship concepts",
      "Commitment to professional development",
    ],
    relatedResources: ["2", "4"],
    videoUrl: "",
  },
  {
    id: "2",
    title: "Effective Mentoring Workshop",
    type: "video",
    category: "mentorship",
    description:
      "Recorded workshop session on mentoring best practices and techniques",
    detailedDescription: `A comprehensive workshop recording covering:

- Mentoring styles and approaches
- Active listening techniques
- Providing constructive feedback
- Setting and tracking goals
- Building trust and rapport
- Case studies and role-play examples`,
    author: "Leadership Academy",
    downloadUrl: "/resources/mentoring-workshop.mp4",
    previewUrl: "/resources/workshop-preview",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=400",
    datePublished: "2024-02-01",
    tags: ["workshop", "mentoring", "leadership"],
    fileSize: "850 MB",
    downloadCount: 756,
    rating: 4.9,
    reviewCount: 128,
    requirements: [
      "Basic mentoring experience",
      "Interest in leadership development",
    ],
    relatedResources: ["1", "3"],
    videoUrl: "/Public/Assets/videos/Dua Lipa.mp4",
  },
  {
    id: "3",
    title: "Career Development Toolkit",
    type: "template",
    category: "career",
    description: "Comprehensive toolkit for career planning and development",
    detailedDescription: `A complete toolkit for career planning and development:

- Career assessment templates
- Goal-setting worksheets
- Action plan templates
- Progress tracking tools
- Skills assessment matrices
- Professional development planners`,
    author: "Career Development Team",
    downloadUrl: "/resources/career-toolkit-2024.zip",
    previewUrl: "/resources/career-toolkit-preview",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=400",
    datePublished: "2024-01-20",
    tags: ["career", "planning", "professional development"],
    fileSize: "5.8 MB",
    downloadCount: 892,
    rating: 4.9,
    reviewCount: 203,
    requirements: [
      "Microsoft Office or Google Workspace",
      "Basic career planning knowledge",
    ],
    relatedResources: ["1", "4"],
    videoUrl: "",
  },
  {
    id: "4",
    title: "Expert Interview Series",
    type: "video",
    category: "career",
    description:
      "Collection of interviews with industry leaders sharing career insights",
    detailedDescription: `A curated series of expert interviews featuring:

- Industry leaders' career journeys
- Success strategies and tips
- Overcoming career challenges
- Future industry trends
- Leadership lessons
- Q&A sessions with experts`,
    author: "Career Insights Team",
    downloadUrl: "/resources/expert-interviews.zip",
    previewUrl: "/resources/interviews-preview",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400",
    datePublished: "2024-02-15",
    tags: ["interviews", "career advice", "leadership"],
    fileSize: "1.2 GB",
    downloadCount: 645,
    rating: 4.8,
    reviewCount: 92,
    requirements: ["None - suitable for all career levels"],
    relatedResources: ["2", "3"],
    videoUrl: "/Public/Assets/videos/Banner Video.mp4",
  },
];

export const getResourceById = (id: string): Resource | undefined => {
  return resources.find((resource) => resource.id === id);
};

export const getRelatedResources = (id: string): Resource[] => {
  const resource = getResourceById(id);
  if (!resource?.relatedResources) return [];
  return resources.filter((r) => resource.relatedResources?.includes(r.id));
};

export const filterResources = (filter: ResourceFilter): Resource[] => {
  return resources.filter((resource) => {
    if (filter.type && resource.type !== filter.type) return false;
    if (filter.category && resource.category !== filter.category) return false;
    if (filter.tags && !filter.tags.some((tag) => resource.tags.includes(tag)))
      return false;
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });
};
