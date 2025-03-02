import { Donation, Donor } from "../types/donationregistration";

export const storage = {
  saveDonor: (donor: Donor) => {
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    donors.push(donor);
    localStorage.setItem("donors", JSON.stringify(donors));
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  },
  setCurrentUser: (donor: Donor) => {
    localStorage.setItem("currentUser", JSON.stringify(donor));
  },
  saveDonation: (donation: Donation) => {
    const donations = JSON.parse(localStorage.getItem("donations") || "[]");
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));
  },
};
