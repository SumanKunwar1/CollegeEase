export interface ApplicationDocument {
  type: string;
  required: boolean;
  description: string;
  acceptedFormats: string[];
}

export interface ApplicationForm {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    currentAddress: string;
  };
  academicInfo: {
    degreeLevel: "undergraduate" | "postgraduate" | "doctorate";
    program: string;
    intake: "fall" | "spring";
    previousEducation: {
      institution: string;
      degree: string;
      fieldOfStudy: string;
      gpa: string;
      graduationDate: string;
    }[];
  };
  testScores: {
    type: string;
    score: string;
    dateOfExam: string;
  }[];
  documents: {
    [key: string]: File | null;
  };
  additionalInfo: {
    projects: string;
    publications: string;
    researchExperience: string;
    workExperience: string;
    achievements: string;
  };
  statementOfPurpose: string;
}

export interface ApplicationDocument {
  type: string;
  required: boolean;
  description: string;
  acceptedFormats: string[];
}

{
  /*this is new added for dashboard things  */
}
export interface Application {
  id: string;
  collegeId: string;
  studentName: string;
  email: string;
  phone: string;
  dob: string;
  program: string;
  intake: string;
  status: "pending" | "approved" | "rejected";
  documents: ApplicationDocument[];
}
