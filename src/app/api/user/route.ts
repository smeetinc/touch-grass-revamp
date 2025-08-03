import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { walletAddress, email } = await req.json();

  if (!walletAddress || !email) {
    return NextResponse.json(
      { error: "Missing wallet or email" },
      { status: 400 }
    );
  }

  let user = await User.findOne({ walletAddress });
  if (!user) {
    user = await User.create({
      walletAddress,
      email,
      joinedAt: new Date(),
    });
  }

  return NextResponse.json({ user });
}
