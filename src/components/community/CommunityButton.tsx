"use client";

import { SOCIAL_LINKS, TELEGRAM_HANDLE } from "@/lib/constants";
import { trackTelegramClick } from "@/lib/analytics-events";
import { TelegramIcon } from "./SocialIcons";

export type CommunityPlatform = "telegram";
export type CommunityButtonVariant = "icon" | "pill" | "cta";

type CommunityButtonProps = {
  platform?: CommunityPlatform;
  variant?: CommunityButtonVariant;
  location?: string;
  className?: string;
  label?: string;
  showTelegramHandle?: boolean;
  fullWidth?: boolean;
};

export default function CommunityButton({
  platform: _platform = "telegram",
  variant = "pill",
  location = "community",
  className = "",
  label,
  showTelegramHandle = false,
  fullWidth = false,
}: CommunityButtonProps) {
  void _platform;

  const text =
    label ??
    (showTelegramHandle
      ? `Join Telegram ${TELEGRAM_HANDLE}`
      : "Join Telegram");

  const variantClass =
    variant === "icon"
      ? "community-btn--icon"
      : variant === "cta"
        ? "community-btn--cta"
        : "community-btn--pill";

  const iconSize =
    variant === "icon" ? "h-[1.05rem] w-[1.05rem]" : "h-4 w-4";

  return (
    <a
      href={SOCIAL_LINKS.telegram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={variant === "icon" ? "Join Telegram" : undefined}
      onClick={() => trackTelegramClick(location)}
      className={`community-btn community-btn--telegram ${variantClass} ${
        fullWidth ? "community-btn--full" : ""
      } ${className}`}
    >
      <TelegramIcon className={iconSize} />
      {variant !== "icon" ? <span>{text}</span> : null}
    </a>
  );
}
