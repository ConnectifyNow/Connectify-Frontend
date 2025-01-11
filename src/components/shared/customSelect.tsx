import React from "react";
import { Button } from "@/components/ui/button";

interface customSelectProps {
  options: { id: number; name: string }[];
  selectedOptions: number[];
  onChange: (value: number) => void;
}

const customSelect: React.FC<customSelectProps> = ({
  options,
  selectedOptions,
  onChange
}) => {
  const handleSelectedChange = (value: number) => {
    onChange(value);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {options.map((option: any) => (
          <Button
            key={option.id}
            type="button"
            variant={
              selectedOptions.includes(option.id) ? "default" : "outline"
            }
            onClick={() => handleSelectedChange(option.id)}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default customSelect;
