"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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

const formatDepotAddress = (fullAddress: string): string => {
  // Extract last 3 segments: "City", "Province", "Postal"
  const parts = fullAddress.split(",").map((s) => s.trim());
  const len = parts.length;
  if (len < 3) return fullAddress;
  return parts.slice(len - 3).join(", ");
};

// Generate a color from a string (hash-based)
const availableColors = [
  "bg-red-100 text-red-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
];

const idColorMap = new Map<string, string>();
let nextColorIndex = 0;

const getColorForId = (id: string) => {
  if (!idColorMap.has(id)) {
    const color = availableColors[nextColorIndex % availableColors.length];
    idColorMap.set(id, color);
    nextColorIndex++;
  }
  return idColorMap.get(id)!;
};

export default function RouteAccordion({
  route,
  highlightID,
}: {
  route: Route;
  highlightID?: string;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const uniqueDealNames = Array.from(
    new Set(route.nodes.map((n) => n.dealname).filter(Boolean))
  );
  const numDeals = uniqueDealNames.length;

  let displayDealNames = uniqueDealNames.slice(0, 3).join(", ");
  if (uniqueDealNames.length > 3) {
    displayDealNames += ", ...";
  }

  const depotName = route.nodes[0]?.address
    ? formatDepotAddress(route.nodes[0].address)
    : "Depot:";

  const containsDeal = highlightID
    ? route.nodes.some((node) => node.id === highlightID)
    : false;

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-3xl mx-auto mb-4 border rounded-md shadow-sm bg-white"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between px-4 py-3">
          <div className="flex flex-col text-left">
            <span className="text-lg font-medium text-gray-800">
              Depot: {depotName} ({numDeals} Deals)
            </span>
            <span>
              <strong>Total Distance:</strong> {route.total_distance} km |{" "}
              <strong>Total Time:</strong>{" "}
              {Math.floor(route.total_time / 60 / 10)} Days{" "}
              {Math.ceil((route.total_time / 60) % 10)} hours
            </span>
          </div>
          {containsDeal && (
            <span className="ml-2 px-2 py-0.5 text-green-700 bg-green-100 rounded-full text-xs font-semibold whitespace-nowrap">
              Contains ID ✅
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent className="bg-gray-50 px-4 py-3 rounded-b-md">
          <p className="text-gray-700">
            <strong>Total Distance:</strong> {route.total_distance} km
          </p>
          <p className="text-gray-700">
            <strong>Total Time:</strong>{" "}
            {Math.floor(route.total_time / 60 / 10)} Days{" "}
            {Math.ceil((route.total_time / 60) % 10)} hours
          </p>

          <h5 className="mt-2 mb-1 font-semibold text-gray-800">Stops:</h5>
          <ul className="list-disc list-inside text-gray-700">
            {route.nodes.map((node, idx) => {
              const isDepotStart = idx === 0;
              const isDepotEnd = idx === route.nodes.length - 1;

              return (
                <li key={idx} className="flex items-start gap-2">
                  {/* Badge */}
                  <span
                    className={`text-xs font-medium px-3 py-0.5 rounded-full mt-1 ${
                      isDepotStart || isDepotEnd 
                        ? "bg-gray-200 text-gray-700"
                        : getColorForId(node.id)
                    }`}
                  >
                    {isDepotStart ? "" : isDepotEnd ? "" : node.type === "Pickup" ? "P" : "D"}
                  </span>

                  {/* Deal info */}
                  <div>
                    <strong>{node.dealname || "Depot"}</strong>
                    {showDetails && (
                      <span className="block text-sm text-gray-500">
                        {isDepotStart || isDepotEnd
                          ? formatDepotAddress(node.address)
                          : node.address}{""}
                        (ID: {node.id})
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-3 text-sm text-blue-600 hover:underline focus:outline-none"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
