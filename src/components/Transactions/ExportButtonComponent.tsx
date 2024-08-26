import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface ExportButtonComponentProps {
  onClick: () => void;
}

export function ExportButtonComponent({ onClick }: ExportButtonComponentProps) {
  return (
    <Button asChild size="sm" className="gap-1" onClick={onClick}>
      <a>
        Export
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </Button>
  );
}