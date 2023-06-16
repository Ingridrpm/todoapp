import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* UPDATE STATE */
export async function PUT(req: Request) {
  try {
    const { itemId, newStatus } = await req.json();
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(itemId) },
      data: { status: parseInt(newStatus) },
    });

    return NextResponse.json(updatedItem);
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
