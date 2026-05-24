import { ContentText } from "@/components/atoms";
import { cn } from "@/lib/utils";

export type DarkStatTileProps = {
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
};

export function DarkStatTile({ value, label, className }: DarkStatTileProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-white/10 bg-white/6 p-7",
        className,
      )}
    >
      <ContentText
        as="p"
        variant="statValue"
        className="mb-2 font-heading text-[40px] leading-none tracking-tight text-primary-foreground"
      >
        {value}
      </ContentText>
      <ContentText as="p" variant="small" className="leading-snug text-white/42">
        {label}
      </ContentText>
    </div>
  );
}
