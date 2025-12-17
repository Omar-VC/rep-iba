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

  // LOGIN
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Error login:", error.message);
      return false;
    }
  };

  // REGISTRO
  const registrar = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Error registro:", error.message);
      return false;
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  // SESIÓN PERSISTENTE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user);
      setCargando(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ usuarioActual, login, registrar, logout }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
