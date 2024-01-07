import { NextResponse } from "next/server";
import mongoose from "mongoose";
import user from "@/app/lib/model/user";

export function GET(req: Request) {
  return NextResponse.json({ message: "Hello from GET" });
}

export async function POST(req: Request) {
  const check = await mongoose.connect(
    "mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/"
  );
  const { aadharNo } = await req.json();
  const duplicate_user = await user.find({
    aadharNo: aadharNo,
  });
  if (duplicate_user.length > 0) {
    return NextResponse.json({
      response: duplicate_user,
    });
  } else {
    return NextResponse.json(
      {
        message: "User does not exist!",
      },
      { status: 400 }
    );
  }
}
