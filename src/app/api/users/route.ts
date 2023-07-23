import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET() {
  try {
    const users: any = await members.find({role: "USER"})
    return NextResponse.json({users, success: true}, {status: 200})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
