import { connectDB } from "@/lib/db";
import { TshirtRegistration } from "@/models/TshirtRegistration";
import { isValidRollNumber } from "@/lib/rollNumbers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, rollNumber, tshirtSize } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!rollNumber || typeof rollNumber !== "string" || rollNumber.trim() === "") {
      return NextResponse.json(
        { error: "Roll number is required" },
        { status: 400 }
      );
    }

    if (!tshirtSize || !["S", "M", "L", "XL"].includes(tshirtSize)) {
      return NextResponse.json(
        { error: "Valid t-shirt size (S, M, L, XL) is required" },
        { status: 400 }
      );
    }

    // Validate roll number format
    if (!isValidRollNumber(rollNumber)) {
      return NextResponse.json(
        { error: "Invalid roll number" },
        { status: 400 }
      );
    }

    // Check for duplicate rollNumber
    const existing = await TshirtRegistration.findOne({
      rollNumber: rollNumber.trim(),
    });

    if (existing) {
      return NextResponse.json(
        { error: "This roll number is already registered" },
        { status: 409 }
      );
    }

    // Save registration
    const registration = new TshirtRegistration({
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      tshirtSize,
    });

    await registration.save();

    // Create response with cookie
    const response = NextResponse.json(
      {
        success: true,
        registrationId: registration._id.toString(),
      },
      { status: 201 }
    );

    // Set rk_key cookie = MongoDB ObjectId, shared across all *.2498.live subdomains
    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: "rk_key",
      value: registration._id.toString(),
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      ...(isProd ? { domain: ".2498.live" } : {}),
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
