import { permanentRedirect } from "next/navigation";

/** Alias → canonical QC authority hub. */
export default function QcPage() {
  permanentRedirect("/boonbuy-qc");
}
