'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {sidebarLinks} from '@/constants/index'
import {cn} from '@/lib/utils'
import {usePathname} from 'next/navigation'
import LogoLink from './LogoLink'

const Sidebar = (
  // {user}: SiderbarProps
) => {
    const pathName=usePathname();
  return (
    <section className="sidebar">
      <nav className='flex flex-col gap-4'>
        <LogoLink />
        {sidebarLinks.map((item)=>{
            const isActive=pathName===item.route || pathName.startsWith(`${item.route}/`);
           return <Link href={item.route} key={item.label} className={cn('sidebar-link',{'bg-bank-gradient':isActive})}>
                <div className='relative size-6'><Image src={item.imgURL} alt={item.label} fill className={cn({'brightness-[3] invert-0':isActive})} /></div>
                <p className={cn('sidebar-label',{'!text-white':isActive})} >{item.label}</p>
            </Link>
        })}
        USER
      </nav>

      FOOTER
    </section>
  )
}

export default Sidebar
