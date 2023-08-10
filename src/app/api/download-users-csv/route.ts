import { connect } from "@/dbConfig/dbConfig"
import members from "@/models/member"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import { json2csv } from "json-2-csv"

connect()

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || ""

    const { role } = await getDataFromToken(token)

    if (role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Not Authorized to get data",
          success: false,
        },
        { status: 401 },
      )
    }

    const allUsers = await members.find({ role: "USER" })

    let allUsersClone: any[] = JSON.parse(JSON.stringify(allUsers)).map((user:User) => ({
      'First Name': user?.firstName,
      'Last Name': user?.lastName,
      'Email': user?.email,
      'Address': user?.address,
      'City': user?.city,
      'State': user?.state,
      'Zip': user?.zip,
      'Home Phone': user?.home_phone,
      'Work Phone': user?.work_phone,
      'Department': user?.department,
      'Status': user?.is_active,
      // 'Type': user?.member_type,
      'Payment Status': user?.premium,
      // 'year': user?.year
    }))

    const csvFile = await json2csv(allUsersClone, {excludeKeys: ['_id', '__v', 'password', 'role', 'createdAt', 'updatedAt']})
    
    const response = new NextResponse(csvFile)
    
    response.headers.set("content-type", "application/CSV")
    

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
