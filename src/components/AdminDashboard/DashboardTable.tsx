import { isDifferenceGreaterThanOneYear } from "@/utils"
import Link from "next/link"
import { HashLoader } from "react-spinners"

type Props = {
  loading: boolean
  allUsers: User[] | undefined
}

const MemberRow = ({ member, idx }: { member: User; idx: number }) => {
  const {
    firstName,
    lastName,
    email,
    suffix,
    premium,
    address1,
    address2,
    city,
    state,
    zip,
    cell_phone,
    work_phone,
    is_active,
    department,
    otherDepartment,
    member_type,
    payment_date,
    join_date,
    member_number,
  } = member

  
  const evenOddClassesHandler = (): string => {
    if (idx % 2 === 0) return "bg-white border-b"
    else return "border-b bg-gray-50"
  }
  
  const payDate = new Date(payment_date || "")
  const currentDate = new Date()
  const diffCheck1year = isDifferenceGreaterThanOneYear(payDate, currentDate)

  let departmentValue: string | undefined = ""
  if(department !== "Other") departmentValue = department
  else departmentValue = otherDepartment

  return (
    <tr className={`${evenOddClassesHandler()}`}>
      <td className="px-6 py-4">{member_number >= 0 && member_number}</td>
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {`${firstName} ${lastName}`}
      </th>
      <td className="px-6 py-4">{suffix && suffix}</td>
      <td className="px-6 py-4">{email && email}</td>
      <td className="px-6 py-4">{premium && `${premium == "true" ? "Paid" : "Un Paid"}`}</td>
      <td className="px-6 py-4">{address1 && address1}</td>
      <td className="px-6 py-4">{address2 && address2}</td>
      <td className="px-6 py-4">{city && city}</td>
      <td className="px-6 py-4">{state && state}</td>
      <td className="px-6 py-4">{zip && zip}</td>
      <td className="px-6 py-4">{cell_phone && cell_phone}</td>
      <td className="px-6 py-4">{work_phone && work_phone}</td>
      {/* <td className="px-6 py-4">{department && department === "Other" && otherDepartment && otherDepartment}</td> */}
      <td className="px-6 py-4">{departmentValue && departmentValue}</td>
      <td className="px-6 py-4">{is_active && is_active}</td>
      <td className="px-6 py-4">{member_type && member_type}</td>
      <td className={`px-6 py-4 whitespace-nowrap ${diffCheck1year && 'text-red-500 font-extrabold'}`}>
        {payment_date && new Date(payment_date).toDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {join_date && new Date(join_date).toDateString()}
      </td>
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

export function DashboardTable({ loading, allUsers }: Props) {
  if (loading) {
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
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Member Number
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Name
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Suffix
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Email
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Payment Status
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Address Line 1
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Address Line 2
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              City
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              State
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Zip
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Cell Phone
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Work Phone
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Department
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Active Status
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Member Type
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Payment Date
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              Join Date
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
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
