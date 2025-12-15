export default function BottomNav({ tab, setTab }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3">
      <button onClick={() => setTab("agenda")}>Agenda</button>
      <button onClick={() => setTab("stock")}>Stock</button>
      <button onClick={() => setTab("ajustes")}>Ajustes</button>
    </nav>
  )
}
