import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pb-120">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        You do not have permission to view this page. Please sign in with an
        authorized account via HubSpot, or a domain ending in
        "@twosmallmen.com".
      </p>
      <SignOutButton>
        <button className="bg-black text-white text-lg px-6 py-3 rounded-md hover:bg-gray-800 transition">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}
