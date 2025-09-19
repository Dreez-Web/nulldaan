import { API_URL } from "./apiUrl";
import { fetchProtected } from "./authService"

export async function getProtectedRoute() {
  const name = 'CAT'

  try {
    const response = await fetchProtected(`${API_URL}/protected`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    const data = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error("Error:", error);
    return error
  }
}
