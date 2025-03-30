import { Student, Donor, Donation } from "../types/donationregistration";

// In your storage initialization or somewhere appropriate

const STORAGE_KEYS = {
  STUDENTS: "students",
  DONORS: "donors",
  DONATIONS: "donations",
  CURRENT_USER: "currentUser",
};

export const storage = {
  getStudents: (): Student[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || "[]");
  },

  // Save a new student
  saveStudent: (student: Student) => {
    const students = storage.getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },

  // Update an existing student
  updateStudent: (student: Student) => {
    const students = storage.getStudents();
    const updatedStudents = students.map((s: Student) =>
      s.id === student.id ? student : s
    );
    localStorage.setItem(
      STORAGE_KEYS.STUDENTS,
      JSON.stringify(updatedStudents)
    );
  },

  // Get all donors
  getDonors: (): Donor[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONORS) || "[]");
  },

  // Save a new donor
  saveDonor: (donor: Donor) => {
    const donors = storage.getDonors();
    donors.push(donor);
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  },

  // Get all donations
  getDonations: (): Donation[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || "[]");
  },

  // Save a new donation
  saveDonation: (donation: Donation) => {
    const donations = storage.getDonations();
    donations.push(donation);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  },

  // Get the current logged-in user
  getCurrentUser: () => {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || "null"
    );
  },

  // Set the current logged-in user
  setCurrentUser: (user: Student | Donor | null) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  // Update a student's status
  updateStudentStatus: (studentId: string, status: Student["status"]) => {
    const students = storage.getStudents();
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, status } : student
    );
    localStorage.setItem(
      STORAGE_KEYS.STUDENTS,
      JSON.stringify(updatedStudents)
    );
  },
};
// In your storage initialization or somewhere appropriate
const defaultStudent: Student = {
  id: crypto.randomUUID(),
  email: "student@example.com",
  fullName: "John Doe",
  cause: "Tuition Fees",
  description: "I need help with my tuition fees.",
  amountNeeded: 1000,
  documents: ["proof_of_enrollment.pdf"],
  status: "pending",
  createdAt: new Date().toISOString(),
  raised: 0,
  password: "password123", // Default password
};

storage.saveStudent(defaultStudent);
