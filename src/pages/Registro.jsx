import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const APP_MODE = import.meta.env.VITE_APP_MODE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registrar(email, password);
      setExito("Registro exitoso. Ya podés ingresar.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003C43] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-2xl shadow-lg bg-[#135D66] text-[#FFFBDE] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Registro</h2>

        {APP_MODE === "prod" && (
          <p className="text-xs text-center text-yellow-300">
            Registro disponible solo durante la configuración inicial.
          </p>
        )}

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {exito && <p className="text-green-400 text-sm text-center">{exito}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#096B68] bg-[#129990] text-[#FFFBDE]"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#096B68] bg-[#129990] text-[#FFFBDE]"
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#096B68] bg-[#129990] text-[#FFFBDE]"
          required
        />

        <button
          type="submit"
          className="py-2 rounded-full bg-[#FFD93D] text-[#003C43] font-semibold hover:bg-[#E6C733]"
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
