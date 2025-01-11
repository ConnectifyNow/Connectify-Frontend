import { useState } from "react";
import { organizations, volunteers } from "../../data/directory";
import OrganizationCard from "../../components/discover/organization-card";
import VolunteerCard from "../../components/discover/volunteer-card";
import Sidebar from "../../components/discover/sidebar";
import { Pagination } from "@/components/ui/pagination";
import { Organization, Volunteer } from "@/types";
import { NoPostsScreen } from "@/components/noPosts/noPosts";

const ITEMS_PER_PAGE = 3;

export default function Directory() {
  const [filters, setFilters] = useState({
    mode: "organizations" as "organizations" | "volunteers",
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const name = `${volunteer.firstName} ${volunteer.lastName}`;
    return name.toLowerCase().includes(filters.searchTerm.toLowerCase());
  });

  const currentItems =
    filters.mode === "organizations"
      ? filteredOrganizations
      : filteredVolunteers;

  const totalPages = Math.ceil(currentItems.length / ITEMS_PER_PAGE);
  const paginatedItems = currentItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Find
          {filters.mode === "organizations" ? "Organizations" : "Volunteers"}
        </h1>
        <div className="flex gap-8">
          <div className="w-1/4">
            <Sidebar onFilterChange={setFilters} />
          </div>
          <div className="w-3/4">
            <div className="space-y-6">
              {paginatedItems.map((item: any) =>
                filters.mode === "organizations" ? (
                  <OrganizationCard
                    key={(item as Organization).id}
                    organization={item as Organization}
                  />
                ) : (
                  <VolunteerCard
                    key={(item as Volunteer).userId}
                    volunteer={item as Volunteer}
                  />
                )
              )}
            </div>
            {paginatedItems.length > 0 ? (
              <div
                className="mt-8 flex justify-center"
                style={{ cursor: "pointer" }}
              >
                <Pagination>
                  <Pagination.Content>
                    <Pagination.Item>
                      <Pagination.Previous
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={currentPage === 1 ? "disabled" : ""}
                      />
                    </Pagination.Item>
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item key={index}>
                        <Pagination.Link
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Link>
                      </Pagination.Item>
                    ))}
                    <Pagination.Item>
                      <Pagination.Next
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        className={currentPage === totalPages ? "disabled" : ""}
                      />
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </div>
            ) : filters.mode === "organizations" ? (
              <NoPostsScreen role={"organizations"} />
            ) : (
              <NoPostsScreen role={"volunteers"} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
