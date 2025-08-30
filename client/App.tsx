import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Industries from "./pages/Industries";
import Carbon from "./pages/Carbon";
import NotFound from "./pages/NotFound";

// Layout
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";


const queryClient = new QueryClient();



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes with shared layout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AuthLayout>
                  <Dashboard />
                </AuthLayout>
              </ProtectedRoute>
            } />
            <Route path="/industries" element={
              <ProtectedRoute>
                <AuthLayout>
                  <Industries />
                </AuthLayout>
              </ProtectedRoute>
            } />
            <Route path="/carbon" element={
              <ProtectedRoute>
                <AuthLayout>
                  <Carbon />
                </AuthLayout>
              </ProtectedRoute>
            } />

            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
