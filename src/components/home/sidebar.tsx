import { useState } from "react";
import { skills } from "../../data/posts";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  onFilterChange: (filters: { postType: string; skillsIds: number[] }) => void;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [postType, setPostType] = useState("all");
  const [selectedSkillsIds, setSelectedSkillsIds] = useState<number[]>([]);

  const handlePostTypeChange = (type: string) => {
    setPostType(type);
    onFilterChange({ postType: type, skillsIds: selectedSkillsIds });
  };

  const handleSkillToggle = (skillId: number) => {
    const updatedSkills = selectedSkillsIds.includes(skillId)
      ? selectedSkillsIds.filter((id) => id !== skillId)
      : [...selectedSkillsIds, skillId];
    setSelectedSkillsIds(updatedSkills);
    onFilterChange({ postType, skillsIds: updatedSkills });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Post Type</h3>
        <div className="space-y-2">
          {["all", "user", "organization"].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="postType"
                value={type}
                checked={postType === type}
                onChange={() => handlePostTypeChange(type)}
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Skills</h3>
        <ScrollArea className="max-h-48 overflow-y-auto h-[200px]">
          {skills.map((skill) => (
            <label key={skill.id} className="flex items-center">
              <input
                type="checkbox"
                value={skill.id}
                checked={selectedSkillsIds.includes(skill.id)}
                onChange={() => handleSkillToggle(skill.id)}
                className="mr-2"
              />
              {skill.name}
            </label>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}