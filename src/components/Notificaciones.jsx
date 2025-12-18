// src/components/Notificaciones.jsx
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

export default function Notificaciones({ trabajos }) {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const ahora = new Date();
    const proximoAviso = trabajos.filter((t) => {
      if (!t.fechaEntrega) return false;

      const entrega = t.fechaEntrega.toDate ? t.fechaEntrega.toDate() : new Date(t.fechaEntrega);
      const diffDias = (entrega - ahora) / (1000 * 60 * 60 * 24);
      return diffDias >= 2 && diffDias <= 7 && t.estado !== "completado";
    });

    setNotificaciones(proximoAviso);
  }, [trabajos]);

  const handleClick = () => {
    if (notificaciones.length === 0) {
      alert("No hay notificaciones por el momento.");
    } else {
      const mensajes = notificaciones.map(
        (t) => `⚠️ ${t.nombre} debe entregarse el ${t.fechaEntrega.toDate ? t.fechaEntrega.toDate().toLocaleDateString() : t.fechaEntrega}`
      );
      alert(mensajes.join("\n"));
    }
  };

  return (
    <div className="fixed top-4 right-4">
      <button
        onClick={handleClick}
        className={`relative p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors`}
      >
        <FaBell size={20} />
        {notificaciones.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {notificaciones.length}
          </span>
        )}
      </button>
    </div>
  );
}
