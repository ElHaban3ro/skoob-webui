import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import Login from "./assets/components/login.tsx";
import Main from "./assets/components/main.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Register from "./assets/components/register.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
