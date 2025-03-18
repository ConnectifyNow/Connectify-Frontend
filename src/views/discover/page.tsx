import OrganizationProfileDialog from "@/components/discover/organization-profile-dialog";
import VolunteerProfileDialog from "@/components/discover/volunteer-profile-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import useChatStore from "@/stores/setChatStore";
import useOrganizationsStore from "@/stores/setOrganizationsStore";
import useVolunteersStore from "@/stores/setVolunteersStore";
import { Organization, Volunteer } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationCard from "../../components/discover/organization-card";
import Sidebar from "../../components/discover/sidebar";
import VolunteerCard from "../../components/discover/volunteer-card";
import { NoUsersScreen } from "@/components/emptyState/noUser";

const ITEMS_PER_PAGE = 3;

export default function Directory() {
  const [filters, setFilters] = useState({
    mode: "organizations" as "organizations" | "volunteers",
    searchTerm: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
    null
  );
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const organizations = useOrganizationsStore((state) => state.organizations);
  const organizationPages = useOrganizationsStore((state) => state.pages);
  const fetchOrganizations = useOrganizationsStore(
    (state) => state.fetchOrganizations
  );

  const volunteers = useVolunteersStore((state) => state.volunteers);
  const volunteerPages = useVolunteersStore((state) => state.pages);
  const fetchVolunteers = useVolunteersStore((state) => state.fetchVolunteers);

  const addConversation = useChatStore((state) => state.addConversation);

  const navigate = useNavigate();

  const onChatClick = async (userId: string) => {
    await addConversation(userId);
    localStorage.setItem("selectedUserId", userId);
    navigate("/chat");
  };

  useEffect(() => {
    if (filters.mode === "organizations") {
      fetchOrganizations(currentPage, ITEMS_PER_PAGE, filters.searchTerm);
    } else {
      fetchVolunteers(currentPage, ITEMS_PER_PAGE, filters.searchTerm);
    }
  }, [currentPage, filters.mode, filters.searchTerm]);


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

    const onFilterChange = (filters: {
      mode: "organizations" | "volunteers";
      searchTerm: string;
    }) => {
      setCurrentPage(1); // Reset to first page when filter changes
      setFilters(filters);
    };

  return (
    <main className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Find{" "}
          {filters.mode === "organizations" ? "Organizations" : "Volunteers"}
        </h1>
        <div className="flex gap-8">
          <div className="w-1/4">
            <Sidebar onFilterChange={onFilterChange} />
          </div>
          <div className="w-3/4">
            <div className="space-y-6" style={{ cursor: "pointer" }}>
              {currentItems?.map((item: Volunteer | Organization) =>
                filters.mode === "organizations" ? (
                  <div
                    onClick={() =>
                      setSelectedOrganization(item as Organization)
                    }
                    key={item.userId}
                  >
                    <OrganizationCard
                      key={item.userId}
                      organization={item as Organization}
                      userId={item.userId}
                    />
                  </div>
                ) : (
                  <div onClick={() => setSelectedVolunteer(item as Volunteer)}>
                    <VolunteerCard
                      key={item.userId}
                      volunteer={item as Volunteer}
                      userId={item.userId}
                    />
                  </div>
                )
              )}
            </div>
            {selectedVolunteer && (
              <VolunteerProfileDialog
                onChatClick={() => onChatClick(selectedVolunteer.userId)}
                onClose={() => {
                  setSelectedVolunteer(null);
                }}
                user={selectedVolunteer}
              />
            )}
            {selectedOrganization && (
              <OrganizationProfileDialog
                onChatClick={() => onChatClick(selectedOrganization.userId)}
                onClose={() => {
                  setSelectedOrganization(null);
                }}
                user={selectedOrganization}
              />
            )}

            {currentItems.length > 0 ? (
              <div
                className="mt-8 flex justify-center"
                style={{ cursor: "pointer" }}
              >
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
                          onClick={() => setCurrentPage(index + 1)}
                        >
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
              <NoUsersScreen role={"Organizations"} />
            ) : (
              <NoUsersScreen role={"Volunteers"} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
