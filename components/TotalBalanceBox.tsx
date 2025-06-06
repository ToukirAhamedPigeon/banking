import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({
    accounts = [],
    totalBanks,
    totalCurrentBalance
}:TotlaBalanceBoxProps
) => {
  return (
    <div className='total-balance dark:border-blue-900'>
      <div className="total-balance-chart">
        <DoughnutChart 
         accounts={accounts}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2 dark:text-slate-200">
            Bank Accounts: {totalBanks} 
        </h2>
        <div className="flex flex-col gap-2">
            <div className='total-balance-label dark:text-gray-400'>
              Total Available Balance
            </div>
            <div className='total-balance-amount flex-center gap-2'>
                <AnimatedCounter amount={totalCurrentBalance}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TotalBalanceBox
