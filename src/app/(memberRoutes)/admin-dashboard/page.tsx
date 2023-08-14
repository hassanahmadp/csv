"use client"
import { DashboardTable, FormContainer, Modal } from "@/components"
import { downloadCSV, getAllUsers, uploadCSV } from "@/lib"
import { ChangeEvent, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import toast from "react-hot-toast"

type Props = {}



export default function AdminDashboard({}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [allUsers, setAllUsers] = useState<User[] | undefined>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getUsers = async () => {
    const users: User[] = await getAllUsers() as User[]
    setAllUsers(users)
    setLoading(false)
  }

  const handleFileUploadChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)

    if (!evt.target.files) return
    const response = await uploadCSV({ file: evt.target.files[0] })
    if(response?.data?.success) {
      toast.success('Data Changed Successfully.')
      getUsers()
    } else {
      toast.error('Something wrong happened while importing csv.')
    }
    setLoading(false)
    evt.target.value = ''
  }

  const handleDownload = async () => {
    try {
      const response = await downloadCSV();
      if(!response) throw new Error('Response not found while downloading the file in /admin-dashboard/[userId]')
      const url = window.URL.createObjectURL(new Blob([response.data]))

      // Create an anchor element with the download link and trigger a click event
      const link = document.createElement('a');
      link.href = url;
      link.download = 'allUsers.csv';
      link.click();

      // Clean up the URL created for the blob
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  useEffect(() => {
    setLoading(true)
    
    if (!showModal) {
      getUsers()
    }

  }, [showModal])

  return (
    <main className="py-8 px-4 container mx-auto">
      <div className="flex gap-5 mb-8">
        <form className="m-0 p-0 flex">
          <input
            type="file"
            className="opacity-0 absolute pointer-events-none"
            name="file"
            id="csvfile"
            onChange={handleFileUploadChange}
          />
          <label
            htmlFor="csvfile"
            className="border hover:bg-white m-0 h-full bg-black cursor-pointer hover:text-black text-white font-normal rounded-sm text-md p-2 flex justify-center items-center text-center"
          >
            Import CSV
          </label>
        </form>
        <button
          type="button"
          onClick={handleDownload}
          className="border bg-white hover:bg-black text-black hover:text-white font-normal rounded-sm text-md p-2 text-center"
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="border ml-auto hover:bg-white bg-black hover:text-black text-white font-normal rounded-sm text-md p-2 text-center"
        >
          Add a new User
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DashboardTable loading={loading} allUsers={allUsers} />
      </div>
      {showModal &&
        createPortal(
          <Modal setShowModal={setShowModal} maxWidth="sm">
            <FormContainer variant="sign up" setShowModal={setShowModal} through="modal" />
          </Modal>,
          document.querySelector("#modal") as Element,
        )}
    </main>
  )
}
