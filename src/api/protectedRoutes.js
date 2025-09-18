import { API_URL } from "./apiUrl";
import { fetchProtected } from "./authService"

export async function getProtectedRoute() {
  const name = 'NullDaan'

  try {
    const response = await fetchProtected(`${API_URL}/protected`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error:", error);
    return error
  }
}
