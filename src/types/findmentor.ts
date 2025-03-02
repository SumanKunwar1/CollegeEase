export interface Testimonial {
  rating: number;
  text: string;
  author: string;
  title: string;
}

export interface MentorStyle {
  style: string;
}

export interface Expertise {
  skill: string;
}

export interface Mentor {
  find(arg0: (m: any) => boolean): unknown;
  slice(arg0: number, arg1: number): unknown;
  map(arg0: (mentorData: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: string;
  name: string;
  title: string;
  university: string;
  location: string;
  imageUrl: string;
  bio: string;
  availability: string;
  pricePerHour: number;
  expertise: Expertise[];
  mentorStyle: MentorStyle[];
  testimonials: Testimonial[];
}
