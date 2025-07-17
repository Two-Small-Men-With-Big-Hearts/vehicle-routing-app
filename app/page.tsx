"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { fetchDealsFromBackend } from "@/components/FetchDeals";

type Deal = {
  id: string;
  dealname: string;
};

export default function LandingPage() {
  const { isSignedIn, user } = useUser();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchAndSetDeals = async () => {
      const email = user?.emailAddresses?.[0]?.emailAddress || "";
      if (!isSignedIn || !email.endsWith("@twosmallmen.com")) return;

      const data = await fetchDealsFromBackend();
      setDeals(data);
    };

    fetchAndSetDeals();
  }, [isSignedIn, user]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = deals.filter(
      (d) =>
        d.dealname?.toLowerCase().includes(term) ||
        d.id?.toLowerCase().includes(term)
    );
    setFilteredDeals(filtered);
  }, [searchTerm, deals]);

  return (
    <main className="flex flex-col items-center justify-start text-white px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 font-serif">Find a Deal</h1>

      <Input
        placeholder="Search by deal name or ID"
        className="max-w-xl w-full px-4 py-3 mb-4 rounded-lg bg-white text-black border border-black/40"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && filteredDeals.length > 0 && (
        <ul className="bg-white text-black rounded-md shadow-md max-w-xl w-full mt-2">
          {filteredDeals.map((deal) => (
            <li
              key={deal.id}
              className="p-3 hover:bg-gray-200 border-b cursor-pointer"
              onClick={() => console.log("Selected:", deal)}
            >
              <strong>{deal.dealname}</strong> – ID: {deal.id}
            </li>
          ))}
        </ul>
      )}

      {searchTerm && filteredDeals.length === 0 && (
        <p className="text-gray-800 mt-4 text-xl font-semibold">No deals found.</p>
      )}
    </main>
  );
}
