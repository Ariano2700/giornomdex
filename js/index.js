const btnBuscar = document.getElementById("pokebtn");
const bgID = document.querySelector(".bgID");
const imgPoke = document.querySelector(".imgPoke");
const namePokemon = document.querySelector(".namePokemon");
const type_poke = document.getElementById("type_poke");
const statsContainer = document.querySelector(".statsContainer");
const pokeInput = document.getElementById("pokeinput");

function pokepreview() {
  const randomPoke = Math.floor(Math.random() * (807 - 1) + 1);
  consumo(randomPoke);
}
pokepreview();

pokeInput.addEventListener('keydown', function(event){
  if(event.key === "Enter"){
    event.preventDefault();
    const pokename = pokeInput.value.toLowerCase();
    consumo(pokename);
  }
})

if (btnBuscar) {
  btnBuscar.addEventListener("click", function () {
    const pokename = pokeInput.value.toLowerCase();
    consumo(pokename);
  });
}
async function consumo(pokename) {
  url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      mostrarPokedex(result);
    })
    .catch((e) => {});
}
function mostrarPokedex(pokesex) {
  const spanHP = document.querySelector(".spanHP");
  const spanATK = document.querySelector(".spanATK");
  const spanDEF = document.querySelector(".spanDEF");
  const spanVEL = document.querySelector(".spanVEL");
  const spanSATK = document.querySelector(".spanSATK");
  const spanSDEF = document.querySelector(".spanSDEF");

  // Borrar los datos anteriores
  bgID.innerHTML = "";
  imgPoke.innerHTML = "";
  namePokemon.innerHTML = "";
  type_poke.innerHTML = "";
  statsContainer.innerHTML = "";

  //let innerText = ``;
  let habilidadesPokemon = ``;
  //let tipos = ``;
  let statspoke = ``;

  let idPokemon = pokesex.id;
  let name = pokesex.species.name;
  const img = pokesex.sprites.other.home.front_default;
  const altura = pokesex.height / 10;
  const habilidades = pokesex.abilities;
  const stats = pokesex.stats;
  const type = pokesex.types;
  const peso = pokesex.weight / 10;

  //FORMATO DEL NOMBRE
  name = name.charAt(0).toUpperCase() + name.slice(1);
  //Numero de pokemon
  if (idPokemon < 10) {
    idPokemon = `00${idPokemon}`;
  } else if (idPokemon < 100) {
    idPokemon = `0${idPokemon}`;
  }
  //Primer tipo de pokemon
  let firsttype = `${pokesex.types[0].type.name}`;

  //RECORRE LOS DATOS QUE TENGAN VARIOS DATOS Y LOS MUESTRA
  type.forEach((type) => {
    const nametype = type.type.name;
    const tipoDiv = document.createElement("div");
    tipoDiv.id = "pokeTipo";

    const img = document.createElement("img");
    img.classList.add("img-type");
    img.classList.add(nametype);
    img.src = `sources/icon/${nametype}.svg`;

    tipoDiv.appendChild(img);
    type_poke.appendChild(tipoDiv);
  });
  stats.forEach((stats) => {
    const namestat = stats.stat.name;
    const statbase = stats.base_stat;
    statspoke += `<p>NOMBRE ${namestat}</p>
        <p>Stat base ${statbase}</p>`;
  });
  habilidades.forEach((habilidades) => {
    let jabilitis = habilidades.ability.name;
    jabilitis = jabilitis.charAt(0).toUpperCase() + jabilitis.slice(1);
    habilidadesPokemon += `<p><span>${jabilitis}</span></p>`;
  });

  //PONER LOS DATOS EN EL SPAN
  spanHP.innerText = pokesex.stats[0].base_stat;
  spanATK.innerText = pokesex.stats[1].base_stat;
  spanDEF.innerText = pokesex.stats[2].base_stat;
  spanVEL.innerText = pokesex.stats[5].base_stat;
  spanSATK.innerText = pokesex.stats[3].base_stat;
  spanSDEF.innerText = pokesex.stats[4].base_stat;

  //CAMBIAR EL % DEL WIDTH DE LOS KEY FRAMES DINAMICAMENTE
  const hpValue = pokesex.stats[0].base_stat;
  const atkValue = pokesex.stats[1].base_stat;
  const defValue = pokesex.stats[2].base_stat;
  const velValue = pokesex.stats[5].base_stat;
  const satkValue = pokesex.stats[3].base_stat;
  const sdefValue = pokesex.stats[4].base_stat;

  // Calcula los porcentajes
  const maxStatValue = 2; // El valor máximo para el 100%
  const hpPercentage = (hpValue / maxStatValue);
  const atkPercentage = (atkValue / maxStatValue);
  const defPercentage = (defValue / maxStatValue);
  const velPercentage = (velValue / maxStatValue);
  const satkPercentage = (satkValue / maxStatValue);
  const sdefPercentage = (sdefValue / maxStatValue);

  // Aplica los porcentajes como estilos CSS
  document.getElementById("hp-menu").style.width = `${hpPercentage}%`;
  document.getElementById("atk-menu").style.width = `${atkPercentage}%`;
  document.getElementById("def-menu").style.width = `${defPercentage}%`;
  document.getElementById("vel-menu").style.width = `${velPercentage}%`;
  document.getElementById("satk-menu").style.width = `${satkPercentage}%`;
  document.getElementById("sdef-menu").style.width = `${sdefPercentage}%`;

  //El tipo de pokemon se pone como clase para cambiar el fondo
  const body = document.body;
  body.className = firsttype;

  //Agregando datos a los contenedrores
  //IZQUIERDA
  bgID.innerHTML = `<p><span class="pokid">#${idPokemon}</span></p>`;
  imgPoke.innerHTML = `<img src="${img}">`;
  namePokemon.innerHTML = `<p class="pokename"><span id="pokemonName">${name}</span></p>`;
  //DERECHA
  statsContainer.innerHTML = `    <div class="stat">
                                    <p class="statTitle">Altura</p>
                                    <p class="Adate">${altura}M</p>
                                  </div>
                                  <div class="stat">
                                    <p class="statTitle">Peso</p>
                                    <p class="Pdate">${peso}KG</p>
                                  </div>
                                  <div class="stat habilidadesStat">
                                    <p class="statTitle">Habilidades</p>
                                    <div class="habilidades">${habilidadesPokemon}</div>
                                  </div> `;

  const barra = document.getElementById("barraStats");
  const nameStats = [
    "Puntos de vida",
    "Ataque",
    "Defensa",
    "Velocidad",
    "Ataque especial",
    "Defensa especial",
  ];
  let dataStats = [
    pokesex.stats[0].base_stat,
    pokesex.stats[1].base_stat,
    pokesex.stats[2].base_stat,
    pokesex.stats[5].base_stat,
    pokesex.stats[3].base_stat,
    pokesex.stats[4].base_stat,
  ];

  const barraStats = new Chart(barra, {
    type: "bar",
    data: {
      labels: nameStats,
      datasets: [
        {
          label: "Estadisticas Pokémon",
          data: dataStats,
          backgroundColor: [
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],

          borderWidth: 1.5,
        },
      ],
    },
  });

  console.log(pokesex);
}

/*let barra = document.getElementById('barraStats').getContext("2d");

let chart = new Chart(barra, {
    type: "bar",
    data: {
        labels: ["Puntos de vida", "Ataque", "Defensa", "Velocidad", "Ataque especial", "Defensa especial"],
        datasets: [
            {
                label: "Estadisticas Pokémon",
                backgroundColor: "rgb(0,0,0)",
                borderColor: "rgb(0,255,0)",
                data: [pokesex.stats[0].base_stat, pokesex.stats[1].base_stat, pokesex.stats[2].base_stat, pokesex.stats[5].base_stat, pokesex.stats[3].base_stat, pokesex.stats[4].base_stat]
            }
        ]
    }
});*/
