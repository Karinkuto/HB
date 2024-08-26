import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { useCallback } from "react";

interface SearchComponentProps {
  onSearch: (value: string) => void;
}

export function SearchComponent({ onSearch }: SearchComponentProps) {
  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 300),
    []
  );

  return (
    <Input
      type="text"
      placeholder="Search transactions"
      onChange={(e) => debouncedSearch(e.target.value)}
      className="w-full md:w-1/2"
    />
  );
}