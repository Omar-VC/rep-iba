// src/context/TemaContext.jsx
import { createContext, useState, useContext } from "react";

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [temaOscuro, setTemaOscuro] = useState(false);

  return (
    <TemaContext.Provider value={{ temaOscuro, setTemaOscuro }}>
      {children}
    </TemaContext.Provider>
  );
}

export const useTema = () => useContext(TemaContext);
