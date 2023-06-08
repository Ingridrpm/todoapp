import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json()
    const hashed = await hash(password, 12)
    const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password:hashed
        },
      });

      // Create a list associated with the user
      await prisma.list.create({
        data: {
          title: "primary",
          userId: user.id,
        },
      });

    return NextResponse.json({
      user: {
        email: user.email
      }
    })
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