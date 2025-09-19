import { API_URL } from "./apiUrl";

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    return { ok: false, data: { status: "error" } };
  }
}


export function initLogin() {
  const form = document.getElementById('loginForm');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await login(email, password);
    console.log(result)

    if (result.status == 'ok') {
        localStorage.setItem('access_token', result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
        window.location.href = '/gatos'

    } else if (result.status == 'error') {
        alert(result.message)

    } else {
      alert('Error de conexión con el servidor.');
    }
  });
}


async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token")
  if (!refresh) throw new Error("No refresh token --> logout")

  const response = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${refresh}` }
  })
  const data = await response.json()
  console.log(data)
  
  if (!response.ok) {
    logout()
    throw new Error("Invalid Refresh Token")
  }

  localStorage.setItem("access_token", data.access_token)
  return data.access_token
}


export async function fetchProtected(url, options = {}) {
  let token = localStorage.getItem("access_token")
  options.headers = { ...(options.headers || {}), "Authorization": `Bearer ${token}` }

  let response = await fetch(url, options)
  
  if (response.status === 401 || response.status === 422) {
    try {
      token = await refreshToken()
      options.headers["Authorization"] = `Bearer ${token}`
      response = await fetch(url, options)
    } catch (error) {
      throw error
    }
  }
  return response
}


export function logout() {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  window.location.href = "/login"
}
