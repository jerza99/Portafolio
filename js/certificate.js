function showCertificate(imagePath, title) {
    Swal.fire({
        title: title,
        imageUrl: imagePath,
        imageAlt: 'Certificado de ' + title,
        width: '600px', 
        imageWidth: '100%', 
        imageHeight: 'auto',
        background: '#111111', 
        color: '#ffffff', 
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#4ade80', 
        padding: '1.5rem',
        buttonsStyling: true,
        customClass: {
            title: 'text-xl font-bold',
            confirmButton: 'px-6 py-2 rounded-lg font-medium text-dark hover:bg-opacity-90 transition-all'
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown' 
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}