"use client";
// testing deploy
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
};

type Route = {
  total_distance: number;
  total_time: number;
  nodes: Node[];
};

export default function RouteAccordion({ route, highlightID }: { route: Route; highlightID?: string }) {
  const uniqueDealNames = Array.from(new Set(route.nodes.map(n => n.dealname).filter(Boolean)));
  const numDeals = uniqueDealNames.length;

  let displayDealNames = uniqueDealNames.slice(0, 3).join(", ");
  if (uniqueDealNames.length > 3) {
    displayDealNames += ", ...";
  }

  const depotName = route.nodes[0]?.address || "Depot:";

    const containsDeal = highlightID
    ? route.nodes.some(node => node.id === highlightID)
    : false;

  return (
    <Accordion type="single" collapsible className="w-full max-w-3x1 mx-auto mb-4 border rounded-md shadow-sm bg-white">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between px-4 py-3">
          <div className="flex flex-col text-left">
            <span className="text-base font-medium text-gray-800">Depot: {depotName} | Deal Matchup ({numDeals} deals)</span>
            <span className="text-sm text-gray-600">Deals: {displayDealNames}</span>
          </div>
          {containsDeal && (
            <span className="ml-2 px-2 py-0.5 text-green-700 bg-green-100 rounded-full text-xs font-semibold whitespace-nowrap">
              Contains ID ✅
            </span>

          )}
        </AccordionTrigger>
        <AccordionContent className="bg-gray-50 px-4 py-3 rounded-b-md">
          <p className="text-gray-700"><strong>Total Distance:</strong> {route.total_distance} km</p>
          <p className="text-gray-700"><strong>Total Time:</strong> {Math.floor(route.total_time/60/10)} Days {(Math.ceil(route.total_time/60%10))} hours</p>
          <h5 className="mt-2 mb-1 font-semibold text-gray-800">Stops:</h5>
          <ul className="list-disc list-inside text-gray-700">
            {route.nodes.map((node, idx) => (
              <li key={idx}>
                <strong>{node.dealname || "Depot"}</strong> — {node.address} (ID: {node.id})
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
