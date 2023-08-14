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
      'Member Number': user?.member_number,
      'First Name': user?.firstName,
      'Last Name': user?.lastName,
      'Suffix': user?.suffix,
      'Email': user?.email,
      'Password': user?.password,
      'Payment Status': user?.premium,
      'Address 1': user?.address1,
      'Address 2': user?.address2,
      'City': user?.city,
      'State': user?.state,
      'Zip': user?.zip,
      'Cell Phone': user?.cell_phone,
      'Work Phone': user?.work_phone,
      'Active Status': user?.is_active,
      'Department': user?.department,
      'Member Type': user?.member_type,
      'Payment Date': user?.payment_date,
      'Join Date': user?.join_date,
    }))

    const csvFile = await json2csv(allUsersClone, {excludeKeys: ['_id', '__v', 'role', 'createdAt', 'updatedAt']})
    
    const response = new NextResponse(csvFile)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    
    response.headers.set("content-type", "application/CSV")
    
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
