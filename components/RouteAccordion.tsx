"use client";

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

  const depotName = route.nodes[0]?.address || "Depot:";

  const containsDeal = highlightID
    ? route.nodes.some((node) => node.id === highlightID)
    : false;

  const nodesByDealId: Record<string, Node[]> = {};
  for (const node of route.nodes) {
    if (!nodesByDealId[node.id]) nodesByDealId[node.id] = [];
    nodesByDealId[node.id].push(node);
  }

  const dealEntries = Object.entries(nodesByDealId);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-6xl mx-auto mb-5 border rounded-lg shadow bg-white px-6 py-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between px-4 py-3">
          <div className="flex flex-col text-left">
            <span className="text-lg font-medium text-gray-800">
              Depot: {depotName} ({dealEntries.length} Deals)
            </span>
            <span>
              <strong>Total Distance:</strong> {route.total_distance} km |{" "}
              <strong>Total Time:</strong>{" "}
              {Math.floor(route.total_time / 60 / 10)} Days{" "}
              {Math.ceil((route.total_time / 60) % 10)} hours
            </span>
          </div>
          {containsDeal && (
            <span className="ml-auto px-2 py-0.5 text-green-700 bg-green-100 rounded-full text-xs font-semibold whitespace-nowrap">
              ✅
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent className="bg-gray-50 px-4 py-3 rounded-b-md">
          <Accordion type="multiple" className="space-y-2">
            {route.nodes.map((node, idx) => {
              const isDepotStart = idx === 0;
              const isDepotEnd = idx === route.nodes.length - 1;

              if (isDepotEnd || isDepotStart) return null;

              const color =
                isDepotStart || isDepotEnd
                  ? "bg-gray-200 text-gray-700"
                  : getColorForId(node.id);

              const dealLabel = isDepotStart
                ? "Depot Start"
                : isDepotEnd
                ? "Depot End"
                : node.type;

              const badge = isDepotStart
                ? "1"
                : isDepotEnd
                ? "2"
                : node.type === "Pickup"
                ? "P"
                : "D";

              return (
                <AccordionItem
                  key={`${node.id}-${idx}`}
                  value={`${node.id}-${idx}`}
                >
                  <AccordionTrigger className="flex justify-between items-center gap-2 text-left w-full">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}
                      >
                        {badge}
                      </span>
                      <span className="text-sm font-medium">
                        {node.dealname || "Depot"}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pl-6 text-sm text-gray-700">
                    <p className="mb-1">
                      <span className="font-semibold">Address:</span>{" "}
                      {isDepotStart || isDepotEnd
                        ? formatDepotAddress(node.address)
                        : node.address}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Deal ID:</span> {node.id}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Type:</span> {dealLabel}
                    </p>
                    <a
                      href={`https://app.hubspot.com/contacts/3349305/record/0-3/${node.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Go to Deal ↗
                    </a>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
