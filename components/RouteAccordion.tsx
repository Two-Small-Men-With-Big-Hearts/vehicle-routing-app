"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

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

export default function RouteAccordion({ route }: { route: Route }) {
  const uniqueDealNames = Array.from(new Set(route.nodes.map(n => n.dealname).filter(Boolean)));
  const numDeals = uniqueDealNames.length;

  let displayDealNames = uniqueDealNames.slice(0, 3).join(", ");
  if (uniqueDealNames.length > 3) {
    displayDealNames += ", ...";
  }

  const depotName = route.nodes[0]?.address || "Depot:";

  return (
    <Accordion type="single" collapsible className="w-full max-w-3x1 mx-auto mb-4 border rounded-md shadow-sm bg-white">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between px-4 py-3">
          <div className="flex flex-col text-left">
            <span className="text-base font-medium text-gray-800">Depot: {depotName} | Deal Matchup ({numDeals} deals)</span>
            <span className="text-sm text-gray-600">Deals: {displayDealNames}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-gray-50 px-4 py-3 rounded-b-md">
          <p className="text-gray-700"><strong>Depot:</strong> {depotName}</p>
          <p className="text-gray-700"><strong>Total Distance:</strong> {route.total_distance} km</p>
          <p className="text-gray-700"><strong>Total Time:</strong> {route.total_time} minutes</p>
          <h5 className="mt-2 mb-1 font-semibold text-gray-800">Stops:</h5>
          <ul className="list-disc list-inside text-gray-700">
            {route.nodes.map((node, idx) => (
              <li key={idx}>
                <strong>{node.dealname || "No Deal Name"}</strong> — {node.address} (ID: {node.id})
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
