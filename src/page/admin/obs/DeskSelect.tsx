import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DeskOption = {
  value: string;
  label: string;
};

export function DeskSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  className,
}: {
  label?: string;
  value: string;
  options: DeskOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const current = options.some((option) => option.value === value)
    ? value
    : undefined;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label ? <span className="text-sm text-admin-muted">{label}</span> : null}
      <Select value={current} onValueChange={onChange}>
        <SelectTrigger className="border-admin-border bg-admin-input text-admin-text shadow-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="focus:bg-admin-row focus:text-admin-text"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
