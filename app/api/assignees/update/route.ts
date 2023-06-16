import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

/* UPDATE */
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = parseInt((session?.user as { id: string }).id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { lists: true },
    });
    const listId = user?.lists[0]?.id!;
    const { assigneeId, name } = await req.json();

    const updatedAssignee = await prisma.assignee.updateMany({
      where: {
        id: assigneeId,
        listId: listId,
      },
      data: {
        name: name,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, assignee: updatedAssignee }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
