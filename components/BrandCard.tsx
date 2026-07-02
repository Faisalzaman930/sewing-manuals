import Link from "next/link";
import type { Brand } from "@/lib/types";

export default function BrandCard({
  brand,
  count,
}: {
  brand: Brand;
  count?: number;
}) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="block rounded-lg border border-iron-200 bg-white p-5 no-underline hover:border-steel-600 hover:shadow-sm"
    >
      <h2 className="font-bold text-iron-900">{brand.name}</h2>
      {brand.country && (
        <p className="mt-0.5 text-xs text-iron-600">{brand.country}</p>
      )}
      {brand.description && (
        <p className="mt-2 text-sm text-iron-700 line-clamp-2">{brand.description}</p>
      )}
      {count !== undefined && (
        <p className="mt-3 text-xs font-medium text-steel-700">
          {count} model{count !== 1 ? "s" : ""} →
        </p>
      )}
    </Link>
  );
}
