import { NextResponse } from "next/server";
import mongoose from "mongoose";
import user from "@/app/lib/model/user";

export function GET(req: Request) {
  return NextResponse.json({ message: "Welcome to check status portal!" });
}

export async function POST(req: Request) {
  const check = await mongoose.connect(
    "mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/"
  );
  const { aadharNo } = await req.json();
  const response = await user.find({ aadharNo: aadharNo });
  return NextResponse.json({
    response: response,
  });
}
