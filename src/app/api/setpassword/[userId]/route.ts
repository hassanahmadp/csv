import { connect } from "@/dbConfig/dbConfig"
import Members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export const dynamic = "force-dynamic"

export async function PATCH(request: NextRequest) {
  try {
    const id = request.url.split("/").at(-1)
    const {password} = await request.json()

    const user = await Members.findOne({ _id: id })

    if(!user?._id) return NextResponse.json({success: false, message: "There are issues in setting password"}, {status: 400})
    
    const salt = await bcryptjs.genSalt(10)
    
    const hashedPassword = await bcryptjs.hash(password, salt)

    const response = await Members.findOneAndUpdate({ _id: id }, { password: hashedPassword })
    
    return NextResponse.json({ response, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
