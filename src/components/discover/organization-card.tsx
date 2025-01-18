import { Organization, tagType, User } from "@/types";
import GeneralCard from "../shared/generic-card";

export default function OrganizationCard({
  organization,
  userId,
}: {
  organization: Organization;
  userId: User["_id"];
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
      imageUrl={organization.imageUrl}
      description={organization.description}
      tags={tags}
      linkText="Visit Website"
      linkUrl={organization.websiteLink}
      userId={userId}
    />
  );
}
