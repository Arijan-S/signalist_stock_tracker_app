"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import NavItems from "@/components/NavItems";

const UserDropdown = ({
  user,
  initialStocks,
}: {
  user?: User;
  initialStocks: StockWithWatchlistStatus[];
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-4 hover:text-yellow-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/" />
            <AvatarFallback
              className={
                user
                  ? "bg-yellow-500 text-yellow-900 text-sm font-bold"
                  : "bg-gray-600 text-gray-300 text-sm font-bold"
              }
            >
              {user
                ? user.name?.[0]?.toUpperCase() ||
                  user.email?.[0]?.toUpperCase() ||
                  "U"
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user ? user.name || "User" : "Guest"}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400">
        {user ? (
          <>
            <DropdownMenuLabel>
              <div className="flex relative items-center gap-3 py-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/" />
                  <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-400">
                    {user.name || "User"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {user.email || "No email"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-600" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
              Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
            <nav className="sm:hidden">
              <NavItems />
            </nav>
          </>
        ) : (
          <>
            <DropdownMenuLabel>
              <div className="flex relative items-center gap-3 py-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gray-600 text-gray-300 text-sm font-bold">
                    ?
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-400">
                    Guest User
                  </span>
                  <span className="text-sm text-gray-500">Not signed in</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-600" />
            <DropdownMenuItem
              onClick={handleSignIn}
              className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
            >
              Sign In
            </DropdownMenuItem>
            <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
            <nav className="sm:hidden">
              <NavItems />
            </nav>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
