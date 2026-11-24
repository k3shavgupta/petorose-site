"use client";

import { useId, useMemo, useState } from "react";
import type { ProductSummary } from "@/lib/content";
import { searchProducts } from "@/lib/product-utils";

export interface SearchClasses {
  root?: string;
  label?: string;
  field?: string;
  input?: string;
  list?: string;
  option?: string;
  optionActive?: string;
  optionMeta?: string;
  empty?: string;
}

interface Props {
  products: ProductSummary[];
  onSelect: (slug: string) => void;
  label: string;
  placeholder: string;
  classes: SearchClasses;
  icon?: React.ReactNode;
  maxResults?: number;
}

/** Accessible combobox (WAI-ARIA 1.2 list autocomplete) over the product catalogue. */
export function ProductSearch({ products, onSelect, label, placeholder, classes, icon, maxResults = 6 }: Props) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchProducts(products, query).slice(0, maxResults), [products, query, maxResults]);
  const expanded = open && query.trim().length > 0;

  const choose = (slug: string) => {
    onSelect(slug);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && expanded && results[active]) {
      e.preventDefault();
      choose(results[active].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`relative ${classes.root ?? ""}`}>
      <label htmlFor={`${id}-input`} className={classes.label}>
        {label}
      </label>
      <div className={classes.field}>
        {icon}
        <input
          id={`${id}-input`}
          type="search"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={expanded && results[active] ? `${id}-opt-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          className={classes.input}
        />
      </div>
      {expanded && (
        <ul id={`${id}-list`} role="listbox" aria-label={`${label} results`} className={classes.list}>
          {results.length === 0 && (
            <li role="option" aria-selected={false} aria-disabled className={classes.empty}>
              No product matches “{query}”
            </li>
          )}
          {results.map((p, i) => (
            <li
              key={p.slug}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(p.slug)}
              className={`${classes.option ?? ""} ${i === active ? (classes.optionActive ?? "") : ""}`}
            >
              <span>{p.name}</span>
              <span className={classes.optionMeta}>CAS {p.cas ?? "—"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
