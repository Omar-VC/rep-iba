import { useState, useEffect } from "react";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";

export default function Ajustes({
  usuario,
  onGuardar,
  onCerrarSesion,
  temaOscuro,
  setTemaOscuro
}) {
  const auth = getAuth();
  const userAuth = auth.currentUser;

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

    if (name === "temaOscuro") setTemaOscuro(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Actualizar nombre en Auth
      if (userAuth && form.nombre) {
        await updateProfile(userAuth, {
          displayName: form.nombre,
        });
      }

      // 🔹 Actualizar contraseña
      if (userAuth && form.password.trim().length >= 6) {
        await updatePassword(userAuth, form.password);
      }

      // 🔹 Guardar resto de datos (Firestore o estado global)
      onGuardar({
        nombre: form.nombre,
        telefono: form.telefono,
        notificaciones: form.notificaciones,
        temaOscuro: form.temaOscuro,
      });

      alert("Cambios guardados correctamente");
      setForm({ ...form, password: "" });

    } catch (error) {
      console.error(error);
      alert("Error al guardar cambios. Volvé a iniciar sesión.");
    }
  };

  const bgForm = temaOscuro
    ? "bg-[#135D66] text-[#FFD93D]"
    : "bg-[#77B0AA] text-[#003C43]";

  const inputColor = temaOscuro
    ? "border-[#FFD93D] text-[#FFD93D] focus:ring-[#FFD93D]"
    : "border-[#003C43] text-[#003C43] focus:ring-[#003C43]";

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
          placeholder="Nueva contraseña (mín. 6)"
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputColor}`}
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
          className="bg-[#003C43] text-white py-2 rounded-full font-semibold"
        >
          Guardar cambios
        </button>

        <button
          type="button"
          onClick={onCerrarSesion}
          className="bg-red-500 text-white py-2 rounded-full font-semibold"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
