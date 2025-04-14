"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import statesData from "../../Content/State.json";
import { Toaster, toast } from "sonner";
import { BorderBeam } from "@/components/ui/border-beam";

const DonorForm = () => {
  const states = statesData.states;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    OrganisationName: Yup.string().required("Organization Name is required"),
    OrganisationPhone: Yup.string().required("Organization Number is required"),
    OrganisationEmail: Yup.string().email("Invalid email").required("Email is required"),
    OrganisationAddress: Yup.string().required("Organization Address is required"),
    OrganisationState: Yup.string().required("Organization State is required"),
    OrganisationCity: Yup.string(),
    isChecked: Yup.boolean().oneOf([true], "You must confirm the details are correct"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { isChecked, ...dataToSend } = values;
      const response = await fetch("/api/orgForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log("Data submitted successfully:", data);
      toast.success("Organisation added successfully");
      router.push("/");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      OrganisationName: "",
      OrganisationPhone: "",
      OrganisationEmail: "",
      OrganisationAddress: "",
      OrganisationState: "",
      OrganisationCity: "",
      isChecked: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("isChecked", e.target.checked);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    formik.handleChange(e);
  };

  const compulsory = <span className="text-red-600">*</span>;

  return (
    <motion.form
      className="mx-auto max-w-xl my-8 bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center bg-gradient-to-r from-red-900 via-red-900 to-red-800 h-[11vh] rounded-lg shadow-md mb-6">
        <h1 className="text-white text-2xl font-bold">Register as Organisation</h1>
      </div>

      <BorderBeam />

      <div className="mb-5">
        <label htmlFor="OrganisationName">Organisation Name {compulsory}</label>
        <input
          type="text"
          id="OrganisationName"
          name="OrganisationName"
          value={formik.values.OrganisationName}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          className="pl-2 border-2 border-gray-300 hover:border-red-800 h-10 w-full"
          placeholder="Organisation Name"
          required
        />
        {formik.touched.OrganisationName && formik.errors.OrganisationName && (
          <div className="text-red-600">{formik.errors.OrganisationName}</div>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="OrganisationPhone">Contact Number {compulsory}</label>
        <input
          type="text"
          id="OrganisationPhone"
          name="OrganisationPhone"
          value={formik.values.OrganisationPhone}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          className="pl-2 border-2 border-gray-300 hover:border-red-800 h-10 w-full"
          placeholder="Organisation Phone Number"
          required
        />
        {formik.touched.OrganisationPhone && formik.errors.OrganisationPhone && (
          <div className="text-red-600">{formik.errors.OrganisationPhone}</div>
        )}

        <label htmlFor="OrganisationEmail">Email {compulsory}</label>
        <input
          type="email"
          id="OrganisationEmail"
          name="OrganisationEmail"
          value={formik.values.OrganisationEmail}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          className="pl-2 border-2 border-gray-300 hover:border-red-800 h-10 w-full"
          placeholder="Organisation Email"
          required
        />
        {formik.touched.OrganisationEmail && formik.errors.OrganisationEmail && (
          <div className="text-red-600">{formik.errors.OrganisationEmail}</div>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="OrganisationAddress">Address {compulsory}</label>
        <input
          type="text"
          id="OrganisationAddress"
          name="OrganisationAddress"
          value={formik.values.OrganisationAddress}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          className="pl-2 border-2 border-gray-300 hover:border-red-800 h-[11vh] w-full"
          placeholder="Organisation Address"
          required
        />
        {formik.touched.OrganisationAddress && formik.errors.OrganisationAddress && (
          <div className="text-red-600">{formik.errors.OrganisationAddress}</div>
        )}

        <label htmlFor="OrganisationState">State {compulsory}</label>
        <select
          id="OrganisationState"
          name="OrganisationState"
          value={formik.values.OrganisationState}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          className="pl-2 border-2 border-gray-300 hover:border-red-800 h-10 w-full"
          required
        >
          <option value="">-- Choose State --</option>
          {states.map((state: string) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {formik.touched.OrganisationState && formik.errors.OrganisationState && (
          <div className="text-red-600">{formik.errors.OrganisationState}</div>
        )}
      </div>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={formik.values.isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          All the details which are filled by Organisation are right and ethical.
        </label>
        {formik.touched.isChecked && formik.errors.isChecked && (
          <div className="text-red-600">{formik.errors.isChecked}</div>
        )}
      </div>

      <div className="flex justify-center">
        <Toaster />
        <button
          type="submit"
          className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-6 rounded w-full sm:w-1/2"
          disabled={!formik.isValid || !formik.dirty || !formik.values.isChecked}
        >
          Register
        </button>
      </div>
    </motion.form>
  );
};

export default DonorForm;
