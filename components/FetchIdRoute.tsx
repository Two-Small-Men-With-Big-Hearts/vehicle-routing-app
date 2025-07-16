"use client";

import { useState } from "react";
import RouteAccordion from "@/components/RouteAccordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function FetchIdClient() {
  const [inputId, setInputId] = useState("");
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRouteById = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://tsm-vrp-004d6e48b070.herokuapp.com/api/routes`);
      const data: Route[] = await res.json();

      const routeWithDeal = data.find((r) =>
        r.nodes.some((node) => node.id === inputId)
      );

      if (routeWithDeal) {
        setRoute(routeWithDeal);
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
    <>
      <div className="flex space-x-3 mb-8">
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

      <div className="flex w-full max-w-7xl">
        {/* Accordion section */}
        <div className="flex-1">
          {route ? (
            <RouteAccordion route={route} highlightID={inputId} />
          ) : (
            <p className="text-gray-500">No route fetched yet.</p>
          )}
        </div>

        {/* Map section */}
        <div className="flex-1 ml-3 border rounded-md bg-gray-100 h-[500px] flex items-center justify-center">
          {/* Add map fetching logic here, if we can't fetch it, then return "Error 404: Couldn't Fetch Route" */}
          <p className="text-gray-500">Map placeholder (route visualization here)</p>
        </div>
      </div>
    </>
  );
}
