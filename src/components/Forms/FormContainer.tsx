"use client"
import React, { useEffect, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { logIn, signUp } from "@/lib"
import Members from "@/models/member"
import toast from 'react-hot-toast'
import { NextResponse } from "next/server"

type Props = {
  variant: "login" | "sign up",
  through?: 'route' | "modal"
}

function LoginForm() {
  const [showPass, setShowPass] = useState<boolean>(false)
  
  return (
    <div className="p-6">
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
          Sign in
        </button>

        <div className="flex gap-2 justify-center text-xs mt-4">
          Not a member?
          <Link className="font-semibold hover:underline text-blue-600" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

function SignUpForm() {
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

export function FormContainer({ variant = "login", through="route" }: Props) {
  const [ error, setError ] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      
      const target = event.target as HTMLFormElement
      const formData = new FormData(target)
      const obj: { [key: string]: string  } = {}
      formData.forEach((value, key) => {
        if (value instanceof File) {
        } else {
          obj[key] = value.toString()
        }
      })
  
      const { email, password } = obj
  
      const response:any = await logIn({email,password})
      
      if(!response) {
        setError("Invalid Email or Password")
      } else {
        toast.success("Login Successful!")
        if(response?.data?.role === 'ADMIN') router.push('/admin-dashboard')
        else if(response?.data?.role === "USER") router.push('/dashboard')
        else {
        }
      }

    } catch (error:any) {
      console.error({error:error.message})
      toast.error(error.message)
    }
  }

  const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const target = event.target as HTMLFormElement
      const formData = new FormData(target)
      const data = Object.fromEntries(formData.entries())
      const { firstName, lastName, email, password } = JSON.parse(JSON.stringify(data))
      const resp = await signUp({ firstName, lastName, email, password })
      console.log({ resp, data })
      toast.success("Signup Successful. Now login!")
      router.push("/")
    } catch (error: any) {
      console.log("handleSignUpSubmit >> error >> ", error)
    }
  }

  useEffect(() => {
    if(error) toast.error(error)
  }, [error])
  

  return (
    <form
      onSubmit={variant === "login" ? handleSubmit : handleSignUpSubmit}
      className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "
    >
      {variant === "login" && <LoginForm/>}
      {variant === "sign up" && <SignUpForm/>}
    </form>
  )
}
