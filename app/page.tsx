import { LoginButton, LogoutButton } from "./auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddItem from "@/components/add-item";
import AddAssignee from "@/components/add-assignee";
import TabsElement from "@/components/tabs-elemet";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <TabsElement userName={session.user?.name || ""} />
    </div>
  );
}
