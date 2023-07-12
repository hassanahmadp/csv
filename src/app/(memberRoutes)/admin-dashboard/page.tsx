import { DashboardTable, dummyMembers } from "@/components"
import React from "react"

type Props = {}



export default function AdminDashboard({}: Props) {
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
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DashboardTable/>
      </div>
    </main>
  )
}
