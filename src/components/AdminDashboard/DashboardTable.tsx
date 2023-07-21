"use client"
import React from "react"
import { dummyUsers } from "../Auth"

export const MemberRow = ({ member, idx }: { member: User, idx: number }) => {
  const { firstName, lastName, email, role, other } = member
  const {
    zip,
    year,
    work_phone,
    state,
    member_type,
    member_role,
    is_active,
    home_phone,
    group_email,
    department,
    city,
    address,
  } = other as OtherUserInfo

  const evenOddClassesHandler = ():string => {
    if(idx % 2 === 0) return "bg-white border-b"
    else return "border-b bg-gray-50"
  }

  return (
    <tr className={evenOddClassesHandler()}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {`${firstName} ${lastName}`}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{address}</td>
      <td className="px-6 py-4">{city}</td>
      <td className="px-6 py-4">{state}</td>
      <td className="px-6 py-4">{zip}</td>
      <td className="px-6 py-4">{home_phone}</td>
      <td className="px-6 py-4">{work_phone}</td>
      <td className="px-6 py-4">{department}</td>
      <td className="px-6 py-4">{is_active}</td>
      <td className="px-6 py-4">{group_email}</td>
      <td className="px-6 py-4">{member_role}</td>
      <td className="px-6 py-4">{member_type}</td>
      <td className="px-6 py-4">{year}</td>
    </tr>
  )
}

type Props = {}

export function DashboardTable({}: Props) {
  return (
    <table className="w-full text-sm text-left text-gray-500 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Address
          </th>
          <th scope="col" className="px-6 py-3">
            City
          </th>
          <th scope="col" className="px-6 py-3">
            State
          </th>
          <th scope="col" className="px-6 py-3">
            Zip
          </th>
          <th scope="col" className="px-6 py-3">
            Home Phone
          </th>
          <th scope="col" className="px-6 py-3">
            Work Phone
          </th>
          <th scope="col" className="px-6 py-3">
            Department
          </th>
          <th scope="col" className="px-6 py-3">
            Active Status
          </th>
          <th scope="col" className="px-6 py-3">
            Group Email
          </th>
          <th scope="col" className="px-6 py-3">
            Member Role
          </th>
          <th scope="col" className="px-6 py-3">
            Member Type
          </th>
          <th scope="col" className="px-6 py-3">
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        {dummyUsers.map((member, idx) => {
          return <MemberRow key={member.email} idx={idx} member={member} />
        })}
        {/* <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr> */}
        {/* <tr className="border-b bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr> */}
      </tbody>
    </table>
  )
}
