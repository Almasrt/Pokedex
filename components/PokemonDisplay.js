app.component('pokemon-diplay', {
    template:
    /*html*/
    `
    <div id="moreinfo" class="moreinfos" v-if="isReady">
        <img id="myButton" v-on:click="closeinfos()" src="./assets/button.png"> </img>
       
        <h2 id="detailedname"> #{{result.id}} {{result.name}}</h2>
        <img id="detailedimage"v-bind:src="getimage(myindice)"></img>
        <div id="details">    
            <p>Height: {{result.height}}</p>
            <p>Weight: {{result.weight}}</p>
        </div>
    </div>

    <div id="pokemondisplay">
        <ul> 
            <li id=eachpokemon v-for="pokemon in allpokemons" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
                <p id="pokemonname"># {{GetIndice(pokemon)}} {{pokemon.name}} </p>
                <img id="pokeimage" v-bind:src="getimage(GetIndice(pokemon))"></img>
            </li>
        </ul>
    </div>


    `, 
    methods:{
        GetIndice(pokemon){
        return this.allpokemons.indexOf(pokemon) +1
    },

    getimage(indice){
        mystring="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+indice+".svg";
        return mystring
    },

    async getpokemon(indice){
        await axios.get('https://pokeapi.co/api/v2/pokemon/'+indice+'/')
        .then(response=>this.result=(response.data))
        this.isReady=true
        this.myindice=indice
    },
    closeinfos(){
        this.isReady=false
    }
},
    data(){
        return{
            allpokemons:[{}],
            result:[{}],
            isReady:false,
            myindice:0
        } 
    },       
    mounted () {
         axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100').then(response => this.allpokemons=(response.data.results))
    }
 })