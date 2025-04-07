// src/types/job.type.ts
export interface IJob {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    salary: string;
    requirements: string[];
    responsibilities: string[];
    whyJoinUs: string;
    createdAt?: string;
    updatedAt?: string;
  }