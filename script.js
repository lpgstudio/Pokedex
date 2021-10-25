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

                    function Loop(string){
                        if(string === "grass"){
                        // console.log(pokemons[i].name+"tem que ser verde")
                            return fundo = '#8bd645';
                        
                        }else if(string === "fire"){
                            // console.log(pokemons[i].name+"tem que ser vermelho")
                            return fundo = '#FD6661';
                            
                        }else if(string === "water"){
                            // console.log(pokemons[i].name+"tem que ser azul")
                            return fundo = '#6046f4b0';
                            
                        }else if(string === "bug"){
                            // console.log(pokemons[i].name+"tem que ser amarelo")
                            return fundo = '#EEED73';
                            
                        }else if(string === "normal"){
                            // console.log(pokemons[i].name+"tem que ser marrom")
                            return fundo = '#b18129';
                        }
                        else{
                            // console.log(pokemons[i].name+"Sem cor")
                            return fundo = '#fff';
                        }
                    }
                    
                    pokemons.map((val) => {  
                        box.innerHTML+= `
                        <div class="pokemon-card" style="background-color:${Loop(val.type)}">
                            <div class="card-info" >
                                <div class="card-number">
                                    <h3>#${val.number}</h3>
                                </div>
                                <div class="card-pokename">
                                    <h2>${upCase(val.name)}</h2>
                                </div>
                                <div class="card-typebox">
                                    <h4>${val.type}</h4>
                                    <h4 style="display:none;">${Loop(val.type)}</h4>
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

