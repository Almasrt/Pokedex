Vue.component('pokemon-list', {
    props: {
        filteredPokemon
    },
    template: 
    /*html*/
    `
    <div class="list">
    <ul>
        <li v-for="(pokemon, index) in filteredPokemon">
        <div class="card">
            <div v-on:click="handleClick" class="card">
                <h5 class="card__header">{{pokemon.index}}</h5>
                <img class="card__img" :src="imageUrl">
                <div class="card__body">
                    <h6 class="card__title">{{pokemon.name}}</h6>
                </div>
        </div>
    </div>
        </li>
    </ul>
    </div>
    `,
    data() {
        return {
            pokeIndex: [],
            imageUrl: null
        }
      },
    methods: {
        handleClick(){
            fetch(this.url)
            .then(res => res.json())
            .then(details => this.pokemonDetails = details)
        this.$emit('pokemon-selected', this.url)
        this.$emit("pokemon-details", this.pokemonDetails)
        },
        getIndex() {
            return this.pokeIndex = this.url.split("/")[6]
        },
        getUrl() {
            return this.imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${this.pokeIndex}.png?raw=true`
        }
    }
  })
