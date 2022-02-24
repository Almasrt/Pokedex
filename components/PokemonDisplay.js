app.component('pokemon-display', {
    template:
    /*html*/
    `
    <div id="moreinfo" v-if="isReady">
        <img id="moreinfo__myButton" v-on:click="closeinfos()" src="./assets/button.png"> 
       
        <h2 id="moreinfo__detailedname"> #{{result.id}} {{upperCase(result.name)}}</h2>
        <img id="moreinfo__detailedimage" v-bind:src="getimage(myindice)">
        <div id="moreinfo__details">    
            <p>Ability: {{upperCase(result.abilities[0].ability.name)}}</p>
            <p>Base XP: {{result.base_experience}}</p>
            <p>Type: {{upperCase(result.types[0].type.name)}}</p>
        </div>
    </div>

    <div id="pokemondisplay">
        <ul> 
            <li class="eachpokemon" v-for="pokemon in allpokemons" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
                <p>#{{GetIndice(pokemon)}} {{pokemon.name}} </p>
                <img id="pokemondisplay__pokeimage" v-bind:src="getimage(GetIndice(pokemon))">
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
            isReady:false,
            myindice:0
        } 
    },       
    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151').then(response => this.allpokemons=(response.data.results)).finally(() => {  
            this.$emit('endLoad')})
        }
 })