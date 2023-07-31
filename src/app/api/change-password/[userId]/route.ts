import { connect } from "@/dbConfig/dbConfig"
import Members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function PATCH(request: NextRequest) {
  try {
    
    const token = request.cookies.get('token')?.value || ""

    const {id} = await getDataFromToken(token);

    const { oldPass, newPass } = await request.json()

    const user = await Members.findOne({ _id: id })

    if (!user?._id)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 },
      )

    const validPassword = await bcryptjs.compare(oldPass, user.password)

    
    if (!validPassword) {
      return NextResponse.json({ success: false, message: "Invalid Password" }, { status: 400 })
    }


    const salt = await bcryptjs.genSalt(10)

    const hashedPassword = await bcryptjs.hash(newPass, salt)

    const response = await Members.findOneAndUpdate({ _id: id }, { password: hashedPassword })
    return NextResponse.json({ response, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
