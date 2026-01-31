"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SignUp = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <Card className="mx-auto w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Create Account</CardTitle>
          <CardDescription className="text-base">
            Start tracking your job applications today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
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
                required
                placeholder="Create a strong password"
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full text-base font-semibold cursor-pointer"
            >
              Sign Up
            </Button>
          </form>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
