import { useState } from "react";
import { mockTrabajos } from "../data/mockTrabajos";
import TrabajoCard from "../components/TrabajoCard";
import TrabajoForm from "../components/TrabajoForm";
import DetalleTrabajo from "../components/DetalleTrabajo";
import { FaTools, FaPlus } from "react-icons/fa";

export default function Agenda() {
  const [trabajos, setTrabajos] = useState(mockTrabajos);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [trabajoEditar, setTrabajoEditar] = useState(null);
  const [trabajoDetalle, setTrabajoDetalle] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  const completarTrabajo = (id) => {
    setTrabajos(
      trabajos.map((t) => (t.id === id ? { ...t, estado: "completado" } : t))
    );
  };

  const marcarPagado = (id) => {
    setTrabajos(
      trabajos.map((t) => (t.id === id ? { ...t, pagado: true } : t))
    );
  };

  const eliminarTrabajo = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este trabajo?"
    );
    if (!confirmar) return;

    setTrabajos(trabajos.filter((t) => t.id !== id));
  };

  const editarTrabajo = (trabajo) => {
    setTrabajoEditar(trabajo);
    setMostrarForm(true);
  };

  const guardarTrabajo = (data) => {
    if (trabajoEditar) {
      setTrabajos(
        trabajos.map((t) => (t.id === trabajoEditar.id ? { ...t, ...data } : t))
      );
      setTrabajoEditar(null);
    } else {
      setTrabajos([...trabajos, { ...data, id: Date.now(), pagado: false }]);
    }
    setMostrarForm(false);
  };

  const trabajosFiltrados = trabajos.filter((t) => {
    if (filtro === "todos") return true;
    return t.estado === filtro;
  });

  const trabajosOrdenados = [...trabajosFiltrados].sort(
    (a, b) => new Date(b.ingreso) - new Date(a.ingreso)
  );



  return (
    <div className="p-4 min-h-screen bg-[#096B68] text-white">
      <h1 className="text-center text-3xl font-bold mb-6 flex justify-center items-center gap-2">
        IBAÑEZ REPARACIONES <FaTools />
      </h1>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {["todos", "pendiente", "completado"].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors duration-200 ${
                filtro === f
                  ? "bg-[#129990] text-[#FFFBDE] shadow-md"
                  : "bg-[#90D1CA] text-[#003C43] hover:bg-[#129990] hover:text-[#FFFBDE] hover:shadow-md"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setTrabajoEditar(null);
            setMostrarForm(true);
          }}
          className="bg-[#129990] text-[#FFFBDE] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#096B68] hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <FaPlus /> Trabajo
        </button>
      </div>

      {trabajosOrdenados.length === 0 && (
        <p className="text-[#FFFBDE]">No hay trabajos cargados</p>
      )}

      {trabajosOrdenados.map((trabajo) => (
        <TrabajoCard
          key={trabajo.id}
          trabajo={trabajo}
          onCompletar={completarTrabajo}
          onEliminar={eliminarTrabajo}
          onEditar={editarTrabajo}
          onDetalle={setTrabajoDetalle}
          onCompletarPago={marcarPagado}
          temaOscuro={true}
        />
      ))}

      {mostrarForm && (
        <TrabajoForm
          onGuardar={guardarTrabajo}
          onCancelar={() => {
            setMostrarForm(false);
            setTrabajoEditar(null);
          }}
          trabajoInicial={trabajoEditar}
          temaOscuro={true}
        />
      )}

      {trabajoDetalle && (
        <DetalleTrabajo
          trabajo={trabajoDetalle}
          onCerrar={() => setTrabajoDetalle(null)}
          onEditar={(trabajo) => {
            setTrabajoDetalle(null);
            editarTrabajo(trabajo);
          }}
          onCompletar={(id) => {
            completarTrabajo(id);
            setTrabajoDetalle(null);
          }}
          onCompletarPago={marcarPagado}
          temaOscuro={true}
        />
      )}
      
    </div>
  );
}
