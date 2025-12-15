export default function TrabajoCard({
  trabajo,
  onCompletar,
  onEliminar,
  onEditar,
  onDetalle,
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow mb-4 border border-[#77B0AA]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-[#003C43]">{trabajo.cliente}</h2>
          <p className="text-sm text-[#135D66]">{trabajo.telefono}</p>
          <p className="text-sm text-[#135D66]">{trabajo.equipo}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded font-semibold ${
            trabajo.estado === "completado"
              ? "bg-[#77B0AA] text-white"
              : "bg-[#E3FEF7] text-[#003C43] border border-[#135D66]"
          }`}
        >
          {trabajo.estado}
        </span>
      </div>

      <div className="text-sm text-[#003C43] mt-2">
        <p>Ingreso: {trabajo.ingreso}</p>
        <p>Entrega: {trabajo.entrega}</p>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {trabajo.estado !== "completado" && (
          <button
            className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600 transition-colors"
            onClick={() => onCompletar(trabajo.id)}
          >
            Completar
          </button>
        )}
        <button
          className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-colors"
          onClick={() => onEliminar(trabajo.id)}
        >
          Eliminar
        </button>
        <button
          className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition-colors"
          onClick={() => onEditar(trabajo)}
        >
          Editar
        </button>
        <button
          className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition-colors"
          onClick={() => onDetalle(trabajo)}
        >
          Detalle
        </button>
      </div>
    </div>
  );
}
