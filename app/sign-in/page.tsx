"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const SignIn = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <Card className="mx-auto w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Sign In</CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full text-base font-semibold cursor-pointer"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn
