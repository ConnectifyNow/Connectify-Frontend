// src/components/OccupationSelect.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface OccupationSelectProps {
  occupations: { id: number; name: string }[];
  selectedOccupations: string[];
  onChange: (value: string) => void;
}

const OccupationSelect: React.FC<OccupationSelectProps> = ({
  occupations,
  selectedOccupations,
  onChange,
}) => {
  const handleOccupationChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="space-y-2">
      <label>Occupations</label>
      <div className="flex flex-wrap gap-2">
        {occupations.map((occupation) => (
          <Button
            key={occupation.id}
            type="button"
            variant={
              selectedOccupations.includes(occupation.id.toString())
                ? "default"
                : "outline"
            }
            onClick={() => handleOccupationChange(occupation.id.toString())}>
            {occupation.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OccupationSelect;
