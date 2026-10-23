import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { router } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
    <RouterProvider router={router} />
  </StrictMode>,
);
