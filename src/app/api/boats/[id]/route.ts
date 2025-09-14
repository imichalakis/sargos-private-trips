import { NextRequest, NextResponse } from "next/server";
import { getAllBoats, updateBoat, deleteBoat } from "@/lib/boatsRepo";
import { getAdminKey } from "@/lib/env";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const boats = await getAllBoats();
  const boat = boats.find((b) => b.id === id);
  if (!boat) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(boat);
}

async function authorized(req: NextRequest) {
  return req.headers.get("x-admin-key") === getAdminKey();
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await authorized(req))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const patch = await req.json();
  const { id } = await params;
  const updated = await updateBoat(id, patch);
  if (!updated) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await authorized(req))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteBoat(id);
  if (!ok) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(null, { status: 204 });
}
