// Funcionalidad del botón de sesión desplegable
class SessionManager {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSessionButtons());
        } else {
            this.setupSessionButtons();
        }
    }

    setupSessionButtons() {
        // Actualizar todos los botones de sesión al cargar la página
        this.updateSessionButtons();
        
        // Configurar event listeners para cerrar dropdowns al hacer clic fuera
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    getCurrentUser() {
        const currentUserEmail = localStorage.getItem('currentUser');
        if (!currentUserEmail) return null;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.email === currentUserEmail);
    }

    updateSessionButtons() {
        const currentUser = this.getCurrentUser();
        
        // Actualizar botón principal (desktop)
        const mainButton = document.querySelector('.iniciarSesion-btn');
        if (mainButton) {
            this.updateButton(mainButton, currentUser, false);
        }
        
        // Actualizar botón móvil
        const mobileButton = document.querySelector('.boton-sesion-mobile');
        if (mobileButton) {
            this.updateButton(mobileButton, currentUser, true);
        }
    }

    updateButton(buttonElement, user, isMobile) {
        if (user) {
            // Usuario logueado - crear botón desplegable
            this.createLoggedInButton(buttonElement, user, isMobile);
        } else {
            // Usuario no logueado - botón simple
            this.createLoginButton(buttonElement, isMobile);
        }
    }

    createLoginButton(buttonElement, isMobile) {
        buttonElement.innerHTML = '';
        buttonElement.className = isMobile ? 'boton-sesion-mobile' : 'boton-sesion iniciarSesion-btn';
        
        const link = document.createElement('a');
        link.href = this.getLoginPath();
        link.className = 'session-button';
        link.textContent = 'Iniciar Sesión';
        
        buttonElement.appendChild(link);
    }

    createLoggedInButton(buttonElement, user, isMobile) {
        buttonElement.innerHTML = '';
        buttonElement.className = isMobile ? 'boton-sesion-mobile' : 'boton-sesion iniciarSesion-btn';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'session-dropdown';
        
        const button = document.createElement('button');
        button.className = 'session-button logged-in';
        button.innerHTML = `
            <span class="user-name">${user.name}</span>
            <span class="session-dropdown-arrow">▼</span>
        `;
        
        const menu = document.createElement('div');
        menu.className = 'session-dropdown-menu';
        menu.innerHTML = `
            <div class="session-dropdown-item" data-action="change-account">
                <span>🔄</span>
                <span>Cambiar cuenta</span>
            </div>
            <div class="session-dropdown-item logout" data-action="logout">
                <span>🚪</span>
                <span>Cerrar sesión</span>
            </div>
        `;
        
        dropdown.appendChild(button);
        dropdown.appendChild(menu);
        buttonElement.appendChild(dropdown);
        
        // Configurar event listeners
        this.setupDropdownEvents(dropdown);
    }

    setupDropdownEvents(dropdown) {
        const button = dropdown.querySelector('.session-button');
        const menu = dropdown.querySelector('.session-dropdown-menu');
        
        // Toggle dropdown al hacer clic en el botón
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Cerrar otros dropdowns abiertos
            document.querySelectorAll('.session-dropdown.active').forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
            
            dropdown.classList.toggle('active');
        });
        
        // Manejar clics en las opciones del menú
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = e.target.closest('.session-dropdown-item');
            if (!item) return;
            
            const action = item.dataset.action;
            dropdown.classList.remove('active');
            
            if (action === 'logout') {
                this.logout();
            } else if (action === 'change-account') {
                this.changeAccount();
            }
        });
    }

    handleOutsideClick(e) {
        // Cerrar dropdowns si se hace clic fuera de ellos
        if (!e.target.closest('.session-dropdown')) {
            document.querySelectorAll('.session-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }

    logout() {
        // Limpiar datos de sesión
        localStorage.removeItem('currentUser');
        
        // Actualizar botones
        this.updateSessionButtons();
        
        // Opcional: mostrar mensaje de confirmación
        this.showMessage('Sesión cerrada correctamente', 'success');
    }

    changeAccount() {
        // Redirigir al login
        window.location.href = this.getLoginPath();
    }

    getLoginPath() {
        // Determinar la ruta correcta al login basada en la ubicación actual
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/') && !currentPath.endsWith('index.html') && !currentPath.endsWith('/')) {
            // Estamos en una subcarpeta
            return '../../../../login/login.html';
        } else {
            // Estamos en la raíz
            return 'login/login.html';
        }
    }

    showMessage(text, type = 'info') {
        // Crear y mostrar un mensaje temporal
        const message = document.createElement('div');
        message.className = `session-message session-message-${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#667eea'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        // Animar entrada
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }

    // Método público para actualizar botones (útil para llamar desde otras páginas)
    refresh() {
        this.updateSessionButtons();
    }
}

// Inicializar el gestor de sesiones
const sessionManager = new SessionManager();

// Exponer globalmente para uso en otras páginas
window.SessionManager = SessionManager;
window.sessionManager = sessionManager;

