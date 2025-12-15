export default function TrabajoDetalle({ trabajo, onCerrar }) {
  if (!trabajo) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-3">Detalle del trabajo</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Cliente:</strong> {trabajo.cliente}</p>
          <p><strong>Teléfono:</strong> {trabajo.telefono}</p>
          <p><strong>Equipo:</strong> {trabajo.equipo}</p>
          <p><strong>Ingreso:</strong> {trabajo.ingreso}</p>
          <p><strong>Entrega:</strong> {trabajo.entrega}</p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className="px-2 py-1 rounded bg-gray-200">
              {trabajo.estado}
            </span>
          </p>
        </div>

        <button
          onClick={onCerrar}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
