// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Guardamos usuarios en un estado local (simulado)
  const [usuarios, setUsuarios] = useState([
    { usuario: "amigo", password: "1234" }, // credencial de prueba
  ]);

  const [usuarioActual, setUsuarioActual] = useState(null);

  // Login: devuelve true si exitoso
  const login = (usuario, password) => {
    const user = usuarios.find(
      (u) => u.usuario === usuario && u.password === password
    );
    if (user) {
      setUsuarioActual(user);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setUsuarioActual(null);
  };

  // Registrar: devuelve true si exitoso, false si el usuario ya existe
  const registrar = (usuario, password) => {
    const existe = usuarios.some((u) => u.usuario === usuario);
    if (existe) return false;

    const nuevoUsuario = { usuario, password };
    setUsuarios([...usuarios, nuevoUsuario]);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ usuarioActual, login, logout, registrar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
