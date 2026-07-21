import { BOONBUY_COUPON_URL, BOONBUY_INVITE_CODE } from "@/lib/boonbuy-affiliate";
import { SOCIAL_LINKS } from "@/lib/constants";
import { buildComparisonPage } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

const COMPARISON_SLUGS = [
  "boonbuy-vs-litbuy",
  "boonbuy-vs-kakobuy",
  "boonbuy-vs-cnfans",
  "boonbuy-vs-allchinabuy",
  "boonbuy-vs-hoobuy",
] as const;

export const COMPARISON_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  "boonbuy-vs-litbuy": buildComparisonPage(
    "boonbuy-vs-litbuy",
    {
      name: "LitBuy",
      slug: "litbuy",
      positioning:
        "markets itself heavily on spreadsheet culture and community QC threads, with a UI tuned for buyers who already know batch names",
      pricingAngle:
        "LitBuy competes on transparent service fees and periodic signup credits. Payment method surcharges (card vs crypto vs balance) can swing the effective total more than the headline service percentage. Compare your usual payment rail on both dashboards before assuming either side is cheaper.",
      shippingAngle:
        "LitBuy publishes multiple international lines including economy and express options; EU and US buyers should compare tax-inclusive routes when available. During peak seasons, line suspensions affect every agent — LitBuy is not immune. Weigh estimated delivery windows against per-kilo price, not just the cheapest label.",
      spreadsheetAngle:
        "LitBuy's community ecosystem includes large shared sheets and Discord workflows. If your friends already paste LitBuy-specific columns, migration friction is real. BoonBuy Finds does not replace those social graphs — it gives you a searchable BoonBuy-oriented catalog when you want that checkout path.",
      strengths: [
        "Strong community spreadsheet culture with active QC sharing on popular batches.",
        "Familiar interface for buyers who migrated from older agent generations.",
        "Competitive shipping promos on select routes during campaign weeks.",
      ],
      weaknesses: [
        "Discovery still leans on external sheets unless you invest time in their browse tools.",
        "Fee and line changes require you to re-quote parcels — no agent sets and forgets pricing.",
        "Support volume spikes around holidays; plan extra buffer on first-time disputes.",
      ],
      bestFor:
        "LitBuy fits buyers already embedded in LitBuy-centric Discord servers who quote shipping often and want a community-standard agent wallet.",
      verdict:
        "LitBuy is a credible BoonBuy alternative when your circle standardizes on its spreadsheets and you like its current shipping promos to your country. BoonBuy pulls ahead when you want BoonBuy Finds' indexed catalog, coupon hub, and a single invite workflow tied to this site.",
    },
    [...COMPARISON_SLUGS]
  ),

  "boonbuy-vs-kakobuy": buildComparisonPage(
    "boonbuy-vs-kakobuy",
    {
      name: "Kakobuy",
      slug: "kakobuy",
      positioning:
        "is known in sneaker-heavy communities and offers its own coupon landing pages plus spreadsheet culture around Kakobuy checkout links",
      pricingAngle:
        "Kakobuy fee tables and top-up bonuses rotate with influencer campaigns. Sneaker buyers should watch for payment-channel fees that eat margin on sub-$50 items. Bundle domestic shipping across multiple Weidian carts carefully — small purchases multiply service overhead.",
      shippingAngle:
        "Kakobuy ships worldwide with a menu of lines; sneaker boxes need reinforcement options checked at parcel time. Compare volumetric weight on jacket hauls versus dense shoe boxes. Kakobuy occasionally runs freight sales that beat BoonBuy on specific corridors — verify live.",
      spreadsheetAngle:
        "Kakobuy spreadsheets circulate in Telegram and Reddit; columns often embed Kakobuy agent URLs. BoonBuy Finds is parallel infrastructure — use it when you want BoonBuy links with QC references on rows. Some buyers keep Kakobuy for shoes and BoonBuy for apparel after testing both.",
      strengths: [
        "Popular with sneaker-focused communities and batch hunters.",
        "Mature mobile experience for cart management on the go.",
        "Frequent coupon codes surfaced through partner pages.",
      ],
      weaknesses: [
        "Non-sneaker categories may feel less curated in community sheets.",
        "Promo terms differ by country — read fine print on shipping coupons.",
        "Switching agents mid-haul is impossible without re-buying — plan wallets upfront.",
      ],
      bestFor:
        "Kakobuy suits sneaker-first buyers whose reference lists already use Kakobuy URLs and who like its app-centric workflow.",
      verdict:
        "For a sneaker-heavy closet funded by Kakobuy promos, test Kakobuy on your next shoe parcel. For mixed apparel + footwear hauls discovered through BoonBuy Finds, BoonBuy keeps discovery and checkout aligned with fewer link conversions.",
    },
    [...COMPARISON_SLUGS]
  ),

  "boonbuy-vs-cnfans": buildComparisonPage(
    "boonbuy-vs-cnfans",
    {
      name: "CNFans",
      slug: "cnfans",
      positioning:
        "targets international buyers with streamlined onboarding and marketing around simple fee messaging",
      pricingAngle:
        "CNFans emphasizes approachable fee copy for first-time agent users. Low-ticket items still accumulate service and payment costs — beginners should not assume CNFans is always cheaper on $15 accessories. Compare consolidated haul totals, not single-row spreadsheet prices.",
      shippingAngle:
        "CNFans offers standard agent shipping menus; availability to your ZIP or postal code matters more than brand marketing. New buyers should run a one-shoe test parcel before trusting a thread claiming a magic line. Customs handling is still your responsibility — declare honestly.",
      spreadsheetAngle:
        "CNFans find lists exist but BoonBuy Finds' catalog depth is built for BoonBuy agent URLs with category filters. If you are CNFans-first, paste seller links manually after researching here. Cross-browsing prevents paying for the wrong batch because a sheet row went stale.",
      strengths: [
        "Onboarding funnels aimed at first haul buyers.",
        "Clear marketing on core fee structure for simple carts.",
        "Active social presence for shipping updates.",
      ],
      weaknesses: [
        "Power users may want deeper batch metadata than generic browse surfaces provide.",
        "Line availability can narrow during regulatory crackdowns on branded routes.",
        "Community QC volume varies by category compared to sneaker-heavy agents.",
      ],
      bestFor:
        "CNFans works for straightforward first hauls when friends already use it and quotes look good to your address.",
      verdict:
        "CNFans is reasonable for a maiden voyage if onboarding friction matters. BoonBuy plus BoonBuy Finds wins when you want long-term spreadsheet discovery, QC-linked rows, and coupon pages maintained on this domain.",
    },
    [...COMPARISON_SLUGS]
  ),

  "boonbuy-vs-allchinabuy": buildComparisonPage(
    "boonbuy-vs-allchinabuy",
    {
      name: "AllChinaBuy",
      slug: "allchinabuy",
      positioning:
        "has been in the agent space for years with a broad marketplace paste-link workflow and established warehouse operations",
      pricingAngle:
        "AllChinaBuy service fees and recharge bonuses follow the same industry pattern — compare effective rates after payment-method surcharges. Long-time users cite stable warehouse processing; new users should still verify live totals on a small cart. Currency conversion displays differ — read the final charged amount.",
      shippingAngle:
        "AllChinaBuy ships globally with multiple carriers; heavy hauls need reinforcement and vacuum options priced in. Some EU buyers compare AllChinaBuy tax lines against BoonBuy equivalents each season. Dimensional weight surprises hurt bag hauls — measure once in the warehouse UI before confirming freight.",
      spreadsheetAngle:
        "AllChinaBuy rows appear in legacy spreadsheets alongside other agents. BoonBuy Finds standardizes on BoonBuy buy links for faster mobile browsing. Research batches here, then paste into AllChinaBuy if that is your funded wallet — the discovery step is agent-agnostic.",
      strengths: [
        "Long operational track record in the agent category.",
        "Paste-link ordering works for any public marketplace URL.",
        "Warehouse extras (measurements, extra photos) are familiar to veteran buyers.",
      ],
      weaknesses: [
        "UI feels utilitarian compared to newer agents — learning curve for parcel splits.",
        "Community hype cycles favor newer platforms in social channels.",
        "Shipping promos require active monitoring — not always highlighted in-app.",
      ],
      bestFor:
        "AllChinaBuy fits buyers who already have balance there and trust its warehouse rhythm for repeat categories.",
      verdict:
        "Veterans with AllChinaBuy history should quote BoonBuy on the next parcel before switching — you might save freight. New shoppers on BoonBuy Finds should default to BoonBuy links unless AllChinaBuy quotes materially lower for your country.",
    },
    [...COMPARISON_SLUGS]
  ),

  "boonbuy-vs-hoobuy": buildComparisonPage(
    "boonbuy-vs-hoobuy",
    {
      name: "Hoobuy",
      slug: "hoobuy",
      positioning:
        "grew quickly with app-first marketing and influencer funnels targeting younger international streetwear buyers",
      pricingAngle:
        "Hoobuy promotes signup incentives and app notifications for fee events. Flash bonuses can make Hoobuy look cheaper on paper — confirm whether discounts apply to service fees, shipping, or top-ups only. Small-item hauls remain sensitive to minimum fees on any platform.",
      shippingAngle:
        "Hoobuy shipping lines compete on popular US and EU corridors during campaigns. Shoe boxes should use reinforcement; Hoobuy users report checking photo angles carefully on budget lines. Always compare insured versus uninsured totals for items over your personal risk threshold.",
      spreadsheetAngle:
        "Hoobuy find channels push app installs and Hoobuy-tagged URLs. BoonBuy Finds remains web-first and SEO-indexed — better for researching categories before you commit to an agent app ecosystem. Use both if you research here and checkout on Hoobuy for a specific promo.",
      strengths: [
        "Mobile app push for cart and shipping status.",
        "Influencer-driven coupon drops for new accounts.",
        "Streetwear-oriented marketing resonates with younger haulers.",
      ],
      weaknesses: [
        "Promo-heavy positioning can obscure baseline fees when campaigns end.",
        "Desktop power users may prefer browser-first agents for bulk paste jobs.",
        "Category depth outside hype items requires your own spreadsheet diligence.",
      ],
      bestFor:
        "Hoobuy appeals to app-native buyers chasing a current signup + shipping bundle advertised on social.",
      verdict:
        "Try Hoobuy when a concrete promo beats BoonBuy on a quoted parcel you already built. Default to BoonBuy Finds + BoonBuy when you want stable discovery URLs, long-form guides on this site, and spreadsheet hubs without installing another app first.",
    },
    [...COMPARISON_SLUGS]
  ),
};
