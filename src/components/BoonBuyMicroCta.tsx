import RegisterLink from "@/components/RegisterLink";

type BoonBuyMicroCtaProps = {
  location: string;
};

export default function BoonBuyMicroCta({ location }: BoonBuyMicroCtaProps) {
  return (
    <p className="mt-1.5 text-[10px] leading-snug text-muted/75">
      Opens in{" "}
      <RegisterLink
        location={location}
        className="font-semibold text-accent/85 hover:text-accent hover:underline"
      >
        BoonBuy
      </RegisterLink>
      <span className="text-muted/55"> · QC &amp; tracking included</span>
    </p>
  );
}
