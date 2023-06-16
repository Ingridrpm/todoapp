import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* UPDATE */
export async function PUT(req: Request) {
  try {
    const { itemId, newTitle, newDescription, newAssignee, newDueDate } =
      await req.json();
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(itemId) },
      data: {
        title: newTitle,
        description: newDescription,
        assignee: parseInt(newAssignee),
        dueDateTime: new Date(newDueDate),
      },
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
