import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers"
import Papa from "papaparse"
import { Readable } from "stream"
import Members from "@/models/member"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || ""

    const { role } = await getDataFromToken(token)

    const {host} = await request.nextUrl;

    if (role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Not Authorized to get data",
          success: false,
        },
        { status: 401 },
      )
    }

    const formData = await request.formData()
    const file: File | null = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        {
          message: "No file uploaded",
          success: false,
        },
        { status: 400 },
      )
    }
    const buffer = await file.arrayBuffer()
    const fileContent = Buffer.from(buffer)

    const stream = Readable.from([fileContent])

    const csvData: csvElement[] = await new Promise((resolve, reject) => {
      const results: csvElement[] = []

      Papa.parse<csvElement>(stream, {
        header: true, // Set this to true if your CSV file has headers
        skipEmptyLines: true,
        complete: result => {
          results.push(...result.data)
          resolve(results)
        },
        error: error => {
          reject(error)
        },
      })
    })

    const newMembers: any[] = csvData.map(user => ({
      firstName: user["First Name"],
      lastName: user["Last Name"],
      email: user.Email,
      password: "un assigned",
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
    }))

    await Members.deleteMany({role: "USER"})
  
    await Members.insertMany([...newMembers])

    const allUsers = await Members.find({role: 'USER'})

    for (const user of allUsers) {
      
      const tokenData: Token = {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      }

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "5m" }) 

    }



    return NextResponse.json({ success: true, message: "Users inserted successfully" })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
