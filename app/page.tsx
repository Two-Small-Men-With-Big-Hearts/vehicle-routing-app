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
  const [loading, setLoading] = useState(false);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://tsm-vrp-004d6e48b070.herokuapp.com/api/routes"); // 👈 Replace with your actual Heroku URL
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 bg-gray-100">
      <button
        onClick={fetchRoutes}
        disabled={loading}
        className="mb-6 px-6 py-3 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Fetch"}
      </button>

      <div className="w-full max-w-3xl">
        {routes.map((route, idx) => (
          <RouteAccordion key={idx} route={route} />
        ))}
      </div>
    </div>
  );
}
