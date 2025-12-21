function showCertificate(imagePath, title) {
    Swal.fire({
        title: title,
        imageUrl: imagePath,
        imageAlt: 'Certificado de ' + title,
        imageWidth: 600, // Tamaño máximo
        imageHeight: 'auto',
        background: '#1f2937', // Color oscuro (gray-800 de Tailwind)
        color: '#ffffff', // Texto blanco
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#4ade80', // Tu verde neón (green-400)
        buttonsStyling: true,
        customClass: {
            title: 'text-xl font-bold',
            confirmButton: 'px-6 py-2 rounded-lg font-medium text-dark hover:bg-opacity-90 transition-all'
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown' // Animación de entrada suave
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}