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
      nota: "",
      monto: "",
      pagado: false,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
  };

  // Colores con tu paleta
  const bgForm = temaOscuro ? "#135D66" : "#FFFFFF"; 
  const inputBg = temaOscuro ? "#094d48ff" : "#FFFFFF";
  const inputText = temaOscuro ? "#FFFBDE" : "#003C43";
  const inputBorder = temaOscuro ? "#096B68" : "#003C43";
  const btnGuardarBg = temaOscuro ? "#135D66" : "#129990";
  const btnGuardarHover = temaOscuro ? "#003C43" : "#096B68";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 sm:p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]"
        style={{ backgroundColor: bgForm, color: inputText }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          {trabajoInicial ? "Editar trabajo" : "Nuevo trabajo"}
        </h2>

        <div className="flex flex-col gap-2 sm:gap-3">
          <input
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            placeholder="Cliente"
            required
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />
          <input
            name="equipo"
            value={form.equipo}
            onChange={handleChange}
            placeholder="Electrodoméstico"
            required
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />

          <label className="text-xs sm:text-sm font-semibold">Ingreso</label>
          <input
            type="date"
            name="ingreso"
            value={form.ingreso}
            onChange={handleChange}
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />

          <label className="text-xs sm:text-sm font-semibold">Entrega</label>
          <input
            type="date"
            name="entrega"
            value={form.entrega}
            onChange={handleChange}
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />

          <textarea
            name="nota"
            value={form.nota}
            onChange={handleChange}
            placeholder="Nota / detalles del trabajo"
            rows={3}
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />

          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            placeholder="Monto"
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: inputBg,
              color: inputText,
              borderColor: inputBorder,
            }}
          />

          <label className="flex items-center gap-2 text-xs sm:text-sm">
            <input
              type="checkbox"
              name="pagado"
              checked={form.pagado}
              onChange={handleChange}
            />
            Pagado
          </label>
        </div>

        <div className="flex gap-2 sm:gap-3 mt-4 flex-wrap">
          <button
            type="submit"
            className="flex-1 py-2 sm:py-2 rounded-full font-semibold text-xs sm:text-sm text-white transition-colors"
            style={{ backgroundColor: btnGuardarBg }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = btnGuardarHover}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = btnGuardarBg}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 py-2 sm:py-2 rounded-full font-semibold text-xs sm:text-sm bg-gray-800 hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
