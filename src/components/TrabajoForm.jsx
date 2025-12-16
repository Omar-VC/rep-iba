import { useState } from "react";

export default function TrabajoForm({ onGuardar, onCancelar, trabajoInicial, temaOscuro }) {
  const [form, setForm] = useState(
    trabajoInicial || {
      cliente: "",
      telefono: "",
      equipo: "",
      ingreso: "",
      entrega: "",
      estado: "pendiente",
      nota: "", // nuevo campo
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
  };

  // Colores según tema
  const bgForm = temaOscuro ? "bg-[#135D66] text-white" : "bg-[#77B0AA] text-[#003C43]";
  const borderInput = temaOscuro ? "border-white" : "border-[#003C43]";
  const focusRing = temaOscuro ? "focus:ring-white" : "focus:ring-[#003C43]";
  const btnGuardarBg = temaOscuro ? "bg-[#003C43]" : "bg-[#003C43]";
  const btnGuardarHover = temaOscuro ? "hover:bg-[#002D33]" : "hover:bg-[#002D33]";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className={`${bgForm} w-11/12 max-w-md p-6 rounded-2xl shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {trabajoInicial ? "Editar trabajo" : "Nuevo trabajo"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            placeholder="Cliente"
            required
            className={`px-3 py-2 rounded-lg border ${borderInput} focus:outline-none focus:ring-2 ${focusRing}`}
          />
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className={`px-3 py-2 rounded-lg border ${borderInput} focus:outline-none focus:ring-2 ${focusRing}`}
          />
          <input
            name="equipo"
            value={form.equipo}
            onChange={handleChange}
            placeholder="Electrodoméstico"
            required
            className={`px-3 py-2 rounded-lg border ${borderInput} focus:outline-none focus:ring-2 ${focusRing}`}
          />

          <label className="text-sm font-semibold">Ingreso</label>
          <input
            type="date"
            name="ingreso"
            value={form.ingreso}
            onChange={handleChange}
            className={`px-3 py-2 rounded-lg border ${borderInput} focus:outline-none focus:ring-2 ${focusRing}`}
          />

          <label className="text-sm font-semibold">Entrega</label>
          <input
            type="date"
            name="entrega"
            value={form.entrega}
            onChange={handleChange}
            className={`px-3 py-2 rounded-lg border ${borderInput} focus:outline-none focus:ring-2 ${focusRing}`}
          />

          <label className="text-sm font-semibold">Nota</label>
          <textarea
            name="nota"
            value={form.nota}
            onChange={handleChange}
            placeholder="Detalles adicionales del trabajo"
            className={`px-3 py-2 rounded-lg border ${borderInput} focus:outline-none focus:ring-2 ${focusRing} resize-none`}
            rows={3}
          />
        </div>

        <div className="flex gap-3 mt-5 flex-wrap">
          <button
            type="submit"
            className={`flex-1 ${btnGuardarBg} text-white py-2 rounded-full font-semibold ${btnGuardarHover} transition-colors`}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 bg-gray-300 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
