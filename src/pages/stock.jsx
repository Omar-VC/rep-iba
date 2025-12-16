import { useState } from "react";
import { mockRepuestos } from "../data/mockRepuestos";
import RepuestoCard from "../components/RepuestoCard";
import RepuestoForm from "../components/RepuestoForm";
import DetalleRepuesto from "../components/DetalleRepuesto";

export default function Stock({ temaOscuro }) {
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

  // Colores según tema
  const bgMain = temaOscuro ? "bg-[#003C43] text-[#FFD93D]" : "bg-[#77B0AA] text-[#003C43]";
  const btnBg = temaOscuro ? "bg-[#77B0AA] text-[#003C43] hover:bg-[#5FA29F]" : "bg-[#77B0AA] text-[#003C43] hover:bg-[#5FA29F]";

  return (
    <div className={`p-4 min-h-screen ${bgMain}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock de repuestos</h1>
        <button
          onClick={() => {
            setRepuestoEditar(null);
            setMostrarForm(true);
          }}
          className={`px-4 py-2 rounded-full font-semibold ${btnBg} transition-colors`}
        >
          + Repuesto
        </button>
      </div>

      {repuestos.length === 0 && (
        <p className="text-center mt-10">
          No hay repuestos cargados
        </p>
      )}

      <div className="flex flex-col gap-4">
        {repuestos.map((rep) => (
          <RepuestoCard
            key={rep.id}
            repuesto={rep}
            onEditar={(r) => {
              setRepuestoEditar(r);
              setMostrarForm(true);
            }}
            onDetalle={(r) => setRepuestoDetalle(r)}
            temaOscuro={temaOscuro} // pasamos el tema a los cards
          />
        ))}
      </div>

      {mostrarForm && (
        <RepuestoForm
          onGuardar={guardarRepuesto}
          onCancelar={() => {
            setMostrarForm(false);
            setRepuestoEditar(null);
          }}
          repuestoInicial={repuestoEditar}
          temaOscuro={temaOscuro} // pasamos el tema al form
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
          temaOscuro={temaOscuro} // pasamos el tema al detalle
        />
      )}
    </div>
  );
}
