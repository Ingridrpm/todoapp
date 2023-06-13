import ItemTable from "@/components/item-table";
import { LoginButton, LogoutButton } from "./auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddItem from "@/components/add-item";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "@/components/column";
import ToDoPanel from "@/components/todo-pane";
import prisma from "@/lib/prisma";
import { List } from "@prisma/client";
import AddAssignee from "@/components/add-assignee";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <AddAssignee />
      {"   "}
      <AddItem userName={session.user?.name || ""} />
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <ItemTable />
      <ToDoPanel />
    </div>
  );
}
