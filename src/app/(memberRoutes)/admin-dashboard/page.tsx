"use client"
import { DashboardTable, FormContainer, Modal } from "@/components"
import { useState } from "react"
import { createPortal } from "react-dom"

type Props = {}

export default function AdminDashboard({}: Props) {
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
  return (
    <main className="py-8 px-4 container mx-auto">
      <div className="flex gap-5 mb-8">
        <button
          type="button"
          className="border hover:bg-white bg-black hover:text-black text-white font-normal rounded-sm text-md p-2 text-center"
        >
          Import CSV
        </button>
        <button
          type="button"
          className="border bg-white hover:bg-black text-black hover:text-white font-normal rounded-sm text-md p-2 text-center"
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={() => setShowSignUpModal(true)}
          className="border ml-auto hover:bg-white bg-black hover:text-black text-white font-normal rounded-sm text-md p-2 text-center"
        >
          Add a new User
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DashboardTable showModal={showSignUpModal} />
      </div>
      {showSignUpModal &&
        createPortal(
          <Modal setShowModal={setShowSignUpModal} maxWidth="sm">
            <FormContainer variant="sign up" setShowModal={setShowSignUpModal} through="modal" />
          </Modal>,
          document.querySelector("#modal") as Element,
        )}
    </main>
  )
}
