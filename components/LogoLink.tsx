import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LogoLink = () => {
  return (
    <Link href='/' className='mb-12 cursor-pointer flex items-center gap-2'>
    <Image src='/icons/logo.png' width={50} height={50} alt='Logo' className='size-[50px] max-xl:size-14 dark:bg-slate-300 dark:p-1 dark:rounded-full'/>
    <h1 className='sidebar-logo dark:text-slate-300'>PBank</h1>
    <h1 className='text-3xl md:hidden'>PBank</h1>
</Link>
  )
}

export default LogoLink
