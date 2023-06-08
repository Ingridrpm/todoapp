import ItemTable from "@/components/item-table";
import { LoginButton, LogoutButton } from "./auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddItem from "@/components/add-item";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="prose dark:prose-invert">
      <AddItem />
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <ItemTable />
    </div>
  );
}
