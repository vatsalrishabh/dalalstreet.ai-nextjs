import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

type QueryPanelProps = {
  queryBuilderQuery: string;
  setQueryBuilderQuery: (query: string) => void;
  setActivePanel: (panel: string | null) => void;
  theme: {
    textMuted: string;
    text: string;
    accent: string;
    border: string;
  };
};

const QueryPanel: React.FC<QueryPanelProps> = ({
  queryBuilderQuery,
  setQueryBuilderQuery,
  setActivePanel,
  theme,
}) => {
  const [lastQuery, setLastQuery] = useState<string | null>(null);

 useEffect(() => {
  const latestQuery = localStorage.getItem("lastQuery");
  if (latestQuery) {
    setQueryBuilderQuery(latestQuery);
    setLastQuery(latestQuery);
  }
}, []);


  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-lg font-medium">Query Builder</h2>
        <button
          onClick={() => setActivePanel(null)}
          className={`${theme.textMuted} hover:${theme.text} transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            Query Builder
          </label>
          <textarea
            value={queryBuilderQuery}
            onChange={(e) => {
              setQueryBuilderQuery(e.target.value);
              localStorage.setItem("lastQuery", e.target.value); // optionally save on change
            }}
            className={`w-full h-48 p-4 ${theme.accent} ${theme.border} border rounded-xl text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
            placeholder="Enter your query..."
          />
        </div>
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
          Run Query
        </button>
      </div>
    </div>
  );
};

export default QueryPanel;
