import { Organization } from "@/types";
import { tagType } from "@/types";
import GeneralCard from "../shared/generic-card";

export default function OrganizationCard({
  organization,
}: {
  organization: Organization;
}) {
  const tags = organization.focusAreas?.map((area) => ({
    type: tagType.focusArea,
    text: area,
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  }));

  return (
    <GeneralCard
      name={organization.name}
      imageUrl={`${import.meta.env.VITE_REACT_APP_API_URL}/${
        organization.imageUrl
      }`}
      description={organization.description}
      tags={tags}
      linkText="Visit Website"
      linkUrl={organization.websiteLink}
    />
  );
}
