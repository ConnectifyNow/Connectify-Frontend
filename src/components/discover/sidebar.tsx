import { useState } from "react";
import { User, Building2 } from "lucide-react";

interface DirectorySidebarProps {
  onFilterChange: (filters: {
    mode: "organizations" | "volunteers";
    searchTerm: string;
  }) => void;
}

const filters = [
  { id: 1, name: "organizations", icon: <Building2 /> },
  { id: 2, name: "volunteers", icon: <User /> }
];
export default function DirectorySidebar({
  onFilterChange
}: DirectorySidebarProps) {
  const [mode, setMode] = useState<"organizations" | "volunteers">(
    "organizations"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleModeChange = (newMode: "organizations" | "volunteers") => {
    setMode(newMode);
    onFilterChange({ mode: newMode, searchTerm });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onFilterChange({ mode, searchTerm: event.target.value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">View Mode</h3>
        <div className="space-y-2">
          {filters?.map((filter) => (
            <label key={filter.id} className="flex items-center">
              <input
                type="radio"
                name="mode"
                value={filter.name}
                checked={mode === filter.name}
                onChange={() =>
                  handleModeChange(
                    filter.name as "organizations" | "volunteers"
                  )
                }
                className="mr-2"
              />
              {filter.icon}

              <span className="ml-2">
                {filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Search</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}
