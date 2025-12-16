import { useState } from "react";
import { mockTrabajos } from "../data/mockTrabajos";
import TrabajoCard from "../components/TrabajoCard";
import TrabajoForm from "../components/TrabajoForm";
import DetalleTrabajo from "../components/DetalleTrabajo";
import { FaTools } from "react-icons/fa";

export default function Agenda({ temaOscuro }) {
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

  const bgColor = temaOscuro ? "bg-[#003C43]" : "bg-[#E6F7F5]";
  const textColor = temaOscuro ? "text-white" : "text-[#003C43]";
  const filtroColorActivo = temaOscuro ? "bg-[#77B0AA]" : "bg-[#77B0AA]";
  const filtroColorInactivo = temaOscuro ? "bg-[#135D66]" : "bg-[#A3D5D1]";

  return (
    <div className={`p-4 min-h-screen ${bgColor}`}>
      {/* Título central con icono */}
      <div className="flex justify-center items-center mb-6">
        <h1 className={`text-3xl font-bold flex items-center gap-2 ${textColor}`}>
          IBAÑEZ REPARACIONES <FaTools />
        </h1>
      </div>

      {/* Filtros */}
      <div className="flex justify-center gap-2 mb-6">
        {["todos", "pendiente", "completado"].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltro(estado)}
            className={`px-3 py-1 rounded-lg font-semibold ${
              filtro === estado ? filtroColorActivo + " text-white" : filtroColorInactivo + " " + textColor
            }`}
          >
            {estado === "todos"
              ? "Todos"
              : estado.charAt(0).toUpperCase() + estado.slice(1)}
          </button>
        ))}
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
        <p className={`text-center mt-10 ${textColor}`}>
          No hay trabajos cargados
        </p>
      ) : (
        trabajosOrdenados.map((trabajo) => (
          <TrabajoCard
            key={trabajo.id}
            trabajo={trabajo}
            temaOscuro={temaOscuro}
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
          temaOscuro={temaOscuro}
        />
      )}

      {/* Modal Detalle */}
      {trabajoDetalle && (
        <DetalleTrabajo
          trabajo={trabajoDetalle}
          temaOscuro={temaOscuro}
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
