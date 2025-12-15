export default function DetalleRepuesto({ repuesto, onCerrar, onEditar }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-3">{repuesto.nombre}</h2>

        <p><strong>Categoría:</strong> {repuesto.categoria || "-"}</p>
        <p><strong>Cantidad disponible:</strong> {repuesto.cantidad}</p>
        <p><strong>Cantidad mínima:</strong> {repuesto.minimo}</p>
        <p><strong>Estado:</strong> 
          {repuesto.cantidad === 0
            ? "Sin stock"
            : repuesto.cantidad <= repuesto.minimo
            ? "Bajo"
            : "OK"}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEditar(repuesto)}
            className="flex-1 bg-yellow-500 text-white py-2 rounded"
          >
            Editar
          </button>
          <button
            onClick={onCerrar}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
