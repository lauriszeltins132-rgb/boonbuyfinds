export function getCollectionFaqs(
  slug: string,
  title: string
): { question: string; answer: string }[] {
  const name = title.replace(/^Best\s+/i, "").replace(/\s+BoonBuy finds$/i, "");

  const base = [
    {
      question: `What are the best ${name || title} on BoonBuy?`,
      answer:
        "This collection ranks catalog picks by photos, QC availability, engagement, and verified BoonBuy links. Products rotate with daily catalog sync.",
    },
    {
      question: "How often is this collection updated?",
      answer:
        "The product grid refreshes when the BoonBuy Finds catalog syncs — typically daily. Open product pages to confirm live BoonBuy prices before checkout.",
    },
    {
      question: "Are these QC approved?",
      answer:
        "Many listings include QC reference links. Request warehouse QC on BoonBuy after purchase for photos of your exact item before shipping.",
    },
  ];

  if (slug.includes("under-")) {
    base.push({
      question: "Do prices include shipping?",
      answer:
        "Listed prices are item cost before agent fees and international freight. Bundle budget items in one haul to lower per-piece shipping cost.",
    });
  }

  if (slug.includes("qc")) {
    base.push({
      question: "How do I use QC finds?",
      answer:
        "Compare reference QC on product pages, then request warehouse QC on BoonBuy for your paid order before approving international shipment.",
    });
  }

  return base;
}
