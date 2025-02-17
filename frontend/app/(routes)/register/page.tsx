// pages/register.tsx
"use client"
import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registerUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
/* 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(formData);
    alert("¡Registro exitoso!");
    window.location.href = "/orders"; // Redirige a la página de órdenes
  };
 */
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
      {/* <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="border p-2 w-full"
        /> */}
        <input
          type="text"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="border p-2 w-full"
        />
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
     {/*  </form> */}
    </div>
  );
};

export default RegisterPage;