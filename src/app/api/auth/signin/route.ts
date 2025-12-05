import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ApiResponse, User } from "@/lib/types";

interface SignInInput {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignInInput = await request.json();

    // Validate input
    if (!body.email?.trim()) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!body.password) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    // Find user by email and password
    const { data, error } = await supabase
      .from("users")
      .select("id, email, role, created_at, updated_at")
      .eq("email", body.email.toLowerCase().trim())
      .eq("password", body.password) // In production, compare hashed passwords!
      .single();

    if (error || !data) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json<ApiResponse<User>>(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
