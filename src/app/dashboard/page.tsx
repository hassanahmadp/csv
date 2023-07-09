"use client"
import { InfoElement } from "@/components"
import React from "react"

type Props = {}

const dummyCompleteUserInfo: User = {
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
}

export default function Dashboard({}: Props) {
  const { other, firstName, lastName, email } = dummyCompleteUserInfo
  const UserInfoKeyValuePair = Object.entries(other)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const target = evt.target as HTMLFormElement
    const formData = new FormData(target)
    const values = Object.fromEntries(formData.entries())

    console.log(values)
  }

  return (
    <>
      <div className="border-b">
        <div className="container w-full mx-auto py-8 px-4">
          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <h2 className="font-extrabold text-4xl">{`${firstName} ${lastName}`}</h2>
              <h3 className="text-lg">{email}</h3>
            </div>
            <div className="ml-auto gap-3 flex flex-wrap">
              {/* <button
                type="button"
                className=" text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Edit my profile
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <form className="container w-full mx-auto py-8 px-4" onSubmit={handleSubmit}>
        {UserInfoKeyValuePair.map(el => {
          return <InfoElement key={el[0]} element={el} />
        })}
        <button
          type="submit"
          className="text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  )
}
