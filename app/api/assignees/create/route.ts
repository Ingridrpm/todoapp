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
    const { name } = await req.json()

    const assignee = await prisma.assignee.create({
        data: {
          name,
          listId,
        },
      });
console.log("assgnee:, ", listId, name)
    return NextResponse.json({
      assignee: {
        name: name
      }
    })
  } catch (err: any) {
    console.log("ERROR create assignee: ",err)
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