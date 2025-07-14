import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import FetchIdClient from "@/components/FetchIdRoute";

export default async function FetchIdPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center w-full mt-20">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Find Deals</h2>
      <FetchIdClient />
    </div>
  );
}
