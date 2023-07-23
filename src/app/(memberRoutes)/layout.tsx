"use client"
import { logout } from "@/lib"
import { useRouter } from "next/navigation"
import React from "react"
import toast from 'react-hot-toast'

type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Props) {
  const {push} = useRouter()
  
  const logoutHandler = async () => {
    try {
      await logout()
      push('/')
      toast.success("Logout Successful")
    } catch (error:any) {
      console.error({error: error.message})
      toast.error("Logout Failed")
    }
  }

  return (
    <div>
      <div className="flex mx-auto pt-8 px-4 container">
        <button
          className="ml-auto border text-black font-normal rounded-lg text-xs p-2 text-center"
          onClick={logoutHandler}
        >
          Sign Out
        </button>
      </div>
      {children}
    </div>
  )
}
