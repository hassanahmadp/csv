import axios from "axios"


export async function uploadCSV( data: {file: File}) {
  try {
    // const fd = new FormData()
    // fd.append('csv-file',data.file)
    const response = await axios.post(`/api/upload-csv`, {})
    return response
  } catch (error: any) {
    console.error({ error: error.message })
  }
}
