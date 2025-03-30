import type { Application } from "../types/applicationForm";

export const applicationsData: Application[] = [
  {
    id: "1",
    collegeId: "1",
    studentName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    dob: "1995-05-15",
    program: "Computer Science",
    intake: "Fall 2023",
    status: "pending",
    documents: [
      {
        type: "transcripts",
        required: true,
        description: "Official academic transcripts",
        acceptedFormats: [".pdf"],
      },
      {
        type: "cv",
        required: true,
        description: "Current CV/Resume",
        acceptedFormats: [".pdf", ".doc", ".docx"],
      },
    ],
  },
  {
    id: "2",
    collegeId: "1",
    studentName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+0987654321",
    dob: "1998-08-20",
    program: "Business Administration",
    intake: "Spring 2024",
    status: "pending",
    documents: [
      {
        type: "transcripts",
        required: true,
        description: "Official academic transcripts",
        acceptedFormats: [".pdf"],
      },
      {
        type: "cv",
        required: true,
        description: "Current CV/Resume",
        acceptedFormats: [".pdf", ".doc", ".docx"],
      },
    ],
  },
];
