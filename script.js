document.getElementById("data-button").addEventListener("click", () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=50"; // Muestra los primeros 50 Pokémon

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = data.results;

      pokemonList.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokemonData) => {
            const pokemonInfo = `
                          <div class="card">
                              <h2>${pokemonData.name.toUpperCase()}</h2>
                              <img src="${
                                pokemonData.sprites.front_default
                              }" alt="${pokemonData.name}">
                              <p>Altura: ${pokemonData.height}</p>
                              <p>Peso: ${pokemonData.weight}</p>
                              <p>Tipos: ${pokemonData.types
                                .map((type) => type.type.name)
                                .join(", ")}</p>
                          </div>
                      `;
            document.getElementById("pokemon-info").innerHTML += pokemonInfo;
          })
          .catch((error) => {
            console.error("Error al obtener datos del Pokémon:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error al obtener lista de Pokémon:", error);
    });
});
