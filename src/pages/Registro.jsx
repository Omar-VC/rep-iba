// src/pages/Registro.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Registro() {
  const { registrar } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const registroExitoso = registrar(usuario, password);
    if (!registroExitoso) {
      setError("El usuario ya existe");
    } else {
      setExito("Registro exitoso. Ya podés ingresar.");
      setUsuario("");
      setPassword("");
      setPasswordConfirm("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003C43] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-2xl shadow-lg bg-[#135D66] text-[#FFFBDE] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Registro</h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {exito && <p className="text-green-400 text-sm text-center">{exito}</p>}

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

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#096B68] bg-[#129990] text-[#FFFBDE] focus:outline-none focus:ring-2 focus:ring-[#FFFBDE]"
          required
        />

        <button
          type="submit"
          className="py-2 rounded-full bg-[#FFD93D] text-[#003C43] font-semibold hover:bg-[#E6C733] transition-colors"
        >
          Registrarse
        </button>

        <p className="text-xs text-center">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="text-[#FFD93D] underline">
            Ingresar
          </a>
        </p>
      </form>
    </div>
  );
}
