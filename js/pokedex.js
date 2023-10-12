const contenedorIMG = document.getElementById('picture');
const textocontenedor = document.getElementById('stats');
const amarillo1 = document.getElementById('yellowBox1');
const amarillo2 = document.getElementById('yellowBox2');
const btnBuscar = document.getElementById('pokebtn');

function pokepreview() {
    const randomPoke = Math.floor(Math.random() * (807 - 1) + 1);
    consumo(randomPoke);
}
pokepreview();
//1017 POKEMONS EN POKE API
if (btnBuscar) {
    btnBuscar.addEventListener('click', function () {
        const pokename = document.getElementById('pokeinput').value.toLowerCase();
        consumo(pokename);
    })
}

async function consumo(pokename) {
    url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;
    await fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            mostrarPokedex(result);
            indexGiornomdex(result);
        })
        .catch(e => {
        })
}
function mostrarPokedex(pokesex) {
    let innerText = ``;
    let habilidadesPokemon = ``;
    let tipos = ``;
    let statspoke = ``;

    const idpokemon = pokesex.id;
    const name = pokesex.species.name;
    const img = pokesex.sprites.other.dream_world.front_default;
    const altura = (pokesex.height) / 10;
    const habilidades = pokesex.abilities;
    const stats = pokesex.stats;
    const type = pokesex.types;
    const peso = (pokesex.weight) / 10;

    let pokestat1 = `</p><strong>Hp:</strong> ${pokesex.stats[0].base_stat}</p>
    </p><strong>Ataque:</strong> ${pokesex.stats[1].base_stat}</p>
    </p><strong>Defensa:</strong> ${pokesex.stats[2].base_stat}</p>`;
    let pokestat2 = `    </p><strong>Atq especial:</strong> ${pokesex.stats[3].base_stat}</p>
    </p><strong>Def especial:</strong> ${pokesex.stats[4].base_stat}</p>
    </p><strong>Velocidad:</strong> ${pokesex.stats[5].base_stat}</p>`;
    amarillo1.innerHTML = pokestat1;
    amarillo2.innerHTML = pokestat2;

    type.forEach(type => {
        const nametype = type.type.name;
        tipos += `<p>TIPOS ${nametype}</p>`
    })
    stats.forEach(stats => {
        const namestat = stats.stat.name;
        const statbase = stats.base_stat;
        statspoke += `<p>NOMBRE ${namestat}</p>
        <p>Stat base ${statbase}</p>`;

    })
    habilidades.forEach(habilidades => {
        const jabilitis = habilidades.ability.name;
        habilidadesPokemon += `<p>${jabilitis}</p>`;
    });

    innerText = `
    <img src="${img}">
    <p>ID ${idpokemon}</p>
    <p>NOMBRE ${name}</p>
    <p>ALTURA ${altura}</p>
    <p>PESO ${peso}</p>
    <p>${habilidadesPokemon}</p>
    <p>${statspoke}</p>
    <p>${tipos}</p>
    `;

    textocontenedor.innerHTML = `</p><strong>Nombre:</strong> ${name}</p>
    </p><strong>Altura:</strong> ${altura}M</p>
    </p><strong>Peso:</strong> ${peso}KG</p>
    <p><strong>Habilidades:</strong> ${habilidadesPokemon}</p>`
    contenedorIMG.innerHTML = `<img class="pokedexIMG" src="${img}">
    `;
    carta.innerHTML = innerText;

    console.log(name, altura, idpokemon)
}
mostrarPokedex();