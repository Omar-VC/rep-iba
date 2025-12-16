import { FaTools, FaBoxOpen, FaCog } from "react-icons/fa";

export default function BottomNav({ tab, setTab, temaOscuro }) {
  const tabs = [
    { name: "agenda", label: "Agenda", icon: <FaTools /> },
    { name: "stock", label: "Stock", icon: <FaBoxOpen /> },
    { name: "ajustes", label: "Ajustes", icon: <FaCog /> },
  ];

  const bgNav = temaOscuro ? "bg-[#135D66]" : "bg-[#003C43]";
  const textInactive = temaOscuro
    ? "text-white hover:text-[#FFD93D]"
    : "text-white hover:text-[#77B0AA]";
  const textActive = temaOscuro ? "text-[#135D66]" : "text-[#003C43]";
  const bgActive = temaOscuro ? "bg-[#FFD93D]" : "bg-[#77B0AA]";
  const glow = temaOscuro
    ? "0 0 10px 3px rgba(255, 217, 61, 0.5)"
    : "0 0 10px 3px rgba(119, 176, 170, 0.5)";

  return (
    <nav className={`fixed bottom-0 left-0 w-full flex justify-around py-3 shadow-inner ${bgNav}`}>
      {tabs.map((t) => {
        const isActive = tab === t.name;
        return (
          <button
            key={t.name}
            onClick={() => setTab(t.name)}
            className={`flex flex-col items-center text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-200 transform ${
              isActive
                ? `${bgActive} ${textActive} scale-105`
                : `hover:scale-105 ${textInactive}`
            }`}
            style={isActive ? { boxShadow: glow } : { boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
          >
            <span className="text-lg mb-1">{t.icon}</span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
