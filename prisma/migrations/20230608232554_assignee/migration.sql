/*
  Warnings:

  - Changed the type of `assignee` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "assignee",
ADD COLUMN     "assignee" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Assignee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "listId" INTEGER NOT NULL,

    CONSTRAINT "Assignee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignee" ADD CONSTRAINT "Assignee_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
