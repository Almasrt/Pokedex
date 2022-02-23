app.component('pokemon-search', {    
    data(){
        return{
            searched: null,
            searchedPokemons: [{}],
            allpokemons: [{}]
        } 
    },
    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100').then(response => this.allpokemons=(response.data.results))
    },

    methodes: {
        filterPokemonsByName(filterName) {
            for (pokemon in allPokemons) {
                this.lowerCasePokemonName = pokemon.name.toLowerCase();
                this.lowerCaseFilterName = filterName.toLowerCase();
                if (lowerCasePokemonName.includes(lowerCaseFilterName)){
                    searchedPokemons.push(pokemon)
                }
            }
        },
        typeOfSearched(searched){
            if ((typeof searched) == 'string'){
                filterPokemonsByName(searched)
            }
            else {
                this.searchId = searched
            }
        }
    },
    template:
    /*html*/
    `
    <div class="search">
        <h3>Recherchez vos pokémons préférés !</h3>
        <input type="search" class="search-area" v-model="searched" placeholder="Nom ou ID"/>
        <button type="button" class="search-btn" v-on:click="typeOfSearched">Rechercher</button>
    </div>`
})
   






    