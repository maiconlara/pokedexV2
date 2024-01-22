export const handleTypeColor = (type: string) => {
    const pokemonTypes: Record<string, Record<string, string>> = {
      normal: {
        backgroundColor: "#858566", 
        border: "1px solid #6d6d4e",
      },
      fire: {
        backgroundColor: "#c26e32",
        border: "1px solid #9c531f",
      },
      fighting: {
        backgroundColor: "#992f29",
        border: "1px solid #6d1915",
      },
      water: {
        backgroundColor: "#6281cc",
        border: "1px solid #445e9c",
      },
      flying: {
        backgroundColor: "#9887cc",
        border: "1px solid #5c4b8f",
      },
      grass: {
        backgroundColor: "#58913c",
        border: "1px solid #4e8234",
      },
      poison: {
        backgroundColor: "#7d3c7d",
        border: "1px solid #682a68",
      },
      electric: {
          backgroundColor: "#d6ae0f",
           border: "1px solid #a1871f",
      },
      ground: {
          backgroundColor: "#ad985e",
           border: "1px solid #927d44",
      },
      psychic: {
          backgroundColor: "#f85888",
           border: "1px solid #2c2c31",
      },
      rock: {
          backgroundColor: "#b8a038",
           border: "1px solid #2c2c31",
      },
      ice: {
          backgroundColor: "#98d8d8",
           border: "1px solid #2c2c31",
  },
      bug: {
          backgroundColor: "#8a9623",
           border: "1px solid #6d7815",
      },
      dragon: {
          backgroundColor: "#7038f8",
           border: "1px solid #2c2c31",
      },
      ghost: {
          backgroundColor: "#705898",
           border: "1px solid #2c2c31",
      },
      dark: {
          backgroundColor: "#705848",
           border: "1px solid #2c2c31",
      },
      steel: {
          backgroundColor: "#b8b8d0",
           border: "1px solid #2c2c31",
      },
      fairy: {
          backgroundColor: "#ee99ac",
           border: "1px solid #2c2c31",
      },
    };
  
    return (
      pokemonTypes[type] || {
        backgroundColor: "#a8a878",
         border: "1px solid #2c2c31",
      }
    );
  };
  