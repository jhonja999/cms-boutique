export async function fetchAPI(path: string) {
    const serverUrl = process.env.STRAPI_API_URL || "http://localhost:1337"
    const url = `${serverUrl}/api${path}`
    console.log("Fetching from URL:", url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log("Received data:", data)
      return data.data
    } catch (error) {
      console.error("Error fetching API:", error)
      throw error
    }
  }
  
  