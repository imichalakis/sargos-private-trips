import { NextRequest, NextResponse } from "next/server";
import { getAllBoats, createBoat } from "@/lib/boatsRepo";
import { getAdminKey } from "@/lib/env";

export const runtime = "nodejs";

export async function GET() {
  const boats = await getAllBoats();
  return NextResponse.json(boats);
}

export async function POST(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== getAdminKey()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await req.json();
  const boat = await createBoat(data);
  return NextResponse.json(boat, { status: 201 });
}
