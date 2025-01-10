import { useState } from "react";
import { organizations, volunteers } from "../../data/directory";
import OrganizationCard from "../../components/discover/organization-card";
import VolunteerCard from "../../components/discover/volunteer-card";
import Sidebar from "../../components/discover/sidebar";

export default function Directory() {
  const [filters, setFilters] = useState({
    mode: "organizations" as "organizations" | "volunteers",
    searchTerm: ""
  });

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const name = `${volunteer.firstName} ${volunteer.lastName}`;

    return name.toLowerCase().includes(filters.searchTerm.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Find{" "}
          {filters.mode === "organizations" ? "Organizations" : "Volunteers"}
        </h1>
        <div className="flex gap-8">
          <div className="w-1/4">
            <Sidebar onFilterChange={setFilters} />
          </div>
          <div className="w-3/4">
            <div className="space-y-6">
              {filters.mode === "organizations"
                ? filteredOrganizations.map((organization) => (
                    <OrganizationCard
                      key={organization.id}
                      organization={organization}
                    />
                  ))
                : filteredVolunteers.map((volunteer) => (
                    <VolunteerCard
                      key={volunteer.userId}
                      volunteer={volunteer}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
