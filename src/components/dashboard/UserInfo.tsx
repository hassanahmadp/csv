"use client"
import { FormContainer, InfoElement, Loader, LoadingButton, Modal } from "@/components"
import { getCurrentUser, getUser, updateUserData } from "@/lib"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import { HashLoader } from "react-spinners"
import toast from "react-hot-toast"
import Link from "next/link"

type Props = {
  variant: "current" | "id"
  userId?: string
}

export function UserInfo({ variant = "current", userId }: Props) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const pathname = usePathname()

  let isAdmin: boolean = pathname.split("admin-dashboard").length > 1

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLoading(true)

    const target = evt.target as HTMLFormElement
    const formData = new FormData(target)
    const values = Object.fromEntries(formData.entries())

    if (currentUser?._id) {
      const response = await updateUserData(currentUser._id, values)
      if (response?.data?.success) toast.success("Info updated successfully.")
      else toast.error("There is some issue in updating info.")
    } else {
      toast.error("User not found")
    }

    setLoading(false)
  }

  const keyDownHandler = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault()
      return false
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      let user
      if (variant === "current") {
        user = await getCurrentUser()
        setCurrentUser(user)
      } else if (variant === "id") {
        user = await getUser(userId || "")
      }
      setCurrentUser(user)
    }
    fetchCurrentUser()
  }, [])

  if (!currentUser) {
    return <Loader />
  }

  let userInfoKeyValuePair = Object.entries({
    premium: currentUser?.premium,
    suffix: currentUser?.suffix,
    address1: currentUser?.address1,
    address2: currentUser?.address2,
    city: currentUser?.city,
    state: currentUser?.state,
    zip: currentUser?.zip,
    role: currentUser?.role,
    cell_phone: currentUser?.cell_phone,
    work_phone: currentUser?.work_phone,
    department: currentUser?.department,
    is_active: currentUser?.is_active,
    member_type: currentUser?.member_type,
    payment_date: currentUser?.payment_date,
    join_date: currentUser?.join_date,
  })
  return (
    <>
      <div className="border-b">
        <div className="container w-full mx-auto py-8 px-4">
          {isAdmin && (
            <div className="mb-5">
              <Link
                href="/admin-dashboard"
                className="text-white transition-all w-24 duration-150 bg-black border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Go Back
              </Link>
            </div>
          )}
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
        {userInfoKeyValuePair?.map(el => {
          return <InfoElement key={el[0]} element={el} />
        })}
        <LoadingButton
          loading={loading}
          buttonProps={{
            type: "submit",
            className:
              "text-white transition-all w-24 duration-150 bg-black border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center",
          }}
        >
          Save
        </LoadingButton>
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
