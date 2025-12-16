import { useState } from "react";
import Agenda from "./pages/agenda";
import Stock from "./pages/Stock";
import Ajustes from "./pages/Ajustes";
import BottomNav from "./components/BottomNav";

function App() {
  const [tab, setTab] = useState("agenda");
  const [temaOscuro, setTemaOscuro] = useState(false);

  const bgApp = temaOscuro ? "bg-[#135D66] text-[#FFD93D]" : "bg-gray-100 text-[#003C43]";

  return (
    <div className={`min-h-screen pb-16 ${bgApp}`}>
      {tab === "agenda" && <Agenda temaOscuro={temaOscuro} />}
      {tab === "stock" && <Stock temaOscuro={temaOscuro} />}
      {tab === "ajustes" && <Ajustes temaOscuro={temaOscuro} setTemaOscuro={setTemaOscuro} />}

      <BottomNav tab={tab} setTab={setTab} temaOscuro={temaOscuro} />
    </div>
  );
}

export default App;
