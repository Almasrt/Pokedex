app.component('pokemon-list', {
    template: 
    /*html*/
    `<div class="pokemon-list">
        <article v-for="(pokemon, index) in pokemons" :key="'p'+index" @click="setPokemonUrl(pokemon.url)"> 
            <h3>{{ pokemon.name }} </h3>
        </article>
        `
})