// src/pages/Stock.jsx
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaBoxOpen, FaPlus, FaTrash, FaMinus, FaEdit } from "react-icons/fa";

export default function Stock() {
  const [repuestos, setRepuestos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [repuestoEditar, setRepuestoEditar] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    cantidad: "",
    precio: "",
    fechaPrecio: "",
  });

  // 🔄 Leer repuestos
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "repuestos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRepuestos(data);
    });

    return () => unsubscribe();
  }, []);

  // ➕ Crear / ✏️ Editar
  const guardarRepuesto = async (e) => {
    e.preventDefault();

    try {
      if (repuestoEditar) {
        await updateDoc(doc(db, "repuestos", repuestoEditar.id), {
          ...form,
          cantidad: Number(form.cantidad),
          precio: Number(form.precio),
        });
        setRepuestoEditar(null);
      } else {
        await addDoc(collection(db, "repuestos"), {
          ...form,
          cantidad: Number(form.cantidad),
          precio: Number(form.precio),
          creadoEn: new Date(),
        });
      }

      setForm({ nombre: "", categoria: "", cantidad: "", precio: "" });
      setMostrarForm(false);
    } catch (error) {
      console.error("Error guardando repuesto:", error);
    }
  };

  // ➕➖ Stock rápido
  const cambiarStock = async (id, valor) => {
    await updateDoc(doc(db, "repuestos", id), {
      cantidad: increment(valor),
    });
  };

  // 🗑 Eliminar
  const eliminarRepuesto = async (id) => {
    if (!window.confirm("¿Eliminar este repuesto?")) return;
    await deleteDoc(doc(db, "repuestos", id));
  };

  return (
    <div className="p-4 min-h-screen bg-[#096B68] text-white">
      <h1 className="text-center text-3xl font-bold mb-6 flex justify-center items-center gap-2">
        STOCK <FaBoxOpen />
      </h1>

      <button
        onClick={() => {
          if (mostrarForm) {
            setMostrarForm(false);
            setRepuestoEditar(null);
            setForm({ nombre: "", categoria: "", cantidad: "", precio: "" });
          } else {
            setMostrarForm(true);
            setRepuestoEditar(null);
            setForm({ nombre: "", categoria: "", cantidad: "", precio: "" });
          }
        }}
        className="mb-4 bg-[#129990] text-[#FFFBDE] px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
      >
        <FaPlus /> Repuesto
      </button>

      {mostrarForm && (
        <form
          onSubmit={guardarRepuesto}
          className="mb-6 p-4 rounded-xl bg-[#135D66] flex flex-col gap-3"
        >
          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            className="p-2 rounded-lg bg-[#096B68] text-[#FFFBDE] placeholder-[#CFF5EE]"
          />
          <input
            placeholder="Categoría"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="p-2 rounded-lg bg-[#096B68] text-[#FFFBDE] placeholder-[#CFF5EE]"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={form.cantidad}
            onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
            required
            className="p-2 rounded-lg bg-[#096B68] text-[#FFFBDE]"
          />
          <input
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            className="p-2 rounded-lg bg-[#096B68] text-[#FFFBDE]"
          />
          <input
            type="date"
            value={form.fechaPrecio}
            onChange={(e) => setForm({ ...form, fechaPrecio: e.target.value })}
            className="w-full px-3 py-2 rounded bg-white text-[#003C43]"
          />

          <button className="bg-[#FFD93D] text-[#003C43] py-2 rounded-lg font-semibold">
            {repuestoEditar ? "Actualizar" : "Guardar"}
          </button>
        </form>
      )}

      {repuestos.length === 0 && <p>No hay repuestos cargados</p>}

      <ul className="space-y-3">
        {repuestos.map((r) => (
          <li
            key={r.id}
            className="bg-[#135D66] p-3 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{r.nombre}</p>

              <p className="text-sm">
                {r.categoria} · Stock:{" "}
                <span className="font-bold">{r.cantidad}</span>
              </p>

              <p className="text-sm">
                💲 {r.precio?.toLocaleString("es-AR") || "—"}
              </p>

              <p className="text-xs opacity-80">
                Precio al{" "}
                {r.fechaPrecio?.toDate
                  ? r.fechaPrecio.toDate().toLocaleDateString("es-AR")
                  : "sin fecha"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => cambiarStock(r.id, -1)}
                className="bg-red-500 px-2 py-1 rounded"
              >
                <FaMinus />
              </button>

              <button
                onClick={() => cambiarStock(r.id, 1)}
                className="bg-green-500 px-2 py-1 rounded"
              >
                <FaPlus />
              </button>

              <button
                onClick={() => {
                  setForm({
                    nombre: r.nombre,
                    categoria: r.categoria,
                    cantidad: r.cantidad,
                    precio: r.precio,
                  });
                  setRepuestoEditar(r);
                  setMostrarForm(true);
                }}
                className="bg-yellow-400 text-[#003C43] px-2 py-1 rounded"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => eliminarRepuesto(r.id)}
                className="text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
