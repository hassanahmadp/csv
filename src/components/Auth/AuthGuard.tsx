"use client"
import { useRouter, usePathname } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

type AuthContextReturnType = {
  member: User | Admin | null
  setMember: React.Dispatch<React.SetStateAction<User | Admin | null>>
  authorized: boolean
}

const initialValue: any = {}

const AuthContext = createContext(initialValue)

const routes: {
  PUBLIC_ROUTES: string[]
  USER_ROUTES: string[]
  ADMIN_ROUTES: string[]
} = {
  PUBLIC_ROUTES: ["/"],
  USER_ROUTES: ["/dashboard"],
  ADMIN_ROUTES: ["/admin-dashboard", "/user-info"],
}

const dummyUser: User = {
  firstName: 'John',
  lastName: 'Doe',
  email: "user@user.com",
  password: "password",
  role: "USER",
  other: {}
}
const dummyAdmin: Admin = {
  firstName: 'Tom',
  lastName: 'Wick',
  email: "admin@admin.com",
  password: "password",
  role: "ADMIN",
}

const dummyMembers: (User | Admin)[] = [dummyUser, dummyAdmin]

export function AuthGuard({ children }: Props) {
  const [authorized, setAuthorized] = useState<boolean>(false)
  const [member, setMember] = useState<User | Admin | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authCheck = async () => {
      const tempUser = dummyMembers.find(mem => mem.email === member?.email)
      if (!tempUser) {
        if (!routes.PUBLIC_ROUTES.includes(pathname.split("?")[0])) {
          setAuthorized(false)
          return
        }
      } else {
        if(!routes[`${tempUser?.role}_ROUTES`].includes(pathname.split("?")[0])) {
          setAuthorized(false)
          return
        }
      }
      setAuthorized(true)
    }
    authCheck()
  }, [member, router])

  return (
    <AuthContext.Provider value={{ member, setMember, authorized }}>
      {authorized ? (
        children
      ) : (
        <div className="flex h-screen w-screen justify-center items-center">
          <h1 className="max-w-lg font-extrabold text-6xl">Loading...</h1>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextReturnType => useContext(AuthContext)
