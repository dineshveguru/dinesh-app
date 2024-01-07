"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Status = () => {
  const [data, setData] = useState({
    aadharNo: 0,
  });
  const [res, setRes] = useState({
    userName: "",
    aadharNo: 0,
    income: 0,
    status: "",
    reason: "",
  });
  const [showData, setShowData] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  async function submitForm(e: React.FormEvent) {
    if (data.aadharNo === 0) {
      setShowAlert(true);
      setAlertMessage("Please enter your Aadhar Number");
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/check_status",
        data
      );
      if (response.status === 200) {
        setShowData(true);
        setRes((prev) => ({
          ...prev,
          status: response.data.response[0].status,
          aadharNo: response.data.response[0].aadharNo,
          userName: response.data.response[0].userName,
          income: response.data.response[0].income,
          reason: response.data.response[0].reasonForDenial,
        }));
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
      <h1 className="mb-4 text-4xl underline font-bold text-center">
        Check your Application Status
      </h1>
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
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={submitForm}
        >
          Get Details
        </button>
      </form>
      {showData && (
        <div className="mt-5">
          <h1 className="mb-4 text-2xl underline font-bold text-center">
            Your Application Status
          </h1>
          <div className="flex justify-center">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Name</td>
                  <td className="border px-4 py-2">{res.userName}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Aadhar Number</td>
                  <td className="border px-4 py-2">{res.aadharNo}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Annual Income</td>
                  <td className="border px-4 py-2">{res.income}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Application Status
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      res.status === "Approved"
                        ? "text-green-600"
                        : res.status === "Rejected"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {res.status}
                  </td>
                </tr>
                {res.status === "Rejected" && (
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Reason for Rejection
                    </td>
                    <td className="border px-4 py-2">{res.reason}</td>
                  </tr>
                )}
                {res.status === "Approved" && (
                  <>
                    <tr>
                      <td className="border px-4 py-2 font-bold">
                        Concerned Officer
                      </td>
                      <td className="border px-4 py-2">T.Ramesh</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-bold">
                        Subsidy Information
                      </td>
                      <td className="border px-4 py-2">
                        {res.income === 0
                          ? `50%`
                          : res.income > 0 && res.income <= 25000
                          ? `40%`
                          : res.income > 25000 && res.income <= 50000
                          ? `30%`
                          : res.income > 50000 && res.income <= 75000
                          ? `20%`
                          : res.income > 75000 && res.income <= 100000
                          ? `10%`
                          : "Not eligible"}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
