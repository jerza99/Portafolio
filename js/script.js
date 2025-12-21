// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scrolling for navigation links (maneja tanto # como rutas limpias)
document.querySelectorAll('a[href^="#"], a[href^="/"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si es una ruta limpia que empieza con /, dejar que Netlify la maneje
        if (href.startsWith('/') && !href.startsWith('/#')) {
            // Permitir navegación normal para rutas limpias (/about, /projects, etc.)
            return;
        }
        
        // Si es un hash (#), hacer scroll suave
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, href);
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        }
    });
});

// Active navigation link highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) {
        return; // Si no hay secciones o enlaces, salir
    }
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        const href = link.getAttribute('href');
        
        if (!href) return;
        
        // Manejar diferentes formatos de href:
        // - Rutas limpias: /about, /skills, /contact
        // - Hashes: #about, #skills, #contact
        // - Rutas con hash: index.html#about
        
        const routeMap = {
            '/': 'home',
            '/home': 'home',
            '/about': 'about',
            '/skills': 'skills',
            '/contact': 'contact'
        };
        
        // Si es una ruta limpia, convertirla a sección
        const sectionId = routeMap[href] || 
                         (href.startsWith('#') ? href.substring(1) : 
                          href.includes('#') ? href.split('#')[1] : null);
        
        if (sectionId === current) {
            link.classList.add('active-nav');
        }
    });
}

// Ejecutar al hacer scroll
window.addEventListener('scroll', updateActiveNav);

// Ejecutar después de que se carguen los componentes dinámicos
function initActiveNav() {
    updateActiveNav();
    
    // Configurar observer para cuando se agreguen elementos dinámicamente
    const observer = new MutationObserver(() => {
        updateActiveNav();
    });
    
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        observer.observe(navPlaceholder, { childList: true, subtree: true });
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Esperar un poco para que los componentes dinámicos se carguen
        setTimeout(initActiveNav, 200);
    });
} else {
    setTimeout(initActiveNav, 200);
}

// También escuchar cuando se carga un componente dinámico
window.addEventListener('componentLoaded', (event) => {
    if (event.detail.componentId === 'nav-placeholder') {
        setTimeout(initActiveNav, 50);
    }
});

// Scroll automático cuando la página carga con hash en la URL (desde rutas limpias)
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Actualizar el nav activo después del scroll
                setTimeout(updateActiveNav, 300);
            }
        }, 100);
    } else {
        // Si no hay hash, actualizar el nav para la sección inicial
        updateActiveNav();
    }
});

// Manejar navegación del navegador (botones atrás/adelante)
window.addEventListener('popstate', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    updateActiveNav();
});

// También ejecutar después de hacer scroll suave
document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"], a[href^="/"]');
    if (anchor) {
        const href = anchor.getAttribute('href');
        // Solo actualizar si es un hash interno
        if (href && href.startsWith('#')) {
            setTimeout(updateActiveNav, 500);
        }
    }
});

// Scroll to top button
const scrollTopButton = document.getElementById('scroll-top');

if (scrollTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.opacity = '1';
        } else {
            scrollTopButton.style.opacity = '0';
        }
    });
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form submission handler (solo si el formulario existe)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}
