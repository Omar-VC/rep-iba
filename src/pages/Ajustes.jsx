import { useState, useEffect } from "react";

export default function Ajustes({ usuario, onGuardar, onCerrarSesion, temaOscuro, setTemaOscuro }) {
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    telefono: usuario?.telefono || "",
    password: "",
    notificaciones: usuario?.notificaciones ?? true,
    temaOscuro: usuario?.temaOscuro ?? false,
  });

  useEffect(() => {
    setForm(prev => ({ ...prev, temaOscuro }));
  }, [temaOscuro]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });

    if (name === "temaOscuro") setTemaOscuro(val); // actualiza tema global
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
    alert("Cambios guardados");
  };

  const bgForm = temaOscuro ? "bg-[#135D66] text-[#FFD93D]" : "bg-[#77B0AA] text-[#003C43]";
  const inputColor = temaOscuro ? "border-[#FFD93D] text-[#FFD93D] focus:ring-[#FFD93D]" : "border-[#003C43] text-[#003C43] focus:ring-[#003C43]";

  return (
    <div className="p-4 flex justify-center">
      <form 
        onSubmit={handleSubmit} 
        className={`w-full max-w-md p-5 rounded-2xl shadow-lg flex flex-col gap-4 ${bgForm}`}
      >
        <h1 className="text-xl font-bold mb-4">Ajustes</h1>

        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputColor}`}
        />

        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputColor}`}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Nueva contraseña"
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputColor}`}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notificaciones"
            checked={form.notificaciones}
            onChange={handleChange}
            className="accent-[#003C43]"
          />
          Recibir notificaciones
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="temaOscuro"
            checked={form.temaOscuro}
            onChange={handleChange}
            className="accent-[#003C43]"
          />
          Tema oscuro
        </label>

        <button
          type="submit"
          className="bg-[#003C43] text-white py-2 rounded-full font-semibold hover:bg-[#002D33] transition-colors"
        >
          Guardar cambios
        </button>

        <button
          type="button"
          className="bg-red-500 text-white py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
          onClick={onCerrarSesion}
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
