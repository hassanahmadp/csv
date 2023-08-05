import axios, { AxiosRequestConfig } from "axios"

type AllUsersResponse = {
  success: boolean
  users: User[]
}

export async function getAllUsers() {
  try {
    const {data: {users}} = await axios.get<AllUsersResponse>("/api/users")
    return users
  } catch (error: any) {
    console.error({ error: error.message })
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await axios<{ user: User; success: boolean }>("/api/users/me")
    return user
  } catch (error: any) {
    console.error({ error: error.message })
  }
}

export async function updateUserData(id: string | number, data: OtherUserInfo) {
  try {
    const response = await axios.patch(`/api/users/${id}`, data)
    return response
  } catch (error: any) {
    console.error({ error: error.message })
  }
}

export async function getUser(id: string) {
  try {
    const response = await axios<{ user: User; success: boolean }>(`/api/users/${id}`)
    return response?.data?.user
  } catch (error: any) {
    console.error({ error: error.message })
  }
}
