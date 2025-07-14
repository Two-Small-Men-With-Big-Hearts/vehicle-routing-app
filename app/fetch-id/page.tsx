import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import FetchIdClient from "@/components/FetchIdRoute";

export default async function FetchIdPage() {
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
    <div className="flex flex-col items-center w-full mt-20">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Find Deals</h2>
      <FetchIdClient />
    </div>
  );
}
