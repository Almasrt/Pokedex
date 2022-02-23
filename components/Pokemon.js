Vue.component('pokemon-basic', {
    props: {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
      },
    template: 
    /*html*/
    `
    <div class="card">
        <div v-on:click="handleClick" class="card">
            <h5 class="card__header">{{pokeIndex}}</h5>
            <img class="card__img" :src="imageUrl">
            <div class="card__body">
                <h6 class="card__title">{{name}}</h6>
            </div>
        </div>
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
