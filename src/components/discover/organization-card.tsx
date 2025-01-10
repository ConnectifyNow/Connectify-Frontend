import { Organization } from "@/types";
import { randomAvatarUrl } from "@/utils/functions";

import GeneralCard from '../shared/generic-card'

export default function OrganizationCard({
  organization
}: {
  organization: Organization;
}) {
  const tags = organization.focusAreas.map(area => ({
    text: area,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  }))

  return (
    <GeneralCard
      id={organization.id}
      name={organization.name}
      imageUrl={organization.imageUrl ?? randomAvatarUrl()}
      description={organization.description}
      tags={tags}
      linkText="Visit Website"
      linkUrl={organization.websiteLink}
    />
  )
}
