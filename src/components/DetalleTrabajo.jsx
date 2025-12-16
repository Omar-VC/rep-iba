import { generarRecibo } from "../utils/generarRecibo";

export default function DetalleTrabajo({ trabajo, onCerrar, onEditar, onCompletar, temaOscuro }) {
  // Colores según tema
  const bgCard = temaOscuro ? "bg-[#135D66] text-white" : "bg-[#77B0AA] text-[#003C43]";
  const estadoCompletadoBg = temaOscuro ? "bg-[#003C43] text-white" : "bg-[#003C43] text-white";
  const estadoPendienteBg = temaOscuro ? "bg-[#1F7F7A] text-white border border-white" : "bg-[#E3FEF7] text-[#003C43] border border-[#003C43]";

  const btnEditarBg = temaOscuro ? "bg-[#FFD93D] text-[#003C43]" : "bg-[#FFD93D] text-[#003C43]";
  const btnEditarHover = temaOscuro ? "hover:bg-[#E6C733]" : "hover:bg-[#E6C733]";
  const btnCompletarBg = temaOscuro ? "bg-[#5F9B8D] text-white" : "bg-[#77B0AA] text-white";
  const btnCompletarHover = temaOscuro ? "hover:bg-[#4C8B7B]" : "hover:bg-[#5F9B8D]";
  const btnReciboBg = temaOscuro ? "bg-[#8E44AD] text-white" : "bg-[#8E44AD] text-white";
  const btnReciboHover = temaOscuro ? "hover:bg-[#732D91]" : "hover:bg-[#732D91]";
  const btnCerrarBg = temaOscuro ? "bg-[#003C43] text-white" : "bg-[#003C43] text-white";
  const btnCerrarHover = temaOscuro ? "hover:bg-[#002D33]" : "hover:bg-[#002D33]";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`w-11/12 max-w-md p-6 rounded-2xl shadow-lg ${bgCard}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Detalle del trabajo</h2>

        <div className="space-y-2 text-sm">
          <p><b>Cliente:</b> {trabajo.cliente}</p>
          <p><b>Teléfono:</b> {trabajo.telefono}</p>
          <p><b>Equipo:</b> {trabajo.equipo}</p>
          <p><b>Ingreso:</b> {trabajo.ingreso}</p>
          <p><b>Entrega:</b> {trabajo.entrega}</p>
          <p>
            <b>Estado:</b>{" "}
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                trabajo.estado === "completado" ? estadoCompletadoBg : estadoPendienteBg
              }`}
            >
              {trabajo.estado}
            </span>
          </p>
          {trabajo.nota && (
            <p><b>Nota:</b> {trabajo.nota}</p>
          )}
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            onClick={() => onEditar(trabajo)}
            className={`flex-1 ${btnEditarBg} py-2 rounded-full font-semibold ${btnEditarHover} transition-colors`}
          >
            Editar
          </button>

          {trabajo.estado !== "completado" && (
            <button
              onClick={() => onCompletar(trabajo.id)}
              className={`flex-1 ${btnCompletarBg} py-2 rounded-full font-semibold ${btnCompletarHover} transition-colors`}
            >
              Completar
            </button>
          )}
        </div>

        <button
          onClick={() => generarRecibo(trabajo)}
          className={`w-full ${btnReciboBg} py-2 rounded-full font-semibold ${btnReciboHover} mt-3 transition-colors`}
        >
          Generar recibo PDF
        </button>

        <button
          onClick={onCerrar}
          className={`mt-3 w-full ${btnCerrarBg} py-2 rounded-full font-semibold ${btnCerrarHover} transition-colors`}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
