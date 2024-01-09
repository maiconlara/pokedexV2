import axios from "axios";
import {PokemonList, Pokemon} from "@/interface/interface";

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
})


export const getPokemonList = async (limit: number) => { 
    const response = await api.get<PokemonList>(`pokemon?limit=${limit}`)
    const pokemonList = response.data;
    return pokemonList
}


export const getPokemonByName = async (name: string) => { 
    const lowerCaseName = name.toLowerCase()
    const response = await api.get(`pokemon/${lowerCaseName}`)
    const pokemon = response.data
    return pokemon
}

