"use client"
import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { dummyMembers, useAuthContext } from "../Auth"
import { useError } from "@/hooks"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
  variant: "login" | "sign up"
}

function LoginForm({ error }: { error: string }) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPass, setShowPass] = useState<boolean>(false)
  return (
    <div className="p-6">
      {error && <span className="text-red-700 font-semibold text-xs mt-4">{error}</span>}
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Sign in to your account
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="name@company.com"
            required
            autoComplete="email"
          />
        </div>
        <div className=" relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => !prev)}
          >
            {!showPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full relative text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>

        <div className="flex gap-2 justify-center text-xs mt-4">
          Not a member?
          <Link className="font-semibold hover:underline text-blue-600" href="/sign-up">Sign Up</Link>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-5">
        <button
          type="button"
          className="border text-black font-normal rounded-lg text-xs p-2 text-center"
          onClick={() => {
            setEmail("admin@admin.com")
            setPassword("passwordadmin")
          }}
        >
          Get Admin Credentials
        </button>
        <button
          type="button"
          className="border text-black font-normal rounded-lg text-xs p-2 text-center"
          onClick={() => {
            setEmail("user@user.com")
            setPassword("passworduser")
          }}
        >
          Get User Credentials
        </button>
      </div>
    </div>
  )
}

function SignUpForm({ error }: { error: string }) {
  
  const [showPass, setShowPass] = useState<boolean>(false)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Sign Up
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 ">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="Enter First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="name@company.com"
            required
            autoComplete="email"
          />
        </div>
        <div className=" relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Enter Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => !prev)}
          >
            {!showPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full relative text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {error && (
            <span className="text-red-700 absolute top-[calc(100%-0.6rem)] left-0 font-semibold text-xs mt-4">
              {error}
            </span>
          )}
          Sign Up
        </button>

        <div className="flex gap-2 justify-center text-xs mt-4">
          Already a member?
          <Link className="font-semibold hover:underline text-blue-600" href="/">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export function FormContainer({ variant = "login" }: Props) {
  const { error, setError } = useError()
  const router = useRouter()
  const { setMember } = useAuthContext()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const { email, password } = Object.fromEntries(formData.entries())

    const tempMember = dummyMembers.find(m => m.email === email)
    if (!tempMember) setError("No member found with that email address")
    else {
      if (tempMember?.password !== password) setError("The password is incorrect.")
      else {
        setMember(tempMember)
        switch (tempMember.role) {
          case "ADMIN":
            router.push("/admin-dashboard")
            break
          case "USER":
            router.push("/dashboard")
            break
        }
      }
    }
  }

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
  }

  return (
    <form
      onSubmit={variant === "login" ? handleSubmit : handleSignUpSubmit}
      className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "
    >
      {variant === "login" && <LoginForm error={error} />}
      {variant === "sign up" && <SignUpForm error={error} />}
    </form>
  )
}
