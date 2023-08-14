"use client"
import { usePathname } from "next/navigation"
import React, { ChangeEvent, useState } from "react"
type Props = {
  element: [string, any]
}

export const capitalize = (str: string, splitChar: string = " ", joinChar: string = " ") =>
  str
    .split(splitChar)
    .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(joinChar)

export function InfoElement({ element }: Props) {
  const [inputValue, setInputValue] = useState<string>(element[1])
  const numberTypes = ["zip", "year"]

  const pathname = usePathname()

  let isAdmin: boolean = pathname.split("admin-dashboard").length > 1

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  let title: string = ""
  let InputElement: React.ReactNode
  if (element[0] === "is_active") {
    if (isAdmin) {
      title = "Active Status"
      InputElement = (
        <div className="flex gap-6 flex-wrap">
          <div className="flex gap-4">
            <input
              type="radio"
              name="is_active"
              id="active"
              checked={inputValue === "active"}
              value="active"
              onChange={handleRadioChange}
            />
            <label htmlFor="active">Active</label>
          </div>
          <div className="flex gap-4">
            <input
              type="radio"
              name="is_active"
              id="retired"
              checked={inputValue === "retired"}
              value="retired"
              onChange={handleRadioChange}
            />
            <label htmlFor="retired">Retired</label>
          </div>
          <div className="flex gap-4">
            <input
              type="radio"
              name="is_active"
              id="deceased"
              checked={inputValue === "deceased"}
              value="deceased"
              onChange={handleRadioChange}
            />
            <label htmlFor="deceased">Deceased</label>
          </div>
        </div>
      )
    }
  } else if (element[0] === "premium") {
    if (isAdmin) {
      title = "Is Paid User?"
      InputElement = (
        <div className="flex gap-4">
          <input type="text" hidden name="premium" value={inputValue} />
          <input
            type="checkbox"
            id="premium"
            checked={inputValue === "true"}
            value={`${inputValue === "true"}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const checkedValue = `${e.target.checked}`
              setInputValue(checkedValue)
            }}
          />
          <label htmlFor="premium">Premium</label>
        </div>
      )
    }
  } else if (element[0] === "department") {
    title = "Department"
    let options = [
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
      { title: "NCPD ", value: "NCPD " },
      { title: "NYC DOC", value: "NYC DOC" },
      { title: "NYC Sanitation Police", value: "NYC Sanitation Police" },
      { title: "NYC Sheriff", value: "NYC Sheriff" },
      { title: "NYPD", value: "NYPD" },
      { title: "NYS Court Officers ", value: "NYS Court Officers " },
      { title: "NYS Trooper", value: "NYS Trooper" },
      { title: "Out of State Corrections", value: "Out of State Corrections" },
      { title: "Out of State Other", value: "Out of State Other" },
      { title: "Out of State Police", value: "Out of State Police" },
      { title: "Out of State Sherriff ", value: "Out of State Sherriff " },
      { title: "Postal Police ", value: "Postal Police " },
      { title: "Quogue PD", value: "Quogue PD" },
      { title: "RVC Police ", value: "RVC Police " },
      { title: "SC Sheriff", value: "SC Sheriff" },
      { title: "SCPD ", value: "SCPD " },
      { title: "Village PD Other", value: "Village PD Other" },
      { title: "Other", value: "Other" },
    ]
    InputElement = (
      <div className="flex gap-4">
        <select
          name="department"
          className="bg-gray-50 border max-w-sm w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-0 py-2.5 "
          id="department"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        >
          {options.map(option => (
            <option key={option.title} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    )
  } else if (element[0] === "role") {
    // title = "Role"
    // let options = [
    //   { title: "User", value: "USER" },
    //   { title: "Admin", value: "ADMIN" },
    // ]
    // InputElement = (
    //   <div className="flex gap-4">
    //     <select
    //       name="department"
    //       className="bg-gray-50 border max-w-4xl w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-0 py-2.5 "
    //       id="department"
    //       value={inputValue}
    //       onChange={e => setInputValue(e.target.value)}
    //     >
    //       {options.map(option => (
    //         <option key={option.title} value={option.value}>
    //           {option.title}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // )
  } else if (["join_date", "payment_date"].includes(element[0])) {
    if (element[0] === "payment_date") {
      if (isAdmin) {
        title = "Payment Date"
        InputElement = (
          <input
            type="date"
            name={element[0]}
            id={element[0]}
            placeholder={"Enter " + title}
            onInput={() => setInputValue("")}
            defaultValue={
              inputValue.length > 0 ? new Date(inputValue).toISOString().split("T")[0] : ""
            }
            onChange={e => setInputValue(e.target.value)}
            className="bg-gray-50 border max-w-sm w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
          />
        )
      }
    } else {
      title = "Join Date"
      InputElement = (
        <input
          type="date"
          disabled
          name={element[0]}
          id={element[0]}
          placeholder={"Enter " + title}
          defaultValue={new Date(inputValue).toISOString().split("T")[0]}
          onChange={e => setInputValue(e.target.value)}
          className="bg-gray-50 border max-w-sm w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      )
    }
  } else {
    if (typeof inputValue !== "boolean") {
      title = capitalize(element[0], "_", " ")
      InputElement = (
        <input
          type={`${numberTypes.includes(element[0]) ? "number" : "text"}`}
          name={element[0]}
          id={element[0]}
          placeholder={"Enter " + title}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 max-w-sm w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      )
    }
  }

  if (title) {
    return (
      <div className="flex mb-6 flex-wrap items-start">
        <label htmlFor={element[0]} className="font-bold text-lg w-full max-w-[15rem] flex-auto">
          {title}:
        </label>
        {InputElement}
      </div>
    )
  } else return <React.Fragment></React.Fragment>
}
