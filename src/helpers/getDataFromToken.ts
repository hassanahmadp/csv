
import jwtDecode from "jwt-decode"

export const getDataFromToken = (token:string) => {
  try {
    const decodedToken = jwtDecode<Token>(token)
    return decodedToken
  } catch (error: any) {
    throw new Error(error.message)
  }
}
