import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const reqBody: User = await request.json()
    const { firstName, lastName, email, password } = reqBody

    // @ts-ignore
    const member: User = await members.findOne({ email })

    if (member) {
      return NextResponse.json({ error: "Member already exists" }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newMember = new members<User>({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "USER",
      address: "",
      city: "",
      state: "",
      zip: "",
      home_phone: "",
      work_phone: "",
      department: "",
      is_active: "active",
      group_email: "",
      member_role: "",
      member_type: "",
      year: "",
      premium: "false",
    })

    const savedMember = await newMember.save()

    return NextResponse.json({
      message: `User created successfully`,
      success: true,
      savedMember,
    })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
