import { NextResponse } from "next/server";
import mongoose from "mongoose";
import user from "@/app/lib/model/user";

export async function GET(req: Request) {
  const check = await mongoose.connect(
    "mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/"
  );
  try {
    const response = await user.find({ status: "pending" });
    return NextResponse.json(
      {
        response: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 400 }
    );
  }
}
