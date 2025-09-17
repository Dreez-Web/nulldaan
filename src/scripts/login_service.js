import { login } from '../api/auth.js';

export function initLogin() {
  const form = document.getElementById('loginForm');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await login(email, password);

    if (result.ok) {
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
      }
      if (result.data.status === 'ok' || result.data.success === true) {
        window.location.href = '/';
      } else {
        alert('Credenciales incorrectas.');
      }
    } else {
      alert('Error de conexión con el servidor.');
    }
  });
}

