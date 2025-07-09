"use client"

import { useState } from "react"
import RouteAccordion from "@/components/RouteAccordion"

type Node = {
  address: string;
  dealname: string;
  id: string;
};

type Route = {
  total_distance: number;
  total_time: number;
  nodes: Node[];
};

export default function Page() {
  const [routes, setRoutes] = useState<Route[]>([]); 
  const [loadingAll, setLoadingAll] = useState(false); // loading state for Fetch All
  const [loadingId, setLoadingId] = useState(false);   // loading state for Fetch by ID
  const [inputId, setInputId] = useState("");

  const fetchRoutes = async () => {
    try {
      setLoadingAll(true);
      const res = await fetch("https://tsm-vrp-004d6e48b070.herokuapp.com/api/routes");
      const data = await res.json();
      console.log("Routes received from backend:", data);
      setRoutes(data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    } finally {
      setLoadingAll(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-gray-100">
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

      <div className="w-full max-w-3xl">
        {routes.map((route, idx) => (
          <RouteAccordion key={idx} route={route} highlightID={inputId} />
        ))}
      </div>
    </div>
  );
}