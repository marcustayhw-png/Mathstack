import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password is not configured. Add ADMIN_PASSWORD to .env.local and restart the dev server." },
      { status: 500 }
    );
  }

  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true, token: process.env.ADMIN_PASSWORD });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
