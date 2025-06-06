import React from 'react'
import { logoutAccount } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import { useLoader } from "@/contexts/LoaderContext"

const Footer = ({user,type = 'desktop'}:FooterProps) => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader()
  const handleLogOut = async () => {
    showLoader('Good Bye!')
    const loggedOut= await logoutAccount();
    //console.log(loggedOut);
    if(loggedOut) router.push('/sign-in')
      hideLoader(null,1500)
  }
  return (
    <>
    <div className="mb-20">
      <footer className='footer !pb-0'>
          <div className={type=== 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
              <p className='text-xl font-bold text-gray-700'>
                  {
                      user?.firstName[0]
                  }
              </p>
          </div>
          <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className='text-14 truncate text-gray-700 dark:text-gray-300 font-semibold'>
                  {user?.firstName}  {user?.lastName}
            </h1>
            <p className='text-14 truncate font-normal text-gray-600 dark:text-gray-400'>
                  {user?.email}
            </p>
          </div>
      </footer>
      <div className='footer'>
          <button type="button" className="w-full bg-blue-500 p-2 relative text-white text-sm rounded" onClick={handleLogOut}>
              Logout
            </button>
      </div>
    </div>
   </>
  )
}

export default Footer
