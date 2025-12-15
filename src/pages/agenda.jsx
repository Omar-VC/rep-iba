import { useState } from "react";
import { mockTrabajos } from "../data/mockTrabajos";
import TrabajoCard from "../components/TrabajoCard";
import TrabajoForm from "../components/TrabajoForm";
import DetalleTrabajo from "../components/DetalleTrabajo";
import { FaTools } from "react-icons/fa"; // Icono de herramientas

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
      setTrabajos([...trabajos, { ...data, id: Date.now() }]);
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
    <div className="p-4 min-h-screen bg-[#003C43]">
      {/* Título central con icono */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          IBAÑEZ REPARACIONES <FaTools />
        </h1>
      </div>

      {/* Filtros */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setFiltro("todos")}
          className={`px-3 py-1 rounded-lg font-semibold ${
            filtro === "todos" ? "bg-[#77B0AA] text-white" : "bg-[#135D66] text-white"
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setFiltro("pendiente")}
          className={`px-3 py-1 rounded-lg font-semibold ${
            filtro === "pendiente" ? "bg-[#77B0AA] text-white" : "bg-[#135D66] text-white"
          }`}
        >
          Pendientes
        </button>

        <button
          onClick={() => setFiltro("completado")}
          className={`px-3 py-1 rounded-lg font-semibold ${
            filtro === "completado" ? "bg-[#77B0AA] text-white" : "bg-[#135D66] text-white"
          }`}
        >
          Completados
        </button>
      </div>

      {/* Botón agregar */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setTrabajoEditar(null);
            setMostrarForm(true);
          }}
          className="bg-[#77B0AA] text-white px-4 py-2 rounded-lg shadow"
        >
          + Trabajo
        </button>
      </div>

      {/* Lista de trabajos */}
      {trabajosOrdenados.length === 0 ? (
        <p className="text-white text-center mt-10">
          No hay trabajos cargados
        </p>
      ) : (
        trabajosOrdenados.map((trabajo) => (
          <TrabajoCard
            key={trabajo.id}
            trabajo={trabajo}
            onCompletar={completarTrabajo}
            onEliminar={eliminarTrabajo}
            onEditar={editarTrabajo}
            onDetalle={setTrabajoDetalle}
          />
        ))
      )}

      {/* Formulario */}
      {mostrarForm && (
        <TrabajoForm
          onGuardar={guardarTrabajo}
          onCancelar={() => {
            setMostrarForm(false);
            setTrabajoEditar(null);
          }}
          trabajoInicial={trabajoEditar}
        />
      )}

      {/* Modal Detalle */}
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
        />
      )}
    </div>
  );
}
