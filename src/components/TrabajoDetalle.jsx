export default function TrabajoDetalle({ trabajo, onCerrar, temaOscuro }) {
  if (!trabajo) return null;

  // Colores
  const colores = {
    principal: "#003C43",
    secundario: "#135D66",
    claro: "#77B0AA",
    suave: "#E3FEF7",
  };

  const bgCard = temaOscuro ? colores.secundario : colores.claro;
  const textColor = temaOscuro ? "#FFFFFF" : colores.principal;
  const estadoBg = trabajo.estado === "completado" ? colores.claro : colores.suave;
  const estadoText = colores.principal;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`w-11/12 max-w-md p-6 rounded-2xl shadow-lg`} style={{ backgroundColor: bgCard, color: textColor }}>
        <h2 className="text-xl font-bold mb-4 text-center">Detalle del trabajo</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Cliente:</strong> {trabajo.cliente}</p>
          <p><strong>Teléfono:</strong> {trabajo.telefono}</p>
          <p><strong>Equipo:</strong> {trabajo.equipo}</p>
          <p><strong>Ingreso:</strong> {trabajo.ingreso}</p>
          <p><strong>Entrega:</strong> {trabajo.entrega}</p>
          {trabajo.nota && <p><strong>Nota:</strong> {trabajo.nota}</p>}
          {trabajo.monto && <p><strong>Monto:</strong> ${trabajo.monto}</p>}
          <p>
            <strong>Estado:</strong>{" "}
            <span className="px-2 py-1 rounded font-semibold" style={{ backgroundColor: estadoBg, color: estadoText }}>
              {trabajo.estado}
            </span>
          </p>
          <p>
            <strong>Pagado:</strong>{" "}
            <span className="px-2 py-1 rounded font-semibold" style={{ backgroundColor: trabajo.pagado ? colores.secundario : colores.suave, color: trabajo.pagado ? "#FFF" : colores.principal }}>
              {trabajo.pagado ? "Sí" : "No"}
            </span>
          </p>
        </div>

        <button
          onClick={onCerrar}
          className="mt-4 w-full py-2 rounded font-semibold text-white"
          style={{ backgroundColor: colores.principal }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
