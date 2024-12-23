"use client";

import React, { useState } from "react";

export default function Settings({ settings }: { settings: any }) {
  const [formData, setFormData] = useState({
    websiteName: settings[0].websiteName || "",
    websiteDescription: settings[0].websiteDescription || "",
    websiteKeywords: settings[0].websiteKeywords || "",
    websiteAuthor: settings[0].websiteAuthor || "",
    websiteUrl: settings[0].websiteUrl || "",
    websiteEmail: settings[0].websiteEmail || "",
    websitePhone: settings[0].websitePhone || "",
    websiteAddress: settings[0].websiteAddress || "",
  });
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/global", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Settings updated successfully!");
      } else {
        alert("Failed to update settings.");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Global Settings</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-x-6 gap-y-4"
      >
        {Object.keys(formData).map((key) => (
          <div key={key} className="col-span-12 sm:col-span-6">
            <label htmlFor={key} className="block text-sm font-medium mb-1">
              {key.replace(/website/g, "").replace(/([A-Z])/g, " $1")}
            </label>
            <input
              id={key}
              name={key}
              type="text"
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 col-span-6"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
}
