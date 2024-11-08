import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { CircleUserRound, MenuIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button' 
import { useAuth0 } from '@auth0/auth0-react'
import MobileNavLinks from './MobileNavLinks'

const MobileNav = () => { 
  const {isAuthenticated,loginWithRedirect,user} = useAuth0()
  return (
    <Sheet>
      <SheetTrigger>
      <MenuIcon className='text-orange-500 px-4' size={60} />
      </SheetTrigger>
      <SheetContent className='space-y-3'>
        <SheetTitle>
          {isAuthenticated ? (<span className='flex item-center font-bold gap-2'>
            <CircleUserRound className="text-orange-500"/>
            {user?.name || "User"}
          </span>) : (<h1>Welcome to Flavour Fiesta!</h1>)}
        </SheetTitle>
        <Separator/>
        <SheetDescription className='flex flex-col gap-4'>
          {isAuthenticated ? <MobileNavLinks/> : ( <Button onClick={()=>loginWithRedirect()} className="flex-1 font-bold bg-orange-500">Login</Button>)}
         
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav