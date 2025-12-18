// src/pages/Agenda.jsx
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import TrabajoCard from "../components/TrabajoCard";
import TrabajoForm from "../components/TrabajoForm";
import DetalleTrabajo from "../components/DetalleTrabajo";
import { FaTools, FaPlus } from "react-icons/fa";

export default function Agenda() {
  const [trabajos, setTrabajos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [trabajoEditar, setTrabajoEditar] = useState(null);
  const [trabajoDetalle, setTrabajoDetalle] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  // 🔄 Leer trabajos en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "trabajos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrabajos(data);
    });

    return () => unsubscribe();
  }, []);

  // ➕ Crear / ✏️ Editar trabajo
  const guardarTrabajo = async (data) => {
    try {
      if (trabajoEditar) {
        await updateDoc(doc(db, "trabajos", trabajoEditar.id), data);
        setTrabajoEditar(null);
      } else {
        await addDoc(collection(db, "trabajos"), {
          ...data,
          estado: "pendiente",
          pagado: false,
          creadoEn: new Date(),
        });
      }
      setMostrarForm(false);
    } catch (error) {
      console.error("Error guardando trabajo:", error);
    }
  };

  // ✅ Completar trabajo
  const completarTrabajo = async (id) => {
    await updateDoc(doc(db, "trabajos", id), { estado: "completado" });
  };

  // 💰 Marcar pagado
  const marcarPagado = async (id) => {
    await updateDoc(doc(db, "trabajos", id), { pagado: true });
  };

  // 🗑️ Eliminar
  const eliminarTrabajo = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este trabajo?"
    );
    if (!confirmar) return;

    await deleteDoc(doc(db, "trabajos", id));
  };

  const editarTrabajo = (trabajo) => {
    setTrabajoEditar(trabajo);
    setMostrarForm(true);
  };

  // 🔍 Filtros
  const trabajosFiltrados = trabajos.filter((t) => {
    if (filtro === "todos") return true;
    return t.estado === filtro;
  });

  // ⏱️ Orden por fecha
  const trabajosOrdenados = [...trabajosFiltrados].sort(
    (a, b) =>
      (b.creadoEn?.seconds || 0) - (a.creadoEn?.seconds || 0)
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
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filtro === f
                  ? "bg-[#129990] text-[#FFFBDE]"
                  : "bg-[#90D1CA] text-[#003C43]"
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
          className="bg-[#129990] text-[#FFFBDE] px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <FaPlus /> Trabajo
        </button>
      </div>

      {trabajosOrdenados.length === 0 && (
        <p>No hay trabajos cargados</p>
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
