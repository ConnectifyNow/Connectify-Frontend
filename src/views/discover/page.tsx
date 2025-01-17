import { useEffect, useState } from "react";
import OrganizationCard from "../../components/discover/organization-card";
import VolunteerCard from "../../components/discover/volunteer-card";
import Sidebar from "../../components/discover/sidebar";
import { Organization, Volunteer } from "@/types";
import { NoPostsScreen } from "@/components/noPosts/noPosts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useOrganizationsStore from "@/stores/setOrganizationsStore";
import useVolunteersStore from "@/stores/setVolunteersStore";

const ITEMS_PER_PAGE = 3;

export default function Directory() {
  const [filters, setFilters] = useState({
    mode: "organizations" as "organizations" | "volunteers",
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const organizations = useOrganizationsStore((state) => state.organizations);
  const organizationPages = useOrganizationsStore((state) => state.pages);
  const fetchOrganizations = useOrganizationsStore(
    (state) => state.fetchOrganizations
  );

  const volunteers = useVolunteersStore((state) => state.volunteers);
  const volunteerPages = useVolunteersStore((state) => state.pages);
  const fetchVolunteers = useVolunteersStore((state) => state.fetchVolunteers);

  useEffect(() => {
    if (filters.mode === "organizations") {
      fetchOrganizations(currentPage, ITEMS_PER_PAGE);
    } else {
      fetchVolunteers(currentPage, ITEMS_PER_PAGE);
    }
  }, [currentPage, filters]);

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

  const currentPages =
    filters.mode === "organizations" ? organizationPages : volunteerPages;

  return (
    <main className="min-h-screen bg-blue-50 py-12">
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
              {currentItems?.map((item: Volunteer | Organization) =>
                filters.mode === "organizations" ? (
                  <OrganizationCard
                    key={item.userId}
                    organization={item as Organization}
                    userId={item.userId}
                  />
                ) : (
                  <VolunteerCard
                    key={item.userId}
                    volunteer={item as Volunteer}
                    userId={item.userId}
                  />
                )
              )}
            </div>
            {currentItems.length > 0 ? (
              <div
                className="mt-8 flex justify-center"
                style={{ cursor: "pointer" }}>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={currentPage === 1 ? "disabled" : ""}
                      />
                    </PaginationItem>
                    {[...Array(currentPages)]?.map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, currentPages)
                          )
                        }
                        className={
                          currentPage === currentPages ? "disabled" : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
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
