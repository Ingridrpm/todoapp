import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TabsElement from "@/components/tabs-elemet";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <TabsElement userName={session.user?.name || ""} />
    </div>
  );
}
