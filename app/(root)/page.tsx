import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = {
    firstName: 'Toukir Ahamed',
    lastName: 'Pigeon',
    email: 'toukir.ahamed.pigeon@gmail.com',
    $id: '1',
    userId: 'user123',
    dwollaCustomerUrl: 'https://api.dwolla.com/customers/123',
    dwollaCustomerId: '123',
    address1: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postalCode: '12345',
    phoneNumber: '555-555-5555',
    dateOfBirth: '1990-01-01',
    ssn: '123-45-6789',
  }
  return (
    <section className='home'>
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        Recent Transactions
      </div>
      <RightSidebar 
          user = {loggedIn}
          transactions={[]}
          banks={[
            // {
            //   currentBalance:1000.35
            // },
            // {
            //   currentBalance:250
            // }
        ]}
        />
    </section>
  )
}

export default Home
