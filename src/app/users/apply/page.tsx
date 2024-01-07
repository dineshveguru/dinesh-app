"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Apply = () => {
  const [data, setData] = useState({
    userName: "",
    aadharNo: 0,
    income: 0,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  async function submitForm(e: React.FormEvent) {
    if (data.userName === "" || data.aadharNo === 0 || data.income === 0) {
      setShowAlert(true);
      setAlertMessage("Please fill all the fields");
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/apply",
        data
      );
      if (res.status === 200) {
        setShowAlert(true);
        setAlertMessage("Applied Successfully");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage("Something went wrong");
    }
  }
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 5000);
    }
  }, [showAlert]);
  return (
    <div className="p-5 relative">
      <h1 className="mb-4 text-4xl underline font-bold">Apply for Schema</h1>
      {showAlert && (
        <div role="alert" className="alert w-max z-2 absolute right-0 mr-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your Name
          </label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            name="userName"
            value={data.userName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your Aadhar Number
          </label>
          <input
            type="number"
            maxLength={12}
            minLength={12}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            name="aadharNo"
            value={data.aadharNo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Annual Income
          </label>
          <input
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            name="income"
            value={data.income}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={submitForm}
        >
          Apply for Schema
        </button>
      </form>
    </div>
  );
};

export default Apply;
