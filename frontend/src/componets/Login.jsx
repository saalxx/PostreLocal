import { useState } from "react";

function Login({ onLoginSuccess }) {
  // Estado para guardar el nombre de usuario
  const [username, setUsername] = useState("");
  

  // Estado para guardar la contraseña
  const [password, setPassword] = useState("");

  // Estado para guardar mensajes de error
  const [error, setError] = useState("");

  // Función que se ejecuta cuando se hace click en "Ingresar"
  const handleLogin = async () => {
    // Limpiamos cualquier error anterior
    setError("");

    try {
      // Hacemos la petición al backend para iniciar sesión
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST", // Método POST porque enviamos datos
        headers: {
          "Content-Type": "application/json" // Indicamos que enviamos JSON
        },
        // Convertimos username y password a JSON
        body: JSON.stringify({ username, password })
      });

      // Si la respuesta no es correcta (ej: 401)
      if (!res.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      // Convertimos la respuesta en JSON
      const data = await res.json();

      // Guardamos el token en el localStorage
      localStorage.setItem("token", data.token);

      // Limpiar los campos del formulario
      setUsername("");
      setPassword("");

      // Avisamos al componente padre que el login fue exitoso
      onLoginSuccess();

    } catch (err) {
      // Si ocurre un error lo guardamos en el estado
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Si existe un error, se muestra en rojo */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Input para el usuario */}
      <input
        type="text"
        placeholder="Usuario"
        value={username} // Valor controlado por el estado
        onChange={(e) => setUsername(e.target.value)} // Actualiza el estado al escribir
      />

      {/* Input para la contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password} // Valor controlado por el estado
        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
      />

      {/* Botón que ejecuta el login */}
      <button onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}

export default Login;