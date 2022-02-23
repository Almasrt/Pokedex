app.component('pokemon-display', {
    template:
    /*html*/
    `
    <div id="moreinfo" class="moreinfos" v-if="isReady">
        <img id="myButton" v-on:click="closeinfos()" src="./assets/button.png"> 
       
        <h2 id="detailedname"> #{{result.id}} {{upperCase(result.name)}}</h2>
        <img id="detailedimage" v-bind:src="getimage(myindice)">
        <div id="details">    
            <p>Ability: {{upperCase(result.abilities[0].ability.name)}}</p>
            <p>Base XP: {{result.base_experience}}</p>
            <p>Type: {{upperCase(result.types[0].type.name)}}</p>
        </div>
    </div>

    <div id="pokemondisplay">
        <ul> 
            <li id=eachpokemon v-for="pokemon in allpokemons" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
                <p id="pokemonname">#{{GetIndice(pokemon)}} {{pokemon.name}} </p>
                <img id="pokeimage" v-bind:src="getimage(GetIndice(pokemon))">
            </li>
        </ul>
    </div>

    `, 
    methods:{
        upperCase(name) {
            const newName = name.toLowerCase()
                .split(" ")
                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(" ")
            return newName;
        },
        
        GetIndice(pokemon){
        return this.allpokemons.indexOf(pokemon) +1
        },

        getimage(indice){
            mystring="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+indice+".svg";
            return mystring
        },

        async getpokemon(indice){
            axios.get('https://pokeapi.co/api/v2/pokemon/'+indice+'/')
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
            searchedPokemons: [{}],
            isReady:false,
            myindice:0
        } 
    },       
    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100').then(response => this.allpokemons=(response.data.results)).finally(() => {  
            this.$emit('endLoad')})
        
        /*if ((searchId != -1) || (searchName != 'none')) {
            for poke in allpokemons {

            }
        }*/
        }
 })