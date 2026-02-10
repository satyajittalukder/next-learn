'use client';

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignOutBtn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
          router.refresh();
        },
        onError: (ctx) => {
          console.error("Sign out failed:", ctx.error);
          toast.error("Failed to sign out. Please try again.");
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer text-destructive focus:text-destructive"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>{isLoading ? "Signing out..." : "Sign out"}</span>
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
