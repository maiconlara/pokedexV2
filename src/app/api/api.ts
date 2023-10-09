import axios from "axios";

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
})



export const getPokemonList = async () => { 
    const response = await api.get('pokemon?limit=11')
    const pokemonList = response.data.results
    console.log(pokemonList)
    return pokemonList
}


export const getPokemonByName = async (name: string) => { 
    const lowerCaseName = name.toLowerCase()
    const response = await api.get(`pokemon/${lowerCaseName}`)
    const pokemon = response.data
    console.log(pokemon)
    return pokemon
}

