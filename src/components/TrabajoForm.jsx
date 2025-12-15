import { useState } from "react"

export default function TrabajoForm({ onGuardar, onCancelar, trabajoInicial }) {
  const [form, setForm] = useState( trabajoInicial ||{
    cliente: "",
    telefono: "",
    equipo: "",
    ingreso: "",
    entrega: "",
    estado: "pendiente",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGuardar(form)
  }

   return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white w-11/12 max-w-md p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-3">
          {trabajoInicial ? "Editar trabajo" : "Nuevo trabajo"}
        </h2>

        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" required className="input" />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="input" />
        <input name="equipo" value={form.equipo} onChange={handleChange} placeholder="Electrodoméstico" required className="input" />

        <label className="text-sm">Ingreso</label>
        <input type="date" name="ingreso" value={form.ingreso} onChange={handleChange} className="input" />

        <label className="text-sm">Entrega</label>
        <input type="date" name="entrega" value={form.entrega} onChange={handleChange} className="input" />

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded">
            Guardar
          </button>
          <button type="button" onClick={onCancelar} className="flex-1 bg-gray-300 py-2 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
