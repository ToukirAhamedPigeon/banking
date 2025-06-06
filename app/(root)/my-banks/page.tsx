import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });
  return (
    <section className='flex'>
      <div className='my-banks dark:bg-gray-900'>
        <HeaderBox title='Linked Bank Accounts' subtext="Easily handle all your banking tasks."/>
        <div className='space-y-4'>
        <h2 className='header-2 dark:text-gray-100'>
          Account Cards
        </h2>
        <div className='flex flex-wrap gap-6'>
          {accounts?.data.map((account:Account)=>(
            <BankCard 
            key={`${account.id}-${account.appwriteItemId}`}
            account={account}
            userName={loggedIn?.firstName}
            />
          ))} 
        </div>
      </div>
      </div>
    </section>
  )
}

export default MyBanks
