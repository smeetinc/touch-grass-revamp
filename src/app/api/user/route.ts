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

  // Check for existing wallet address
  let user = await User.findOne({ walletAddress });
  if (user) {
    return NextResponse.json({ user });
  }

  // Check for existing email
  const existingEmailUser = await User.findOne({ email });
  if (existingEmailUser) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  // Create new user
  user = await User.create({
    walletAddress,
    email,
    joinedAt: new Date(),
  });

  return NextResponse.json({ user });
}
