import { ButtonLink } from "./ui/button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <>
      <DesktopNav isAdmin={isAdmin} />
      <MobileNav isAdmin={isAdmin} />
    </>
  );
};

const DesktopNav = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <nav className="hidden md:flex gap-2">
      <ButtonLink variant={"ghost"} to="/" activeVariant="secondary">
        Home
      </ButtonLink>
      <ButtonLink variant={"ghost"} to="/products" activeVariant="secondary">
        Products
      </ButtonLink>
      {isAdmin && (
        <>
          <ButtonLink variant={"ghost"} to="/admin" activeVariant="secondary">
            Dashboard
          </ButtonLink>
          <ButtonLink variant={"ghost"} to="/admin/products" activeVariant="secondary">
            Admin Products
          </ButtonLink>
          <ButtonLink variant={"ghost"} to="/admin/orders" activeVariant="secondary">
            Orders
          </ButtonLink>
          <ButtonLink variant={"ghost"} to="/admin/users" activeVariant="secondary">
            Users
          </ButtonLink>
        </>
      )}
    </nav>
  );
};

const MobileNav = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>☰</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonLink variant={"ghost"} to="/" activeVariant="secondary">
              Home
            </ButtonLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonLink variant={"ghost"} to="/products" activeVariant="secondary">
              Products
            </ButtonLink>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuItem>
                <ButtonLink variant={"ghost"} to="/admin" activeVariant="secondary">
                  Dashboard
                </ButtonLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ButtonLink variant={"ghost"} to="/admin/products" activeVariant="secondary">
                  Admin Products
                </ButtonLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ButtonLink variant={"ghost"} to="/admin/orders" activeVariant="secondary">
                  Orders
                </ButtonLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ButtonLink variant={"ghost"} to="/admin/users" activeVariant="secondary">
                  Users
                </ButtonLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;