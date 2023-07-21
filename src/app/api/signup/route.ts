import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody: User | Admin = await request.json()
    const { firstName, lastName, email, password, role } = reqBody

    // @ts-ignore
    const member: User | Admin = await members.findOne({email})

    if (member) {
      return NextResponse.json({ error: "Member already exists" }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)

    const newMember = new members({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "USER"
    })

    const savedMember = await newMember.save()


    return NextResponse.json({
      message: `User created successfully`,
      success: true,
      savedMember
    })

  } catch (error: any) {
    
    return NextResponse.json({ error: error.message }, { status: 500 })
  
  }
}

