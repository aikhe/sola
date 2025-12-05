import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ApiResponse, User } from "@/lib/types";

interface SignUpInput {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignUpInput = await request.json();

    // Validate input
    if (!body.email?.trim()) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!body.password || body.password.length < 6) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Create user (storing password as plain text for simplicity - NOT for production!)
    const { data, error } = await supabase
      .from("users")
      .insert({
        email: body.email.toLowerCase().trim(),
        password: body.password, // In production, hash this!
        role: "consumer",
        created_at: now,
        updated_at: now,
      })
      .select("id, email, role, created_at, updated_at")
      .single();

    if (error) {
      console.error("Supabase error:", error);

      if (error.code === "23505") {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<User>>(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
