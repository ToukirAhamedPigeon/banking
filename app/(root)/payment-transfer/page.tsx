import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedIn?.$id });
    if(!accounts) return; 
    const accountsData = accounts?.data;
  return (
    <div className='payment-transfer dark:bg-gray-900'>
      <HeaderBox 
      title="Transfer Funds"
      subtext="Kindly include any specific details or notes regarding the payment transfer"
      />
      <section className='size-full pt-5'>
      <PaymentTransferForm accounts={accountsData}/>
      </section>
    </div>
  )
}

export default Transfer
