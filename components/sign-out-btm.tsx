'use client';

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="cursor-pointer text-destructive focus:text-destructive"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/sign-in");
              router.refresh();
            }
          }
        });
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
