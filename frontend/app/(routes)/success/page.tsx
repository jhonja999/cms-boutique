"use client";

import { CheckCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* ✅ Ícono de éxito con animación */}
      <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />

      <h1 className="mt-4 text-3xl font-bold text-gray-800">¡Compra exitosa! 🎉</h1>
      <p className="mt-2 text-gray-600">
        Gracias por tu compra. Te hemos enviado un correo con los detalles.
      </p>

      {/* ✅ Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          variant="default"
          onClick={() => router.push("/#")} // Ir a la tienda
          className="flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Seguir Comprando
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/orders")} // Ir a órdenes
          className="flex items-center gap-2"
        >
          📦 Ver mis órdenes
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
