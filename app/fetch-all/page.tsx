import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import ClientRoutes from "@/components/FetchAllRoutes";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  if (!email || !email.endsWith("@twosmallmen.com")) {
    redirect("/unauthorized");
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-gray-100 mt-20">
      <ClientRoutes />
    </div>
  );
}
