import { UserInfo } from "@/components"
import React from "react"

type Props = {}

export default function UserInfoPage({}: Props) {
  return (
    <div>
      <UserInfo editAccess={false} />
    </div>
  )
}