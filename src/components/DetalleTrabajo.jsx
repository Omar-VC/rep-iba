import { generarRecibo } from "../utils/generarRecibo";

export default function DetalleTrabajo({
  trabajo,
  onCerrar,
  onEditar,
  onCompletar,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-3">Detalle del trabajo</h2>

        <p>
          <b>Cliente:</b> {trabajo.cliente}
        </p>
        <p>
          <b>Teléfono:</b> {trabajo.telefono}
        </p>
        <p>
          <b>Equipo:</b> {trabajo.equipo}
        </p>
        <p>
          <b>Ingreso:</b> {trabajo.ingreso}
        </p>
        <p>
          <b>Entrega:</b> {trabajo.entrega}
        </p>
        <p>
          <b>Estado:</b> {trabajo.estado}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEditar(trabajo)}
            className="flex-1 bg-yellow-500 text-white py-2 rounded"
          >
            Editar
          </button>

          {trabajo.estado !== "completado" && (
            <button
              onClick={() => onCompletar(trabajo.id)}
              className="flex-1 bg-green-500 text-white py-2 rounded"
            >
              Completar
            </button>
          )}
        </div>

        <button
          onClick={() => generarRecibo(trabajo)}
          className="w-full bg-purple-500 text-white py-2 rounded mt-3"
        >
          Generar recibo PDF
        </button>

        <button
          onClick={onCerrar}
          className="mt-3 w-full bg-gray-300 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
