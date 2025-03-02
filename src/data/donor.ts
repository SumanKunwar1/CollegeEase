export const donors = [
  {
    id: "1",
    email: "donor1@example.com",
    fullName: "John Doe",
    country: "USA",
    position: "Software Engineer",
    organization: "Tech Corp",
    phoneNumber: "1234567890",
    donationPreference: "oneTime",
    createdAt: new Date().toISOString(),
  },
];

export const donations = [
  {
    id: "1",
    donorId: "1",
    studentId: "1",
    amount: 100,
    date: new Date().toISOString(),
    studentName: "Alice",
    cause: "Tuition Fee",
  },
];
