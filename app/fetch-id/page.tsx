"use client";

import { useState } from "react";
import RouteAccordion from "@/components/RouteAccordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function FetchIdPage() {
  const [inputId, setInputId] = useState("");
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRouteById = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://tsm-vrp-004d6e48b070.herokuapp.com/api/routes/${inputId}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setRoute(data[0]); // Assuming API returns an array of routes
      } else {
        setRoute(null);
      }
    } catch (error) {
      console.error("Failed to fetch route:", error);
      setRoute(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Find Deals</h2>
      <div className="flex space-x-2 mb-8">
        <Input
          type="text"
          placeholder="Enter Deal ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="w-64 h-12"
        />
        <Button onClick={fetchRouteById} disabled={loading || !inputId} variant={"default"} className="w-40 h-12 text-xl">
          {loading ? "Loading..." : "Fetch Route"}
        </Button>
      </div>

      <div className="flex w-full max-w-6xl">
        {/* Accordion section */}
        <div className="flex-1">
          {route ? (
            <RouteAccordion route={route} highlightID={inputId} />
          ) : (
            <p className="text-gray-500">No route fetched yet.</p>
          )}
        </div>

        {/* Map section */}
        <div className="flex-1 ml-6 border rounded-md bg-gray-100 h-[500px] flex items-center justify-center">
          <p className="text-gray-500">Map placeholder (route visualization here)</p>
        </div>
      </div>
    </div>
  );
}
