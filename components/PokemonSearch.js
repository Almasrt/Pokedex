app.component('pokemon-search', {    
    data(){
        return{
            searched: null,
            allpokemons:[{}],
            result:[{}],
            isReady:false,
            myindice:0,
        } 
    },
    template:
    /*html*/
    `
    <div class="search">
        <h3>Find your favorite Pokémons !</h3>
        <input type="search" class="search-area" v-model="searched" placeholder="Nom ou ID"/>
    </div>
    <div class="search__result" v-if="searched != null">
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
            <li class="eachpokemon" v-for="pokemon in resultQuery" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
                <p>#{{GetIndice(pokemon)}} {{pokemon.name}} </p>
                <img id="pokemondisplay__pokeimage" v-bind:src="getimage(GetIndice(pokemon))">
            </li>
            <li class="eachpokemon" v-for="pokemon in resultQuery2" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
                <p>#{{GetIndice(pokemon)}} {{pokemon.name}} </p>
                <img id="pokemondisplay__pokeimage" v-bind:src="getimage(GetIndice(pokemon))">
            </li>
        </ul>
        </div>
    </div>`,
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
    computed: {
        resultQuery(){
            if(this.searched){
                this.$emit('s')
                return this.allpokemons.filter((item)=>{
                    return this.searched.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
            })}
        },
        resultQuery2(){
            if(this.searched){
                if((typeof searched) !== "string"){
                    this.$emit('s')
                        return this.allpokemons.filter((item)=>{
                            return this.searched.split(' ').every(v => this.GetIndice(item) == v)
                    })
                }
            }
            else {this.$emit('d')}
        },
    },
    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151').then(response => this.allpokemons=(response.data.results)).finally(() => {  
            this.$emit('endLoad')})
        }
})
   






    