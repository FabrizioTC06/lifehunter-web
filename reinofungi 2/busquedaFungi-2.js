document.addEventListener("DOMContentLoaded", () => {
  // Elementos del formulario de filtrado
  const busquedaInput = document.getElementById("buscar");
  const divisionSelect = document.getElementById("division");
  const claseSelect = document.getElementById("clase");
  const ordenSelect = document.getElementById("orden");
  const familiaSelect = document.getElementById("familia");
  const botonReiniciar = document.querySelector(".boton_reinicia");
  
  // Seleccionar todos los elementos de hongos (los enlaces <a> que contienen las tarjetas)
  const hongosLinks = document.querySelectorAll(".hongo-grid > a");
  
  // Elementos para el menú móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const navegacionPrincipal = document.querySelector(".navegacion-principal");

  // Función principal de filtrado
  const applyFilters = () => {
    const busqueda = busquedaInput.value.toLowerCase().trim();
    const division = divisionSelect.value;
    const clase = claseSelect.value;
    const orden = ordenSelect.value;
    const familia = familiaSelect.value;

    hongosLinks.forEach(link => {
      const hongo = link.querySelector(".hongo");
      if (!hongo) return;

      const nombre = hongo.dataset.nombre.toLowerCase();
      const hongoDivision = hongo.dataset.division;
      const hongoClase = hongo.dataset.clase;
      const hongoOrden = hongo.dataset.orden;
      const hongoFamilia = hongo.dataset.familia;

      // Comprobar coincidencias con cada filtro
      const matchesNombre = busqueda === "" || nombre.includes(busqueda);
      const matchesDivision = division === "" || hongoDivision === division;
      const matchesClase = clase === "" || hongoClase === clase;
      const matchesOrden = orden === "" || hongoOrden === orden;
      const matchesFamilia = familia === "" || hongoFamilia === familia;

      // Mostrar u ocultar según coincidan todos los filtros
      if (matchesNombre && matchesDivision && matchesClase && matchesOrden && matchesFamilia) {
        link.classList.remove("oculto");
      } else {
        link.classList.add("oculto");
      }
    });
  };

  // Reiniciar filtros
  const resetFilters = () => {
    busquedaInput.value = "";
    divisionSelect.value = "";
    claseSelect.value = "";
    ordenSelect.value = "";
    familiaSelect.value = "";
    applyFilters();
  };

  // Event listeners
  botonReiniciar.addEventListener("click", resetFilters);
  busquedaInput.addEventListener("input", applyFilters);
  divisionSelect.addEventListener("change", applyFilters);
  claseSelect.addEventListener("change", applyFilters);
  ordenSelect.addEventListener("change", applyFilters);
  familiaSelect.addEventListener("change", applyFilters);

  // Leer filtros desde URL si existen
  const getParametrosURL = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      buscar: params.get('buscar'),
      division: params.get('division'),
      clase: params.get('clase'),
      orden: params.get('orden'),
      familia: params.get('familia'),
    };
  };

  const aplicarFiltrosDesdeURL = () => {
    const f = getParametrosURL();

    if (f.buscar) busquedaInput.value = f.buscar;
    if (f.division) divisionSelect.value = f.division;
    if (f.clase) claseSelect.value = f.clase;
    if (f.orden) ordenSelect.value = f.orden;
    if (f.familia) familiaSelect.value = f.familia;

    applyFilters();
  };

  // Menú móvil
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navegacionPrincipal.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-enlace, .boton-sesion-mobile").forEach(link => {
    link.addEventListener("click", () => {
      if (navegacionPrincipal.classList.contains("active")) {
        navegacionPrincipal.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });
});



const animales = [
  {
    nombre: "Rinoceronte",
    gif: "../img/gifs/rino_sinfondo.gif",
    datos: [
      "Un rinoceronte puede pesar hasta 2 toneladas.",
      "Las bacterias son organismos unicelulares procariotas.",
      "Los organismos del reino Monera no tienen núcleo definido.",
      "Los protistas son eucariotas simples.",
      "Algunos protistas son unicelulares y otros pluricelulares simples.",
      "Los cuernos de los rinocerontes están hechos de queratina, como tus uñas.",
      "Los hongos no realizan fotosíntesis.",
      "Las plantas son organismos eucariotas fotosintéticos.",
      "Las paredes celulares de las plantas contienen celulosa.",
      "Algunos hongos pueden reproducirse sexual y asexualmente."
    ]
  },
  {
    nombre: "Cocodrilo",
    gif: "../img/gifs/cocod_sinfondo.gif",
    datos: [
      "Los cocodrilos pueden vivir más de 70 años.",
      "Las cianobacterias pueden realizar fotosíntesis.",
      "Las algas son protistas autótrofos.",
      "Las plantas producen su alimento mediante fotosíntesis.",
      "Las hojas realizan la fotosíntesis.",
      "Los protozoarios son protistas heterótrofos.",
      "Algunos hongos se usan en la fermentación de pan.",
      "Las levaduras fermentan azúcares produciendo alcohol.",
      "El ADN bacteriano se encuentra libre en el citoplasma.",
      "Los cocodrilos pueden nadar a 30 km/h en distancias cortas."
    ]
  },
  {
    nombre: "Panda",
    gif: "../img/gifs/panda_sinfondo.gif",
    datos: [
      "Los pandas pasan 12 horas al día comiendo bambú.",
      "Las bacterias se reproducen por fisión binaria.",
      "Las amebas se desplazan usando pseudópodos.",
      "Los paramecios se mueven usando cilios.",
      "Las raíces absorben agua y minerales.",
      "Las plantas producen oxígeno durante la fotosíntesis.",
      "Las hifas son estructuras filamentosas de los hongos.",
      "El micelio es un conjunto de hifas.",
      "Algunas bacterias viven en condiciones extremas.",
      "Los pandas nacen pesando 100 gramos nada más."
    ]
  },
  {
    nombre: "Zebra",
    gif: "../img/gifs/zebra_sinfondo.gif",
    datos: [
      "Cada cebra tiene un patrón único de rayas.",
      "Los protistas viven en ambientes acuáticos o húmedos.",
      "Algunos protistas producen enfermedades humanas.",
      "La pared celular bacteriana contiene peptidoglucano.",
      "Algunas bacterias fijan nitrógeno en el suelo.",
      "El xilema transporta agua y minerales.",
      "El floema transporta nutrientes elaborados.",
      "Algunos hongos causan enfermedades en humanos.",
      "Las micorrizas ayudan a las plantas a absorber nutrientes.",
      "Las cebras son excelentes nadadoras."
    ]
  },
  {
    nombre: "Hormiguero",
    gif: "../img/gifs/hormiguero_sinfondo.gif",
    datos: [
      "Puede comer hasta 30,000 hormigas al día.",
      "Muchas bacterias descomponen materia orgánica.",
      "Las bacterias pueden tener formas de coco, bacilo o espirilo.",
      "El reino Protista incluye organismos muy diversos.",
      "Algunos protistas forman colonias simples.",
      "Las plantas se reproducen por esporas o semillas.",
      "Los helechos son plantas vasculares sin semillas.",
      "Los hongos pueden formar micorrizas con plantas.",
      "El hongo *Penicillium* produce penicilina.",
      "Su lengua mide hasta 60 cm."
    ]
  },
  {
    nombre: "Nutria",
    gif: "../img/gifs/nutria_sinfondo.gif",
    datos: [
      "Las nutrias usan piedras como herramientas para romper conchas.",
      "Algunas bacterias son patógenas y causan enfermedades.",
      "Las bacterias no poseen mitocondrias.",
      "Las angiospermas tienen flores y frutos.",
      "Las gimnospermas producen semillas desnudas.",
      "Los líquenes son asociaciones entre hongos y algas.",
      "Algunos hongos descomponen materia orgánica.",
      "Algunos protistas fotosintetizan y liberan oxígeno.",
      "Los protistas poseen vacuolas contráctiles.",
      "Las nutrias se dan la mano al dormir para no separarse."
    ]
  },
  {
    nombre: "Ardilla",
    gif: "../img/gifs/ardilla_sinfondo.gif",
    datos: [
      "Las ardillas pueden saltar hasta 10 veces su tamaño.",
      "Algunas bacterias forman esporas resistentes.",
      "Algunas algas rojas viven en aguas profundas.",
      "Los hongos se reproducen por esporas.",
      "Los mohos son hongos filamentosos.",
      "Los musgos no tienen vasos conductores.",
      "Las plantas poseen clorofila en sus cloroplastos.",
      "Las algas verdes pueden ser unicelulares o pluricelulares.",
      "Las cianobacterias producen oxígeno durante la fotosíntesis.",
      "Las ardillas tienen memoria espacial para recordar sus escondites."
    ]
  },
  {
    nombre: "Zorrillo",
    gif: "../img/gifs/zorrillo_sinfondo.gif",
    datos: [
      "El olor de los zorrillos puede percibirse a más de 3 km.",
      "El plancton vegetal está formado por protistas fotosintéticos.",
      "Algunos protistas presentan flagelos para moverse.",
      "Las setas son cuerpos fructíferos de algunos hongos.",
      "Las levaduras son hongos unicelulares.",
      "Las plantas forman la base de los ecosistemas terrestres.",
      "Las flores permiten la reproducción sexual de las plantas.",
      "Las bacterias pueden moverse usando flagelos.",
      "Las bacterias pueden intercambiar genes por conjugación.",
      "Los zorrillos casi siempre avisan antes de rociar su spray."
    ]
  },
  {
    nombre: "Perezoso",
    gif: "../img/gifs/peresoso_sinfondo.gif",
    datos: [
      "El perezoso mueve tan lento que le crecen algas en el pelaje.",
      "El reino Monera fue uno de los primeros en habitar la Tierra.",
      "Algunas bacterias viven en aguas termales.",
      "Algunos protistas pueden reproducirse sexual y asexualmente.",
      "Los hongos absorben nutrientes del medio externo.",
      "Los hongos pueden ser unicelulares o pluricelulares.",
      "Las algas verdes son ancestros de las plantas terrestres.",
      "Las plantas autótrofas transforman energía solar en alimento.",
      "El alga *Chlamydomonas* es un protista verde unicelular.",
      "Los prezosos solo bajan de los árboles una vez a la semana."
    ]
  },
  {
    nombre: "Castor",
    gif: "../img/gifs/castor_sinfondo.gif",
    datos: [
      "Los castores construyen presas que se ven desde satélites.",
      "Las bacterias pueden fermentar alimentos.",
      "El reino Monera contiene los organismos más antiguos del planeta.",
      "Los dientes de los catores nunca dejan de crecer.",
      "Los hongos son eucariotas heterótrofos.",
      "Las paredes celulares de los hongos contienen quitina.",
      "Los protistas son fundamentales en las cadenas alimenticias acuáticas.",
      "El reino Protista fue propuesto por Ernst Haeckel.",
      "Los frutos protegen y dispersan semillas.",
      "Las plantas mantienen el equilibrio de los ecosistemas."
    ]
  }
];

const boton = document.getElementById("btn-dato");
const contenedor = document.getElementById("animal-container");
const imagen = document.getElementById("animal-img");
const dato = document.getElementById("dato-curioso");

boton.addEventListener("click", () => {
  const animalRandom = animales[Math.floor(Math.random() * animales.length)];
  const datoRandom = animalRandom.datos[Math.floor(Math.random() * animalRandom.datos.length)];

  imagen.src = animalRandom.gif;
  imagen.alt = animalRandom.nombre;
  dato.textContent = datoRandom;

  contenedor.classList.remove("hidden");

  // Ocultar después de 7 segundos
  setTimeout(() => {
    contenedor.classList.add("hidden");
  }, 5000);
});
