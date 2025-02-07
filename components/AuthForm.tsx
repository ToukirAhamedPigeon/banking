'use client'
import React, { useEffect, useState } from 'react'
import LogoLink from './LogoLink'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { signUp, signIn } from '@/lib/actions/user.actions'

const AuthForm = ({type}:{type:string}) => {
    const router = useRouter();
    // 1. Define your form.
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        try {
            //Sign up with Appwrite & create plaid token
            if(type === 'sign-up'){
                const newUser = await signUp(data);
                setUser(newUser);
            }

            if(type === 'sign-in'){
                console.log(type);
                const response = await signIn({
                    email: data.email,
                    password: data.password
                });

                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }
    const [user, setUser] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Ensure user state is only set after mounting
    useEffect(() => {
        setUser(false); // Set actual user status
    }, []);
    // Prevent hydration mismatch by not rendering until state is set
    if (user === null) return null;
    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <LogoLink />
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user 
                    ? 'Link Account'
                    : type === 'sign-in'
                    ? 'Sign In'
                    : 'Sign Up'}
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {
                            user
                            ?'Link your account to get started'
                            :'Please enter your details'
                        }
                    </p>
                </div>
            </header>
            {user ? 
                <div className="flex flex-col gap-4">
                    {/*PlaidLink*/}
                </div>
            :(
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} type='text' name='firstName' label='First Name' placeholder='Enter your First Name' />
                                    <CustomInput control={form.control} type='text' name='lastName' label='Last Name' placeholder='Enter your Last Name' />
                                </div>
                                    <CustomInput control={form.control} type='text' name='address1' label='Address' placeholder='Enter your Specific Address' />
                                    <CustomInput control={form.control} type='text' name='city' label='City' placeholder='Enter your City' />
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} type='text' name='state' label='State' placeholder='ex: NY' />
                                        <CustomInput control={form.control} type='text' name='postalCode' label='Postal Code' placeholder='ex: 11101' />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} type='text' name='dateOfBirth' label='Date of Birth' placeholder='yyyy-mm-dd' />
                                        <CustomInput control={form.control} type='text' name='ssn' label='SSN' placeholder='ex: 1234' />
                                    </div>
                                </>
                            )}
                            <CustomInput control={form.control} type='text' name='email' label='Email' placeholder='Enter your Email' />
                            <CustomInput control={form.control} type='password' name='password' label='Password' placeholder='Enter your Password' />
                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="form-btn" disabled={isLoading}>
                                    {
                                        isLoading?(
                                            <>
                                            <Loader2 size={20} className="animate-spin"/> &nbsp; Loading...
                                            </>
                                        ):type === 'sign-in' ? 'Sign In' : 'Sign Up'
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p>
                            {
                                type==='sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"
                            }
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up':'/sign-in'} className='text-blue-500'> {type === 'sign-in' ? 'Sign Up':'Sign In'} </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
