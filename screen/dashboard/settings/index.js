"use client";
import { useState, useEffect, useMemo } from "react";
import { User, Mail, Phone, Globe, Edit } from "lucide-react";
import Dropdown from "../../../components/dropdown";
import { useUserProfile } from "@/queries/profile";

export default function ProfileSettings() {
  const [errors, setErrors] = useState({});
  const [initialized, setInitialized] = useState(false); // ensure API data only applied once

  const { data: getUserData, isPending: getUserDataPending } = useUserProfile();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

  // populate state when API data arrives (only once so user edits are not overwritten)
  useMemo(() => {
    if (getUserData && !initialized) {
      setProfile((prev) => ({
        firstName: getUserData.firstName ?? prev.firstName ?? "Ravi",
        lastName: getUserData.lastName ?? prev.lastName ?? "Singh",
        email: getUserData.email ?? prev.email ?? "",
        phone: getUserData.phone ?? prev.phone ?? "+91",
        country: getUserData.country ?? prev.country ?? "IN",
      }));
      setInitialized(true);
    }
  }, [getUserData, initialized]);

  // Show loading until API finishes loading the initial data
  if (getUserDataPending && !initialized) {
    return <p>Loading...</p>;
  }

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!String(profile.firstName || "").trim()) newErrors.firstName = "First name is required.";
    if (!String(profile.lastName || "").trim()) newErrors.lastName = "Last name is required.";
    if (!profile.email || !/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = "Enter a valid email.";
    if (!String(profile.phone || "").trim() || !/^\+?\d{6,15}$/.test(profile.phone))
      newErrors.phone = "Enter a valid phone number.";
    if (!profile.country) newErrors.country = "Select a country.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Example: call your API to update the profile
      // await api.updateProfile(profile);

      // optimistic UI / success
      alert("Profile updated successfully!");
    } catch (err) {
      // handle API errors and show to user
      console.error(err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const countryOptions = [
    { value: "IN", label: "India" },
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
  ];

  return (
    <div className="bg-[#13131e] p-8 rounded-2xl border border-gray-800 shadow-lg max-w-3xl mx-auto mt-10 ">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-semibold text-white">
            {profile.firstName ? profile.firstName.charAt(0).toUpperCase() : "R"}
          </div>
          <button className="absolute bottom-1 right-1 bg-[#1a1a25] border border-gray-600 p-2 rounded-full hover:bg-primary transition">
            <Edit size={16} className="text-gray-300 hover:text-white" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-400">{profile.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
            <User className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full bg-transparent py-2 text-white outline-none"
              placeholder="First Name"
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
            <User className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full bg-transparent py-2 text-white outline-none"
              placeholder="Last Name"
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
          <Mail className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={profile.email}
            disabled
            className="w-full bg-transparent py-2 text-gray-400 outline-none cursor-not-allowed"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Phone & Country Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
            <Phone className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-transparent py-2 text-white outline-none"
              placeholder="Phone Number"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Dropdown
            label="Country"
            options={countryOptions}
            value={profile.country}
            onSelect={(val) => handleChange("country", val)}
            className="w-full "
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="w-full bg-primary font-semibold text-white py-2 rounded-[10px] hover:opacity-90 transition-opacity"
        >
          Update
        </button>
      </div>
    </div>
  );
}
