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
          backgroundColor: "#db5c82",
           border: "1px solid #a33153",
      },
      rock: {
          backgroundColor: "#948235",
           border: "1px solid #736321",
      },
      ice: {
          backgroundColor: "#93c2c2",
           border: "1px solid #5c8b8b",
  },
      bug: {
          backgroundColor: "#8a9623",
           border: "1px solid #6d7815",
      },
      dragon: {
          backgroundColor: "#6d40db",
           border: "1px solid #452692",
      },
      ghost: {
          backgroundColor: "#5c4c78",
           border: "1px solid #3e3154",
      },
      dark: {
          backgroundColor: "#544439",
           border: "1px solid #41332a",
      },
      steel: {
          backgroundColor: "#afafbd",
           border: "1px solid #79798d",
      },
      fairy: {
          backgroundColor: "#d194a2",
           border: "1px solid #9e6875",
      },
    };
  
    return (
      pokemonTypes[type] || {
        backgroundColor: "#a8a878",
         border: "1px solid #6d6d4e",
      }
    );
  };
  