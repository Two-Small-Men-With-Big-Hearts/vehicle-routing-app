"use client";

import { useState } from "react";
import RouteAccordion from "@/components/RouteAccordion";

type Node = {
  address: string;
  dealname: string;
  id: string;
  type: "Pickup" | "Dropoff";
};

type Route = {
  total_distance: number;
  total_time: number;
  nodes: Node[];
};

export default function ClientRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [inputId, setInputId] = useState("");

  const fetchRoutes = async () => {
    try {
      setLoadingAll(true);
      const res = await fetch(
        "https://tsm-vrp-004d6e48b070.herokuapp.com/api/routes"
      );
      const data: Route[] = await res.json();

      // Sort by number of unique dealnames descending
      const sorted = data.sort((a, b) => {
        const uniqueA = new Set(a.nodes.map((n) => n.dealname)).size;
        const uniqueB = new Set(b.nodes.map((n) => n.dealname)).size;
        return uniqueB - uniqueA;
      });

      setRoutes(sorted);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    } finally {
      setLoadingAll(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={fetchRoutes}
          disabled={loadingAll}
          className="px-6 py-3 bg-black text-white rounded-md text-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loadingAll ? "Loading..." : "Fetch All"}
        </button>

        <input
          type="text"
          placeholder="Search For Deal"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="w-full max-w-5xl">
        {routes.map((route, idx) => (
          <RouteAccordion key={idx} route={route} highlightID={inputId} />
        ))}
      </div>
    </>
  );
}
