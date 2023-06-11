import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route';

/* CREATE */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = parseInt((session?.user as { id: string }).id);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { lists: true  },
      });
    const listId = user?.lists[0]?.id!
    const { title, description, assignee, dueDateTime } = await req.json()

    const item = await prisma.item.create({
        data: {
          title,
          description,
          assignee,
          listId,
          dueDateTime,
          status:0
        },
      });
    return NextResponse.json(item)
  } catch (err: any) {
    console.log("ERROR create item: ",err)
    return new NextResponse(
      JSON.stringify({
        error: err.message
      }),
      {
        status: 500
      }
    )
  }
}