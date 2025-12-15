export default function RepuestoCard({ repuesto, onEditar, onDetalle }) {
  const estado =
    repuesto.cantidad === 0
      ? "sin-stock"
      : repuesto.cantidad <= repuesto.minimo
      ? "bajo"
      : "ok";

  const color =
    estado === "ok"
      ? "bg-green-100 text-green-700"
      : estado === "bajo"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-xl p-4 shadow mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold">{repuesto.nombre}</h2>
          <p className="text-sm text-gray-600">Cantidad: {repuesto.cantidad}</p>
          <p className="text-sm text-gray-600">Mínimo: {repuesto.minimo}</p>
        </div>

        <span className={`text-xs px-2 py-1 rounded ${color}`}>{estado}</span>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          className="flex-1 bg-yellow-500 text-white py-1 rounded"
          onClick={() => onEditar(repuesto)}
        >
          Editar
        </button>
      </div>

      <button
        className="flex-1 bg-blue-500 text-white py-1 rounded"
        onClick={() => onDetalle(repuesto)}
      >
        Detalle
      </button>
    </div>
  );
}
