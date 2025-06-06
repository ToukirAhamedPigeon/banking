import React, {useCallback, useState, useEffect } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({user, variant}:PlaidLinkProps) => {
    const router = useRouter();
    const [ token, setToken ] = useState('');
    useEffect(() => {
        const getLinkToken = async() => {
            const data = await createLinkToken(user); 
            setToken(data.linkToken);
        }
        getLinkToken();
    }, [user]);
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token:string) =>{
        await exchangePublicToken({publicToken: public_token,user});
        router.push('/');
    },[user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const {open, ready} = usePlaidLink(config);
  return (
    <>
      {variant === 'primary' ? (
        <Button onClick={()=>open()} className='plaidlink-primary !dark:text-slate-300' disabled={!ready}>
            Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button variant="ghost" onClick={()=>open()} className='plaidlink-ghost'>
            <Image src='/icons/connect-bank.svg' alt='connect bank' width={24} height={
                24} />
            <p className="hiddenl text-[16px] font-semibold text-black-2 xl:block !dark:text-slate-300">Connect Bank </p>
        </Button>
        ):(
        <Button onClick={()=>open()} className='plaidlink-default dark:text-slate-300'>
            <Image src='/icons/connect-bank.svg' alt='connect bank' width={24} height={
                24} />
            <p className="hiddenl text-[16px] font-semibold text-black-2 xl:block dark:text-slate-300">Connect Bank </p>
        </Button>
        )}
    </>
  )
}

export default PlaidLink
