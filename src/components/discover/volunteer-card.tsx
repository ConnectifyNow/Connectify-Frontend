import { User, Volunteer } from "@/types";
import GeneralCard from "../shared/generic-card";
import { tagType } from "@/types";
import useCitiesStore from "@/stores/setCitiesStore";

export default function VolunteerCard({
  volunteer,
  userId,
}: {
  volunteer: Volunteer;
  userId: User["_id"];
}) {
  const tags = (volunteer.skills ?? [])?.map((skill) => ({
    type: tagType.skill,
    text: skill,
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  }));
  const cities = useCitiesStore((state) => state.cities);
  const ProfileDataCity = cities?.find((city) => city._id === volunteer.city);

  return (
    <GeneralCard
      name={volunteer.firstName + " " + volunteer.lastName}
      imageUrl={volunteer.imageUrl}
      description={volunteer.about ?? ""}
      tags={tags}
      additionalInfo={ProfileDataCity?.name}
      userId={userId}
    />
  );
}
