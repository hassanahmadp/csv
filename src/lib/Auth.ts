import axios from "axios"

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
    console.log(error.message)
  }
}
export async function logIn(data: LogInProps) {
  try {
    const loginResponse = await axios.post('/api/login', data)
    return loginResponse
  } catch (error:any) {
    console.log(error.message)
  }
}

export async function logout() {
  try {
    const logoutResponse = await axios.get('/api/logout')
    return logoutResponse
  } catch (error: any) {
    
  }
}