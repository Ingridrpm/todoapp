import ItemTable from "@/components/item-table";
import { LoginButton, LogoutButton } from "./auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddItem from "@/components/add-item";
import ToDoPanel from "@/components/todo-pane";
import prisma from "@/lib/prisma";
import { Task } from "../components/todo-pane";
import { List } from "@prisma/client";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userId = parseInt((session.user as { id: string }).id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { lists: { include: { items: true } } },
  });

  const items = user?.lists[0]?.items || [];
  interface Item {
    id: number;
    title: string;
    description?: string | null;
    assignee: string;
    dueDateTime: Date;
    status: number;
    listId: number;
    list: List;
  }

  const tasks: Task[] = [];
  items.map((item) => {
    tasks.push({
      id: item.id + "",
      title: item.title,
      description: item.description ?? "",
      assignee: item.assignee,
      dueDateTime: item.dueDateTime + "",
      column:
        item.status == 1 ? "todo" : item.status == 2 ? "inProcess" : "done",
    });
  });

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <AddItem />
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <ItemTable />
      <ToDoPanel items={tasks} />
    </div>
  );
}
