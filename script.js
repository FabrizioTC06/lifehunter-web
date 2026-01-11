document.addEventListener("DOMContentLoaded", function () {
    // Datos de los seres vivos por reino
    const seresVivos = {
        animal: [
            {
                nombre: "Ardilla",
                imagen: "img/Carrucel/ardilla.jpeg",
                reino: "Animalia",
                descripcion: "La ardilla es un pequeño mamífero roedor conocido por su agilidad y su habilidad para trepar árboles. Se alimenta principalmente de nueces, semillas y frutas.",
                habitat: "Bosques templados y zonas urbanas arboladas",
                curiosidad: "Las ardillas tienen una memoria espacial excelente que les permite recordar dónde escondieron sus alimentos."
            },
            {
                nombre: "Águila Real",
                imagen: "img/Carrucel/aguila_real.jpg",
                reino: "Animalia",
                descripcion: "El águila real es una de las aves de presa más conocidas y ampliamente distribuidas de la Tierra.",
                habitat: "Montañas y zonas abiertas",
                curiosidad: "Pueden alcanzar velocidades de hasta 240 km/h en picada."
            }
        ],
        plantae: [
            {
                nombre: "Lechuga",
                imagen: "img/Carrucel/lechuga.jpg",
                reino: "Plantae",
                descripcion: "La lechuga es una planta comestible de hojas verdes, ampliamente cultivada por su uso en ensaladas y como ingrediente fresco en la cocina.",
                habitat: "Zonas templadas, cultivada en huertos y campos agrícolas",
                curiosidad: "Está compuesta en más de un 90% por agua, lo que la hace muy ligera y refrescante."
            },
            {
                nombre: "Girasol",
                imagen: "img/Carrucel/girasol.jpg",
                reino: "Plantae",
                descripcion: "El girasol es una planta herbácea conocida por sus grandes flores amarillas que giran siguiendo la trayectoria del sol, fenómeno llamado heliotropismo.",
                habitat: "Zonas templadas con buena exposición solar",
                curiosidad: "Además de ornamental, el girasol se cultiva por sus semillas comestibles y su aceite rico en vitamina E."
            }
        ],
        fungi: [
            {
                nombre: "Panellus Stipticus",
                imagen: "img/Carrucel/Panellus_stipticus.jpg",
                reino: "Fungi",
                descripcion: "Hongo basidiomiceto muy conocido por su apariencia de sombrero rojo con puntos blancos.",
                habitat: "Bosques de coníferas",
                curiosidad: "Es un hongo psicoactivo y venenoso."
            }
        ],
        protista: [
            {
                nombre: "Paramecio",
                imagen: "img/Carrucel/paramecium.webp",
                reino: "Protista",
                descripcion: "Organismo unicelular ciliado de forma ovalada, habitual en aguas dulces estancadas.",
                habitat: "Agua dulce",
                curiosidad: "Se reproduce asexualmente por división binaria."
            }
        ],
        monera: [
            {
                nombre: "Escherichia Coli",
                imagen: "img/Carrucel/e-coli.avif",
                reino: "Monera",
                descripcion: "Bacteria que se encuentra generalmente en los intestinos de animales de sangre caliente.",
                habitat: "Intestinos",
                curiosidad: "Algunas cepas pueden causar intoxicación alimentaria."
            },
            {
                nombre: "Helicobacter pylori",
                imagen: "img/Carrucel/helicobacter.jpg",
                reino: "Monera",
                descripcion: "Helicobacter pylori es una bacteria en forma de espiral que vive en el estómago humano y puede sobrevivir en ambientes ácidos.",
                habitat: "Mucosa gástrica del estómago humano",
                curiosidad: "Es una de las pocas bacterias capaces de sobrevivir en el ácido estomacal y está relacionada con úlceras gástricas y gastritis."
              }
        ]
    };

    const carouselTrack = document.querySelector(".carousel-track");
    const pauseBtn = document.getElementById("pauseBtn");
    const increaseSpeedBtn = document.getElementById("increaseSpeedBtn");
    const decreaseSpeedBtn = document.getElementById("decreaseSpeedBtn");
    const speedDisplay = document.getElementById("speedDisplay");

    let currentOffset = 1;
    let carouselSpeed = 2;
    const minSpeed = 1;
    const maxSpeed = 9;
    let animationId;
    let isPaused = false;

    function updateSpeedDisplay() {
        speedDisplay.textContent = `x${carouselSpeed}`;
    }

    function createCarouselItems() {
        const allItems = [...seresVivos.animal, ...seresVivos.plantae, ...seresVivos.fungi, ...seresVivos.protista, ...seresVivos.monera];
        const duplicatedItems = [...allItems, ...allItems];

        duplicatedItems.forEach((item, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.className = "carousel-item";
            carouselItem.dataset.index = index;
            carouselItem.setAttribute("role", "button");
            carouselItem.setAttribute("aria-label", `Ver información de ${item.nombre}`);
            carouselItem.setAttribute("tabindex", "0");

            const frontDiv = document.createElement("div");
            frontDiv.className = "carousel-item-front";
            const imgElement = document.createElement("img");
            imgElement.src = item.imagen;
            imgElement.alt = item.nombre;
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "cover";
            imgElement.onerror = function() {
                this.src = item.imagenRespaldo || "img/default-placeholder.jpg";
                console.warn(`Error cargando imagen: ${item.imagen}. Usando imagen de respaldo.`);
            };
            imgElement.onload = function() {
                this.style.opacity = "1";
            };
            imgElement.style.opacity = "0";
            imgElement.style.transition = "opacity 0.3s ease";
            frontDiv.appendChild(imgElement);

            const badgeDiv = document.createElement("div");
            badgeDiv.className = `reino-badge badge-${item.reino.toLowerCase()}`;
            badgeDiv.textContent = item.reino.charAt(0);
            frontDiv.appendChild(badgeDiv);

            const titleDiv = document.createElement("div");
            titleDiv.className = "carousel-item-title";
            titleDiv.textContent = `${item.nombre}`;
            frontDiv.appendChild(titleDiv);

            const backDiv = document.createElement("div");
            backDiv.className = "carousel-item-back";

            const backBadgeDiv = document.createElement("div");
            backBadgeDiv.className = `reino-badge badge-${item.reino.toLowerCase()}`;
            backBadgeDiv.textContent = item.reino.charAt(0);
            backDiv.appendChild(backBadgeDiv);

            const infoDiv = document.createElement("div");
            infoDiv.className = "carousel-item-info";
            infoDiv.innerHTML = `
            <h3>${item.nombre}</h3>
            <p><strong>Reino:</strong> <span class="reino-text ${item.reino.toLowerCase()}-text">${item.reino}</span></p>
            <p><strong>Descripción:</strong> ${item.descripcion}</p>
            <p><strong>Hábitat:</strong> ${item.habitat}</p>
            <p><strong>Curiosidad:</strong> ${item.curiosidad}</p>
        `;

            backDiv.appendChild(infoDiv);

            carouselItem.appendChild(frontDiv);
            carouselItem.appendChild(backDiv);

            carouselItem.addEventListener("click", function () {
                this.classList.toggle("flipped");
                const isFlipped = this.classList.contains("flipped");
                this.setAttribute("aria-expanded", isFlipped);
            });

            // Pause carousel on hover
            carouselItem.addEventListener("mouseenter", () => {
                isPaused = true;
                cancelAnimationFrame(animationId);
            });

            carouselItem.addEventListener("mouseleave", () => {
                isPaused = false;
                animationId = requestAnimationFrame(animateCarousel);
            });

            carouselTrack.appendChild(carouselItem);
        });
    }

    function animateCarousel() {
        if (!isPaused) {
            currentOffset -= carouselSpeed;
            const trackWidth = carouselTrack.scrollWidth;
            const halfTrackWidth = trackWidth / 2;

            if (currentOffset <= -halfTrackWidth) {
                currentOffset = 0;
            }

            carouselTrack.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
        }
        animationId = requestAnimationFrame(animateCarousel);
    }

    function initCarousel() {
        createCarouselItems();
        updateSpeedDisplay();
        animateCarousel();
    }

    initCarousel();

    pauseBtn.addEventListener("click", function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? "▶" : "❚❚";
        this.setAttribute("aria-pressed", isPaused);
        if (!isPaused) {
            animationId = requestAnimationFrame(animateCarousel);
        } else {
            cancelAnimationFrame(animationId);
        }
    });

    increaseSpeedBtn.addEventListener("click", () => {
        carouselSpeed = Math.min(carouselSpeed + 1, maxSpeed);
        updateSpeedDisplay();
    });

    decreaseSpeedBtn.addEventListener("click", () => {
        carouselSpeed = Math.max(carouselSpeed - 1, minSpeed);
        updateSpeedDisplay();
    });

    document.addEventListener("keydown", function(e) {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains("carousel-item")) {
            switch(e.key) {
                case "Enter":
                case " ": // Spacebar
                    e.preventDefault();
                    focusedElement.click();
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    const prevItem = focusedElement.previousElementSibling;
                    if (prevItem && prevItem.classList.contains("carousel-item")) {
                        prevItem.focus();
                    }
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    const nextItem = focusedElement.nextElementSibling;
                    if (nextItem && nextItem.classList.contains("carousel-item")) {
                        nextItem.focus();
                    }
                    break;
            }
        }
    });

    window.addEventListener("beforeunload", function () {
        cancelAnimationFrame(animationId);
    });
});