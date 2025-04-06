export interface Expertise {
    skill: string;
  }
  
  export interface MentorStyle {
    style: string;
  }
  
  export interface Testimonial {
    author: string;
    title: string;
    text: string;
    rating: number;
  }
  
  export interface Mentor {
    _id: string;
    name: string;
    title: string;
    university: string;
    location: string;
    imageUrl: string;
    availability: string;
    pricePerHour: number;
    bio: string;
    expertise: Expertise[];
    mentorStyle: MentorStyle[];
    testimonials: Testimonial[];
  }