import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Agenda from "./pages/Agenda";
import Stock from "./pages/Stock";
import Ajustes from "./pages/Ajustes";
import BottomNav from "./components/BottomNav";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {
  const { usuarioActual, logout } = useAuth();
  const APP_MODE = import.meta.env.VITE_APP_MODE;
  const [tab, setTab] = useState("agenda");
  const [temaOscuro, setTemaOscuro] = useState(false);
  const bgApp = temaOscuro
    ? "bg-[#135D66] text-[#FFD93D]"
    : "bg-gray-100 text-[#003C43]";

  return (
    <div className={`min-h-screen pb-16 ${bgApp}`}>
      <Routes>
        {!usuarioActual && (
          <>
            <Route path="/login" element={<Login />} />
            {APP_MODE === "dev" && (
              <Route path="/registro" element={<Registro />} />
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {usuarioActual && (
          <Route
            path="/*"
            element={
              <>
                {tab === "agenda" && <Agenda temaOscuro={temaOscuro} />}
                {tab === "stock" && <Stock temaOscuro={temaOscuro} />}
                {tab === "ajustes" && (
                  <Ajustes
                    usuario={usuarioActual}
                    temaOscuro={temaOscuro}
                    setTemaOscuro={setTemaOscuro}
                    onCerrarSesion={logout}
                  />
                )}
                <BottomNav tab={tab} setTab={setTab} temaOscuro={temaOscuro} />
              </>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
