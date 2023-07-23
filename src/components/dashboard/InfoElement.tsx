"use client"
import { ChangeEvent, useState } from "react"
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

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  let title: string = ""
  let InputElement: React.ReactNode
  if (element[0] === "is_active") {
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
  } else if (element[0] === "premium") {
    title = "Is Premium User?"
    InputElement = (
      <div className="flex gap-4">
        <input type="text" hidden name="premium" value={inputValue}/>
        <input
          type="checkbox"
          id="premium"
          checked={inputValue === 'true'}
          value={`${inputValue === 'true'}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const checkedValue = `${e.target.checked}`
            setInputValue(checkedValue)
          }}
        />
        <label htmlFor="premium">Premium</label>
      </div>
    )
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
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      )
    }
  }

  return (
    <div className="flex mb-6 flex-wrap items-start">
      <label htmlFor={element[0]} className="font-bold text-lg w-full max-w-[15rem] flex-auto">
        {title}:
      </label>
      {InputElement}
    </div>
  )
}
