import React from "react";

interface CategoryLabelsProps {
  taste?: string; // Opcional
  origin?: string; // Opcional
}

const CategoryLabels: React.FC<CategoryLabelsProps> = ({ taste, origin }) => {
  return (
    <div className="flex gap-2 mt-1">
      <span className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black hover:bg-gray-800 transition-colors">
        {taste || "Desconocido"}
      </span>
      <span className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full hover:bg-yellow-800 transition-colors">
        {origin || "Desconocido"}
      </span>
    </div>
  );
};

export default CategoryLabels;
