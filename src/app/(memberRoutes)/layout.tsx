"use client"
import { useAuthContext } from "@/components"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Props) {
  const { setMember } = useAuthContext()

  return (
    <div>
      <div className="flex mx-auto pt-8 px-4 container">
        <button
          className="ml-auto border text-black font-normal rounded-lg text-xs p-2 text-center"
          onClick={() => {
            setMember(null)
          }}
        >
          Sign Out
        </button>
      </div>
      {children}
    </div>
  )
}
