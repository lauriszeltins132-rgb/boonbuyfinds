import CommunityButton from "@/components/community/CommunityButton";
import { TelegramIcon } from "@/components/community/SocialIcons";
import { TELEGRAM_HANDLE } from "@/lib/constants";

type TelegramJoinCtaVariant = "hero" | "compact" | "final";

type TelegramJoinCtaProps = {
  variant?: TelegramJoinCtaVariant;
  location: string;
};

/**
 * Conversion CTA for joining the official BoonBuy Finds Telegram (@RNFinds).
 * Uses SOCIAL_LINKS.telegram via CommunityButton — never invent alternate channels.
 */
export default function TelegramJoinCta({
  variant = "hero",
  location,
}: TelegramJoinCtaProps) {
  if (variant === "compact") {
    return (
      <aside className="mt-8 rounded-2xl border border-[#229ED9]/35 bg-[#229ED9]/8 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#229ED9] text-white">
            <TelegramIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black text-foreground">
              Join Telegram {TELEGRAM_HANDLE}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              Daily finds, QC alerts, and spreadsheet updates.
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:shrink-0">
          <CommunityButton
            platform="telegram"
            variant="pill"
            location={location}
            label="Join Telegram →"
            showTelegramHandle={false}
            className="w-full justify-center sm:w-auto"
          />
        </div>
      </aside>
    );
  }

  const isFinal = variant === "final";

  return (
    <aside
      className={
        isFinal
          ? "mt-12 rounded-3xl border border-[#229ED9]/40 bg-gradient-to-br from-[#229ED9]/14 via-[#229ED9]/6 to-transparent p-6 text-center sm:p-8"
          : "mt-6 rounded-3xl border border-[#229ED9]/45 bg-gradient-to-br from-[#229ED9]/18 via-[#229ED9]/8 to-surface/40 p-6 text-center sm:p-8"
      }
    >
      <div className="mx-auto flex max-w-md flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_8px_24px_rgba(34,158,217,0.45)] sm:h-14 sm:w-14">
          <TelegramIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
        <h2 className="mt-4 text-xl font-black tracking-tight text-foreground sm:text-2xl">
          Join BoonBuy Telegram
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          Daily BoonBuy finds, QC alerts, price drops and spreadsheet updates.
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1a8bbf]">
          Join Telegram {TELEGRAM_HANDLE}
        </p>
        <div className="mt-5 w-full sm:mt-6 sm:w-auto">
          <CommunityButton
            platform="telegram"
            variant="cta"
            location={location}
            label="Join Telegram →"
            showTelegramHandle={false}
            fullWidth
            className="!min-h-[3rem] !px-8 !text-base sm:!min-w-[16rem] sm:!px-10"
          />
        </div>
      </div>
    </aside>
  );
}
