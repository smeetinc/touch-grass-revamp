import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Clique from "@/models/Clique";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { error: "Clique ID is required" },
      { status: 400 }
    );
  }

  const clique = await Clique.findById(id);
  if (!clique) {
    return NextResponse.json({ error: "Clique not found" }, { status: 404 });
  }

  return NextResponse.json({ clique });
}
