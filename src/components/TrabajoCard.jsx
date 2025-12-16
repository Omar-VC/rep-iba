import { FaCheck, FaTrash, FaEdit, FaInfoCircle, FaDollarSign } from "react-icons/fa";

export default function TrabajoCard({
  trabajo,
  onCompletar,
  onEliminar,
  onEditar,
  onDetalle,
  onCompletarPago,
  temaOscuro,
}) {
  const estadoCompletado = trabajo.estado === "completado";
  const estadoColor = estadoCompletado
    ? temaOscuro
      ? "bg-green-800 text-green-200"
      : "bg-green-100 text-green-800"
    : temaOscuro
      ? "bg-yellow-800 text-yellow-200"
      : "bg-yellow-100 text-yellow-800";

  const bgCard = temaOscuro ? "bg-[#135D66] text-[#FFD93D]" : "bg-[#77B0AA] text-[#003C43]";
  const btnBg = temaOscuro
    ? "bg-[#003C43] text-[#FFD93D] hover:bg-[#002D33]"
    : "bg-[#003C43] text-white hover:bg-[#002D33]";

  return (
    <div className={`rounded-2xl p-4 sm:p-5 shadow-lg mb-4 border-l-4 border-[#003C43] ${bgCard}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
        <div>
          <h2 className="font-bold text-xl sm:text-2xl">{trabajo.cliente}</h2>
          <p className="text-xs sm:text-sm">{trabajo.telefono}</p>
          <p className="text-xs sm:text-sm">{trabajo.equipo}</p>
          <p className="text-xs sm:text-sm">Ingreso: {trabajo.ingreso}</p>
          <p className="text-xs sm:text-sm">Entrega: {trabajo.entrega}</p>
          <p className="text-xs sm:text-sm">Monto: ${trabajo.monto || 0}</p>
          <p className="text-xs sm:text-sm">
            Pago:{" "}
            <span className={trabajo.pagado ? "text-green-600" : "text-red-600"}>
              {trabajo.pagado ? "Pagado" : "Debe"}
            </span>
          </p>
          {trabajo.nota && <p className="text-xs sm:text-sm">Nota: {trabajo.nota}</p>}
        </div>
        <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-semibold ${estadoColor}`}>
          {trabajo.estado}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 flex-wrap mt-3">
        {!estadoCompletado && (
          <button
            className={`flex-1 py-2 sm:py-2 rounded-full font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm`}
            style={{ backgroundColor: btnBg.split(" ")[0] }}
            onClick={() => onCompletar(trabajo.id)}
          >
            <FaCheck />
            Completar
          </button>
        )}
        <button
          className={`flex-1 py-2 sm:py-2 rounded-full font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm`}
          style={{ backgroundColor: btnBg.split(" ")[0] }}
          onClick={() => onEliminar(trabajo.id)}
        >
          <FaTrash />
          Eliminar
        </button>
        <button
          className={`flex-1 py-2 sm:py-2 rounded-full font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm`}
          style={{ backgroundColor: btnBg.split(" ")[0] }}
          onClick={() => onEditar(trabajo)}
        >
          <FaEdit />
          Editar
        </button>
        <button
          className={`flex-1 py-2 sm:py-2 rounded-full font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm`}
          style={{ backgroundColor: btnBg.split(" ")[0] }}
          onClick={() => onDetalle(trabajo)}
        >
          <FaInfoCircle />
          Detalle
        </button>

        {!trabajo.pagado && (
          <button
            className="flex-1 py-2 sm:py-2 rounded-full font-semibold shadow-md transition-colors bg-indigo-500 text-white flex items-center justify-center gap-2 text-xs sm:text-sm hover:bg-indigo-600"
            onClick={() => onCompletarPago && onCompletarPago(trabajo.id)}
          >
            <FaDollarSign />
            Pagado
          </button>
        )}
      </div>
    </div>
  );
}
