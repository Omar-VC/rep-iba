// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const exito = login(usuario, password);
    if (!exito) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003C43] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-2xl shadow-lg bg-[#135D66] text-[#FFFBDE] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Ingresar</h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#096B68] bg-[#129990] text-[#FFFBDE] focus:outline-none focus:ring-2 focus:ring-[#FFFBDE]"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#096B68] bg-[#129990] text-[#FFFBDE] focus:outline-none focus:ring-2 focus:ring-[#FFFBDE]"
          required
        />

        <button
          type="submit"
          className="py-2 rounded-full bg-[#FFD93D] text-[#003C43] font-semibold hover:bg-[#E6C733] transition-colors"
        >
          Ingresar
        </button>

        <p className="text-xs text-center">
          ¿No tenés cuenta?{" "}
          <Link to="/registro" className="text-[#FFD93D] underline">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
