"use client"
import { useAuthContext } from "@/components"
import { FormContainer } from "@/components"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { member, setMember, authorized } = useAuthContext()
  const { push } = useRouter()

  useEffect(() => {
    if (authorized) {
      if (member?.role === "ADMIN") {
        push("/admin-dashboard")
      } else if (member?.role === "USER") {
        push("/dashboard")
      }
    }
  }, [authorized])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-8 px-4">
      <FormContainer variant="login" />

      
    </main>
  )
}
