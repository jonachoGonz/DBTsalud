import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Luminous from "./pages/Luminous";
import Home2 from "./pages/Home2";
import Admin from "./pages/Admin";
import { useEffect } from "react";
import { fetchSiteSettings } from "@/lib/cms";
import { applyTheme } from "@/lib/theme";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    (async () => {
      const settings = await fetchSiteSettings();
      if (settings?.theme) applyTheme(settings.theme as any);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Luminous />} />
              <Route path="/luminous" element={<Luminous />} />
              <Route path="/home2" element={<Home2 />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");
const anyContainer = container as any;
if (container && !anyContainer._reactRoot) {
  const root = createRoot(container);
  anyContainer._reactRoot = root;
  root.render(<App />);
}
