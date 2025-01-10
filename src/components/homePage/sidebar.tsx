import { useState } from 'react'
import { allSkills } from '../../data/posts'

interface SidebarProps {
  onFilterChange: (filters: { postType: string; skills: string[] }) => void;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [postType, setPostType] = useState('all')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const handlePostTypeChange = (type: string) => {
    setPostType(type)
    onFilterChange({ postType: type, skills: selectedSkills })
  }

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill]
    setSelectedSkills(updatedSkills)
    onFilterChange({ postType, skills: updatedSkills })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Post Type</h3>
        <div className="space-y-2">
          {['all', 'user', 'organization'].map((type) => (
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
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allSkills.map((skill) => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                value={skill}
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="mr-2"
              />
              {skill}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
