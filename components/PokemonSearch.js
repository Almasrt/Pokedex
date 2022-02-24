app.component('pokemon-search', {    
    data(){
        return{
            searched: null,
            allpokemons:[{}],
            result:[{}],
            isReady:false,
            myindice:0
        } 
    },
    template:
    /*html*/
    `
    <div class="search">
        <h3>Recherchez vos pokémons préférés !</h3>
        <input type="search" class="search-area" v-model="searched" placeholder="Nom ou ID"/>
    </div>
    <div class="search__result">
        <div id="pokemondisplay" v-if="searched != null">
        <ul> 
            <li id=eachpokemon v-for="pokemon in resultQuery" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
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
                if((typeof searched) == "string"){
                    return this.allpokemons.filter((item)=>{
                        return this.searched.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                      })
                }
                else {
                    return this.allpokemons.filter((item)=>{
                        return this.searched.split(' ').every(v => item.name.toLowerCase().includes(v))
                      })
                }
            }
        }
    },
    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100').then(response => this.allpokemons=(response.data.results)).finally(() => {  
            this.$emit('endLoad')})
        }
})
   






    