import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

/* READ */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = parseInt((session?.user as { id: string }).id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        lists: {
          include: {
            items: { orderBy: { dueDateTime: "asc" } },
          },
        },
      },
    });

    const items = user?.lists[0]?.items || [];
    return NextResponse.json(items);
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
