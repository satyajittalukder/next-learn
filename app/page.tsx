import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Home = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <main className='flex-1'>
        {/* Hero Section */}
        <section className=" container mx-auto px-4 py-32">
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-black mb-6 text-6xl font-bold'>A Better Way to track your job application</h1>
            <p className='text-muted-foreground mb-10 text-xl'>Manange, organize and manage your job search in one place.</p>
            <div className="flex flex-col items-center gap-4">
              <Button variant="default" className="h-12 px-8 text-lg font-medium cursor-pointer"><span className="flex items-center">
                Start for free
                <ArrowRight size={20} className="ml-2" />
              </span>
              </Button>
              <p className="text-muted-foreground text-sm">Free forever. No credit card required.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home