import { connect } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import Members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || ""
    const {email} : Token = await getDataFromToken(token)
    const user = await Members.findOne({email})
    return NextResponse.json({ user, success: true }, { status: 200 })
    
    // const users: any = await members.find({ role: "USER" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
