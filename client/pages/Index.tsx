import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { SupabaseTest } from "@/components/SupabaseTest";

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  // Fetch users on component mount
  useEffect(() => {
    fetchDemo();
  }, []);

  // Example of how to fetch data from the server (if needed)
  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800 mb-4">
            ¡Proyecto conectado a Supabase!
          </h1>
          <p className="text-slate-600 max-w-md mx-auto mb-8">
            Tu proyecto ya está configurado y listo para usar Supabase. Prueba
            la autenticación a continuación.
          </p>
        </div>

        <SupabaseTest />

        <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
          {exampleFromServer && `Servidor: ${exampleFromServer}`}
        </p>
      </div>
    </div>
  );
}
