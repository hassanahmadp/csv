import axios from "axios"

type SignUpProps = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}
export async function signUp(data: SignUpProps) {
  try {
    // debugger
    // const response = await fetch("/api/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     data,
    //   }),
    // })

    // return response.json()
    const signupResponse = await axios.post('/api/signup', data)
    return signupResponse
  } catch (error:any) {
    console.log(error.message)
  }
}