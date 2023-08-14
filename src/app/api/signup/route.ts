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
    
    const users: User[] = await members.find({role: "USER"})    

    let member_number: number = 1;
    
    if(users.length > 0) {
      let allUsersParsed = JSON.parse(JSON.stringify(users))
      member_number= +allUsersParsed[allUsersParsed.length - 1].member_number + 1
    }

    const newMember = new members<User>({
      member_number,
      firstName,
      lastName,
      suffix:"",
      email,
      password: hashedPassword,
      role: "USER",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      cell_phone: "",
      work_phone: "",
      department: "",
      is_active: "active",
      member_type: "",
      premium: "false",
      join_date: new Date().toISOString(),
      payment_date: ''
    })

    const savedMember = await newMember.save()

    console.log({savedMember})

    return NextResponse.json({
      message: `User created successfully`,
      success: true,
      savedMember,
    })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}