import { useState, useEffect } from "react";
import { searchResources } from "./resourceService";

export default function SidePanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim()) {
        const res = await searchResources(query);
        setResults(res);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const onDragStart = (e, resource) => {
    e.dataTransfer.setData("aac-token", JSON.stringify(resource));
  };

  return (
    <div className="side-panel">
      <input
        className="search-box"
        placeholder="Search images or audio..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="resource-list">
        {results.map(r => (
          <div
            key={r.id}
            className="token"
            draggable
            onDragStart={e => onDragStart(e, r)}
          >
            {r.type === "image" ? "🖼" : "🔊"} {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}
