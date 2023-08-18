"use client"

import { usePathname } from "next/navigation"
import React, { ChangeEvent } from "react"

type Props = {
  inputValues: EditFormValues
  setInputValues: React.Dispatch<React.SetStateAction<EditFormValues>>
}

const formKeys = {
  is_active: "is_active",
  premium: "premium",
  suffix: "suffix",
  address1: "address1",
  address2: "address2",
  city: "city",
  state: "state",
  zip: "zip",
  cell_phone: "cell_phone",
  work_phone: "work_phone",
  department: "department",
  otherDepartment: "otherDepartment",
  member_type: "member_type",
  payment_date: "payment_date",
  join_date: "join_date",
} as const

let departmentOptions = [
  { title: "Select One", value: "" },
  { title: "Amtrak PD", value: "Amtrak PD" },
  { title: "Bay Constable", value: "Bay Constable" },
  { title: "Federal Corrections", value: "Federal Corrections" },
  { title: "Freeport PD", value: "Freeport PD" },
  { title: "Hempstead PD", value: "Hempstead PD" },
  { title: "Long Beach PD", value: "Long Beach PD" },
  { title: "Lynbrook PD", value: "Lynbrook PD" },
  { title: "Malvern PD", value: "Malvern PD" },
  { title: "NC DA Squad", value: "NC DA Squad" },
  { title: "NC Probation", value: "NC Probation" },
  { title: "NC Sheriff", value: "NC Sheriff" },
  { title: "NCPD", value: "NCPD" },
  { title: "NYC DOC", value: "NYC DOC" },
  { title: "NYC Sanitation Police", value: "NYC Sanitation Police" },
  { title: "NYC Sheriff", value: "NYC Sheriff" },
  { title: "NYPD", value: "NYPD" },
  { title: "NYS Court Officers", value: "NYS Court Officers" },
  { title: "NYS Trooper", value: "NYS Trooper" },
  { title: "Out of State Corrections", value: "Out of State Corrections" },
  { title: "Out of State Other", value: "Out of State Other" },
  { title: "Out of State Police", value: "Out of State Police" },
  { title: "Out of State Sherriff", value: "Out of State Sherriff" },
  { title: "Postal Police", value: "Postal Police" },
  { title: "Quogue PD", value: "Quogue PD" },
  { title: "RVC Police", value: "RVC Police" },
  { title: "SC Sheriff", value: "SC Sheriff" },
  { title: "SCPD", value: "SCPD" },
  { title: "Village PD Other", value: "Village PD Other" },
  { title: "Other", value: "Other" },
]

export function InfoForm({ inputValues, setInputValues }: Props) {
  const pathname = usePathname()

  debugger
  let isAdmin: boolean = pathname.split("admin-dashboard").length > 1

  const handleChange =
    (key: (typeof formKeys)[keyof typeof formKeys], type: "value" | "check" = "value") =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInputValues(prev => {
        return {
          ...prev,
          // @ts-ignore
          [key]: type === "value" ? e.target.value : `${e.target.checked}`,
        }
      })
    }
  const handleDepartmentChange =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInputValues(prev => {
        let first = prev[formKeys.department]?.split("-&&-")[0]
        let last = prev[formKeys.department]?.split("-&&-")[1]
        if(first !== 'Other') last = ""

        let arr:[string, string] = [`${first}`,`${last}`]
        arr[index] = e.target.value
        return {
          ...prev,
          // @ts-ignore
          [formKeys.department]: arr.join('-&&-'),
        }
      })
    }

  return (
    <React.Fragment>
      {/* premium */}
      {isAdmin && (
        <div className="flex mb-6 flex-wrap items-start">
          <label
            htmlFor={formKeys.premium}
            className="font-bold text-lg w-full max-w-[15rem] flex-auto"
          >
            Is Paid User?
          </label>
          <div className="flex gap-4">
            <input type="text" hidden name="premium" value={inputValues.premium} />
            <input
              type="checkbox"
              id="premium"
              checked={inputValues.premium === "true"}
              value={`${inputValues.premium === "true"}`}
              onChange={handleChange(formKeys.premium, "check")}
            />
            <label htmlFor="premium">Premium</label>
          </div>
        </div>
      )}
      {/* Suffix */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.premium}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Suffix
        </label>
        <input
          type="text"
          name={formKeys.suffix}
          id={formKeys.suffix}
          placeholder="Enter Suffix"
          value={inputValues.suffix}
          onChange={handleChange(formKeys.suffix)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* Address 1 */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.address1}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Address 1
        </label>
        <input
          type="text"
          name={formKeys.address1}
          id={formKeys.address1}
          placeholder="Enter Address 1"
          value={inputValues.address1}
          onChange={handleChange(formKeys.address1)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* Address 2 */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.address2}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Address 2
        </label>
        <input
          type="text"
          name={formKeys.address2}
          id={formKeys.address2}
          placeholder="Enter Address 2"
          value={inputValues.address2}
          onChange={handleChange(formKeys.address2)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* City */}
      <div className="flex mb-6 flex-wrap items-start">
        <label htmlFor={formKeys.city} className="font-bold text-lg w-full max-w-[15rem] flex-auto">
          City
        </label>
        <input
          type="text"
          name={formKeys.city}
          id={formKeys.city}
          placeholder="Enter City Name"
          value={inputValues.city}
          onChange={handleChange(formKeys.city)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* State */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.state}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          State
        </label>
        <input
          type="text"
          name={formKeys.state}
          id={formKeys.state}
          placeholder="Enter State"
          value={inputValues.state}
          onChange={handleChange(formKeys.state)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* Zip */}
      <div className="flex mb-6 flex-wrap items-start">
        <label htmlFor={formKeys.zip} className="font-bold text-lg w-full max-w-[15rem] flex-auto">
          Zip
        </label>
        <input
          type="number"
          name={formKeys.zip}
          id={formKeys.zip}
          placeholder="Enter Zip"
          value={inputValues.zip}
          onChange={handleChange(formKeys.zip)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* cell phone */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.cell_phone}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Cell Phone
        </label>
        <input
          type="text"
          name={formKeys.cell_phone}
          id={formKeys.cell_phone}
          placeholder="Enter Cell Phone"
          value={inputValues.cell_phone}
          onChange={handleChange(formKeys.cell_phone)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* work phone */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.work_phone}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Work Phone
        </label>
        <input
          type="text"
          name={formKeys.work_phone}
          id={formKeys.work_phone}
          placeholder="Enter Work Phone"
          value={inputValues.work_phone}
          onChange={handleChange(formKeys.work_phone)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* department */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.work_phone}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Department
        </label>
        <div className="flex flex-col gap-4">
          <select
            name={formKeys.department}
            className="bg-gray-50 border max-w-sm w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-0 py-2.5 "
            id={formKeys.department}
            value={inputValues.department}
            onChange={handleChange(formKeys.department)}
          >
            {departmentOptions.map(option => (
              <option key={option.title} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
          {inputValues.department && inputValues.department === "Other" && (
            <input
              type="text"
              name={formKeys.otherDepartment}
              id={formKeys.otherDepartment}
              placeholder="Enter Other Department"
              value={inputValues.otherDepartment}
              onChange={handleChange(formKeys.otherDepartment)}
              className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
            />
          )}
        </div>
      </div>
      {/* member type */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.member_type}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Member Type
        </label>
        <input
          type="text"
          name={formKeys.member_type}
          id={formKeys.member_type}
          placeholder="Enter Member Type"
          value={inputValues.member_type}
          onChange={handleChange(formKeys.member_type)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
      {/* Active Status */}
      {isAdmin && (
        <div className="flex mb-6 flex-wrap items-start">
          <label
            htmlFor={formKeys.is_active}
            className="font-bold text-lg w-full max-w-[15rem] flex-auto"
          >
            Active Status
          </label>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-4">
              <input
                type="radio"
                name={formKeys.is_active}
                id="active"
                checked={inputValues.is_active === "active"}
                value="active"
                onChange={handleChange(formKeys.is_active)}
              />
              <label htmlFor="active">Active</label>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name={formKeys.is_active}
                id="retired"
                checked={inputValues.is_active === "retired"}
                value="retired"
                onChange={handleChange(formKeys.is_active)}
              />
              <label htmlFor="retired">Retired</label>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name={formKeys.is_active}
                id="deceased"
                checked={inputValues.is_active === "deceased"}
                value="deceased"
                onChange={handleChange(formKeys.is_active)}
              />
              <label htmlFor="deceased">Deceased</label>
            </div>
          </div>
        </div>
      )}
      {/* Payment date */}
      {isAdmin && (
        <div className="flex mb-6 flex-wrap items-start">
          <label
            htmlFor={formKeys.payment_date}
            className="font-bold text-lg w-full max-w-[15rem] flex-auto"
          >
            Payment Date
          </label>
          <input
            type="date"
            name={formKeys.payment_date}
            id={formKeys.payment_date}
            placeholder={"Enter Payment Date"}
            onInput={() => setInputValues(prev => ({ ...prev, payment_date: "" }))}
            defaultValue={
              inputValues?.payment_date?.length && inputValues?.payment_date?.length > 0
                ? new Date(inputValues.payment_date).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange(formKeys.payment_date)}
            className="bg-gray-50 border max-w-sm w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
          />
        </div>
      )}
      {/* Join date */}
      <div className="flex mb-6 flex-wrap items-start">
        <label
          htmlFor={formKeys.join_date}
          className="font-bold text-lg w-full max-w-[15rem] flex-auto"
        >
          Join Date
        </label>
        <input
          type="date"
          disabled
          name={formKeys.join_date}
          id={formKeys.join_date}
          defaultValue={
            inputValues.join_date && new Date(inputValues.join_date).toISOString().split("T")[0]
          }
          onChange={handleChange(formKeys.join_date)}
          className="bg-gray-50 border max-w-sm w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </div>
    </React.Fragment>
  )
}
