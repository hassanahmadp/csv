import { DashboardTable, dummyMembers } from "@/components"
import React from "react"

type Props = {}



export default function AdminDashboard({}: Props) {
  return (
    <main className="py-8 px-4 container mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DashboardTable/>
      </div>
    </main>
  )
}
