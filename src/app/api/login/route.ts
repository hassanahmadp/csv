import { connect } from "@/dbConfig/dbConfig"
import Members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect() 


export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const reqBody: User | Admin = await request.json()
    const {email, password} = reqBody
    

    // @ts-ignore
    const member: User | Admin = await Members.findOne({email})

    if(!member) {
      return NextResponse.json({error: "User doesn't exists."}, {status: 400})
    }

    const validPassword = await bcryptjs.compare(password, member.password)
    
    if(!validPassword) {
      return NextResponse.json({error: "Invalid Password"}, {status: 400})
    }

    // create token data
    const tokenData: Token = {
      id: member._id,
      name: `${member.firstName} ${member.lastName}`,
      email: member.email,
      role: member.role
    }

    // create token
    
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: '1d'})


    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      role: member.role
    })

    response.cookies.set('token', token, {
      httpOnly: true,
    })

    return response
    
  } catch (error: any) {
    return NextResponse.json({error:error.message}, {status: 500})
  }
}