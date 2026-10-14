"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { TEAM_NAME_MAX_LENGTH, TEAM_SIZE } from "@/lib/team-db";
import { TeamDraft } from "@/types/team";
import { ChevronIcon } from "@/assets/chevron-icon";
import { usePokemonTypeIndex } from "@/utils/hooks/usePokemonTypeIndex";
import TeamPokemonSlot, { EmptyTeamSlot } from "./team-pokemon-slot";
import PokemonPicker from "./pokemon-picker";
import TeamCoverage from "./team-coverage";

interface TeamEditorProps {
  title: string;
  initialName: string;
  initialPokemonIds: number[];
  isSaving: boolean;
  hasSaveError: boolean;
  onSave: (draft: TeamDraft) => void;
}

const TeamEditor = ({
  title,
  initialName,
  initialPokemonIds,
  isSaving,
  hasSaveError,
  onSave,
}: TeamEditorProps) => {
  const [name, setName] = useState(initialName);
  const [pokemonIds, setPokemonIds] = useState(
    initialPokemonIds.slice(0, TEAM_SIZE)
  );
  const { typesById } = usePokemonTypeIndex();

  const isFull = pokemonIds.length >= TEAM_SIZE;
  const isEmpty = pokemonIds.length === 0;

  const addPokemon = (pokemonId: number) => {
    setPokemonIds((current) =>
      current.length >= TEAM_SIZE ? current : [...current, pokemonId]
    );
  };

  const removePokemon = (slotIndex: number) => {
    setPokemonIds((current) =>
      current.filter((_, index) => index !== slotIndex)
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty) return;
    onSave({ name, pokemonIds });
  };

  return (
    <div className="flex w-full max-w-[1100px] flex-col gap-6 pt-6 pb-12 md:pt-10">
      <Link
        href="/builder"
        className="flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
      >
        <ChevronIcon className="rotate-180" />
        Meus times
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-2xl bg-[#121326] p-5 shadow-xl md:p-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex w-full flex-col gap-3 md:max-w-md">
            <h1 className="font-bold text-2xl">{title}</h1>
            <Input
              label="Nome do time"
              value={name}
              onValueChange={setName}
              maxLength={TEAM_NAME_MAX_LENGTH}
              classNames={{
                inputWrapper: "bg-white/5 data-[hover=true]:bg-white/10",
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button as={Link} href="/builder" variant="bordered">
              Cancelar
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isSaving}
              isDisabled={isEmpty}
              className="font-medium"
            >
              Salvar time
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Pokémons do time</h2>
          <span className="text-sm text-gray-400">
            {pokemonIds.length}/{TEAM_SIZE}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: TEAM_SIZE }, (_, index) => {
            const pokemonId = pokemonIds[index];

            return pokemonId ? (
              <TeamPokemonSlot
                key={`${index}-${pokemonId}`}
                pokemonId={pokemonId}
                types={typesById.get(pokemonId) ?? []}
                onRemove={() => removePokemon(index)}
              />
            ) : (
              <EmptyTeamSlot key={`empty-${index}`} />
            );
          })}
        </div>

        {isEmpty && (
          <p className="text-sm text-gray-400">
            Escolha pelo menos um pokémon abaixo para salvar o time.
          </p>
        )}
        {hasSaveError && (
          <p className="text-sm text-red-400" role="alert">
            Não foi possível salvar o time neste navegador. Tente novamente.
          </p>
        )}
      </form>

      <section className="flex flex-col gap-5 rounded-2xl bg-[#121326] p-5 shadow-xl md:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Cobertura do time</h2>
          <p className="text-sm text-gray-400">
            Quantos pokémons do time levam mais dano, menos dano ou nenhum dano
            de cada tipo de ataque.
          </p>
        </div>
        <TeamCoverage pokemonIds={pokemonIds} />
      </section>

      <section className="flex flex-col gap-5 rounded-2xl bg-[#121326] p-5 shadow-xl md:p-6">
        <h2 className="font-bold text-lg">Adicionar pokémons</h2>
        <PokemonPicker isFull={isFull} onSelect={addPokemon} />
      </section>
    </div>
  );
};
export default TeamEditor;
