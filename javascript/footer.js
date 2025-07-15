// Cerrar otras secciones cuando se abra una nueva (opcional)
        document.addEventListener('DOMContentLoaded', function() {
            const toggleButtons = document.querySelectorAll('.footer-toggle');
            
            toggleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Opcional: cerrar otras secciones abiertas
                    const targetId = this.getAttribute('data-bs-target');
                    const otherButtons = document.querySelectorAll('.footer-toggle:not([data-bs-target="' + targetId + '"])');
                    
                    otherButtons.forEach(otherButton => {
                        const otherTargetId = otherButton.getAttribute('data-bs-target');
                        const otherCollapse = document.querySelector(otherTargetId);
                        
                        if (otherCollapse && otherCollapse.classList.contains('show')) {
                            otherButton.setAttribute('aria-expanded', 'false');
                            otherCollapse.classList.remove('show');
                        }
                    });
                });
            });
        });