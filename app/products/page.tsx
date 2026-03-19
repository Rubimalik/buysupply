"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, ImageOff, PhoneCall, Mail, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductImage { id: number; url: string; isPrimary: boolean; }
interface Category { id: number; name: string; slug: string; }
interface Product {
  id: number; name: string; description: string | null;
  price: number | null; tags: string | null; status: string;
  createdAt: string; images: ProductImage[];
  category: Category | null;
}

const CATEGORIES = [
  { label: "Printer",      slug: "photocopiers" },
  { label: "Consumables",  slug: "consumables"  },
];

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 animate-pulse">
      <div className="aspect-square bg-zinc-800" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const primaryImg = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];

  return (
    <Link href={`/products/${product.id}`}
      className="group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-200 flex flex-col">
      {/* Square image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        {primaryImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={primaryImg.url} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-8 h-8 text-zinc-700" />
          </div>
        )}
      </div>
      {/* Name + price */}
      <div className="p-3 flex flex-col gap-1">
        <p className="text-sm text-white font-medium line-clamp-2 leading-snug">{product.name}</p>
        <p className="text-sm text-zinc-400">
          {product.price != null ? `£${Number(product.price).toFixed(2)}` : "POA"}
        </p>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const [activeSlug, setActiveSlug]   = useState(CATEGORIES[0].slug);
  const [products, setProducts]       = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch]           = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [total, setTotal]             = useState(0);

   const router = useRouter();  

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        slug:   activeSlug,
        status: "active",
        page:   String(page),
        limit:  "12",
      });
      if (search) params.set("search", search);

      const res  = await fetch(`/api/product?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setProducts(data.data || []);
      setTotal(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [activeSlug, search, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Reset page when category changes
  const switchCategory = (slug: string) => {
    setActiveSlug(slug);
    setPage(1);
    setSearchInput("");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Top contact bar ── */}
      <div className="border-b border-white/[0.06] bg-[#0a0a0d]/90 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="tel:01753971125" className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
              <PhoneCall className="w-3.5 h-3.5" /><span className="hidden sm:inline">01753971125</span>
            </a>
            <a href="mailto:sales@buysupply.me" className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
              <Mail className="w-3.5 h-3.5" /><span className="hidden sm:inline">sales@buysupply.me</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => switchCategory(cat.slug)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSlug === cat.slug
                  ? "bg-zinc-700 text-white"
                  : "bg-transparent text-white border border-zinc-600 hover:border-zinc-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search + content ── */}
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Search bar — matches original layout (left-aligned) */}
        <div className="mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-[30%] -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-transparent border border-zinc-700 text-white placeholder:text-zinc-500 rounded-lg focus:outline-none focus:border-zinc-400 transition-all"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-900 mb-8" />

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 text-sm py-8">{error}</p>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-zinc-500 text-sm py-16">No products found.</p>
        )}

        {/* Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                  className="px-4 py-1.5 text-sm text-zinc-400 border border-zinc-700 rounded-lg hover:border-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  Previous
                </button>
                <span className="text-sm text-zinc-500">Page {page} of {totalPages}</span>
                <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
                  className="px-4 py-1.5 text-sm text-zinc-400 border border-zinc-700 rounded-lg hover:border-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}