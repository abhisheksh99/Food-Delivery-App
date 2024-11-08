import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { MenuIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button' 

const MobileNav = () => { 
  return (
    <Sheet>
      <SheetTrigger>
      <MenuIcon className='text-orange-500 px-4' size={60} />
      </SheetTrigger>
      <SheetContent className='space-y-3'>
        <SheetTitle>
          <h1>Welcome to Flavour Fiesta!</h1>
        </SheetTitle>
        <Separator/>
        <SheetDescription className='flex'>
          <Button className="flex-1 font-bold bg-orange-500">Login</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav