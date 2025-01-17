import React from "react";
import { Button } from "@/components/ui/button";

interface customSelectProps {
  options: { _id: string; name: string }[];
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
      <div className="flex flex-wrap gap-2">
        {options?.map((option: { _id: string; name: string }) => (
          <Button
            className="bg-green-600"
            key={option._id}
            type="button"
            variant={
              selectedOptions.includes(option._id) ? "default" : "outline"
            }
            onClick={() => handleSelectedChange(option._id)}>
            {option.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default customSelect;
