"use client"
import { FormContainer, InfoElement, Modal } from "@/components"
import { getCurrentUser, getUser, updateUserData } from "@/lib"
import { useState, useEffect } from "react"
import Loader from "../Loader"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"

type Props = {
  variant: "current" | "id"
  userId?: string
}

export function UserInfo({ variant = "current", userId }: Props) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)

  const pathname = usePathname()

  let isAdmin:boolean = pathname.split('admin-dashboard').length > 1

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const target = evt.target as HTMLFormElement
    const formData = new FormData(target)
    const values = Object.fromEntries(formData.entries())

    if (currentUser?._id) {
      await updateUserData(currentUser._id, values)
    }

    console.log(values)
  }

  const keyDownHandler = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault()
      return false
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (variant === "current") {
        const user = await getCurrentUser()
        setCurrentUser(user)
      } else if (variant === "id") {
        const user = await getUser(userId || "")
        setCurrentUser(user)
      }
    }
    fetchCurrentUser()
  }, [])



  if (!currentUser) {
    return <Loader />
  }

  let userInfoKeyValuePair = Object.entries({
    premium: currentUser?.other?.premium,
    address: currentUser?.other?.address,
    city: currentUser?.other?.city,
    state: currentUser?.other?.state,
    zip: currentUser?.other?.zip,
    home_phone: currentUser?.other?.home_phone,
    work_phone: currentUser?.other?.work_phone,
    department: currentUser?.other?.department,
    is_active: currentUser?.other?.is_active,
    group_email: currentUser?.other?.group_email,
    member_role: currentUser?.other?.member_role,
    member_type: currentUser?.other?.member_type,
    year: currentUser?.other?.year,
  })
  return (
    <>
      <div className="border-b">
        <div className="container w-full mx-auto py-8 px-4">
          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <h2 className="font-extrabold text-4xl">{`${currentUser?.firstName} ${currentUser?.lastName}`}</h2>
              <h3 className="text-lg">{currentUser?.email}</h3>
            </div>
            <div className="ml-auto gap-3 flex flex-wrap">
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className=" text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isAdmin ? "Set Password" : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        className="container w-full mx-auto py-8 px-4"
        onKeyDown={keyDownHandler}
        onSubmit={handleSubmit}
      >
        {currentUser?.other &&
          userInfoKeyValuePair?.map(el => {
            return <InfoElement key={el[0]} element={el} />
          })}
        {/* {editAccess && ( */}
        <button
          type="submit"
          className="text-white transition-all duration-150 bg-black hover:text-black hover:bg-white border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Save
        </button>
        {/* )} */}
      </form>
      {showPasswordModal &&
        createPortal(
          <Modal setShowModal={setShowPasswordModal} maxWidth="sm">
            <FormContainer
              variant={isAdmin ? "set pass" : "change pass"}
              setShowModal={setShowPasswordModal}
              userId={currentUser?._id}
              through="modal"
            />
          </Modal>,
          document.querySelector("#modal") as Element,
        )}
    </>
  )
}
