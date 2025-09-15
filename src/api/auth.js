const API_URL = "https://nulldaan.fly.dev"

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    return { ok: false, data: { status: "error" } };
  }
}

export function logout() {
  localStorage.removeItem("token");
}
