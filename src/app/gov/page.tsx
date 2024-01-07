"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Types, set } from "mongoose";

interface User {
  userName: string;
  aadharNo: number;
  income: number;
  status: string;
  _id: Types.ObjectId;
  reasonForDenial: string;
}

const Applications = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState("");
  const [aadharNo, setAadharNo] = useState(0);
  async function getData() {
    try {
      const res = await axios.get("http://localhost:3000/api/gov/applications");
      setData(res.data.response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  function approveHandler(aadharNo: number) {
    axios
      .post("http://localhost:3000/api/gov/modify_application", {
        aadharNo,
        status: "Approved",
        reason: "",
      })
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => console.log(err));
  }
  function clickReject(aadharNo: number) {
    setAadharNo(aadharNo);
    setShowPopup(true);
  }
  function rejectHandler(aadharNo: number, reason: string) {
    axios
      .post("http://localhost:3000/api/gov/modify_application", {
        aadharNo,
        status: "Rejected",
        reason: reason,
      })
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="navbar bg-base-300 fixed top-0">
        <h1 className="font-bold">Pradhan Mantri Ujjwala Yojana (PMUY) </h1>
      </div>
      <div className="flex pt-16 w-full h-max justify-center">
        {data.length > 0 ? (
          <div className="flex pt-16 w-full h-max justify-center gap-10 flex-wrap">
            {data.map((item: User, i) => {
              return (
                <div
                  className="px-5 py-10 bg-gray-100 rounded-md border-solid border-2 border-gray-300 w-96"
                  key={i}
                >
                  <p>
                    <strong>Name</strong>: {item.userName}
                  </p>
                  <p>
                    <strong>Aadhar Number</strong>: {item.aadharNo}
                  </p>
                  <p>
                    <strong>Income</strong>: {item.income}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button
                      className="btn btn-success"
                      onClick={() => approveHandler(item.aadharNo)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => clickReject(item.aadharNo)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
            {showPopup && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-md p-5">
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold">Reason for Rejection</h1>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="btn btn-error"
                    >
                      X
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-indigo-600"
                        value="Aadhar number not valid"
                        checked={reason === "Aadhar number not valid"}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <span className="ml-2">Aadhar number not valid</span>
                    </label>
                    <br />
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-indigo-600"
                        value="Income is greater than 1 lakh"
                        checked={reason === "Income is greater than 1 lakh"}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <span className="ml-2">
                        Income is greater than 1 lakh
                      </span>
                    </label>
                  </div>
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => {
                      rejectHandler(aadharNo, reason);
                      setShowPopup(false);
                      setAadharNo(0);
                      setReason("");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          "No applications found"
        )}
      </div>
    </div>
  );
};

export default Applications;
