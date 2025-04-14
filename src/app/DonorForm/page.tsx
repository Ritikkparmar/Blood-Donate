"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import statesData from "../../Content/State.json"
import { Toaster, toast } from 'sonner'
import { BorderBeam } from "@/components/ui/border-beam";

const DonorForm = () => {

  const states = statesData.states;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bloodGroup: Yup.string().required("Blood Group is required"),
    age: Yup.number().required("Age is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string(),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { isChecked, ...dataToSend } = values;
      const response = await fetch("/api/DonorForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log(dataToSend);
      const data = await response.json();
      console.log("Data submitted successfully:", data);
      router.push("/");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      bloodGroup: "",
      age: "",
      address: "",
      state: "",
      city: "",
      gender: "",
      isChecked: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (e: any) => {
    formik.setFieldValue("isChecked", e.target.checked);
    console.log(e.target.checked);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    formik.handleChange(e);
  };

  const compulsory = <span className="text-red-600">*</span>;

  return (
    <motion.form
      className="mx-auto max-w-3xl my-8 bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center bg-gradient-to-r from-red-700 via-red-800 to-red-900 h-[10vh] rounded-lg shadow-md mb-6">
        <h1 className="text-white text-3xl font-semibold">Register as Donor</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name {compulsory}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="John"
            required
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.firstName}</div>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name {compulsory}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Doe"
            required
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.lastName}</div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone {compulsory}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Phone Number"
            required
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email {compulsory}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Email"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
            Blood Group {compulsory}
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formik.values.bloodGroup}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="">-- Select --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {formik.touched.bloodGroup && formik.errors.bloodGroup && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.bloodGroup}</div>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age {compulsory}
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formik.values.age}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Age"
            required
          />
          {formik.touched.age && formik.errors.age && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.age}</div>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address {compulsory}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Full Address"
            required
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.address}</div>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State {compulsory}
          </label>
          <select
            id="state"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="">-- Choose State --</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {formik.touched.state && formik.errors.state && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.state}</div>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender {compulsory}
          </label>
          <div className="flex gap-4 mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="male" onChange={handleInputChange} className="accent-red-600" required />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="female" onChange={handleInputChange} className="accent-red-600" required />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="other" onChange={handleInputChange} className="accent-red-600" required />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="inline-flex items-start mt-4">
            <input
              type="checkbox"
              checked={formik.values.isChecked}
              onChange={handleCheckboxChange}
              onBlur={formik.handleBlur}
              className="accent-red-600 mt-1"
            />
            <span className="ml-3 text-sm text-gray-700">All the details filled by me are correct and ethical.</span>
          </label>
          {formik.touched.isChecked && formik.errors.isChecked && (
            <div className="text-red-600 text-sm mt-2">{formik.errors.isChecked}</div>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center mt-4 animate-pulse">{error}</div>
      )}

      <div className="mt-8 flex justify-center">
        <Toaster />
        <button
          onClick={() => { toast.success('Donor added successfully'); }}
          type="submit"
          className="bg-red-700 hover:bg-red-800 transition-colors duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-md disabled:opacity-50"
          disabled={!formik.isValid || !formik.dirty || !formik.values.isChecked}
        >
          Register
        </button>
      </div>
    </motion.form>
  );
};

export default DonorForm;