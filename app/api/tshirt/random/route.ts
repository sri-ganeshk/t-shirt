import { connectDB } from "@/lib/db";
import { TshirtRegistration } from "@/models/TshirtRegistration";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const results = await TshirtRegistration.aggregate([{ $sample: { size: 1 } }]);
    const user = results[0] ?? null;

    if (!user) {
      return NextResponse.json({ error: "No registrations found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      rollNumber: user.rollNumber,
      tshirtSize: user.tshirtSize,
    });
  } catch (error) {
    console.error("Random user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
