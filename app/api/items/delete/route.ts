import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* DELETE  */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = parseInt((session?.user as { id: string }).id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { lists: true },
    });
    const listId = user?.lists[0]?.id!;
    const { itemId } = await req.json();

    const item = await prisma.item.findFirst({
      where: {
        id: parseInt(itemId),
        listId: listId,
      },
    });

    if (!item) {
      throw new Error("Item not found or unauthorized");
    }

    await prisma.item.delete({
      where: { id: parseInt(itemId) },
    });

    return NextResponse.json({
      message: "Item deleted successfully",
    });
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
