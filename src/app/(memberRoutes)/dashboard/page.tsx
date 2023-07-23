import { UserInfo } from "@/components"
import React from "react"

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <main>
      <UserInfo variant="current"/>
    </main>
  )
}
