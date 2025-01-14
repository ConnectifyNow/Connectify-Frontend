import { Volunteer } from "@/types";
import GeneralCard from "../shared/generic-card";
import { tagType } from "@/types";

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const tags = (volunteer.skills ?? []).map((skill) => ({
    type: tagType.skill,
    text: skill,
    bgColor: "bg-blue-100",
    textColor: "text-blue-800"
  }));

  return (
    <GeneralCard
      name={volunteer.firstName + " " + volunteer.lastName}
      imageUrl={`${import.meta.env.VITE_REACT_APP_API_URL}/${
        volunteer.imageUrl
      }`}
      description={volunteer.about ?? ""}
      tags={tags}
      additionalInfo={volunteer.city}
    />
  );
}
