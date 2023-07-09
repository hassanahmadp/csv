"use client"
import { ChangeEvent, useState } from "react"
type Props = {
  element: [string, any]
  onlyRead?: boolean
}

const capitalize = (str: string, splitChar: string = " ", joinChar: string = " ") =>
  str
    .split(splitChar)
    .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(joinChar)

export function InfoElement({ element, onlyRead = false }: Props) {
  const [inputValue, setInputValue] = useState<string>(element[1])
  const numberTypes = ["zip", "year"]

  let title: string = ""
  let InputElement: React.ReactNode
  if (element[0] === "is_active") {
    title = "Active Status"
    InputElement = (
      <>
        <div className="flex gap-6 flex-wrap">
          <div className="flex gap-4">
            <input
              type="radio"
              name="isactive"
              id="active"
              checked={inputValue === "active"}
              value="active"
              disabled={onlyRead}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <label htmlFor="active">Active</label>
          </div>
          <div className="flex gap-4">
            <input
              type="radio"
              name="isactive"
              id="deceased"
              checked={inputValue === "deceased"}
              value="deceased"
              disabled={onlyRead}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <label htmlFor="deceased">Deceased</label>
          </div>
        </div>
      </>
    )
  } else {
    title = capitalize(element[0], "_", " ")
    InputElement = (
      <>
        <input
          type={`${numberTypes.includes(element[0]) ? "number" : "text"}`}
          name={element[0]}
          id={element[0]}
          placeholder={"Enter " + title}
          disabled={onlyRead}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
        />
      </>
    )
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
