import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { User, UserRole, ApiResponse } from "@/lib/types";

interface CreateUserInput {
  email: string;
  role: UserRole;
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body: CreateUserInput = await request.json();

    // Validate input
    if (!body.email?.trim()) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 }
      );
    }

    if (!body.role || !["clinician", "consumer"].includes(body.role)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Role must be 'clinician' or 'consumer'",
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const userData = {
      email: body.email.toLowerCase().trim(),
      role: body.role,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from("users")
      .insert(userData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      
      // Handle unique constraint violation
      if (error.code === "23505") {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: "A user with this email already exists",
          },
          { status: 409 }
        );
      }

      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");
    const email = searchParams.get("email");

    let query = supabase.from("users").select("*");

    if (userId) {
      query = query.eq("id", userId);
    }

    if (email) {
      query = query.eq("email", email.toLowerCase().trim());
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<User[]>>(
      {
        success: true,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
