"use client";

import { Category } from "./types";

interface Props {
  categories: Category[];
  activeParent: Category | null;
  activeChild: Category | null;
  setActiveParent: (cat: Category) => void;
  setActiveChild: (child: Category | null) => void;
  isDesktop?: boolean;
}

export default function CategoryList({
  categories,
  activeParent,
  activeChild,
  setActiveParent,
  setActiveChild,
  isDesktop = true,
}: Props) {
  if (!activeParent) return null;

  if (isDesktop) {
    return (
      <aside className="hidden lg:block space-y-6 border-r border-r-border pr-10 w-42.5 min-h-200">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h3
              className={`mb-2 text-lg font-bold cursor-pointer ${
                cat.id === activeParent.id ? "border-b-2 border-black" : ""
              }`}
              onClick={() => {
                setActiveParent(cat);
                setActiveChild(null);
              }}
            >
              {cat.name}
            </h3>

            <ul className="ml-4 list-disc space-y-1 text-sm">
              {cat.children.map((child) => (
                <li
                  key={child.id}
                  className={`cursor-pointer ${
                    activeChild?.id === child.id
                      ? "font-bold text-primary underline"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveParent(cat);
                    setActiveChild(child);
                  }}
                >
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    );
  }

  return (
    <div className="lg:hidden mb-4 -mx-4">
      <h3 className="font-bold mb-2 text-lg py-3 border-b border-b-border text-center">
        {activeParent.name}
      </h3>

      <ul className="flex gap-4 overflow-x-auto whitespace-nowrap px-4 pb-2 border-b border-b-border">
        <li
          className={`cursor-pointer ${
            activeChild === null ? "font-bold text-primary underline" : ""
          }`}
          onClick={() => setActiveChild(null)}
        >
          ALL
        </li>

        {activeParent.children.map((child) => (
          <li
            key={child.id}
            className={`cursor-pointer ${
              activeChild?.id === child.id
                ? "font-bold text-primary underline"
                : ""
            }`}
            onClick={() => setActiveChild(child)}
          >
            {child.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
