import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { preloadSounds } from "./lib/sound/sound.service";
import "./index.css";

preloadSounds();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      gap={8}
      offset={16}
      mobileOffset={16}
      visibleToasts={4}
      expand
      closeButton={false}
      richColors={false}
      toastOptions={{
        classNames: {
          toast: "border-0 bg-transparent p-0 shadow-none",
        },
      }}
    />
  </StrictMode>,
);
