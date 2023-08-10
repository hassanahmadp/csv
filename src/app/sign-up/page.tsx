import { FormContainer } from "@/components"
import { connect } from "@/dbConfig/dbConfig"

connect()

export const dynamic = "force-dynamic"

export default function SignUp() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-8 px-4">
      <FormContainer variant="sign up"/>
    </main>
  )
}
