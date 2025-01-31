import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LogoLink = () => {
  return (
    <Link href='/' className='mb-12 cursor-pointer flex items-center gap-2'>
    <Image src='/icons/logo.svg' width={34} height={34} alt='Logo' className='size-[24px] max-xl:size-14'/>
    <h1 className='sidebar-logo'>PBank</h1>
    <h1 className='text-3xl md:hidden'>PBank</h1>
</Link>
  )
}

export default LogoLink
