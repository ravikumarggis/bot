

// import React from 'react'

// const Bot = () => {
//   return (
//     <div>Bot</div>
//   )
// }

// export default Bot




"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Info, Copy } from "lucide-react";
import { IconExchange } from "@tabler/icons-react";
import Dropdown from "../../../components/dropdown";


const exchangeOptions = [
  { label: "New Grid Bot", value: "New Grid Bot" },
  { label: "New DCA Bot", value: "New DCA Bot" },
];

export default function Bot() {
  const [showSecret, setShowSecret] = useState(false);
  const [formData, setFormData] = useState({ exchange: "", apiKey: "", secretKey: "" });
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOTPSubmit = (code) => {
    console.log("OTP submitted:", code);
    setIsOpen(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.exchange) newErrors.exchange = "Please select an exchange";
    if (!formData.apiKey) newErrors.apiKey = "API Key is required";
    if (!formData.secretKey) newErrors.secretKey = "Secret Key is required";
    else if (formData.secretKey.length < 8) newErrors.secretKey = "Secret Key must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Form Submitted:", formData);
      setIsOpen(true);
    }
  };

  return (
    <div className="min-h-screen  p-8 text-white">
         
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="flex">
      <Dropdown
                  
                  label="Create New Bot"
                  bgColor="#EE3379"
                  options={exchangeOptions}
                  value={formData.exchange || ""}
                  onSelect={(val) => setFormData({ ...formData, exchange: val })}
        
                className="w-56"
                />
                </div>
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 9 })?.map((_, i) => (
              <div key={i} className="bg-[#0f1117] rounded-2xl p-5 border border-gray-800 shadow-inner min-h-[120px]">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-md bg-[#141420] flex items-center justify-center text-pink-400">{/* icon placeholder */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12h16" stroke="#ff7ab6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="text-xs bg-pink-500 text-white px-2 py-1 rounded">Coming Soon</div>
                </div>

                <h4 className="text-lg font-semibold mt-4">Strategy {i + 1}</h4>
                <p className="text-sm text-gray-400 mt-2">Short description of this trading strategy to match the visual.</p>
              </div>
            ))}
          </div>
        </div>

      
       
      </div>

      <OTPModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleOTPSubmit} />
    </div>
  );
}


/* ---------- Small inline components for demonstration --------- */

function OTPModal({ isOpen, onClose, onSubmit }) {
  const [code, setCode] = useState("");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0c0c11] p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-3">Enter OTP</h3>
        <p className="text-sm text-gray-400 mb-4">We sent a 4-digit code to your registered email.</p>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="0000" className="w-full p-3 bg-[#111217] rounded mb-4" />
        <div className="flex gap-3">
          <button onClick={() => { onSubmit(code); setCode(""); }} className="flex-1 bg-gradient-to-r from-[#7b5cff] to-[#ff7ab6] py-2 rounded">Verify</button>
          <button onClick={() => { onClose(); setCode(""); }} className="flex-1 border border-gray-700 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
