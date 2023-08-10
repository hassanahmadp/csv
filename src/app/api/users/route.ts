import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextResponse } from "next/server"


connect()

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const users: any = await members.find({role: "USER"})
    const testUsers = JSON.parse(JSON.stringify(users))
    return NextResponse.json({users, success: true}, {status: 200})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
