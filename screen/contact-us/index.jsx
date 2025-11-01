"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MessageSquare, RefreshCw } from "lucide-react";
import {contactUsMutation} from "@/queries/miss";
import { useMutation } from "@tanstack/react-query";
import Dropdown from "@/components/dropdown";
import { toast } from "sonner";
// import { GoogleLogin } from '@react-oauth/google';
// import toast from '...'; // make sure toast is imported in your project if used
// make sure userDataRefetch is in scope where needed

const countryOptions = [
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
];

export default function ContactFormInline() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    captchaAnswer: "",
    terms: false,
    country: "", 
  });

  const [errors, setErrors] = useState({});

  // simple math captcha
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  useEffect(() => generateCaptcha(), []);

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 8) + 2; // 2..9
    const b = Math.floor(Math.random() * 8) + 1; // 1..8
    setCaptcha({ a, b });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9]{7,15}$/; // simple international-ish

  function validate() {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!emailPattern.test(formData.email)) e.email = "Enter a valid email address.";
    if (formData.phone && !phonePattern.test(formData.phone))
      e.phone = "Enter a valid phone number (digits only, optional +).";
    if (!formData.message.trim()) e.message = "Message cannot be empty.";
    else if (formData.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    // captcha: allow numeric comparison only
    const expected = captcha.a + captcha.b;
    const given = Number(formData.captchaAnswer);
    if (!formData.captchaAnswer && formData.captchaAnswer !== 0) {
      e.captchaAnswer = "Captcha answer is required.";
    } else if (Number.isNaN(given) || given !== expected) {
      e.captchaAnswer = "Captcha answer is incorrect.";
    }
    if (!formData.terms) e.terms = "You must accept Terms & Privacy Policy.";
    if (!formData.country) e.country = "Please select a country.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // send full formData to mutation
    try {
      await contactUsMutate(formData);
    } catch (err) {
      // error handled in onError of mutation
    }
  }

  const { mutateAsync: contactUsMutate, isPending: mutatePending } = useMutation({
    mutationFn: async (values) => {
      // values is the formData object
      return contactUsMutation({
        name: values?.name,
        countryCode: values?.country, // include country in payload
        email: values?.email,
        mobileNumber: values?.phone,
        message: values?.message, // include message if backend accepts it
        // include other fields as needed by your API...
      });
    },
    onSuccess: (data) => {
        console.log(data,"datadatadatadatadata");
        
      if (data?.data?.responseCode == 200) {
        toast.success("Thanks for contacting us! We’ll get back to you within 1–2 business days.");
        // userDataRefetch();
        // optionally reset form:
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          captchaAnswer: "",
          terms: false,
          country: "",
        });
        generateCaptcha();
      } else {
        // toast.error(data?.data?.responseMessage);
      }
    },
    onError: (err) => {
      console.log(err, "err>>>");
    },
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  }

  return (
    <div className="text-white px-6 md:px-30 lg:px-60 xl:px-90 sm:px-20 pt-20 sm:pt-30 pb-10 md:pb-20">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p className="text-sm text-slate-400 mb-6">
        Have questions? Fill out the form and our team will respond within 1-2 business days.
      </p>

      <form onSubmit={handleSubmit} noValidate>
  {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}

  {/* Grid: 1 column on small, 2 columns on md+ */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Name */}
    <div className="relative">
      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full p-3 pl-10 bg-[#1A1A24] rounded focus:outline-none ${
          errors.name ? "border border-red-500" : ""
        }`}
      />
      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
    </div>

    {/* Email */}
    <div className="relative">
      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="email"
        name="email"
        placeholder="Enter email address"
        value={formData.email}
        onChange={handleChange}
        className={`w-full p-3 pl-10 bg-[#1A1A24] rounded focus:outline-none ${
          errors.email ? "border border-red-500" : ""
        }`}
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>

    {/* Country */}
    <div className="relative">
      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
      <Dropdown
        label="Country"
        options={countryOptions}
        value={formData.country}
        onSelect={(val) => {
          setFormData((s) => ({ ...s, country: val }));
          setErrors((prev) => ({ ...prev, country: undefined }));
        }}
        className="w-full"
      />
      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
    </div>

    {/* Phone */}
    <div className="relative">
      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        name="phone"
        placeholder="+91 (optional)"
        value={formData.phone}
        onChange={handleChange}
        className={`w-full p-3 pl-10 bg-[#1A1A24] rounded focus:outline-none ${
          errors.phone ? "border border-red-500" : ""
        }`}
      />
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
    </div>

    {/* Message (full width) */}
    <div className="relative md:col-span-2">
      <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
      <textarea
        name="message"
        placeholder="Enter message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        className={`w-full p-3 pl-10 bg-[#1A1A24] rounded focus:outline-none ${
          errors.message ? "border border-red-500" : ""
        }`}
      />
      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
    </div>

    {/* Captcha row (full width) */}
    <div className="flex items-center gap-3 md:col-span-2">
      <label className="flex-1">
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">{captcha.a} + {captcha.b}</span>
          <input
            name="captchaAnswer"
            value={formData.captchaAnswer}
            onChange={handleChange}
            placeholder="Enter captcha answer"
            className={`w-full p-3 pl-16 bg-[#1A1A24] rounded focus:outline-none ${
              errors.captchaAnswer ? "border border-red-500" : ""
            }`}
          />
        </div>
        {errors.captchaAnswer && <p className="text-red-500 text-sm mt-1">{errors.captchaAnswer}</p>}
      </label>

      <button
        type="button"
        onClick={generateCaptcha}
        className="rounded p-2 bg-slate-800 hover:bg-slate-700"
        aria-label="Regenerate captcha"
      >
        <RefreshCw size={18} className="text-gray-300" />
      </button>
    </div>

    {/* Terms (full width) */}
    <div className="md:col-span-2">
      <label className="flex items-start text-sm cursor-pointer">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className="mr-2 mt-1"
        />
        I accept the{" "}
        <Link href="/terms-conditions" className="text-primary ml-1 hover:underline">
          Terms &amp; Conditions
        </Link>{" "}
        &amp;{" "}
        <Link href="/privacy-policy" className="text-primary ml-1 hover:underline">
          Privacy Policy
        </Link>
      </label>
      {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
    </div>

    {/* Submit (full width) */}
    <div className="md:col-span-2">
      <button
        type="submit"
        className="w-full bg-primary font-semibold text-white py-3 rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-60"
        disabled={mutatePending}
      >
        {mutatePending ? `Sending...` : `SEND MESSAGE`}
      </button>
    </div>
  </div>
</form>

    </div>
  );
}
