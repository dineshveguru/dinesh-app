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
  const duplicate_user = await user.find({
    aadharNo: aadharNo,
    status: "pending",
  });
  if (duplicate_user.length > 0) {
    return NextResponse.json(
      {
        message: "User already exists!",
        response: duplicate_user,
      },
      { status: 400 }
    );
  } else {
    const newUser = new user({
      userName: userName,
      aadharNo: aadharNo,
      income: income,
      status: "pending",
      reasonForDenial: "",
    });
    const response = await newUser.save();
    return NextResponse.json({
      message: "New user created successfully!",
      response: response,
    });
  }
}
