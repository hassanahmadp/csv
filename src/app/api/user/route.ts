import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || ""

    const tokenData = getDataFromToken(token)
    

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
