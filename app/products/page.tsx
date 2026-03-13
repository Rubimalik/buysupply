"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, ImageOff, Tag, PhoneCall, Mail, ShoppingCart } from "lucide-react";

interface ProductImage {
    id: number;
    url: string;
    key: string;
    isPrimary: boolean;
}

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number | null;
    status: "draft" | "active" | "archived";
    tags: string | null;
    createdAt: string;
    images: ProductImage[];
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="rounded-2xl overflow-hidden bg-[#111115] border border-white/5 animate-pulse">
            <div className="aspect-[4/3] bg-white/[0.04]" />
            <div className="p-4 space-y-2.5">
                <div className="h-4 bg-white/[0.04] rounded w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded w-full" />
                <div className="h-3 bg-white/[0.04] rounded w-2/3" />
                <div className="h-6 bg-white/[0.04] rounded w-1/3 mt-2" />
            </div>
        </div>
    );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
    const primaryImg = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
    const tags = product.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];

    return (
        <div className="group rounded-2xl overflow-hidden bg-[#111115] border border-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col">

            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d11]">
                {primaryImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={primaryImg.url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <ImageOff className="w-7 h-7 text-white/10" />
                        <span className="text-[10px] text-white/20 tracking-widest uppercase">No image</span>
                    </div>
                )}

                {/* Image count badge */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white/70 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10">
                        {product.images.length} photos
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                        {product.name}
                    </h3>
                    {product.description && (
                        <p className="text-xs text-white/40 mt-1.5 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                        <Tag className="w-3 h-3 text-white/20 shrink-0" />
                        {tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] text-white/40 bg-white/[0.05] border border-white/[0.06] px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="text-[10px] text-white/25">+{tags.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] mt-auto">
                    <div>
                        {product.price != null ? (
                            <span className="text-lg font-bold text-white">
                                £{Number(product.price).toFixed(2)}
                            </span>
                        ) : (
                            <span className="text-xs text-white/30 italic">Price on request</span>
                        )}
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-150">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Enquire
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({ page: String(page), limit: "12" });
            if (search) params.set("search", search);

            const res = await fetch(`/api/product?${params}`);
            const data = await res.json();
            // console.log("Fetched products:", data);
            if (!res.ok) throw new Error(data.error || "Failed to load");
            setProducts(data.data);
            setPagination(data.pagination);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load products");
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    // Debounce search input
    useEffect(() => {
        const t = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 400);
        return () => clearTimeout(t);
    }, [searchInput]);

    return (
        <div className="min-h-screen bg-[#0a0a0d] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── Top bar ── */}
            <div className="border-b border-white/[0.06] bg-[#0a0a0d]/90 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-xs text-white/40">
                        <a href="tel:01753971125" className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">01753971125</span>
                        </a>
                        <a href="mailto:sales@buysupply.me" className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">sales@buysupply.me</span>
                        </a>
                    </div>

                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                        <input
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white/[0.05] border border-white/[0.07] text-white placeholder:text-white/25 rounded-xl focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Products</h1>
                    {pagination && !loading && (
                        <p className="text-sm text-white/35 mt-1">
                            {search
                                ? `${pagination.total} results for "${search}"`
                                : `${pagination.total} products available`}
                        </p>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="text-center py-16">
                        <p className="text-red-400/70 text-sm">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="mt-3 text-xs text-white/40 hover:text-white/70 underline transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Skeleton grid */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && products.length === 0 && (
                    <div className="flex flex-col items-center gap-3 py-24 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-2">
                            <ShoppingCart className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-white/50 font-medium">No products found</p>
                        {search && (
                            <p className="text-sm text-white/25">
                                Try a different search term
                            </p>
                        )}
                    </div>
                )}

                {/* Product grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                        <button
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 text-sm text-white/40 border border-white/[0.08] rounded-xl hover:border-white/20 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                const p = Math.max(1, Math.min(page - 2, pagination.totalPages - 4)) + i;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${p === page
                                            ? "bg-white text-black"
                                            : "text-white/40 border border-white/[0.08] hover:border-white/20 hover:text-white/70"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === pagination.totalPages}
                            className="px-4 py-2 text-sm text-white/40 border border-white/[0.08] rounded-xl hover:border-white/20 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* ── Footer ── */}
            <footer className="border-t border-white/[0.05] mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/20">© 2026 BuySupply. All rights reserved.</p>
                    <div className="flex items-center gap-5 text-xs text-white/25">
                        <a href="tel:01753971125" className="flex items-center gap-1.5 hover:text-white/50 transition-colors">
                            <PhoneCall className="w-3.5 h-3.5" />01753971125
                        </a>
                        <a href="mailto:sales@buysupply.me" className="flex items-center gap-1.5 hover:text-white/50 transition-colors">
                            <Mail className="w-3.5 h-3.5" />sales@buysupply.me
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}