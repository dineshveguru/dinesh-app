import { NextResponse } from "next/server";
import mongoose from "mongoose";
import user from "@/app/lib/model/user";

export function GET(req: Request) {
  return NextResponse.json({ message: "Welcome to Apply portal!" });
}

export async function POST(req: Request) {
  const check = await mongoose.connect(
    "mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/"
  );
  const { userName, aadharNo, income } = await req.json();
  const newUser = new user({
    userName: userName,
    aadharNo: aadharNo,
    income: income,
    status: "pending",
    reasonForDenial: "",
  });
  const response = await newUser.save();
  console.log(response);
  return NextResponse.json({
    message: "New user created successfully!",
    response: response,
  });
}
