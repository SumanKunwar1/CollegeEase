export interface InterviewDetail {
  name: string;
  role: string;
  topic: string;
  date: string;
  imageUrl: string;
  category: string;
  insights: string[];
  fullInterview: {
    introduction: string;
    videoUrl?: string;
    sections: {
      title: string;
      content: string;
    }[];
    keyTakeaways: string[];
    resources: {
      title: string;
      url: string;
      type: string;
    }[];
  };
}
