import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const RecentTransactions = ({
    accounts,
    transactions=[],
    appwriteItemId,
    page=1
}:RecentTransactionsProps) => {
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2>Recent Transactions</h2>
        <Link href={`/transactions-history/?id=${appwriteItemId}`} className='view-all-btn'>View All</Link>
        </header>
        <Tabs defaultValue={appwriteItemId} className="w-full">
            <TabsList className="recent-transactions-tablist">
            </TabsList>
        </Tabs>
    </section>
  )
}

export default RecentTransactions
