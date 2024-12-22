import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./provider/theme-provider";
import { DataProvider } from "./provider/data-provider";
import { ModalProvider } from "./provider/modal-provider";
import RootModal from "./components/root-modal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <ModalProvider>
          <App />
          <RootModal />
        </ModalProvider>
      </DataProvider>
    </ThemeProvider>
  </StrictMode>
);
