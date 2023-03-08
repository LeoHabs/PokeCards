const pokeCard = document.getElementById("pokeCard");
const pokemonNumber = document.getElementById("numberInput");
const specialAttacksShow = document.getElementById("abilitiesContainer");
const abilityDiv = document.getElementById("ability");
const hiddenAbilityDiv = document.getElementById("hiddenAbility");
const pokemonSelect = document.getElementById("pokemonSelect");
const spriteCamp = document.getElementById("pokemonSprite");
const typeCamp = document.getElementById("pokemonType");
const nameCamp = document.getElementById("pokemonName");
const hpCamp = document.getElementById("hp");
const attackCamp = document.getElementById("attack");
const defenseCamp = document.getElementById("defense");
const specattackCamp = document.getElementById("specattack");
const specdefenseCamp = document.getElementById("specdefense");
const speedCamp = document.getElementById("speed");
const heightCamp = document.getElementById("height");
const weightCamp = document.getElementById("weight");
let allPokemon = [];
let pokedex = [];
let pokemonToFetch = 9;

function fillPokemonList() {
    return fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit="+pokemonToFetch)
        .then((response) => response.json())
        .then(({ results }) => {
            return results;
        }).then((response) => {
            response.forEach(e => {
                allPokemon.push(e)
            });
        });
};

function addStats() {
    allPokemon.forEach(async e => {
        const name = e.name;
        const response = await fetch(e.url);
        const res = await response.json();
        pokedex.push({
            name: name,
            type: res.types[0].type.name.toUpperCase(),
            ability: res.abilities[0].ability.name,
            specability: res.abilities[1].ability.name,
            hp: res.stats[0].base_stat,
            attack: res.stats[1].base_stat,
            defense: res.stats[2].base_stat,
            specattack: res.stats[3].base_stat,
            specdefense: res.stats[4].base_stat,
            speed: res.stats[5].base_stat,
            height: res.height,
            weight: res.weight,
            sprite: res.sprites.other.dream_world.front_default
        });
    });
};

pokemonNumber.addEventListener("input",()=>{
    pokemonToFetch= pokemonNumber.value;

    fullPokedex();
});

pokemonSelect.addEventListener("change", () => {
    const pokemon = pokedex.find(e => e.name === pokemonSelect.value);
    injectPokemonInfo(pokemon);
});

function injectPokemonInfo(pokemon) {
    spriteCamp.src = pokemon.sprite;
    nameCamp.innerHTML = pokemon.name.toUpperCase();
    hpCamp.innerHTML = pokemon.hp;
    attackCamp.innerHTML = pokemon.attack;
    defenseCamp.innerHTML = pokemon.defense;
    specattackCamp.innerHTML = pokemon.specattack;
    specdefenseCamp.innerHTML = pokemon.specdefense;
    speedCamp.innerHTML = pokemon.speed;
    heightCamp.innerHTML = pokemon.height;
    weight.innerHTML = pokemon.weight;
    pokeCard.setAttribute("class", getBgClass(pokemon.type));
    typeCamp.innerHTML = pokemon.type;
    abilityDiv.innerHTML = pokemon.ability;
    hiddenAbilityDiv.innerHTML = pokemon.specability;
};

const injectSelect = () => {
    allPokemon.forEach(e => {
        const newOption = document.createElement("option");
        newOption.value = e.name;
        newOption.innerHTML = e.name.toUpperCase();
        pokemonSelect.appendChild(newOption);
    });
};

const fullPokedex = async () => {
    allPokemon = [];
    pokedex= [];
    pokemonSelect.innerHTML= null;
    await fillPokemonList();
    addStats();
    injectSelect();
};

function getBgClass(type) {
    switch (type) {
        case "GRASS":
            return "grass-type";
        case "WATER":
            return "water-type";
        case "FIRE":
            return "fire-type";
        case "NORMAL":
            return "normal-type";
        case "ELECTRIC":
            return "electric-type";     
        case "GROUND":
            return "ground-type";
        case "POISON":
            return "poison-type";
        case "BUG":
            return "bug-type";           
    }
}

fullPokedex();







