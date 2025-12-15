import { useState, useEffect } from "react"

export default function RepuestoForm({ onGuardar, onCancelar, repuestoInicial }) {
  const [form, setForm] = useState({
    nombre: "",
    cantidad: 0,
    minimo: 0,
    categoria: "",
  })

  useEffect(() => {
    if (repuestoInicial) setForm(repuestoInicial)
  }, [repuestoInicial])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGuardar({
      ...form,
      cantidad: Number(form.cantidad),
      minimo: Number(form.minimo),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white w-11/12 max-w-md p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-3">
          {repuestoInicial ? "Editar repuesto" : "Nuevo repuesto"}
        </h2>

        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="input" />
        <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" className="input" />
        <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" className="input" />
        <input type="number" name="minimo" value={form.minimo} onChange={handleChange} placeholder="Mínimo" className="input" />

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
