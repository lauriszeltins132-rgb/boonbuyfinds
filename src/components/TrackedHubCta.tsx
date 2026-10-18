"use client";

import Link from "next/link";
import {
  trackSpreadsheetBrowseClick,
  trackBrandClick,
} from "@/lib/analytics-events";

type TrackedHubCtaProps = {
  href: string;
  label: string;
  className?: string;
  location: string;
  external?: boolean;
};

export default function TrackedHubCta({
  href,
  label,
  className,
  location,
  external,
}: TrackedHubCtaProps) {
  function onClick() {
    if (href.includes("/browse") || location.includes("spreadsheet")) {
      trackSpreadsheetBrowseClick(location, href);
    }
    if (href.startsWith("/brands/")) {
      trackBrandClick(href, location);
    }
  }

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}
