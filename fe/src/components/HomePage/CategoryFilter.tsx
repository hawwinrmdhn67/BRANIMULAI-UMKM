"use client";

import { Button } from "../ui/button";
import { CategoryFilter as CategoryType } from "../../lib/types";

interface CategoryFilterProps {
  categories: CategoryType[];
  selected: CategoryType;
  onSelect: (category: CategoryType) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          onClick={() => onSelect(category)}
          className={`${
            selected === category ? "bg-primary hover:bg-green-700 text-white" : ""
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
