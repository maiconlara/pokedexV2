export const handleTypeColors = (type: string) => {
  const pokemonTypes: Record<string, Record<string, string>> = {
    normal: {
      backgroundColor: "#a8a878",
    },
    fire: {
      backgroundColor: "#f08030",
    },
    fighting: {
      backgroundColor: "#c03028",
    },
    water: {
      backgroundColor: "#6890f0",
    },
    flying: {
      backgroundColor: "#a890f0",
    },
    grass: {
      backgroundColor: "#78c850",
    },
    poison: {
      backgroundColor: "#a040a0",
    },
    eletric: {
        backgroundColor: "#f8d030",
    },
    ground: {
        backgroundColor: "#e0c068",
    },
    pyschic: {
        backgroundColor: "#f85888",
    },
    rock: {
        backgroundColor: "#b8a038",
    },
    ice: {
        backgroundColor: "#98d8d8",
},
    bug: {
        backgroundColor: "#a8b820",
    },
    dragon: {
        backgroundColor: "#7038f8",
    },
    ghost: {
        backgroundColor: "#705898",
    },
    dark: {
        backgroundColor: "#705848",
    },
    steel: {
        backgroundColor: "#b8b8d0",
    },
    fairy: {
        backgroundColor: "#ee99ac",
    },
  };

  return (
    pokemonTypes[type] || {
      backgroundColor: "#a8a878",
    }
  );
};
