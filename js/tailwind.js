// Configuración de Tailwind CSS
// NOTA: Los colores aquí deben estar sincronizados con las variables CSS en :root (css/style.css)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Colores principales - Sincronizados con :root
                'neon-green': '#4ade80',      // --color-neon-green
                'dark-green': '#065f46',      // --color-dark-green
                'dark': '#111111',             // --color-dark
                'darker': '#0a0a0a',           // --color-darker
                'light-dark': '#1a1a1a'        // --color-light-dark
            },
            fontFamily: {
                // Fuentes - Sincronizadas con :root
                'sans': ['Inter', 'sans-serif'],           // --font-sans
                'mono': ['JetBrains Mono', 'monospace'],   // --font-mono
            },
        }
    }
}
