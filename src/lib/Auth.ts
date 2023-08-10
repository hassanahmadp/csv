import axios from "axios"
import toast  from "react-hot-toast"

type SignUpProps = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}
type LogInProps = {
  email: string,
  password: string,
}
export async function signUp(data: SignUpProps) {
  try {
    const signupResponse = await axios.post('/api/signup', data)
    return signupResponse
  } catch (error:any) {
    console.error({error:error.message})
  }
}
export async function logIn(data: LogInProps) {
  try {
    const loginResponse = await axios.post('/api/login', data)
    return loginResponse
  } catch (error:any) {
    console.error({error:error.message})
  }
}
export async function setPasswordOfUser(id:string, data: {password: string}) {
  try {
    const loginResponse = await axios.patch(`/api/setpassword/${id}`, data)
    return loginResponse
  } catch (error:any) {
    console.error({error:error.message})
  }
}
export async function changePassword(id:string, data:{oldPass: string, newPass: string}) {
  try {
    const response = await axios.patch(`/api/change-password/${id}`, data)
    return response
  } catch (error:any) {
    toast.error(error?.response?.data?.message)
    console.error({error:error.message})
  }
}



export async function logout() {
  try {
    const logoutResponse = await axios.get('/api/logout')
    return logoutResponse
  } catch (error: any) {
    console.error({error:error.message})
  }
}

