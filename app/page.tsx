"use client";

import { useState } from "react";

interface Node {
  address: string;
  dealname: string;
  id: string;
}

interface Route {
  total_distance: number;
  total_time: number;
  nodes: Node[];
}

export default function Home() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://tsm-vrp-004d6e48b070.herokuapp.com/api/routes");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Route[] = await res.json();
      setRoutes(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch routes from backend.");
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>VRP Route Viewer</h1>
      <button
        onClick={fetchRoutes}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        {loading ? "Fetching..." : "Fetch Routes"}
      </button>

      {routes.length > 0 && (
        <div>
          <h2>Routes</h2>
          {routes.map((route, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Total Distance:</strong> {route.total_distance} km
              </p>
              <p>
                <strong>Total Time:</strong> {route.total_time} minutes
              </p>
              <ul>
                {route.nodes.map((node, nodeIdx) => (
                  <li key={nodeIdx}>
                    {node.address} — {node.dealname} (ID: {node.id})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
