export const routes = [
    {
      id: 1,
      text: "Pokémons",
      path: "/pokemons",
    },
    {
      id: 3,
      text: "Team Builder",
      path: "/builder",
    },
  ];

export const isRouteActive = (pathname: string, path: string) =>
  pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
