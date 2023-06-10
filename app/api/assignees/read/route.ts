import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route';



/* READ */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = parseInt((session?.user as { id: string }).id);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { lists: { include: { Assignee: true } } },
      });
    
    const assignees = user?.lists[0]?.Assignee || [];
    return NextResponse.json(assignees)
  } catch (err: any) {
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


