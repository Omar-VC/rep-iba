import { generarRecibo } from "../utils/generarRecibo";

export default function DetalleTrabajo({
  trabajo,
  onCerrar,
  onEditar,
  onCompletar,
  onCompletarPago,
  temaOscuro
}) {
  const bgCard = temaOscuro ? "#096B68" : "#FFFBDE";
  const textColor = temaOscuro ? "#FFFBDE" : "#003C43";

  const estadoCompletadoBg = temaOscuro ? "#129990" : "#90D1CA";
  const estadoPendienteBg = temaOscuro ? "#FFD93D" : "#FFFBDE";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full sm:w-11/12 max-w-md p-4 sm:p-6 rounded-2xl shadow-lg" style={{ backgroundColor: bgCard, color: textColor }}>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Detalle del trabajo</h2>

        <div className="space-y-2 text-sm sm:text-base">
          {Object.entries({
            Cliente: trabajo.cliente,
            Teléfono: trabajo.telefono,
            Equipo: trabajo.equipo,
            Ingreso: trabajo.ingreso,
            Entrega: trabajo.entrega,
            Monto: `$${trabajo.monto || 0}`,
            Pago: trabajo.pagado ? "Pagado" : "Debe",
            Estado: trabajo.estado,
            Nota: trabajo.nota
          }).map(([label, value]) => (
            value && <p key={label}><b>{label}:</b> {value}</p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button className="flex-1 py-1 rounded font-semibold text-[#003C43]" onClick={() => onEditar(trabajo)} style={{ backgroundColor: "#FFD93D" }}>Editar</button>
          {trabajo.estado !== "completado" && <button className="flex-1 py-1 rounded font-semibold text-white" onClick={() => onCompletar(trabajo.id)} style={{ backgroundColor: "#129990" }}>Completar</button>}
          {!trabajo.pagado && onCompletarPago && <button className="flex-1 py-1 rounded font-semibold text-[#003C43]" onClick={() => onCompletarPago(trabajo.id)} style={{ backgroundColor: "#FFFBDE" }}>Marcar como pagado</button>}
        </div>

        <button className="w-full py-1 rounded font-semibold mt-3 text-sm text-white" onClick={() => generarRecibo(trabajo)} style={{ backgroundColor: "#8E44AD" }}>Generar recibo PDF</button>
        <button className="w-full py-1 rounded font-semibold mt-3 text-sm text-white" onClick={onCerrar} style={{ backgroundColor: "#003C43" }}>Cerrar</button>
      </div>
    </div>
  );
}
