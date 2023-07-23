"use client"
import { useState, useEffect } from "react"
import { getAllUsers } from "@/lib"
import Link from "next/link"
import { HashLoader } from "react-spinners"

type Props = {}

const MemberRow = ({ member, idx }: { member: User; idx: number }) => {
  const { firstName, lastName, email, role, other } = member

  const evenOddClassesHandler = (): string => {
    if (idx % 2 === 0) return "bg-white border-b"
    else return "border-b bg-gray-50"
  }

  return (
    <tr className={evenOddClassesHandler()}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {`${firstName} ${lastName}`}
      </th>
      <td className="px-6 py-4">{email && email}</td>
      <td className="px-6 py-4">{other?.premium && other.premium}</td>
      <td className="px-6 py-4">{other?.address && other.address}</td>
      <td className="px-6 py-4">{other?.city && other?.city}</td>
      <td className="px-6 py-4">{other?.state && other?.state}</td>
      <td className="px-6 py-4">{other?.zip && other?.zip}</td>
      <td className="px-6 py-4">{other?.home_phone && other?.home_phone}</td>
      <td className="px-6 py-4">{other?.work_phone && other?.work_phone}</td>
      <td className="px-6 py-4">{other?.department && other?.department}</td>
      <td className="px-6 py-4">{other?.is_active && other?.is_active}</td>
      <td className="px-6 py-4">{other?.group_email && other?.group_email}</td>
      <td className="px-6 py-4">{other?.member_role && other?.member_role}</td>
      <td className="px-6 py-4">{other?.member_type && other?.member_type}</td>
      <td className="px-6 py-4">{other?.year && other?.year}</td>
      <td className="px-6 py-4">
        <Link
          href={`/admin-dashboard/${member._id}`}
          className="bg-blue-600  py-1 px-2 rounded-sm text-white"
          type="button"
        >
          Edit
        </Link>
      </td>
    </tr>
  )
}

export function DashboardTable({}: Props) {
  const [allUsers, setAllUsers] = useState<User[] | undefined>([])

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers()
      setAllUsers(users)
    }
    getUsers()
  }, [])

  // const allUsers = await getAllUsers()
  if (allUsers) {
    if (allUsers.length > 0) {
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
                Premium User
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user: User, idx: number) => {
              return <MemberRow key={user.email} idx={idx} member={user} />
            })}
          </tbody>
        </table>
      )
    } else {
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
                Premium User
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td colSpan={16}>
                <div className="p-8">No Users Found.</div>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  } else
    return (
      <div className="flex justify-center items-center min-h-[10rem]">
        <HashLoader
          color={"#000"}
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
}
