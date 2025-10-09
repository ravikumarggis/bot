"use client";
import { useState } from "react";
import { User, Mail, Phone, Globe, Edit } from "lucide-react";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "Ravi",
    lastName: "Singh",
    email: "ravikumarggis@gmail.com",
    phone: "+91",
    country: "IN",
  });

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-[#13131e] p-8 rounded-2xl border border-gray-800 shadow-lg max-w-3xl mx-auto mt-10">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-semibold text-white">
            R
          </div>
          <button className="absolute bottom-1 right-1 bg-[#1a1a25] border border-gray-600 p-2 rounded-full hover:bg-primary transition">
            <Edit size={16} className="text-gray-300 hover:text-white" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{profile.firstName} {profile.lastName}</h2>
          <p className="text-gray-400">{profile.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
          <User className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full bg-transparent py-3 text-white outline-none"
            placeholder="First Name"
          />
        </div>

        <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
          <User className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full bg-transparent py-3 text-white outline-none"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="flex items-center bg-[#1a1a25] rounded-xl px-3 mb-4">
        <Mail className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          value={profile.email}
          disabled
          className="w-full bg-transparent py-3 text-gray-400 outline-none cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
          <Phone className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full bg-transparent py-3 text-white outline-none"
            placeholder="Phone Number"
          />
        </div>

        <div className="flex items-center bg-[#1a1a25] rounded-xl px-3">
          <Globe className="text-gray-400 mr-2" size={18} />
          <select
            value={profile.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full bg-transparent py-3 text-white outline-none cursor-pointer"
          >
            <option value="IN" className="text-black">India</option>
            <option value="US" className="text-black">United States</option>
            <option value="UK" className="text-black">United Kingdom</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center">
      <button className="w-full bg-primary font-semibold text-white py-3 rounded-[10px] hover:opacity-90 transition-opacity">
        Update
      </button></div>
    </div>
  );
}
