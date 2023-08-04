import axios, { AxiosResponse } from "axios"

export async function uploadCSV({ file }: {file: File}) {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const response = await axios.post(`/api/upload-users-csv`, formData )
    return response
  } catch (error: any) {
    console.error({ error: error.message })
  }
}

export async function downloadCSV() {
  try {
    const response: AxiosResponse<Blob> = await axios("/api/download-users-csv", {
      responseType: "blob",
    })
    return response
  } catch (error: any) {
    console.error({ error: error.message })
  }
}
