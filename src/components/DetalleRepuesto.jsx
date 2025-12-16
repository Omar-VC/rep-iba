export default function DetalleRepuesto({ repuesto, onCerrar, onEditar, temaOscuro }) {
  const estado =
    repuesto.cantidad === 0
      ? "Sin stock"
      : repuesto.cantidad <= repuesto.minimo
      ? "Bajo"
      : "OK";

  const colorEstado =
    estado === "OK"
      ? "bg-green-100 text-green-800"
      : estado === "Bajo"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  const bgCard = temaOscuro ? "bg-[#135D66] text-[#FFD93D]" : "bg-[#77B0AA] text-[#003C43]";
  const btnEditar = temaOscuro ? "bg-[#003C43] text-[#FFD93D] hover:bg-[#002D33]" : "bg-[#003C43] text-white hover:bg-[#002D33]";
  const btnCerrar = temaOscuro ? "bg-gray-700 text-[#FFD93D] hover:bg-gray-600" : "bg-gray-300 text-[#003C43] hover:bg-gray-400";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`w-11/12 max-w-md p-5 rounded-2xl shadow-lg ${bgCard}`}>
        <h2 className="text-xl font-bold mb-4">{repuesto.nombre}</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Categoría:</strong> {repuesto.categoria || "-"}</p>
          <p><strong>Cantidad disponible:</strong> {repuesto.cantidad}</p>
          <p><strong>Cantidad mínima:</strong> {repuesto.minimo}</p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className={`px-2 py-1 rounded-full font-semibold ${colorEstado}`}>
              {estado}
            </span>
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onEditar(repuesto)}
            className={`flex-1 py-2 rounded-full font-semibold transition-colors ${btnEditar}`}
          >
            Editar
          </button>
          <button
            onClick={onCerrar}
            className={`flex-1 py-2 rounded-full font-semibold transition-colors ${btnCerrar}`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
