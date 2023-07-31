"use client"
import { DashboardTable, FormContainer, Modal } from "@/components"
import { downloadCSV, uploadCSV } from "@/lib"
import { ChangeEvent, useState } from "react"
import { createPortal } from "react-dom"
import toast from "react-hot-toast"

type Props = {}

export default function AdminDashboard({}: Props) {
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)

  const handleFileUploadChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.files && evt.target.files[0])
    if (!evt.target.files) return
    debugger
    const response = await uploadCSV({ file: evt.target.files[0] })
    if(response?.data?.success) toast.success('Data Changed Successfully.')
  }

  const handleDownload = async () => {
    try {
      const response = await downloadCSV();
      // const blob = await response.blob();

      // Create a URL for the downloaded blob data
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
