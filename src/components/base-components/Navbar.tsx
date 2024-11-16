"use client";

import { useState, useEffect } from "react";
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
import { useRef } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      console.log( session);
    }
  }, [session]);

  return (
    <nav className="absolute top-0 py-6 px-6 lg:px-10 flex justify-between items-center w-full z-10">
      <span className="flex gap-2 items-center">
        <h2 className="tracking-tighter text-xl font-black text-center">
          MultiSocial
        </h2>
        <Image src="/Multisocials.png" alt="logo" width={24} height={24}/>
      </span>

      <div className="flex flex-row items-center gap-4">
 
        
        <div className="hidden lg:flex gap-2">
          <button className="btn btn-ghost">Features</button>
          <button className="btn btn-ghost">Testimonials</button>
          <button className="btn btn-ghost">Pricing</button>
          <button className="btn btn-ghost">FAQ</button>
          {session && (
            <Link href="/dashboard">
              <button className="btn btn-ghost">Dashboard</button>
            </Link>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="btn btn-ghost btn-circle lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <span className="font-bold text-lg">MultiSocial</span>
              </Link>
              <div className="flex flex-col gap-2">
                <button className="btn btn-ghost w-full justify-start" onClick={() => setIsOpen(false)}>
                  Pricing
                </button>
                {session && (
                  <Link href="/dashboard">
                    <button className="btn btn-ghost w-full justify-start">
                      Dashboard
                    </button>
                  </Link>
                )}
              </div>
              {session ? (
                <div className='flex items-center gap-2'>
                  <img className='w-8 h-8 rounded-full' src={session?.user?.image!} alt='user pfp'/>
                  <button className="btn btn-ghost btn-sm" onClick={() => signOut()}>
                    Sign out
                  </button>
                </div>
              ) : (
                <Link href='/login'>
                  <button className="btn btn-ghost btn-sm" onClick={() => signIn()}>
                    Sign In
                  </button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {session ? (
        <div className='lg:flex items-center gap-2 hidden'>
          <img className='w-8 h-8 rounded-full' src={session?.user?.image!} alt='user pfp'/>
          <button className="btn btn-ghost btn-sm" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <Link className='lg:block hidden' href='/login'>
          <button className="btn btn-ghost btn-sm">Sign In</button>
        </Link>
      )}
    </nav>
  );
}
