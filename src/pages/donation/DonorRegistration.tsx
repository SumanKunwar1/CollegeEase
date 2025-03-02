"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { storage } from "../../data/donationregistration";
import type { Donor } from "../../types/donationregistration";

export default function DonorRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    country: "",
    position: "",
    organization: "",
    phoneNumber: "",
    donationPreference: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const donor: Donor = {
      id: Date.now().toString(), // Simple ID generation
      ...formData,
      createdAt: new Date().toISOString(),
    };

    storage.saveDonor(donor);
    storage.setCurrentUser(donor);

    toast.success("Registration successful!");
    navigate("/donate/donor-dashboard");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Donor Registration
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.position}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-gray-700"
          >
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.organization}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="donationPreference"
            className="block text-sm font-medium text-gray-700"
          >
            Donation Preference
          </label>
          <select
            id="donationPreference"
            name="donationPreference"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.donationPreference}
            onChange={handleInputChange}
          >
            <option value="">Select a preference</option>
            <option value="oneTime">One-time donation</option>
            <option value="monthly">Monthly donation</option>
            <option value="annual">Annual donation</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Register as Donor
        </button>
      </form>
    </div>
  );
}
