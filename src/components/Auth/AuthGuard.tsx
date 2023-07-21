"use client"
import { useStorage } from "@/hooks"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"
import { HashLoader } from "react-spinners"

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
  PUBLIC_ROUTES: ["/", "/sign-up"],
  USER_ROUTES: ["/dashboard"],
  ADMIN_ROUTES: ["/admin-dashboard", "/user-info"],
}

const dummyUser: User = {
  firstName: "John",
  lastName: "Doe",
  email: "user@user.com",
  password: "passworduser",
  role: "USER",
  other: {},
}
const dummyAdmin: Admin = {
  firstName: "Tom",
  lastName: "Wick",
  email: "admin@admin.com",
  password: "passwordadmin",
  role: "ADMIN",
}

export const dummyMembers: (User | Admin)[] = [dummyUser, dummyAdmin]

export const dummyUsers: User[] = [
  {
    firstName: "John Smith",
    lastName: "Doe",
    email: "john@doe.com",
    password: "fdjkls",
    role: "USER",
    other: {
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "123",
      home_phone: "",
      work_phone: "",
      department: "",
      is_active: "active",
      group_email: "",
      member_role: "",
      member_type: "",
      year: "2014",
    },
  },
  {
    firstName: "user1 Smith",
    lastName: "Doe",
    email: "user1@doe.com",
    password: "fdjkls",
    role: "USER",
    other: {
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "123",
      home_phone: "",
      work_phone: "",
      department: "",
      is_active: "active",
      group_email: "",
      member_role: "",
      member_type: "",
      year: "2014",
    },
  },
]

export default function AuthGuard({ children }: Props) {
  const { value: authorized, setValue: setAuthorized } = useStorage<boolean>(
    "AUTHORIZED",
    false,
    "session",
  )
  const { value: member, setValue: setMember } = useStorage<User | Admin | null>(
    "MEMBER",
    null,
    "session",
  )
  const Spinner = (
    <HashLoader
      color={"#000"}
      loading={true}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
  const [message, setMessage] = useState<string | React.ReactNode>(Spinner)
  const [authorizedLink, setAuthorizedLink] = useState<string>("")
  const pathname = usePathname()

  const router = useRouter()

  useEffect(() => {
    const authCheck = async () => {
      const tempUser = dummyMembers.find(mem => mem.email === member?.email)
      if (!tempUser) {
        if (!routes.PUBLIC_ROUTES.includes(pathname.split("?")[0])) {
          setAuthorized(false)
          router.push("/")
        }
      } else {
        if (!routes[`${tempUser?.role}_ROUTES`].includes(pathname.split("?")[0])) {
          setAuthorized(false)
          setAuthorizedLink(routes[`${tempUser?.role}_ROUTES`][0])
          return
        }
      }
      setAuthorized(true)
    }
    authCheck()
  }, [member, pathname])

  useEffect(() => {
    let t = setTimeout(() => {
      setMessage("You are not authorized to access this page.")
    }, 2000)
    return () => {
      clearTimeout(t)
    }
  }, [authorized])

  return (
    <AuthContext.Provider value={{ member, setMember, authorized }}>
      {authorized ? (
        children
      ) : (
        <div className="flex h-screen w-screen justify-center items-center gap-6 flex-col">
          <h1 className="max-w-lg font-extrabold text-center text-6xl">{message}</h1>
          {typeof message === "string" && message.split(" ")[0] === "You" && (
            <Link
              onClick={() => setMessage(Spinner)}
              href={authorizedLink}
              className="p-2 border w-72 text-center bg-black hover:bg-white text-white hover:text-black"
            >
              Redirect to my Authorized page
            </Link>
          )}
        </div>
      )}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextReturnType => useContext(AuthContext)
