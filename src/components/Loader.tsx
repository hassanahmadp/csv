'use client'
import React from "react"
import { createPortal } from "react-dom"
import { HashLoader } from "react-spinners"

type Props = {}

export function Loader({}: Props) {
  const Spinner = (
    <HashLoader
      color={"#000"}
      loading={true}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )

  return (
    createPortal(<div className="h-screen w-screen z-50 bg-gray-100 fixed top-0 left-0 flex justify-center items-center">
      {Spinner}
    </div>, document.getElementById('modal-loader') as Element)
  )
}
