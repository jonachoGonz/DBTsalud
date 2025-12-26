import React from "react";

type Props = {
  adminUser: string;
};

export default function AdminAccessList({ adminUser }: Props) {
  return (
    <section className="space-y-4 bg-white rounded-xl border shadow-sm p-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-semibold">Usuarios con acceso al panel</h2>
          <p className="text-sm text-gray-600 mt-1">
            El acceso a <span className="font-medium">/admin</span> se valida con
            usuario/contraseña configurados en variables de entorno.
            <span className="font-medium"> La contraseña no se muestra</span> por
            seguridad.
          </p>
        </div>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[rgb(248,250,252)] text-gray-600">
            <tr>
              <th className="text-left font-medium px-4 py-3">Usuario</th>
              <th className="text-left font-medium px-4 py-3">Acceso</th>
              <th className="text-left font-medium px-4 py-3">Método</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3 font-mono">{adminUser}</td>
              <td className="px-4 py-3">Panel completo (Contenido / Estilos / Traductor)</td>
              <td className="px-4 py-3">Usuario + contraseña (Basic)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500">
        Para cambiar las credenciales, define <span className="font-mono">VITE_ADMIN_USER</span> y{" "}
        <span className="font-mono">VITE_ADMIN_PASSWORD</span> en el entorno del
        servidor.
      </div>
    </section>
  );
}
