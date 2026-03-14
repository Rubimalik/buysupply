"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ImageUpload, type UploadedImage } from "./ImageUpload";
import {
  Package, DollarSign, Layers, Info, AlertCircle,
  ChevronDown, Loader2, CheckCircle2,
} from "lucide-react";

// Matches your Prisma schema exactly
type ProductFormData = {
  name: string;
  description: string;
  price: string;
  status: "draft" | "active" | "archived";
  tags: string;
  images: UploadedImage[];
};

const statuses = [
  { value: "draft", label: "Draft", desc: "Not visible to customers", dot: "bg-zinc-500" },
  { value: "active", label: "Active", desc: "Listed and available", dot: "bg-emerald-500" },
  { value: "archived", label: "Archived", desc: "Hidden from store", dot: "bg-amber-500" },
] as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

function Field({ label, required, error, hint, children }: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="text-indigo-400">*</span>}
        {hint && <span title={hint}><Info className="w-3.5 h-3.5 text-zinc-600 cursor-help" /></span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

function Input({ icon: Icon, prefix, error, className = "", ...props }:
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: React.ElementType; prefix?: string; error?: boolean;
  }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />}
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 pointer-events-none">{prefix}</span>}
      <input
        className={`w-full bg-zinc-900/60 border text-sm text-zinc-200 placeholder:text-zinc-600 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 transition-all
          ${error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-zinc-700/60 focus:border-indigo-500/60 focus:ring-indigo-500/20 hover:border-zinc-600"}
          ${Icon ? "pl-9" : ""} ${prefix ? "pl-7" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}

function Textarea({ error, ...props }:
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      className={`w-full bg-zinc-900/60 border text-sm text-zinc-200 placeholder:text-zinc-600 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 transition-all resize-none
        ${error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-zinc-700/60 focus:border-indigo-500/60 focus:ring-indigo-500/20 hover:border-zinc-600"}`}
      {...props}
    />
  );
}

function Select({ error, children, ...props }:
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none bg-zinc-900/60 border text-sm text-zinc-200 rounded-lg px-3 py-2.5 pr-9 focus:outline-none focus:ring-1 transition-all cursor-pointer
          ${error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-zinc-700/60 focus:border-indigo-500/60 focus:ring-indigo-500/20 hover:border-zinc-600"}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
    </div>
  );
}

function Card({ title, icon: Icon, children, className = "" }: {
  title: string; icon?: React.ElementType; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-[#13131a] border border-zinc-800/70 rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-zinc-800/70">
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-zinc-400" />
          </div>
        )}
        <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Main Form ───────────────────────────────────────────────────────────────

export function ProductUploadForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: { status: "draft", images: [] },
  });

  const descriptionValue = watch("description") || "";
  const watchedImages = watch("images") || [];

  const onSubmit = async (data: ProductFormData) => {
    // Guard: must have at least one successfully uploaded image
    if (data.images.length === 0) {
      setSubmitError("Please upload at least one product image.");
      return;
    }

    setSubmitState("loading");
    setSubmitError("");

    try {
      const payload = {
        name: data.name,
        description: data.description || undefined,
        // price is a string from the input — coerce to number, or null if empty
        price: data.price ? parseFloat(data.price) : null,
        status: data.status,
        tags: data.tags || undefined,
        // images come from UploadedImage[] — already have url + key from UploadThing
        images: data.images.map((img) => ({
          url: img.url,
          key: img.key,
          isPrimary: img.isPrimary,
        })),
      };

      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create product");
      }

      const result = await res.json();
      console.log("Product created:", result.data);

      setSubmitState("success");

      // Redirect to products list after short delay
      setTimeout(() => router.push("/dashboard/products/all-products"), 1500);
    } catch (err) {
      setSubmitState("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleSaveDraft = () => {
    // Set status to draft then submit
    handleSubmit((data) => onSubmit({ ...data, status: "draft" }))();
  };

  const isLoading = submitState === "loading";
  const isSuccess = submitState === "success";

  // Checklist — live reactive checks
  const checklist = [
    { label: "Add product name", done: !!watch("name") },
    { label: "Write a description", done: descriptionValue.length >= 20 },
    { label: "Upload at least one image", done: watchedImages.length > 0 },
    { label: "Set a price", done: !!watch("price") },
  ];

  return (
    <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── Left Column ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Basic Info */}
          <Card title="Product Information" icon={Package}>
            <div className="space-y-4">
              <Field label="Product Name" required error={errors.name?.message}>
                <Input
                  placeholder="e.g. Premium Wireless Headphones"
                  error={!!errors.name}
                  {...register("name", {
                    required: "Product name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                />
              </Field>

              <Field
                label="Description"
                hint="Describe the product in detail"
                error={errors.description?.message}
              >
                <div className="relative">
                  <Textarea
                    rows={5}
                    placeholder="Describe your product — features, materials, dimensions, use cases..."
                    error={!!errors.description}
                    {...register("description")}
                  />
                  <span className="absolute bottom-2.5 right-3 text-[10px] text-zinc-600">
                    {descriptionValue.length} chars
                  </span>
                </div>
              </Field>

              <Field label="Tags" hint="Comma-separated keywords for search">
                <Input
                  placeholder="wireless, audio, bluetooth, headphones..."
                  {...register("tags")}
                />
              </Field>
            </div>
          </Card>

          {/* Images */}
          <Card title="Product Images" icon={Package}>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUpload onChange={(imgs) => field.onChange(imgs)} />
              )}
            />
            {submitError.includes("image") && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />{submitError}
              </p>
            )}
          </Card>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-5">

          {/* Status */}
          <Card title="Publishing" icon={Layers}>
            <div className="space-y-4">
              <Field label="Status">
                <Select {...register("status")}>
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Select>
              </Field>

              <div className="space-y-2">
                {statuses.map((s) => (
                  <label
                    key={s.value}
                    className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800/60 hover:border-zinc-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      value={s.value}
                      {...register("status")}
                      className="mt-0.5 accent-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        <p className="text-sm font-medium text-zinc-300">{s.label}</p>
                      </div>
                      <p className="text-xs text-zinc-600 mt-0.5">{s.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </Card>

          {/* Live Checklist */}
          <div className="bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-indigo-300 mb-3">Checklist</h3>
            <ul className="space-y-2 text-xs">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${item.done
                      ? "border-emerald-500 bg-emerald-500/20"
                      : "border-zinc-700"
                    }`}>
                    {item.done
                      ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      : <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    }
                  </div>
                  <span className={item.done ? "text-zinc-300" : "text-zinc-500"}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Global error */}
          {submitState === "error" && !submitError.includes("image") && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {submitError}
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Product created! Redirecting...
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Saving...</>
              ) : isSuccess ? (
                <><CheckCircle2 className="w-4 h-4" />Saved!</>
              ) : (
                "Publish Product"
              )}
            </button>

            <button
              type="button"
              disabled={isLoading || isSuccess}
              onClick={handleSaveDraft}
              className="w-full py-2.5 text-sm font-medium border border-zinc-700 hover:border-zinc-600 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-400 hover:text-white rounded-xl transition-all duration-200"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}