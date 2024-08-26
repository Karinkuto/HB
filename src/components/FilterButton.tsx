import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterOption {
  label: string;
  value: string;
  subCategories?: FilterOption[];
}

interface FilterButtonProps {
  options: FilterOption[];
  onFilterChange: (filters: string[]) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ options, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<FilterOption | null>(null);

  const handleFilterClick = (option: FilterOption) => {
    if (option.subCategories) {
      setCurrentCategory(option);
    } else {
      const newFilters = selectedFilters.includes(option.value)
        ? selectedFilters.filter(f => f !== option.value)
        : [...selectedFilters, option.value];
      setSelectedFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const renderFilterOptions = (options: FilterOption[]) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={selectedFilters.includes(option.value) ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(option)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          {currentCategory ? (
            <>
              <Button variant="link" onClick={() => setCurrentCategory(null)}>
                ← Back to main categories
              </Button>
              <h3 className="font-semibold">{currentCategory.label}</h3>
              {renderFilterOptions(currentCategory.subCategories || [])}
            </>
          ) : (
            renderFilterOptions(options)
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;