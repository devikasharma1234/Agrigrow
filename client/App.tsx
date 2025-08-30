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
import { useEffect, useState } from "react";
import MapComponent from "./components/map/index";
import { Industry } from "./components/types";

const queryClient = new QueryClient();
const mapping: Record<string, string[]> = {
  WheatWaste: ["Green Fertilizers", "EcoBio Energy", "Compost & Bio Fertilizers Ltd"],
  PaddyWaste: ["Haryana BioFuel", "AgriWaste Solutions", "Farm2Energy"],
  MaizeWaste: ["Organic Energy Co.", "Green AgriFuel"],
  CottonWaste: ["AgriCompost Pvt Ltd", "Organic Energy Co."],
  HazardousWaste: ["Biodigest Solutions"],
};
const industries: Industry[] = [
  { name: "Haryana BioFuel", location: [28.7041, 77.1025], wasteType: "Crop Residue", pricePerKg: 5.0 },
  { name: "Green Fertilizers", location: [29.0588, 76.0856], wasteType: "Organic Waste", pricePerKg: 8.5 },
  { name: "EcoBio Energy", location: [28.9330, 76.8489], wasteType: "Crop Residue", pricePerKg: 6.0 },
  { name: "AgriCompost Pvt Ltd", location: [29.3913, 76.9780], wasteType: "Organic Waste", pricePerKg: 7.0 },
  { name: "Biodigest Solutions", location: [28.6692, 77.4538], wasteType: "Animal & Crop Waste", pricePerKg: 5.5 },
  { name: "Green AgriFuel", location: [29.3269, 76.2833], wasteType: "Crop Residue", pricePerKg: 6.5 },
  { name: "Organic Energy Co.", location: [28.8950, 76.6061], wasteType: "Bagasse & Crop Waste", pricePerKg: 7.5 },
  { name: "Farm2Energy", location: [28.7041, 76.8789], wasteType: "Agricultural Residue", pricePerKg: 5.0 },
  { name: "Compost & Bio Fertilizers Ltd", location: [29.9696, 76.8210], wasteType: "Organic Waste", pricePerKg: 8.0 },
  { name: "AgriWaste Solutions", location: [28.9045, 77.0476], wasteType: "Crop Residue & Husk", pricePerKg: 6.0 }
];

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
            <Route path="/map" element={
              <ProtectedRoute>
                <AuthLayout>
                  <MapComponent />
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
