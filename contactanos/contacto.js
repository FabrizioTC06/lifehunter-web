document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navegacion-principal');
    const header = document.querySelector('header');
    const body = document.body;

    const adjustBodyPadding = () => {
        const headerHeight = header.offsetHeight;
        if (nav.classList.contains('active')) {
            const expandedHeaderHeight = headerHeight + nav.offsetHeight;
            body.style.paddingTop = `${expandedHeaderHeight}px`;
        } else {
            body.style.paddingTop = `${headerHeight}px`;
        }
    };

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        adjustBodyPadding();
    });

    document.querySelectorAll('.nav-enlace').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            adjustBodyPadding();
        });
    });

    const darkModeToggle = document.getElementById('interruptor-modo');

    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'light') {
        darkModeToggle.checked = false;
        body.classList.add('light-mode');
    } else {
        darkModeToggle.checked = true;
        body.classList.remove('light-mode');
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    adjustBodyPadding();

    window.addEventListener('resize', adjustBodyPadding);

    const animales = [
        {
            nombre: "Rinoceronte",
            gif: "../img/gifs/rino_sinfondo.gif",
            datos: [
                "Un rinoceronte puede pesar hasta 2 toneladas.",
                "Los cuernos de los rinocerontes están hechos de queratina, como tus uñas.",
                "Los rinocerontes son herbívoros y consumen grandes cantidades de plantas."
            ]
        },
        {
            nombre: "Cocodrilo",
            gif: "../img/gifs/cocod_sinfondo.gif",
            datos: [
                "Los cocodrilos pueden vivir más de 70 años.",
                "Los cocodrilos pueden nadar a 30 km/h en distancias cortas.",
                "Tienen una mordida extremadamente poderosa."
            ]
        },
        {
            nombre: "Panda",
            gif: "../img/gifs/panda_sinfondo.gif",
            datos: [
                "Los pandas pasan 12 horas al día comiendo bambú.",
                "Los pandas nacen pesando 100 gramos nada más.",
                "Son expertos trepadores desde pequeños."
            ]
        },
        {
            nombre: "Zebra",
            gif: "../img/gifs/zebra_sinfondo.gif",
            datos: [
                "Cada cebra tiene un patrón único de rayas.",
                "Las cebras son excelentes nadadoras.",
                "Viven en manadas para protegerse de depredadores."
            ]
        },
        {
            nombre: "Hormiguero",
            gif: "../img/gifs/hormiguero_sinfondo.gif",
            datos: [
                "Puede comer hasta 30,000 hormigas al día.",
                "Su lengua mide hasta 60 cm.",
                "No tienen dientes, usan su hocico para alimentarse."
            ]
        },
        {
            nombre: "Nutria",
            gif: "../img/gifs/nutria_sinfondo.gif",
            datos: [
                "Las nutrias usan piedras como herramientas para romper conchas.",
                "Las nutrias se dan la mano al dormir para no separarse.",
                "Son excelentes nadadoras y buceadoras."
            ]
        },
        {
            nombre: "Ardilla",
            gif: "../img/gifs/ardilla_sinfondo.gif",
            datos: [
                "Las ardillas pueden saltar hasta 10 veces su tamaño.",
                "Las ardillas tienen memoria espacial para recordar sus escondites.",
                "Pueden girar sus patas traseras 180 grados."
            ]
        },
        {
            nombre: "Zorrillo",
            gif: "../img/gifs/zorrillo_sinfondo.gif",
            datos: [
                "El olor de los zorrillos puede percibirse a más de 3 km.",
                "Los zorrillos casi siempre avisan antes de rociar su spray.",
                "Son omnívoros y comen tanto plantas como pequeños animales."
            ]
        },
        {
            nombre: "Perezoso",
            gif: "../img/gifs/peresoso_sinfondo.gif",
            datos: [
                "El perezoso mueve tan lento que le crecen algas en el pelaje.",
                "Los perezosos solo bajan de los árboles una vez a la semana.",
                "Duermen hasta 20 horas al día."
            ]
        },
        {
            nombre: "Castor",
            gif: "../img/gifs/castor_sinfondo.gif",
            datos: [
                "Los castores construyen presas que se ven desde satélites.",
                "Los dientes de los castores nunca dejan de crecer.",
                "Sus colas les ayudan a nadar y comunicarse."
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

        setTimeout(() => {
            contenedor.classList.add("hidden");
        }, 5000);
    });

    const selectedButton = document.getElementById('selected-language');
    const optionsMenu = document.querySelector('.oportunidades');
    const options = document.querySelectorAll('.oportunidad');

    selectedButton.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            optionsMenu.style.display = 'none';
            const selectedLang = option.dataset.value;

            switch (selectedLang) {
                case 'en':
                    window.location.href = '../ProgramacionWEB Inglés/contacto.html';
                    break;
                case 'cn':
                    window.location.href = '../ProgramacionWEB Chino/contacto.html';
                    break;
                case 'ru':
                    window.location.href = '../ProgramacionWEB Ruso/contacto.html';
                    break;
                default:
                    window.location.href = 'contacto.html';
            }
        });
    });

    window.addEventListener('click', function (e) {
        if (!selectedButton.contains(e.target) && !optionsMenu.contains(e.target)) {
            optionsMenu.style.display = 'none';
        }
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simulate form submission
        console.log('Form submitted:', { name, email, message });
        formMessage.textContent = '¡Mensaje enviado con éxito! Gracias por contactarnos.';
        formMessage.classList.remove('hidden');
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        contactForm.reset();

        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });
});