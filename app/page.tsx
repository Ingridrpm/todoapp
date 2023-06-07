import ItemTable from "@/components/item-table";
import { LoginButton, LogoutButton } from "./auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="prose dark:prose-invert">
      <h1>Hola</h1>
      <h2>
        <b>ADIÓS</b>
      </h2>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <ItemTable />
    </div>
  );
}
