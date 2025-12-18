import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  const APP_MODE = import.meta.env.VITE_APP_MODE;

  // 🔐 LOGIN
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // 📝 REGISTRO CONTROLADO
  const registrar = async (email, password) => {
    // 🔒 En producción: si ya hay usuario, no permitir registrar otro
    if (APP_MODE === "prod" && auth.currentUser) {
      throw new Error("Registro deshabilitado en producción");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  // 🔄 SESIÓN PERSISTENTE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user);
      setCargando(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        login,
        registrar,
        logout,
      }}
    >
      {!cargando && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
