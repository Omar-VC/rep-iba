import { useState } from "react";
import { mockRepuestos } from "../data/mockRepuestos";
import RepuestoCard from "../components/RepuestoCard";
import RepuestoForm from "../components/RepuestoForm";
import DetalleRepuesto from "../components/DetalleRepuesto";


export default function Stock() {
  const [repuestos, setRepuestos] = useState(mockRepuestos);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [repuestoEditar, setRepuestoEditar] = useState(null);
  const [repuestoDetalle, setRepuestoDetalle] = useState(null);

  const guardarRepuesto = (data) => {
    if (repuestoEditar) {
      setRepuestos(
        repuestos.map((r) =>
          r.id === repuestoEditar.id ? { ...r, ...data } : r
        )
      );
      setRepuestoEditar(null);
    } else {
      setRepuestos([...repuestos, { ...data, id: Date.now() }]);
    }
    setMostrarForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Stock de repuestos</h1>
        <button
          onClick={() => {
            setRepuestoEditar(null);
            setMostrarForm(true);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Repuesto
        </button>
      </div>

      {repuestos.length === 0 && (
        <p className="text-gray-500">No hay repuestos cargados</p>
      )}

      {repuestos.map((rep) => (
        <RepuestoCard
          key={rep.id}
          repuesto={rep}
          onEditar={(r) => {
            setRepuestoEditar(r);
            setMostrarForm(true);
          }}
          onDetalle={(r) => setRepuestoDetalle(r)}
        />
      ))}

      {mostrarForm && (
        <RepuestoForm
          onGuardar={guardarRepuesto}
          onCancelar={() => {
            setMostrarForm(false);
            setRepuestoEditar(null);
          }}
          repuestoInicial={repuestoEditar}
        />
      )}

      {repuestoDetalle && (
        <DetalleRepuesto
          repuesto={repuestoDetalle}
          onCerrar={() => setRepuestoDetalle(null)}
          onEditar={(r) => {
            setRepuestoDetalle(null);
            setRepuestoEditar(r);
            setMostrarForm(true);
          }}
        />
      )}
    </div>
  );
}
