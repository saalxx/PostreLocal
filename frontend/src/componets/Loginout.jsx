import { useState } from "react";

const API_URL = "http://localhost:3000/api/auth";

export default function LoginOut({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al iniciar sesion");
      onLoginSuccess(data.token);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrarse");
      setSuccess("Cuenta creada! Ya puedes iniciar sesion.");
      setMode("login");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{mode === "login" ? "Iniciar sesion" : "Crear cuenta"}</h1>

      <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }}>
        Login
      </button>
      <button onClick={() => { setMode("register"); setError(""); setSuccess(""); }}>
        Registro
      </button>

      <hr />

      {mode === "register" && (
        <>
          <label>Usuario</label><br />
          <input name="username" value={form.username} onChange={handleChange} placeholder="tu_usuario" /><br />
        </>
      )}

      <label>Email</label><br />
      <input name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" /><br />

      <label>Contrasena</label><br />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button onClick={mode === "login" ? handleLogin : handleRegister} disabled={loading}>
        {loading ? "Cargando..." : mode === "login" ? "Entrar" : "Registrarse"}
      </button>

      <p>
        {mode === "login" ? "No tienes cuenta?" : "Ya tienes cuenta?"}
        <span style={{ cursor: "pointer", color: "blue" }}
          onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
          {mode === "login" ? " Registrate" : " Inicia sesion"}
        </span>
      </p>
    </div>
  );
}