"use client"
import { Loader } from "@/components"
import { logout } from "@/lib"
import { useRouter } from "next/navigation"
import React , {useState} from "react"
import toast from 'react-hot-toast'

type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Props) {
  const [loading, setLoading] = useState(false)
  const {push} = useRouter()
  
  const logoutHandler = async () => {
    try {
      setLoading(true)
      await logout()
      await push('/')
      setLoading(false)
      toast.success("Logout Successful")
    } catch (error:any) {
      setLoading(false)
      console.error({error: error.message})
      toast.error("Logout Failed")
    } finally {
      setLoading(false)
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
        {loading && <Loader/>}
      </div>
      {children}
    </div>
  )
}
