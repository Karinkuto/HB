import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface FilterComponentProps {
  filters: { [key: string]: string[] };
  handleFilter: (filterType: string, filterValue: string) => void;
  clearFilters: () => void;
}

export function FilterComponent({
  filters,
  handleFilter,
  clearFilters,
}: FilterComponentProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-[40%]">
          <p className="text-sm font-medium leading-none p-2">Status</p>
          {["Completed", "Pending", "Cancelled"].map((status) => (
            <Button
              style={{ margin: "0.2rem" }}
              key={status}
              variant="outline"
              size="sm"
              className={`border-dashed ${
                filters.status.includes(status) ? "border-black" : ""
              }`}
              onClick={() => handleFilter("status", status)}
            >
              {status}
              {filters.status.includes(status) && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </Button>
          ))}
        </div>
        <div className="w-[40%]">
          <p className="text-sm font-medium leading-none p-2">Category</p>
          {["Kids", "Women", "Men"].map((category) => (
            <Button
              style={{ margin: "0.2rem" }}
              key={category}
              variant="outline"
              size="sm"
              className={`border-dashed ${
                filters.category.includes(category) ? "border-blue-500" : ""
              }`}
              onClick={() => handleFilter("category", category)}
            >
              {category}
              {filters.category.includes(category) && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </Button>
          ))}
        </div>
        <div className="w-[40%]">
          <p className="text-sm font-medium leading-none p-2">Subcategory</p>
          {["Top Wear", "Bottom Wear", "Shoes"].map((subcategory) => (
            <Button
              style={{ margin: "0.2rem" }}
              key={subcategory}
              variant="outline"
              size="sm"
              className={`border-dashed ${
                filters.subcategory.includes(subcategory) ? "border-blue-500" : ""
              }`}
              onClick={() => handleFilter("subcategory", subcategory)}
            >
              {subcategory}
              {filters.subcategory.includes(subcategory) && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </Button>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </Card>
  );
}