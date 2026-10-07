import type { ReactNode } from "react"
import type { DeskState, HeroCard, Side } from "@/broadcast/types"
import { LANE_LABEL } from "@/broadcast/types"

function Backdrop({ state }: { state: DeskState }) {
  if (!state.theme.backgroundImageUrl) return null
  return <img src={state.theme.backgroundImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
}

function Shell({ state, children }: { state: DeskState; children: ReactNode }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ color: state.theme.ink, fontFamily: "system-ui, sans-serif" }}
    >
      <Backdrop state={state} />
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}

function SponsorRow({ state }: { state: DeskState }) {
  const visible = (state.sponsors ?? []).filter((sponsor) => sponsor.logoUrl || sponsor.name)
  if (visible.length === 0) return null
  return (
    <div className="flex items-center justify-center gap-10">
      {visible.map((sponsor) =>
        sponsor.logoUrl ? (
          <img key={sponsor.id} src={sponsor.logoUrl} alt={sponsor.name} className="h-12 max-w-36 object-contain" />
        ) : (
          <span key={sponsor.id} className="text-3xl">{sponsor.name}</span>
        ),
      )}
    </div>
  )
}

function heroOf(heroes: Map<string, HeroCard>, slug: string | null) {
  if (!slug) return null
  return heroes.get(slug) ?? null
}

const plate = "0 2px 10px rgba(0,0,0,0.85)"

function TeamColumns({
  state,
  side,
  heroes,
}: {
  state: DeskState
  side: Side
  heroes: Map<string, HeroCard>
}) {
  const team = state.teams[side]
  const reverse = side === "red"
  const bans = state.bans?.[side] ?? [null, null, null, null, null]
  return (
    <div className={`flex h-full min-h-0 flex-col justify-end gap-4 ${reverse ? "items-end" : "items-start"}`}>
      <div className={`flex items-center gap-4 ${reverse ? "flex-row-reverse text-right" : ""}`}>
        {team.logoUrl ? (
          <img src={team.logoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="h-16 w-16 rounded-full" style={{ background: team.color }} />
        )}
        <div>
          <div className="max-w-[26rem] truncate text-4xl font-medium leading-none" style={{ textShadow: plate }}>
            {team.name}
          </div>
          <span className="mt-2 inline-block px-2 py-0.5 text-sm text-white" style={{ background: team.color }}>
            {team.tag}
          </span>
        </div>
      </div>
      <div className={`flex items-center gap-2 ${reverse ? "flex-row-reverse" : ""}`}>
        <span className="text-xs tracking-widest" style={{ textShadow: plate }}>
          BANS
        </span>
        {bans.map((slug, index) => {
          const hero = heroOf(heroes, slug)
          return (
            <span key={index} className="block h-11 w-11 overflow-hidden bg-[#141820]">
              {hero && <img src={hero.iconUrl} alt="" className="h-full w-full object-cover" />}
            </span>
          )
        })}
      </div>
      <div className="grid h-[520px] w-full grid-cols-5 gap-2">
        {team.players.map((player) => {
          const hero = heroOf(heroes, player.heroSlug)
          return (
            <div key={player.id} className="flex h-full flex-col overflow-hidden bg-[#141820]">
              <div className="relative min-h-0 flex-1">
                {hero && (
                  <img
                    src={hero.portraitUrl || hero.iconUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <div className="bg-black/80 px-2 py-2">
                <div className="truncate text-sm">{player.nick || "—"}</div>
                <div className="text-[11px] uppercase tracking-wide opacity-70">{LANE_LABEL[player.lane]}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PresentacionScreen({ state, heroes }: { state: DeskState; heroes: Map<string, HeroCard> }) {
  const casters = (state.casters ?? []).filter((caster) => caster.name)
  return (
    <Shell state={state}>
      <div className="flex h-full flex-col px-10 py-8 text-white">
        <div className="text-center">
          <div className="text-2xl uppercase tracking-[0.22em]" style={{ textShadow: plate }}>
            {state.tournament.name}
          </div>
          {state.tournament.stage && (
            <div className="mt-1 text-lg" style={{ color: state.theme.accent, textShadow: plate }}>
              {state.tournament.stage}
            </div>
          )}
        </div>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1fr_4rem_1fr] items-stretch gap-4">
          <TeamColumns state={state} side="blue" heroes={heroes} />
          <div className="flex items-center justify-center text-4xl font-medium" style={{ textShadow: plate }}>
            VS
          </div>
          <TeamColumns state={state} side="red" heroes={heroes} />
        </div>
        <div className="grid gap-3 pt-4 text-center">
          <SponsorRow state={state} />
          {casters.length > 0 && (
            <p className="text-xl" style={{ textShadow: plate }}>
              Narración: {casters.map((caster) => (caster.role ? `${caster.name} (${caster.role})` : caster.name)).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </Shell>
  )
}

export function DraftScreen({ state, heroes }: { state: DeskState; heroes: Map<string, HeroCard> }) {
  return (
    <Shell state={state}>
      <div className="grid h-full grid-cols-2 grid-rows-[1fr_auto] gap-12 px-12 py-10">
        {(["blue", "red"] as const).map((side) => {
          const team = state.teams[side]
          return (
            <section key={side} className={side === "red" ? "text-right" : ""}>
              <h2 className="text-4xl font-medium">{team.name}</h2>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {state.bans[side].map((slug, index) => {
                  const hero = heroOf(heroes, slug)
                  return (
                    <div key={index} className="relative h-16 overflow-hidden" style={{ outline: `1px solid ${team.color}` }}>
                      {hero && <img src={hero.iconUrl} alt="" className="h-full w-full object-cover grayscale" />}
                    </div>
                  )
                })}
              </div>
              <ul className="mt-6 space-y-3">
                {team.players.map((player) => {
                  const hero = heroOf(heroes, player.heroSlug)
                  return (
                    <li key={player.id} className={`flex items-center gap-4 ${side === "red" ? "flex-row-reverse" : ""}`}>
                      <div className="h-20 w-16 overflow-hidden" style={{ background: team.color }}>
                        {hero && <img src={hero.portraitUrl || hero.iconUrl} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div>
                        <div className="text-3xl">{player.nick || "—"}</div>
                        <div className="text-lg opacity-70">{hero?.name ?? LANE_LABEL[player.lane]}</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
        <div className="col-span-2 self-end">
          <SponsorRow state={state} />
        </div>
      </div>
    </Shell>
  )
}

export function MarcadorScreen({ state }: { state: DeskState }) {
  const needed = Math.ceil(state.series.bestOf / 2)
  return (
    <Shell state={state}>
      <div className="flex h-full items-end px-10 pb-8">
        <div className="flex w-full items-center justify-between bg-black/70 px-8 py-4">
          {(["blue", "red"] as const).map((side) => {
            const team = state.teams[side]
            const score = state.series.score[side]
            return (
              <div key={side} className={`flex items-center gap-4 ${side === "red" ? "flex-row-reverse" : ""}`}>
                <span className="text-4xl font-medium">{team.tag || team.name}</span>
                <span className="text-5xl font-medium tabular-nums" style={{ color: team.color }}>
                  {state.game.kills[side]}
                </span>
                <span className="flex gap-1">
                  {Array.from({ length: needed }, (_, index) => (
                    <span
                      key={index}
                      className="h-3 w-3 rounded-full"
                      style={{ background: index < score ? team.color : "transparent", outline: `1px solid ${team.color}` }}
                    />
                  ))}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Shell>
  )
}

export function ResultadoScreen({ state, heroes }: { state: DeskState; heroes: Map<string, HeroCard> }) {
  const winner = state.result.winner ? state.teams[state.result.winner] : null
  const minutes = Math.floor(state.result.durationSec / 60)
  const seconds = String(state.result.durationSec % 60).padStart(2, "0")
  return (
    <Shell state={state}>
      <div className="flex h-full flex-col px-16 py-12">
        <div className="text-2xl opacity-70">{state.tournament.name}</div>
        <h1 className="mt-2 text-6xl font-medium">{winner ? `${winner.name} gana` : "Partida"}</h1>
        <div className="mt-2 text-3xl tabular-nums" style={{ color: state.theme.accent }}>
          {minutes}:{seconds}
        </div>
        <div className="mt-10 grid flex-1 grid-cols-2 gap-12">
          {(["blue", "red"] as const).map((side) => (
            <table key={side} className="w-full text-left text-2xl">
              <thead className="text-lg opacity-70">
                <tr>
                  <th className="py-1 font-medium">Jugador</th>
                  <th className="font-medium">Héroe</th>
                  <th className="w-12 text-right font-medium">K</th>
                  <th className="w-12 text-right font-medium">D</th>
                  <th className="w-12 text-right font-medium">A</th>
                </tr>
              </thead>
              <tbody>
                {state.teams[side].players.map((player) => {
                  const hero = heroOf(heroes, player.heroSlug)
                  const row = (state.result.kda ?? []).find((item) => item.playerId === player.id)
                  return (
                    <tr key={player.id}>
                      <td className="py-2">{player.nick || LANE_LABEL[player.lane]}</td>
                      <td>{hero?.name ?? "—"}</td>
                      <td className="text-right tabular-nums">{row?.kills ?? 0}</td>
                      <td className="text-right tabular-nums">{row?.deaths ?? 0}</td>
                      <td className="text-right tabular-nums">{row?.assists ?? 0}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ))}
        </div>
        <SponsorRow state={state} />
      </div>
    </Shell>
  )
}
