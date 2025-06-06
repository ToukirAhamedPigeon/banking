import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = (
     {user, transactions, banks}:RightSidebarProps
) => {
    // if (transactions) {
        //console.log("transactions is shown");
    //   }
    const categories:CategoryCount[] = countTransactionCategories(transactions);
    // console.log(transactions);
    // console.log(categories);
  return (
    <aside className='right-sidebar !border-blue-700'>
      <section className="flex flex-col pb-8">
        <div className="profile-banner" style={{ backgroundImage: `url('/icons/dollar-bg.jpg')` }}></div>
        <div className="profile">
            <div className="profile-img dark:bg-white/85">
                <span className='text-5xl font-bold text-blue-500'>{user?.firstName[0]}</span>
            </div>
            <div className="profile-details">
                <h1 className='profile-name dark:text-blue-500'>{user?.firstName} {user?.lastName}</h1>
                <p className="profile-email dark:text-slate-200">
                    {user?.email}
                </p>
            </div>
        </div>
      </section>
      <section className="banks">
        <div className="flex w-full justify-between">
            <h2 className="header-2 dark:text-blue-500">Linked Banks</h2>
            <Link href="/" className="flex gap-2">
                <Image src="/icons/plus.svg" width={20} height={20} alt="plus"></Image>
                <h2 className="text-14 font-semibold text-gray-600 dark:text-gray-300">Link Bank</h2>
            </Link>
        </div>
        {banks?.length >0 && (
            <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                <div className="relative z-10">
                    <BankCard 
                    key={banks[0].$id}
                    account={banks[0]}
                    userName={`${user?.firstName} ${user?.lastName}`}
                    showBalance={false}
                     />
                </div>
                {banks[1] && (
                    <div className="absolute right-0 top-8 z-0 w-[90%]">
                        <BankCard 
                         key={banks[1].$id}
                         account={banks[1]}
                         userName={`${user?.firstName} ${user?.lastName}`}
                         showBalance={false}
                        />
                    </div>
                )}
            </div>
        )}
        <div className="mt-10 flex flex-1 flex-col gap-6">
            <h2 className="header-2 dark:text-blue-500">Featured Categories</h2>
            <div className="space-y-5">
                {categories.map((category,i)=>(
                    <Category key={category.name+i} category={category} />
                ))}
            </div>
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar
