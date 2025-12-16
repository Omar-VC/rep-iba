export default function TrabajoCard({ trabajo, onCompletar, onEliminar, onEditar, onDetalle, temaOscuro }) {
  // Colores según tema
  const cardBg = temaOscuro ? "bg-[#135D66]" : "bg-[#77B0AA]";
  const cardText = temaOscuro ? "text-white" : "text-[#003C43]";
  const estadoCompletado = temaOscuro ? "bg-[#003C43] text-white" : "bg-[#003C43] text-white";
  const estadoPendiente = temaOscuro ? "bg-[#77B0AA] text-[#003C43] border border-[#003C43]" : "bg-[#E3FEF7] text-[#003C43] border border-[#003C43]";
  const btnBg = temaOscuro ? "bg-[#003C43]" : "bg-[#003C43]";
  const btnHover = temaOscuro ? "hover:bg-[#002D33]" : "hover:bg-[#002D33]";

  return (
    <div className={`${cardBg} rounded-2xl p-5 shadow-lg mb-4 border-l-4 border-[#003C43] ${cardText}`}>
      {/* Header con cliente y estado */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="font-bold text-xl">{trabajo.cliente}</h2>
          <p className="text-sm">{trabajo.telefono}</p>
          <p className="text-sm">{trabajo.equipo}</p>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            trabajo.estado === "completado" ? estadoCompletado : estadoPendiente
          }`}
        >
          {trabajo.estado}
        </span>
      </div>

      {/* Fechas */}
      <div className="text-sm mb-4">
        <p>Ingreso: {trabajo.ingreso}</p>
        <p>Entrega: {trabajo.entrega}</p>
      </div>

      {/* Botones */}
      <div className="flex gap-3 flex-wrap">
        {trabajo.estado !== "completado" && (
          <button
            className={`flex-1 ${btnBg} text-white py-2 rounded-full font-semibold ${btnHover} transition-colors`}
            onClick={() => onCompletar(trabajo.id)}
          >
            Completar
          </button>
        )}
        <button
          className={`flex-1 ${btnBg} text-white py-2 rounded-full font-semibold ${btnHover} transition-colors`}
          onClick={() => onEliminar(trabajo.id)}
        >
          Eliminar
        </button>
        <button
          className={`flex-1 ${btnBg} text-white py-2 rounded-full font-semibold ${btnHover} transition-colors`}
          onClick={() => onEditar(trabajo)}
        >
          Editar
        </button>
        <button
          className={`flex-1 ${btnBg} text-white py-2 rounded-full font-semibold ${btnHover} transition-colors`}
          onClick={() => onDetalle(trabajo)}
        >
          Detalle
        </button>
      </div>
    </div>
  );
}
