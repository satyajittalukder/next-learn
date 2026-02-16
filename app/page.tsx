import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp, Sparkles, Zap, Layout, Shield } from "lucide-react"
import ImageTabs from "@/components/image-tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      <main className="flex-1">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-blob" />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-600 mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2 animate-pulse"></span>
                The Future of Job Tracking
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">Career Journey</span> <br className="hidden md:block" /> with Precision
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Organize applications, track interviews, and analyze your progress with a platform designed for the modern job seeker.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link href="/sign-up">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-purple-900/20 transition-all hover:scale-105 active:scale-95">
                    Start Tracking Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-slate-200 hover:bg-slate-50 text-slate-900 transition-all hover:scale-105 active:scale-95 bg-white/80 backdrop-blur-sm">
                    View Demo
                  </Button>
                </Link>
              </div>

              {/* Hero Visual Mockup Container */}
              <div className="relative mx-auto max-w-6xl mt-12 perspective-1000">
                <div className="relative rounded-xl border border-slate-200 bg-white/60 backdrop-blur-xl shadow-2xl overflow-hidden p-2 md:p-4 transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none" />
                  <ImageTabs />
                </div>
                {/* Decorative Elements behind mockup */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-100/50 to-blue-100/50 blur-3xl opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="relative z-10 py-24 bg-slate-50/50 border-t border-slate-200/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Everything you need to land your dream job</h2>
              <p className="text-lg text-slate-600">Powerful features wrapped in a beautiful, intuitive interface.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Feature 1 - Large */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl group-hover:bg-purple-200/50 transition-colors" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 text-purple-600">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Centralized Application Hub</h3>
                  <p className="text-slate-600 text-lg mb-6 max-w-md"> Stop juggling spreadsheets. Keep every detail, contact, and note in one secure, organized workspace tailored for your success.</p>
                </div>
                {/* Abstract UI Representation */}
                <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-slate-50 border-t border-l border-slate-100 rounded-tl-3xl shadow-sm p-4 translate-y-4 translate-x-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform">
                  <div className="flex gap-2 mb-3">
                    <div className="h-2 w-8 bg-slate-200 rounded-full" />
                    <div className="h-2 w-16 bg-slate-100 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 w-full bg-white border border-slate-100 rounded-xl shadow-sm flex items-center px-3"><div className="h-2 w-12 bg-purple-100 rounded-full" /></div>
                    <div className="h-8 w-full bg-white border border-slate-100 rounded-xl shadow-sm flex items-center px-3"><div className="h-2 w-20 bg-blue-100 rounded-full" /></div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Tall */}
              <div className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1 text-white">
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white backdrop-blur-md">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Visual Progress Tracking</h3>
                  <p className="text-slate-300 mb-8">
                    Visualize your momentum with beautiful Kanban boards. Drag, drop, and celebrate every step forward.
                  </p>
                  <div className="mt-auto relative w-full aspect-[4/5] bg-white/5 rounded-2xl border border-white/10 p-4 backdrop-blur-sm overflow-hidden">
                    {/* Fake Kanban */}
                    <div className="flex gap-2 h-full">
                      <div className="flex-1 bg-white/5 rounded-xl p-2 flex flex-col gap-2">
                        <div className="h-1.5 w-12 bg-white/20 rounded-full mb-1" />
                        <div className="bg-white/10 p-2 rounded-lg h-16 animate-pulse" />
                        <div className="bg-white/10 p-2 rounded-lg h-16" />
                      </div>
                      <div className="flex-1 bg-white/5 rounded-xl p-2 flex flex-col gap-2">
                        <div className="h-1.5 w-12 bg-green-400/50 rounded-full mb-1" />
                        <div className="bg-green-500/20 p-2 rounded-lg h-16 border border-green-500/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-pink-100 flex items-center justify-center mb-6 text-pink-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">AI Insights</h3>
                  <p className="text-slate-600">Get smart suggestions to improve your resume and cover letters.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                    <Layout className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Boards</h3>
                  <p className="text-slate-600">Create workflows that match your unique job search strategy.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your job search?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of job seekers who are landing their dream roles faster with our platform.</p>
            <Link href="/sign-up">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-slate-900 font-bold text-xl">JobTracker</span>
            </div>
            <div className="text-slate-500 text-sm">
              © {new Date().getFullYear()} JobTracker. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Twitter</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}