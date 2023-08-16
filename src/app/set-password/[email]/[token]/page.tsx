import { FormContainer } from '@/components'
import { getDataFromToken } from '@/helpers'
import { logout } from '@/lib'
import React from 'react'

type Props = {
  params: {
    email: string,
    token: string
  }
}

export const dynamic = "force-dynamic"

export default async function Page({params}: Props) {

  await logout()

  let {email,token} = params; 
  email = email.replace('%40', '@')
  const tokenData = await getDataFromToken(token)

  if(tokenData?.email !== email) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center py-8 px-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center md:text-2xl ">
          You are not authorized to set Password.
        </h1>
      </main>
    ) 
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-8 px-4">
      <FormContainer variant="set pass" through='route' userId={tokenData?.id}/>
    </main>
  )
}