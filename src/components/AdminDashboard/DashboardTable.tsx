"use client"
import { useState, useEffect } from "react"
import { getAllUsers } from "@/lib"
import Link from "next/link"
import { HashLoader } from "react-spinners"
import { Loader } from "@/components"

type Props = {
  showModal?: boolean
}

const MemberRow = ({ member, idx }: { member: User; idx: number }) => {
  const {
    firstName,
    lastName,
    email,
    premium,
    address,
    city,
    state,
    zip,
    home_phone,
    work_phone,
    is_active,
    department,
    group_email,
    member_role,
    member_type,
    year,
  } = member

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
      <td className="px-6 py-4">{premium && `${premium}`}</td>
      <td className="px-6 py-4">{address && address}</td>
      <td className="px-6 py-4">{city && city}</td>
      <td className="px-6 py-4">{state && state}</td>
      <td className="px-6 py-4">{zip && zip}</td>
      <td className="px-6 py-4">{home_phone && home_phone}</td>
      <td className="px-6 py-4">{work_phone && work_phone}</td>
      <td className="px-6 py-4">{department && department}</td>
      <td className="px-6 py-4">{is_active && is_active}</td>
      <td className="px-6 py-4">{group_email && group_email}</td>
      <td className="px-6 py-4">{member_role && member_role}</td>
      <td className="px-6 py-4">{member_type && member_type}</td>
      <td className="px-6 py-4">{year && year}</td>
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

export function DashboardTable({ showModal }: Props) {
  const [allUsers, setAllUsers] = useState<User[] | undefined>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    const getUsers = async () => {
      const users = await getAllUsers()
      setAllUsers(users)
      setLoading(false)
    }
    if (!showModal) {
      getUsers()
    }
  }, [showModal])

  // const allUsers = await getAllUsers()

  if(loading) {
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

  if (allUsers) {
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
          {allUsers.length > 0 &&
            allUsers.map((user: User, idx: number) => {
              return <MemberRow key={user.email} idx={idx} member={user} />
            })}
          {allUsers.length <= 0 && (
            <tr className="text-center">
              <td colSpan={16}>
                <div className="p-8">No Users Found</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
