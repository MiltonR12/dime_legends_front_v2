import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { HeroCard } from "@/broadcast/types";

function HeroPicker({
  open,
  title,
  heroes,
  current,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  title: string;
  heroes: HeroCard[];
  current: string | null;
  onOpenChange: (open: boolean) => void;
  onPick: (slug: string | null) => void;
}) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return heroes;
    return heroes.filter((hero) => hero.name.toLowerCase().includes(text));
  }, [heroes, query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-admin-border bg-admin-surface text-admin-text">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-admin-text">
            {title}
          </DialogTitle>
        </DialogHeader>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar personaje"
          className="border-admin-border bg-admin-input text-admin-text"
          autoFocus
        />
        <div className="min-h-0 max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
            {visible.map((hero) => (
              <button
                key={hero.slug}
                type="button"
                title={hero.name}
                onClick={() => onPick(hero.slug)}
                className={`overflow-hidden rounded-md border text-left ${
                  hero.slug === current
                    ? "border-admin-accent"
                    : "border-admin-border"
                }`}
              >
                <span className="relative block aspect-square bg-admin-input">
                  <img
                    src={hero.iconUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </span>
                <span className="block truncate px-1 py-1 text-[11px] text-admin-muted">
                  {hero.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        {visible.length === 0 && (
          <p className="text-sm text-admin-muted">
            Ningún personaje con ese nombre.
          </p>
        )}
        {current && (
          <button
            type="button"
            onClick={() => onPick(null)}
            className="text-sm text-admin-muted underline-offset-2 hover:text-admin-text hover:underline"
          >
            Quitar personaje
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default HeroPicker;
