export type ResourceType =
  | "guide"
  | "video"
  | "template"
  | "worksheet"
  | "course";

export type ResourceCategory =
  | "mentorship"
  | "career"
  | "technical"
  | "leadership";

export interface Resource {
  videoUrl: string;
  id: string;
  title: string;
  type: ResourceType;
  category: ResourceCategory;
  description: string;
  author: string;
  downloadUrl: string;
  previewUrl: string;
  thumbnailUrl: string;
  datePublished: string;
  tags: string[];
  fileSize: string;
  downloadCount: number;
  rating: number;
  reviewCount: number;
  detailedDescription?: string;
  requirements?: string[];
  relatedResources?: string[];
}

export interface ResourceFilter {
  type?: ResourceType;
  category?: ResourceCategory;
  tags?: string[];
  searchQuery?: string;
}
