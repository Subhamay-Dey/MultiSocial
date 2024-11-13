"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="absolute top-0 py-6 px-6 lg:px-10 flex justify-between items-center w-full z-10">
      <span className="flex gap-2 items-center">
        <h2 className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter text-xl font-black text-center">
          MultiSocial
        </h2>
        <Image src="/Multisocials.png" alt="logo" width={24} height={24}/>
      </span>

      <div className="flex flex-row">
        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
                <NavigationMenuLink>
                  <Button variant="default" size="lg">
                    Features
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Button variant="default" size="lg">
                    Testinomials
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Button variant="default" size="lg">
                    Pricing
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Button variant="default" size="lg">
                    FAQ
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link href={"/dashboard"}>
                    <Button variant="default" size="lg">
                      Dashboard
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-20 w-20" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <span className="font-bold text-lg">Getstart</span>
              </Link>
              <NavigationMenu orientation="vertical">
                <NavigationMenuList className="flex-col items-start space-y-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Button
                        variant="ghost"
                        size={'lg'}
                        onClick={() => setIsOpen(false)}
                      >
                        Pricing
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href={"/dashboard"}>
                        <Button variant="ghost" size="lg">
                          Dashboard
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {session ? (
                <span className='gap-1 flex'>
                  <img className='size-8 mr-4 rounded-full' src={session?.user?.image!} alt='user pfp'/>
                  <Button size={'sm'} variant={'secondary'} onClick={() => signOut()}>Sign out</Button>
                </span>
              ) : (
                <Link href={'/login'}>
                  <Button className="flex lg:hidden" size={'sm'} variant={'secondary'}>Sign In</Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {session ? 
        <span className='lg:flex gap-1 hidden'>
          <img className='size-8 mr-4 rounded-full' src={session?.user?.image!} alt='user pfp'/>
          <Button className="rounded-xl" size={'sm'} variant={'secondary'} onClick={() => signOut()}>Sign out</Button>
        </span> 
        : <Link className='lg:flex gap-1 hidden' href={'/login'}>
            <Button className="hidden lg:flex rounded-xl" size={'sm'} variant={'secondary'}>Sign In</Button>
          </Link>
      }
    </nav>
  );
}
