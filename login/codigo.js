const $btnIniciarSesion = document.querySelector('.iniciarSesion-btn'),
      $btnRegistrarse = document.querySelector('.registrarSesion-btn'),
      $registrarSesion = document.querySelector('.resgistrarseSesion'),
      $iniciarSecion = document.querySelector('.iniciarSesion');

document.addEventListener('click', e => {
    if(e.target === $btnIniciarSesion || e.target === $btnRegistrarse){
        $iniciarSecion.classList.toggle('activa');
        $registrarSesion.classList.toggle('activa');
    }
});

// Función para verificar inicio de sesión
function checkLogin() {
    const currentUserEmail = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el usuario existe en la base de datos
    const userExists = users.some(user => user.email === currentUserEmail);
    
    // Si no existe, cerrar sesión
    if (currentUserEmail && !userExists) {
        localStorage.removeItem('currentUser');
        return false;
    }
    return !!currentUserEmail;
}

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión al cargar la página
    checkLogin();
    
    // Menu toggle para móviles
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
  
    // Modo oscuro/claro
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
  
    // Gestión de sesión de usuario
    updateSessionUI();
  
    function updateSessionUI() {
        const currentUserEmail = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = users.find(user => user.email === currentUserEmail);
        
        const loginButtons = document.querySelectorAll('.iniciarSesion-btn, .boton-sesion, .boton-sesion-mobile');
        
        loginButtons.forEach(button => {
            if (currentUser) {
                // Guardar el HTML original si no está guardado
                if (!button.dataset.originalHTML) {
                    button.dataset.originalHTML = button.innerHTML;
                    button.dataset.originalHref = button.href || '';
                }
                
                // Eliminar el href para evitar redirección
                button.removeAttribute('href');
                
                // Mostrar menú de usuario con el nombre
                button.innerHTML = `
                    <div class="user-session">
                        <span class="username">${currentUser.name}</span>
                        <div class="user-dropdown">
                            <div class="dropdown-option" data-action="change-account">Cambiar cuenta</div>
                            <div class="dropdown-option" data-action="logout">Cerrar sesión</div>
                        </div>
                    </div>
                `;
                
                // Configurar eventos para el menú desplegable
                setupUserDropdown(button);
            } else {
                // Restaurar el botón original si existe
                if (button.dataset.originalHTML) {
                    button.innerHTML = button.dataset.originalHTML;
                    button.href = button.dataset.originalHref || '';
                }
            }
        });
    }
      
    // Configurar eventos del dropdown
    function setupUserDropdown(button) {
        // Mostrar/ocultar dropdown
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = this.querySelector('.user-dropdown');
            const allDropdowns = document.querySelectorAll('.user-dropdown');
            
            // Cerrar otros dropdowns abiertos
            allDropdowns.forEach(d => d.style.display = 'none');
            
            // Alternar el dropdown actual
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
      
        // Manejar opciones del dropdown
        button.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = this.getAttribute('data-action');
                if (action === 'logout') {
                    localStorage.removeItem('currentUser');
                    updateSessionUI(); // Actualizar la UI sin recargar
                } else if (action === 'change-account') {
                    window.location.href = 'login/login.html';
                }
            });
        });
    }
      
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-session')) {
            document.querySelectorAll('.user-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
});

// Código de curiosidades animales
const animales = [
    // ... (mantener el array de animales existente)
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
  
// Selector de idioma
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
                window.location.href = '../ProgramacionWEB Inglés/index.html';
                break;
            case 'cn':
                window.location.href = '../ProgramacionWEB Chino/index.html';
                break;
            case 'ru':
                window.location.href = '../ProgramacionWEB Ruso/index.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    });
});
  
window.addEventListener('click', function(e) {
    if (!selectedButton.contains(e.target) && !optionsMenu.contains(e.target)) {
        optionsMenu.style.display = 'none';
    }
});