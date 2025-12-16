import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TemaProvider } from "./context/TemaContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TemaProvider>
          <App />
        </TemaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
