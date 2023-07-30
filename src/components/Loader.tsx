'use client'
import React, {useState, useEffect} from "react"
import { createPortal } from "react-dom"
import { HashLoader } from "react-spinners"

type Props = {}

export function Loader({}: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Don't render anything on the server-side
  }

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
