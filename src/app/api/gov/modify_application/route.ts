import { NextResponse } from "next/server";
import mongoose from "mongoose";
import user from "@/app/lib/model/user";

export async function POST(req: Request) {
  await mongoose.connect(
    "mongodb+srv://dinesh:dinesh@cluster0.8drl6ek.mongodb.net/"
  );
  const { aadharNo, status, reason } = await req.json();
  const userToUpdate = await user.find({
    aadharNo: aadharNo,
    status: "pending",
  });
  if (userToUpdate) {
    userToUpdate[0].status = status;
    userToUpdate[0].reasonForDenial = reason;
    await userToUpdate[0].save();
    return NextResponse.json({ message: "User status updated successfully!" });
  } else {
    return NextResponse.json({ message: "User not found!" });
  }
}
