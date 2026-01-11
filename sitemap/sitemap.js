// Mapa del Sitio - JavaScript Interactivo
document.addEventListener('DOMContentLoaded', function() {
    initializeSitemap();
    setupEventListeners();
    setupModeToggle();
    setupMobileMenu();
    addScrollEffects();
});

// Inicialización del mapa del sitio
function initializeSitemap() {
    console.log('Inicializando mapa del sitio LifeHunter...');
    
    // Agregar clases de animación
    const sections = document.querySelectorAll('.sitemap-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Configurar estado inicial de las secciones
    setupInitialState();
}

// Configurar estado inicial de las secciones
function setupInitialState() {
    const sections = document.querySelectorAll('.sitemap-section');
    
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const content = section.querySelector('.section-content');
        const toggleIcon = section.querySelector('.toggle-icon');
        
        // Por defecto, todas las secciones están expandidas
        content.classList.remove('collapsed');
        header.classList.remove('collapsed');
        
        // Configurar ARIA para accesibilidad
        const sectionId = header.getAttribute('data-section');
        content.id = `${sectionId}-content`;
        header.setAttribute('aria-expanded', 'true');
        header.setAttribute('aria-controls', content.id);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Toggle de secciones
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', toggleSection);
        header.addEventListener('keydown', handleKeyboardToggle);
    });

    // Enlaces de página con efectos
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach(link => {
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
        link.addEventListener('click', handleLinkClick);
    });

    // Botón de scroll hacia arriba
    setupScrollToTop();
}

// Configurar toggle de modo oscuro/claro (copiado del código original)
function setupModeToggle() {
    const modeToggle = document.getElementById('interruptor-modo');
    
    if (modeToggle) {
        // Cargar preferencia guardada
        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'light') {
            document.body.classList.add('light-mode');
            modeToggle.checked = true;
        }

        modeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

// Configurar menú móvil (copiado del código original)
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navegacion-principal');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-enlace');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
}

// Toggle de secciones
function toggleSection(event) {
    const header = event.currentTarget;
    const section = header.parentElement;
    const content = section.querySelector('.section-content');
    const toggleIcon = header.querySelector('.toggle-icon');
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Expandir
        content.classList.remove('collapsed');
        header.classList.remove('collapsed');
        header.setAttribute('aria-expanded', 'true');
        
        // Animación del icono
        toggleIcon.style.transform = 'rotate(0deg)';
        
        // Efecto de aparición suave
        setTimeout(() => {
            content.style.opacity = '1';
        }, 50);
        
    } else {
        // Colapsar
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.classList.add('collapsed');
            header.classList.add('collapsed');
            header.setAttribute('aria-expanded', 'false');
        }, 150);
        
        // Animación del icono
        toggleIcon.style.transform = 'rotate(-90deg)';
    }
    
    // Efecto visual en el header
    header.style.transform = 'scale(0.98)';
    setTimeout(() => {
        header.style.transform = 'scale(1)';
    }, 150);
}

// Manejo de teclado para accesibilidad
function handleKeyboardToggle(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSection(event);
    }
}

// Efectos de hover en enlaces
function handleLinkHover(event) {
    const link = event.currentTarget;
    const icon = link.querySelector('.page-icon');
    
    // Animación del icono
    if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    }
}

function handleLinkLeave(event) {
    const link = event.currentTarget;
    const icon = link.querySelector('.page-icon');
    
    // Restaurar icono
    if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
}

// Manejo de clics en enlaces
function handleLinkClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    // Efecto de clic
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
        link.style.transform = 'scale(1)';
    }, 150);
    
    // Verificar si el enlace existe
    if (href && href !== '#') {
        // Agregar efecto de carga
        link.classList.add('loading');
        
        // Simular verificación de enlace
        setTimeout(() => {
            link.classList.remove('loading');
        }, 500);
    } else {
        // Mostrar mensaje si el enlace no está disponible
        event.preventDefault();
        showNotification('Esta página aún no está disponible', 'info');
    }
}

// Efectos de scroll
function addScrollEffects() {
    // Intersection Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll('.sitemap-section, .sitemap-intro');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Configurar botón de scroll hacia arriba
function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Volver arriba');
    
    // Estilos del botón
    Object.assign(scrollButton.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: '#ff4444',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease',
        zIndex: '1000'
    });
    
    document.body.appendChild(scrollButton);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Funcionalidad del botón
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(0) scale(1.1)';
        scrollButton.style.background = '#bd0404';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'translateY(0) scale(1)';
        scrollButton.style.background = '#ff4444';
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    });
    
    // Colores según tipo
    const colors = {
        info: '#ff4444',
        success: '#00b894',
        warning: '#fdcb6e',
        error: '#e17055'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Permitir cerrar al hacer clic
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error en el mapa del sitio:', event.error);
});

// Información de debug (solo en desarrollo)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Mapa del sitio LifeHunter cargado correctamente');
    console.log('Funcionalidades disponibles:');
    console.log('- Toggle de secciones');
    console.log('- Modo oscuro/claro');
    console.log('- Menú móvil');
    console.log('- Efectos de scroll');
    console.log('- Navegación accesible');
}

// Exportar funciones para uso externo (si es necesario)
window.SitemapUtils = {
    toggleSection,
    showNotification
};

// Toggle de secciones
function toggleSection(event) {
    const header = event.currentTarget;
    const section = header.parentElement;
    const content = section.querySelector('.section-content');
    const toggleIcon = header.querySelector('.toggle-icon');
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Expandir
        content.classList.remove('collapsed');
        header.classList.remove('collapsed');
        header.setAttribute('aria-expanded', 'true');
        
        // Animación del icono
        toggleIcon.style.transform = 'rotate(0deg)';
        
        // Efecto de aparición suave
        setTimeout(() => {
            content.style.opacity = '1';
        }, 50);
        
    } else {
        // Colapsar
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.classList.add('collapsed');
            header.classList.add('collapsed');
            header.setAttribute('aria-expanded', 'false');
        }, 150);
        
        // Animación del icono
        toggleIcon.style.transform = 'rotate(-90deg)';
    }
    
    // Efecto visual en el header
    header.style.transform = 'scale(0.98)';
    setTimeout(() => {
        header.style.transform = 'scale(1)';
    }, 150);
}

// Manejo de teclado para accesibilidad
function handleKeyboardToggle(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSection(event);
    }
}

// Efectos de hover en enlaces
function handleLinkHover(event) {
    const link = event.currentTarget;
    const icon = link.querySelector('.page-icon');
    
    // Animación del icono
    if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    }
    
    // Efecto de brillo
    link.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
}

function handleLinkLeave(event) {
    const link = event.currentTarget;
    const icon = link.querySelector('.page-icon');
    
    // Restaurar icono
    if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
    
    // Restaurar sombra
    link.style.boxShadow = '';
}

// Manejo de clics en enlaces
function handleLinkClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    // Efecto de clic
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
        link.style.transform = 'scale(1)';
    }, 150);
    
    // Verificar si el enlace existe
    if (href && href !== '#') {
        // Agregar efecto de carga
        link.classList.add('loading');
        
        // Simular verificación de enlace
        setTimeout(() => {
            link.classList.remove('loading');
        }, 500);
    } else {
        // Mostrar mensaje si el enlace no está disponible
        event.preventDefault();
        showNotification('Esta página aún no está disponible', 'info');
    }
}

// Calcular estadísticas del sitio
function calculateStats() {
    // Contar páginas totales
    const totalPages = document.querySelectorAll('.page-link').length;
    const biographyPages = document.querySelectorAll('.bacteria-grid .page-link, .subsection .page-link').length;
    
    // Animar contadores
    animateCounter('total-pages', totalPages);
    animateCounter('biography-pages', biographyPages);
}

// Animación de contadores
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / 50; // 50 pasos de animación
    const duration = 2000; // 2 segundos
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, stepTime);
}

// Efectos de scroll
function addScrollEffects() {
    // Intersection Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll('.sitemap-section, .stats-section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Configurar botón de scroll hacia arriba
function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Volver arriba');
    
    // Estilos del botón
    Object.assign(scrollButton.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'linear-gradient(135deg, #ff4444 0%, #0e1116 100%)',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease',
        zIndex: '1000'
    });
    
    document.body.appendChild(scrollButton);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Funcionalidad del botón
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(0) scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'translateY(0) scale(1)';
    });
}

// Sistema de búsqueda simple
function setupSearch() {
    // Crear barra de búsqueda
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="sitemap-search" placeholder="Buscar en el mapa del sitio..." />
        <button id="clear-search" aria-label="Limpiar búsqueda">✕</button>
    `;
    
    // Estilos de la búsqueda
    Object.assign(searchContainer.style, {
        position: 'relative',
        maxWidth: '400px',
        margin: '0 auto 2rem auto',
        display: 'flex',
        alignItems: 'center'
    });
    
    const searchInput = searchContainer.querySelector('#sitemap-search');
    Object.assign(searchInput.style, {
        width: '100%',
        padding: '0.8rem 2.5rem 0.8rem 1rem',
        border: '2px solid #e9ecef',
        borderRadius: '25px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease'
    });
    
    const clearButton = searchContainer.querySelector('#clear-search');
    Object.assign(clearButton.style, {
        position: 'absolute',
        right: '0.5rem',
        background: 'none',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '50%',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Insertar antes del contenedor del mapa
    const sitemapContainer = document.querySelector('.sitemap-container');
    sitemapContainer.parentNode.insertBefore(searchContainer, sitemapContainer);
    
    // Funcionalidad de búsqueda
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#667eea';
    });
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e9ecef';
    });
    
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
    });
    
    // Mostrar/ocultar botón de limpiar
    searchInput.addEventListener('input', () => {
        clearButton.style.opacity = searchInput.value ? '1' : '0';
    });
}

// Realizar búsqueda
function performSearch() {
    const searchTerm = document.getElementById('sitemap-search').value.toLowerCase();
    const pageItems = document.querySelectorAll('.page-item');
    const sections = document.querySelectorAll('.sitemap-section');
    
    let hasResults = false;
    
    sections.forEach(section => {
        let sectionHasResults = false;
        const sectionItems = section.querySelectorAll('.page-item');
        
        sectionItems.forEach(item => {
            const pageName = item.querySelector('.page-name').textContent.toLowerCase();
            const pageDesc = item.querySelector('.page-desc').textContent.toLowerCase();
            
            if (searchTerm === '' || pageName.includes(searchTerm) || pageDesc.includes(searchTerm)) {
                item.style.display = 'block';
                sectionHasResults = true;
                hasResults = true;
                
                // Resaltar término de búsqueda
                if (searchTerm !== '') {
                    highlightSearchTerm(item, searchTerm);
                } else {
                    removeHighlight(item);
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        // Mostrar/ocultar sección completa
        if (sectionHasResults || searchTerm === '') {
            section.style.display = 'block';
            // Expandir sección si hay resultados
            if (searchTerm !== '' && sectionHasResults) {
                const content = section.querySelector('.section-content');
                const header = section.querySelector('.section-header');
                content.classList.remove('collapsed');
                header.classList.remove('collapsed');
            }
        } else {
            section.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    showSearchResults(hasResults, searchTerm);
}

// Resaltar término de búsqueda
function highlightSearchTerm(item, term) {
    const pageName = item.querySelector('.page-name');
    const pageDesc = item.querySelector('.page-desc');
    
    [pageName, pageDesc].forEach(element => {
        const text = element.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlightedText = text.replace(regex, '<mark style="background: #ffeb3b; padding: 0.1rem 0.2rem; border-radius: 3px;">$1</mark>');
        element.innerHTML = highlightedText;
    });
}

// Remover resaltado
function removeHighlight(item) {
    const pageName = item.querySelector('.page-name');
    const pageDesc = item.querySelector('.page-desc');
    
    [pageName, pageDesc].forEach(element => {
        element.innerHTML = element.textContent;
    });
}

// Mostrar resultados de búsqueda
function showSearchResults(hasResults, searchTerm) {
    let resultMessage = document.getElementById('search-results');
    
    if (!resultMessage) {
        resultMessage = document.createElement('div');
        resultMessage.id = 'search-results';
        resultMessage.style.textAlign = 'center';
        resultMessage.style.padding = '1rem';
        resultMessage.style.margin = '1rem 0';
        resultMessage.style.borderRadius = '10px';
        resultMessage.style.transition = 'all 0.3s ease';
        
        const sitemapContainer = document.querySelector('.sitemap-container');
        sitemapContainer.parentNode.insertBefore(resultMessage, sitemapContainer);
    }
    
    if (searchTerm && !hasResults) {
        resultMessage.innerHTML = `
            <p style="color: #666; font-style: italic;">
                No se encontraron resultados para "${searchTerm}"
            </p>
        `;
        resultMessage.style.background = '#fff3cd';
        resultMessage.style.border = '1px solid #ffeaa7';
        resultMessage.style.display = 'block';
    } else {
        resultMessage.style.display = 'none';
    }
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    });
    
    // Colores según tipo
    const colors = {
        info: '#667eea',
        success: '#00b894',
        warning: '#fdcb6e',
        error: '#e17055'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Permitir cerrar al hacer clic
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar búsqueda con debounce
if (document.getElementById('sitemap-search')) {
    const debouncedSearch = debounce(performSearch, 300);
    document.getElementById('sitemap-search').addEventListener('input', debouncedSearch);
}

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error en el mapa del sitio:', event.error);
});

// Información de debug (solo en desarrollo)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Mapa del sitio LifeHunter cargado correctamente');
    console.log('Funcionalidades disponibles:');
    console.log('- Toggle de secciones');
    console.log('- Búsqueda en tiempo real');
    console.log('- Estadísticas animadas');
    console.log('- Efectos de scroll');
    console.log('- Navegación accesible');
}

// Exportar funciones para uso externo (si es necesario)
window.SitemapUtils = {
    toggleSection,
    performSearch,
    showNotification,
    calculateStats
};

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
  