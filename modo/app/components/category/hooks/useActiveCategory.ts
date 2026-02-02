import { useEffect, useState } from "react";
import { Category } from "../types";

interface Props {
  slug: string | null;
  categories: Category[];
  onChange?: () => void;
}

export function useActiveCategory({ slug, categories, onChange }: Props) {
  const [activeParent, setActiveParent] = useState<Category | null>(null);
  const [activeChild, setActiveChild] = useState<Category | null>(null);

  useEffect(() => {
    if (!slug || categories.length === 0) return;

    const parent = categories.find((c) => c.slug === slug);
    if (!parent) return;

    setActiveParent(parent);
    setActiveChild(null);
    onChange?.();
  }, [slug, categories]);

  return {
    activeParent,
    activeChild,
    setActiveParent,
    setActiveChild,
  };
}
