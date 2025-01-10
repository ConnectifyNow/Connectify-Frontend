import React from "react";
import { Button } from "@/components/ui/button";

interface customSelectProps {
  options: { id: number; name: string }[];
  selectedOptions: string[];
  onChange: (value: string) => void;
}

const customSelect: React.FC<customSelectProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const handleSelectedChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="space-y-2">
      <label>skills</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option: any) => (
          <Button
            key={option.id}
            type="button"
            variant={
              selectedOptions.includes(option.id.toString())
                ? "default"
                : "outline"
            }
            onClick={() => handleSelectedChange(option.id.toString())}>
            {option.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default customSelect;
