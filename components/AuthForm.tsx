import Link from 'next/link'
import React from 'react'
import LogoLink from './LogoLink'


const AuthForm = ({type}:{type:string}) => {
  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
            <LogoLink />
        </header>
    </section>
  )
}

export default AuthForm
