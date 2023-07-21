
import jwtDecode from "jwt-decode"
import { NextRequest } from "next/server"


export const getDataFromToken = (token:string) => {
  try {
    const decodedToken = jwtDecode(token)
    debugger
    return decodedToken
  } catch (error: any) {
    throw new Error(error.message)
  }
}
