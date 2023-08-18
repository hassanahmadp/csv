"use client"
import { FormContainer, InfoForm, Loader, LoadingButton, Modal } from "@/components"
import { getCurrentUser, getUser, updateUserData } from "@/lib"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"

type Props = {
  variant: "current" | "id"
  userId?: string
}

const defaultUserValues: EditFormValues = {
  is_active: "active",
  premium: "false",
  suffix: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  cell_phone: "",
  work_phone: "",
  department: "",
  otherDepartment: "",
  member_type: "",
  payment_date: "",
  join_date: "",
} as const

export function UserInfo({ variant = "current", userId }: Props) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<EditFormValues>(defaultUserValues)

  const pathname = usePathname()

  let isAdmin: boolean = pathname.split("admin-dashboard").length > 1

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLoading(true)

    if(formValues.department !== "Other") {
      setFormValues(prev => ({...prev, otherDepartment: ""}))
    }

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
      setFormValues({
        is_active: user?.is_active,
        premium: user?.premium,
        suffix: user?.suffix,
        address1: user?.address1,
        address2: user?.address2,
        city: user?.city,
        state: user?.state,
        zip: user?.zip,
        cell_phone: user?.cell_phone,
        work_phone: user?.work_phone,
        department: user?.department,
        otherDepartment: user?.otherDepartment,
        member_type: user?.member_type,
        payment_date: user?.payment_date,
        join_date: user?.join_date,
      })
    }
    fetchCurrentUser()
  }, [])

  if (!currentUser) {
    return <Loader />
  }

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
        <InfoForm inputValues={formValues} setInputValues={setFormValues} />
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
