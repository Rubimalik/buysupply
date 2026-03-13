import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/product/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: { orderBy: { isPrimary: "desc" } } },
    });

    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ data: product });
  } catch (err) {
    console.error("[GET /api/product/:id]", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/product/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();
    const { name, description, price, status, tags, images } = body;

    const data: Record<string, unknown> = {};

    if (name        !== undefined) data.name        = name;
    if (description !== undefined) data.description = description || null;
    if (price       !== undefined) data.price       = price ?? null;
    if (status      !== undefined) data.status      = status;
    if (tags        !== undefined) data.tags        = tags || null;

    if (images !== undefined) {
      data.images = {
        deleteMany: {},
        create: images.map((img: { url: string; key: string; isPrimary?: boolean }, i: number) => ({
          url:       img.url,
          key:       img.key,
          isPrimary: img.isPrimary ?? i === 0,
        })),
      };
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data:  data as never,
      include: { images: { orderBy: { isPrimary: "desc" } } },
    });

    return NextResponse.json({ data: product, message: "Product updated successfully" });
  } catch (err) {
    console.error("[PUT /api/product/:id]", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/product/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId } }),
      prisma.product.delete({ where: { id: productId } }),
    ]);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("[DELETE /api/product/:id]", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}