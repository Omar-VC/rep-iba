export default function RepuestoCard({ repuesto, onEditar, onDetalle, temaOscuro }) {
  const estado =
    repuesto.cantidad === 0
      ? "sin-stock"
      : repuesto.cantidad <= repuesto.minimo
      ? "bajo"
      : "ok";

  const colorEstado = temaOscuro
    ? estado === "ok"
      ? "bg-green-800 text-green-200"
      : estado === "bajo"
      ? "bg-yellow-800 text-yellow-200"
      : "bg-red-800 text-red-200"
    : estado === "ok"
    ? "bg-green-100 text-green-800"
    : estado === "bajo"
    ? "bg-yellow-100 text-yellow-800"
    : "bg-red-100 text-red-800";

  const bgCard = temaOscuro ? "bg-[#135D66] text-[#FFD93D]" : "bg-[#77B0AA] text-[#003C43]";
  const btnBg = temaOscuro ? "bg-[#003C43] text-[#FFD93D] hover:bg-[#002D33]" : "bg-[#003C43] text-white hover:bg-[#002D33]";

  return (
    <div className={`rounded-2xl p-5 shadow-lg mb-4 border-l-4 border-[#003C43] ${bgCard}`}>
      {/* Header con nombre y estado */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="font-bold text-xl">{repuesto.nombre}</h2>
          <p className="text-sm">Cantidad: {repuesto.cantidad}</p>
          <p className="text-sm">Mínimo: {repuesto.minimo}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${colorEstado}`}>
          {estado}
        </span>
      </div>

      {/* Botones */}
      <div className="flex gap-3 flex-wrap mt-3">
        <button
          className={`flex-1 py-2 rounded-full font-semibold transition-colors shadow-md ${btnBg}`}
          style={{ boxShadow: "0 0 10px 3px rgba(0,0,0,0.2)" }}
          onClick={() => onEditar(repuesto)}
        >
          Editar
        </button>
        <button
          className={`flex-1 py-2 rounded-full font-semibold transition-colors shadow-md ${btnBg}`}
          style={{ boxShadow: "0 0 10px 3px rgba(0,0,0,0.2)" }}
          onClick={() => onDetalle(repuesto)}
        >
          Detalle
        </button>
      </div>
    </div>
  );
}
