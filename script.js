function toggleSearch(){
    search = document.querySelector('.busca');
    search.classList.toggle('active');
}
function toggleMenu(){
    menu = document.querySelector('.filtroBox');
    menu.classList.toggle('active');
}

var busca = document.getElementById('search');
busca.addEventListener('keyup',()=>{
    // alert(busca.value);
    Pokemon(busca.value);
})

Pokemon(20)
function Pokemon(busca){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${busca}`)
    .then(response => response.json())
    .then(allpokemon => {

        var pokemons = [];

        allpokemon.results.map((val) => {
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({
                    number:pokemonSingle.id,
                    name:val.name,
                    imagemSmall:pokemonSingle.sprites.front_default,
                    imageLarge:pokemonSingle.sprites.other.dream_world.front_default,
                    type:pokemonSingle.types[0].type.name,
                    abilities:pokemonSingle.abilities
                });

                function upCase(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                  }
                
                if(pokemons.length == 20){
                    box = document.querySelector('.pokemon-box');
                    box.innerHTML = "";

                    pokemons.map((val) => {
                        box.innerHTML+= `
                        <div class="pokemon-card">
                            <div class="card-info">
                                <div class="card-number">
                                    <h3>#${val.number}</h3>
                                </div>
                                <div class="card-pokename">
                                    <h2>${upCase(val.name)}</h2>
                                </div>
                                <div class="card-typebox">
                                    <h4>${val.type}</h4>
                                    <h4>Poison</h4>
                                </div>
                            </div>
                            <div class="optionsBox">
                                <i class="far fa-star"></i>
                                <i class="far fa-check-circle"></i>
                            </div>
                            <div class="card-pokepic">
                                <img src=${val.imageLarge} alt="">
                            </div>
                        </div>`
                    })
                }
            })
        })  
    });
}
