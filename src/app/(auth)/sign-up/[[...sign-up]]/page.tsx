import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <SignUp signInUrl='/sign-in' />
        </div>
    )
}

export default SignUpPage