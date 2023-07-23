import { UserInfo } from "@/components"
import React from "react"

type Props = {
  params: {
    userId: string
  }
}

export default function UserInfoPage({params: {userId}}: Props) {
  return (
    <div>
      <UserInfo variant="id" userId={userId}/>
    </div>
  )
}
