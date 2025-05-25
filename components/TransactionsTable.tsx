import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"  
import { getTransactionStatus,formatAmount,removeSpecialCharacters, formatDateTime, cn } from '@/lib/utils'
import { transactionCategoryStyles } from '@/constants';
const CategoryBadge =({category}:CategoryBadgeProps)=>{
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor
  } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;
    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
          <div className={cn('size-2 rounded-full',backgroundColor)}></div>
          <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
        </div>
    )
}
const TransactionsTable = async ({transactions}:TransactionTableProps) => {
 
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow className='dark:bg-gray-800'>
                <TableHead className="px-2  dark:text-gray-200">Transaction</TableHead>
                <TableHead className="px-2  dark:text-gray-200">Amount</TableHead>
                <TableHead className="px-2  dark:text-gray-200">Status</TableHead>
                <TableHead className="px-2  dark:text-gray-200">Date</TableHead>
                <TableHead className="px-2  dark:text-gray-200 max-md:hidden">Channel</TableHead>
                <TableHead className="px-2  dark:text-gray-200 max-md:hidden">Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction:Transaction) => {
                  const status = getTransactionStatus(new Date(transaction.date));
                  const amount = formatAmount(transaction.amount);
                  const isDebit = transaction.type === "debit";
                  const isCredit = transaction.type === "credit";
                  return (
                    <TableRow key={transaction.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA] dark:bg-[#3b180f99]':isCredit ? 'bg-[#F6FEF9] dark:bg-[#175b30b6]':'bg-[#F6FEF9] dark:bg-[#104423ae]'} !over:bg-none`}>
                        <TableCell className="max-w-[250px] pl-2 pr-10"><div className='flex items-center gap-3'><h1 className="text-14 truncate font-semibold text-[#344054] dark:text-slate-300">{removeSpecialCharacters(transaction.name)}</h1></div></TableCell>
                        <TableCell className={`pl-2 pr-10 font-semibold text-right ${isDebit || amount[0] === '-' ?'text-[#f04438]':'text-[#039855]'}`}>{isDebit ? `-${amount}`:isCredit ? amount:amount}</TableCell>
                        <TableCell className="pl-2 pr-10">
                          <CategoryBadge category={status} />
                        </TableCell>
                        <TableCell className="pl-2 pr-10 min-w-32">{formatDateTime(new Date(transaction.date)).dateTime}</TableCell>
                        <TableCell className="pl-2 pr-10 max-md:hidden capitalize min-w-24">{transaction.paymentChannel}</TableCell>
                        <TableCell className="pl-2 pr-10 max-md:hidden"><CategoryBadge category={transaction.category} /></TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
        </Table>
    </div>
    
  )
}

export default TransactionsTable
