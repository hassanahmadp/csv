import { connect } from "@/dbConfig/dbConfig"
import Members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"

connect()

export const dynamic = "force-dynamic"

export async function PATCH(request: NextRequest) {
  try {
    const id = request.url.split('/').at(-1)
    const data = await request.json()
    await Members.findOneAndUpdate({_id: id}, {...data})
    // const users: any = await members.find({role: "USER"})
    return NextResponse.json({ id, data, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function GET(request: NextRequest) {
  try {
    const id = request.url.split('/').at(-1)
    const user = await Members.findOne({_id:id})
    return NextResponse.json({ user, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
