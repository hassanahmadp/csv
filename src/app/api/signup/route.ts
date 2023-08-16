import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendMailToUser } from "@/helpers"
import jwt from "jsonwebtoken"

connect()

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const reqBody: User = await request.json()
    const { firstName, lastName, email, password } = reqBody

    if(password.length <= 0) {
      // const tokenData: Token = {
      //   name: `${firstName} ${lastName}`,
      //   email,
      // }

      // const newSecret = process.env.JWT_SECRET_KEY 

      // const newUserToken = await jwt.sign(tokenData, newSecret, {
      //   expiresIn: "10m",
      // })

      // const link: string = `${urlData.protocol}//${urlData.host}/set-password/${user.email}/${newUserToken}`
      await sendMailToUser({email,firstName},"")
      return NextResponse.json({
        message: `User created successfully`,
        success: true,
      })
    }

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

    return NextResponse.json({
      message: `User created successfully`,
      success: true,
      savedMember,
    })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}