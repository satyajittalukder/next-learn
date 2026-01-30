import { BriefcaseMedical } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='border-b border-gray-200 bg-white'>
      <div className='mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12'>
        <Link href="/"
          className='flex items-center gap-2 text-lg sm:text-xl font-semibold text-primary'
        >
          <BriefcaseMedical size={28} className="sm:w-8 sm:h-8" />
          <span className="hidden xs:inline sm:inline">Job Tracker</span>
          <span className="inline xs:hidden sm:hidden">Jobs Tracker</span>
        </Link>
        <div className='flex gap-2 sm:gap-3 items-center'>
          <Link href="/sign-in" className='text-xs sm:text-sm font-medium text-gray-700 hover:text-primary'>
            Log In
          </Link>
          <Link href="/sign-up">
            <Button className="h-8 text-xs sm:text-sm px-3 sm:px-4">
              <span className="hidden sm:inline">Get Started Free</span>
              <span className="inline sm:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
