// Función para cargar componentes HTML
async function loadComponent(componentPath, targetElementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);
        
        if (targetElement) {
            targetElement.innerHTML = html;
            // Disparar evento personalizado cuando se carga un componente
            window.dispatchEvent(new CustomEvent('componentLoaded', { 
                detail: { componentId: targetElementId } 
            }));
            return true;
        } else {
            console.error(`No se encontró el elemento con id: ${targetElementId}`);
            return false;
        }
    } catch (error) {
        console.error('Error al cargar componente:', error);
        return false;
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar navegación
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        await loadComponent('components/nav.html', 'nav-placeholder');
    }
    
    // Cargar footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        await loadComponent('components/footer.html', 'footer-placeholder');
    }
});

