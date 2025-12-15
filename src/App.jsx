import { useState } from "react"
import Agenda from "./pages/agenda"
import Stock from "./pages/Stock"
import Ajustes from "./pages/Ajustes";
import BottomNav from "./components/BottomNav"

function App() {
  const [tab, setTab] = useState("agenda")

  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      {tab === "agenda" && <Agenda />}
      {tab === "stock" && <Stock />}
      {tab === "ajustes" && <Ajustes />}

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  )
}

export default App
