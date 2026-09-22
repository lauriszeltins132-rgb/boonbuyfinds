import { NextResponse } from "next/server";
import { getCardDisplayMap } from "@/lib/card-props";
import { getAllProducts } from "@/lib/products";

export const runtime = "nodejs";

const MAX_IDS = 120;

type Body = {
  ids?: unknown;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawIds = Array.isArray(body.ids) ? body.ids : [];
  const ids = [
    ...new Set(
      rawIds
        .filter((id): id is string => typeof id === "string" && id.length > 0)
        .slice(0, MAX_IDS)
    ),
  ];

  if (ids.length === 0) {
    return NextResponse.json({ products: [], cardDisplays: {} });
  }

  const wanted = new Set(ids);
  const products = getAllProducts().filter((product) => wanted.has(product.id));
  const cardDisplays = getCardDisplayMap(products.map((product) => product.id));

  return NextResponse.json(
    { products, cardDisplays },
    {
      headers: {
        "Cache-Control": "private, max-age=60",
      },
    }
  );
}
