"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChangeEvent, useState } from "react"
import { signUp } from "@/lib/auth/auth-client"
import { useRouter } from "next/dist/client/components/navigation"

const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    // Simulate an API call
    try {
      const result = await signUp.email({ name, email, password })
      if (result.error) {
        setError(result.error.message ?? "Failed to sign up. Please try again.")
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during sign up. Please try again.")
    } finally {
      setLoading(false)
    }

    setTimeout(() => {
      setLoading(false)
      // Here you would normally handle the response from the server
    }, 2000)
  }

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
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full text-base font-semibold cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
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
