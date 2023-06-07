import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password
    }
  })
  console.log({ user })
  crearListas(user)
}

async function crearListas(user: { id: any; firstName?: string; lastName?: string; password?: string; email?: string }) {
  try {
    const deleteResult = await prisma.list.deleteMany();
    console.log('Table emptied. Rows deleted:', deleteResult.count);
    const newList = await prisma.list.create({
      data: {
        title: 'primary',
        userId: user.id
      },
      include: {
        user: true
      }
    });
    console.log('Data inserted:', newList);
  } catch (error) {
    console.error('Error emptying table or inserting list:', error);
  } finally {
    await prisma.$disconnect();
  }
}


main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

