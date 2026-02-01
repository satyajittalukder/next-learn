import { BriefcaseMedical, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { getSession, signOut } from '@/lib/auth/auth'
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import SignOutBtn from './sign-out-btm'

const Navbar = async () => {

  const session = await getSession();

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
        {session?.user ? (
          <>
            <div className='flex gap-2 sm:gap-3 items-center'>
              <Link href="/dashboard"
                className='flex items-center gap-2 text-lg sm:text-xl font-semibold text-primary'
              >
                <Button className="h-8 text-xs sm:text-sm px-3 sm:px-4 py-4 cursor-pointer">
                  <div className="">Dashboard</div>
                </Button>
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group h-8 w-8 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary bg-gray-950 hover:text-primary cursor-pointer"
                    aria-label={`Account menu for ${session.user.name || session.user.email}`}
                  >
                    <Avatar className="h-8 w-8 justify-center items-center flex">
                      <AvatarImage
                        // src={session.user.image}
                        alt={`${session.user.name}'s avatar`}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback className="text-primary-foreground group-hover:text-primary transition-colors">
                        {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56"
                  sideOffset={8}
                  collisionPadding={8}
                >
                  <DropdownMenuLabel className="font-normal px-2 py-3">
                    <div className="flex flex-col gap-1">
                      {session.user.name && (
                        <p className="text-sm font-medium">{session.user.name}</p>
                      )}
                      <p className="text-xs text-muted-foreground break-all">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>


                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className='flex flex-col gap-2'>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <SignOutBtn />

                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </>
        ) : (
          <div className='flex gap-2 sm:gap-3 items-center'>
            <Link href="/sign-in" className='text-xs sm:text-sm font-medium text-gray-700 hover:text-primary'>
              Log In
            </Link>
            <Link href="/sign-up">
              <Button className="h-8  text-xs sm:text-sm px-3 sm:px-4 py-4">
                <div className="hidden sm:inline">Get Started Free</div>
                <span className="inline sm:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
