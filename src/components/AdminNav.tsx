import { ButtonLink } from "./ui/button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminNav = () => {
  return (
    <nav className="hidden md:flex gap-2">
      <ButtonLink variant={"ghost"} to="/admin/dashboard" activeVariant="secondary">
        Admin Dashboard
      </ButtonLink>
      <ButtonLink variant={"ghost"} to="/admin/users" activeVariant="secondary">
        Users
      </ButtonLink>
      <ButtonLink variant={"ghost"} to="/admin/products" activeVariant="secondary">
        Products
      </ButtonLink>
      <ButtonLink variant={"ghost"} to="/admin/orders" activeVariant="secondary">
        Orders
      </ButtonLink>
    </nav>
  );
};

const AdminMobileNav = () => {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>☰</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Admin Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonLink variant={"ghost"} to="/admin/dashboard" activeVariant="secondary">
              Admin Dashboard
            </ButtonLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonLink variant={"ghost"} to="/admin/users" activeVariant="secondary">
              Users
            </ButtonLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonLink variant={"ghost"} to="/admin/products" activeVariant="secondary">
              Products
            </ButtonLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonLink variant={"ghost"} to="/admin/orders" activeVariant="secondary">
              Orders
            </ButtonLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { AdminNav, AdminMobileNav };
