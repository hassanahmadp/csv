import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import multer from "multer"
import csvParser from "csv-parser"
import path from "path"
import fs from "fs"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    debugger
    // const { firstName, lastName, email, password } = reqBody

    // // @ts-ignore
    // const member: User = await members.findOne({ email })

    
    // if (member) {
    //   return NextResponse.json({ error: "Member already exists" }, { status: 400 })
    // }

    // const salt = await bcryptjs.genSalt(10)
    // const hashedPassword = await bcryptjs.hash(password, salt)

    // const newMember = new members<User>({
    //   firstName,
    //   lastName,
    //   email,
    //   password: hashedPassword,
    //   role: "USER",
    //   other: {
    //     address: "",
    //     city: "",
    //     state: "",
    //     zip: "",
    //     home_phone: "",
    //     work_phone: "",
    //     department: "",
    //     is_active: "active",
    //     group_email: "",
    //     member_role: "",
    //     member_type: "",
    //     year: "",
    //     premium: "true",
    //   },
    // })

    // const savedMember = await newMember.save()

    return NextResponse.json({
      message: `CSV uploaded successfully`,
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
