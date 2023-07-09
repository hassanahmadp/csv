"use client"
import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

type Props = {
  variant: 'login' | 'set password'
}

function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
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
        {/* <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 "
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 ">
                  Remember me
                </label>
              </div>
            </div>
          </div> */}
        <button
          type="submit"
          className="w-full text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}


export function FormContainer({variant = "login"}: Props) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target)
    const values = Object.fromEntries(formData.entries())

    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
      {variant === 'login' && <LoginForm/>}
    </form>
  )
}


