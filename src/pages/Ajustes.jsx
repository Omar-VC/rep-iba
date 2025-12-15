import { useState } from "react";

export default function Ajustes({ usuario, onGuardar, onCerrarSesion }) {
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    telefono: usuario?.telefono || "",
    password: "",
    notificaciones: usuario?.notificaciones ?? true,
    temaOscuro: usuario?.temaOscuro ?? false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
    alert("Cambios guardados");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Ajustes</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="input"
          required
        />

        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="input"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Nueva contraseña"
          className="input"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notificaciones"
            checked={form.notificaciones}
            onChange={handleChange}
          />
          Recibir notificaciones
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="temaOscuro"
            checked={form.temaOscuro}
            onChange={handleChange}
          />
          Tema oscuro
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded"
        >
          Guardar cambios
        </button>

        <button
          type="button"
          className="bg-red-500 text-white py-2 rounded"
          onClick={onCerrarSesion}
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
