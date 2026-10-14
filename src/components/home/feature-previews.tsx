"use client";

import PokemonArtwork from "../pokemon-artwork";

const PREVIEW_STATS = [
  { label: "HP", value: 35 },
  { label: "Atq.", value: 55 },
  { label: "Vel.", value: 90 },
];

const TEAM_PREVIEW_IDS = [6, 94, 131, 143, null, null];

export const PokedexPreview = () => (
  <div aria-hidden className="flex items-end">
    {[1, 4, 7].map((id, index) => (
      <PokemonArtwork
        key={id}
        pokemonId={id}
        alt=""
        size={index === 1 ? 112 : 96}
        className={`drop-shadow-xl ${index === 1 ? "relative z-10 -mx-4" : ""}`}
      />
    ))}
  </div>
);

export const DetailsPreview = () => (
  <div aria-hidden className="flex items-center gap-4">
    <PokemonArtwork
      pokemonId={25}
      alt=""
      size={112}
      className="drop-shadow-xl"
    />
    <div className="flex w-28 flex-col gap-1.5 rounded-xl bg-black/30 p-3">
      {PREVIEW_STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-2 text-[10px] text-white/80"
        >
          <span className="w-7">{stat.label}</span>
          <span className="h-1.5 flex-1 rounded-full bg-white/15">
            <span
              className="block h-full rounded-full bg-yellow-300"
              style={{ width: `${(stat.value / 150) * 100}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const TeamPreview = () => (
  <div aria-hidden className="grid grid-cols-3 gap-2">
    {TEAM_PREVIEW_IDS.map((id, index) =>
      id ? (
        <div
          key={id}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/25"
        >
          <PokemonArtwork pokemonId={id} alt="" size={48} />
        </div>
      ) : (
        <div
          key={`empty-${index}`}
          className="h-14 w-14 rounded-xl border-2 border-dashed border-white/25"
        />
      )
    )}
  </div>
);
