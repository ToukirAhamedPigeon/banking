'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    //SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import LogoLink from './LogoLink'
import Footer from './Footer'
import PlaidLink from './PlaidLink'
  

const MobileNav = (
     {user}:MobileNavProps
) => {
    const pathName=usePathname();
  return (
    <section className='w-full max-w-[264px]'>
     <Sheet>
        <SheetTrigger>
            <Image src="/icons/hamburger.svg" width={30} height={30} alt="Menu" className='cursor-pointer'/>
        </SheetTrigger>
        <SheetContent side="left" className='border-none bg-white dark:bg-black-1'>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <LogoLink />
            <div className='mobilenav-sheet'>
                <SheetClose asChild>
                    <nav className="flex flex-col h-full gap-4 pt-2 text-white">
                    {sidebarLinks.map((item)=>{
                        const isActive=pathName===item.route || pathName.startsWith(`${item.route}/`);
                        return (
                            <SheetClose asChild key={item.route}>
                                <Link href={item.route} key={item.label} className={cn('mobilenav-sheet_close w-full',{'bg-bank-gradient':isActive})}>
                                    <Image src={item.imgURL} alt={item.label} className={cn({'brightness-[3] invert-0':isActive})} width={20} height={20} />
                                    <p className={cn('text-16 font-semibold text-black-2 dark:text-slate-300',{'!text-white':isActive})} >{item.label}</p>
                                </Link>
                            </SheetClose>
                        )})}
                        <SheetClose asChild>
                            <PlaidLink user={user}/>
                        </SheetClose>
                    </nav>
                </SheetClose>
                <Footer user={user} type="mobile"/>
            </div>
        </SheetContent>
    </Sheet>
    </section>
  )
}

export default MobileNav
