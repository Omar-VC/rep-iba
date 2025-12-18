import { useState, useEffect } from "react";

export default function RepuestoForm({
  onGuardar,
  onCancelar,
  repuestoInicial,
  temaOscuro,
}) {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    cantidad: 0,
    minimo: 0,
    precio: "",
    fechaPrecio: "",
  });

  useEffect(() => {
    if (repuestoInicial) {
      setForm({
        ...repuestoInicial,
        precio: repuestoInicial.precio ?? "",
        fechaPrecio: repuestoInicial.fechaPrecio
          ? new Date(
              repuestoInicial.fechaPrecio.seconds * 1000
            ).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [repuestoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onGuardar({
      nombre: form.nombre,
      categoria: form.categoria,
      cantidad: Number(form.cantidad),
      minimo: Number(form.minimo),
      precio: Number(form.precio),
      fechaPrecio: form.fechaPrecio, // se transforma en Timestamp en Stock.jsx
    });
  };

  const bgForm = temaOscuro
    ? "bg-[#135D66] text-[#FFD93D]"
    : "bg-[#77B0AA] text-[#003C43]";
  const btnGuardar = temaOscuro
    ? "bg-[#003C43] text-[#FFD93D] hover:bg-[#002D33]"
    : "bg-[#003C43] text-white hover:bg-[#002D33]";
  const btnCancelar = temaOscuro
    ? "bg-gray-700 text-[#FFD93D] hover:bg-gray-600"
    : "bg-gray-300 text-[#003C43] hover:bg-gray-400";
  const inputBg = temaOscuro
    ? "bg-[#003C43] text-[#FFD93D] border-[#FFD93D] focus:ring-[#FFD93D]"
    : "bg-white text-[#003C43] border-[#003C43] focus:ring-[#003C43]";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className={`w-11/12 max-w-md p-5 rounded-2xl shadow-lg ${bgForm}`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {repuestoInicial ? "Editar repuesto" : "Nuevo repuesto"}
        </h2>

        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className={`w-full mb-3 p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputBg}`}
        />

        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          className={`w-full mb-3 p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputBg}`}
        />

        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          className={`w-full mb-3 p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputBg}`}
        />

        <input
          type="number"
          name="minimo"
          value={form.minimo}
          onChange={handleChange}
          placeholder="Stock mínimo"
          className={`w-full mb-3 p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputBg}`}
        />

        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          className={`w-full mb-3 p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputBg}`}
        />

        <input
          type="date"
          name="fechaPrecio"
          value={form.fechaPrecio}
          onChange={handleChange}
          className={`w-full mb-4 p-2 rounded-lg border focus:outline-none focus:ring-2 ${inputBg}`}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className={`flex-1 py-2 rounded-full font-semibold transition-colors ${btnGuardar}`}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className={`flex-1 py-2 rounded-full font-semibold transition-colors ${btnCancelar}`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
