import AnimatedCounter from '@/components/AnimatedCounter';
import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
// import { formatAmount } from '@/lib/utils';
import React from 'react'
// import CountUp from 'react-countup';

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams;
  const currentPage = Number(page as string) || 1;
  
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });
  if(!accounts) return; 
  const accountsData = accounts?.data; 
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length/rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction -rowsPerPage;
    const currentTransactions = account?.transactions.slice(indexOfFirstTransaction,indexOfLastTransaction);
  return (
    <div className='transactions dark:bg-gray-900'>
      <div className='transactions-header'>
        <HeaderBox title='Transaction History' subtext="Access your bank details and recent transactions."/>
      </div>
      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-bold text-white'>{account?.data.name}</h2>
            <p className='text-14 text-blue-25'>
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
                ●●●● ●●●● ●●●● <span className="text-16">{account?.data.mask}</span>
            </p>
          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>Current Balance</p>
            <div className='text-24 text-center font-bold'>
              <AnimatedCounter amount={account?.data.currentBalance}/>
            {/* {formatAmount(account?.data.currentBalance)} */}
            </div>
          </div>
        </div>
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages>1 && (
              <div className='my-4 w-full'>
                  <Pagination totalPages={totalPages} page={currentPage}/>
              </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory
