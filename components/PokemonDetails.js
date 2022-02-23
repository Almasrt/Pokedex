Vue.component('pokemon-details', {
    props: {
        selectedPokemon
    },
    template: 
    /*html*/
    `
    <div class="card-info">
        <div class="card-info__header">
            <h5 v-if="selectedPokemon" class="card-info__text">{{selectedPokemon.name}}</h5>
        </div>
        <div class="card-info__body">
            <h6 class="card-title">XP de base: {{selectedPokemon.base_experience}}</h6>
            <h6 class="car-info__title">Attaque: {{selectedPokemon.abilities[0].ability.name}}</h6>
            <h6 class="car-info__title">Type: {{selectedPokemon.types[0].type.name}}</h6>
        </div>
    </div>
    `
  })