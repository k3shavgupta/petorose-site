import { formulaParts } from "@/lib/product-utils";

export function Formula({ value }: { value: string | null }) {
  if (!value) return <>—</>;
  return (
    <span aria-label={value}>
      {formulaParts(value).map((part, i) => (part.sub ? <sub key={i}>{part.text}</sub> : <span key={i}>{part.text}</span>))}
    </span>
  );
}
