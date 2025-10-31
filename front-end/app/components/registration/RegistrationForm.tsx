"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    farmName: "",
    role: "Farmer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add logic to interact with the FarmerRegistry smart contract
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Register</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="farmName" className="text-sm font-medium text-gray-700">
              Farm or Business Name
            </label>
            <input
              type="text"
              name="farmName"
              id="farmName"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={handleChange}
            >
              <option>Farmer</option>
              <option>Buyer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
