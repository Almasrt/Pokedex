const app = Vue.createApp({
  data() {
    return {
        pokemons: [],
        selectedPokemon: null,
        pokemonDetails: [],
        search: ""
    }
  },
  mounted() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
        .then(res => res.json())
        .then(pokemons => this.pokemons = pokemons.results),
        eventBus.$on('pokemon-selected', (selectedPokemon) => {
            this.selectedPokemon = selectedPokemon;
        }),
        eventBus.$on('pokemon-details', (details) => {
            this.pokemonDetails = details;
        }),
        fetch(selectedPokemon)
        .then(res => res.json())
        .then(details => this.pokemonDetails = details)
  },
  computed: {
    filteredPokemon: function() {
        return this.pokemons.filter((pokemon) => {
            return pokemon.name.match(this.search);
        })
    }
  }
})