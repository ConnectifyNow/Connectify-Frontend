import { Link } from "react-router-dom";
import { MessageSquareText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skill, Volunteer } from "@/types";
import { randomAvatarUrl } from "@/utils/functions";
import GeneralCard from './generic-card'

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const tags = volunteer.skills.map((skill) => ({
    text: skill,
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  }));

  return (
    <GeneralCard
      id={volunteer.userId}
      name={volunteer.firstName + " " + volunteer.lastName}
      imageUrl={volunteer.imageUrl ?? randomAvatarUrl()}
      description={volunteer.about}
      tags={tags}
      additionalInfo={volunteer.city}
    />
  );
}
