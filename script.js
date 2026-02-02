// Funcionalidad del menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Control de música
const musicControl = document.getElementById('musicControl');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

if (musicControl && backgroundMusic && musicIcon) {
    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
        } else {
            backgroundMusic.play();
            musicIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        }
        isPlaying = !isPlaying;
    });
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    const eventDate = new Date('2026-03-17T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownMessage = document.getElementById('countdownMessage');

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours;
        if (minutesElement) minutesElement.textContent = minutes;
        if (secondsElement) secondsElement.textContent = seconds;
    } else {
        // El evento ya pasó
        if (countdownMessage) {
            countdownMessage.innerHTML = 
                '<p class="countdown-finished">¡Ya es el día de mi Primera Comunión! 🎉</p>';
        }
        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';
        if (secondsElement) secondsElement.textContent = '0';
    }
}

// Inicializar cuenta regresiva y actualizarla cada segundo
if (document.getElementById('days') || document.getElementById('hours') || 
    document.getElementById('minutes') || document.getElementById('seconds')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Funcionalidad del botón Agendar
const scheduleButton = document.querySelector('.schedule-button');
if (scheduleButton) {
    scheduleButton.addEventListener('click', () => {
        // Crear evento para calendario - formato correcto para agregar al calendario personal
        const eventTitle = 'Primera Comunión - Cristhian Camilo Quintero';
        const eventDate = '20260317'; // YYYYMMDD
        const startTime = '140000'; // HHMMSS (2:00 PM)
        const endTime = '160000'; // HHMMSS (4:00 PM)
        const eventDetails = 'Ceremonia de Primera Comunión en Parroquia La Purísima Concepción';
        const location = 'Parroquia La Purísima Concepción, Cl. 36 Sur #23-15, Envigado, Antioquia';
        
        // URL corregida para Google Calendar - agregar al calendario personal
        const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${eventDate}T${startTime}/${eventDate}T${endTime}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}`;
        
        window.open(googleCalendarUrl, '_blank');
    });
}

// Funcionalidad del botón "Cómo llegar"
const directionsBtn = document.getElementById('directionsBtn');
if (directionsBtn) {
    directionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Coordenadas aproximadas de Envigado, Antioquia
        const address = encodeURIComponent('Cl. 36 Sur #23-15, Envigado, Antioquia, Colombia');
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
        
        window.open(googleMapsUrl, '_blank');
    });
}

// Animaciones de entrada al cargar la página
window.addEventListener('load', () => {
    // Agregar clase fade-in a elementos que la necesiten
    const elementsToAnimate = document.querySelectorAll('.golden-frame, .hero-section, .date-section, .countdown-section, .ceremony-section');
    
    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
});

// Funcionalidad para scroll suave mejorado
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 80; // 80px para el header fijo
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Mejorar la navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            smoothScrollTo(targetElement);
        }
    });
});

// Funcionalidad para detectar scroll y animar elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar elementos para animarlos al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.golden-frame, .countdown-circle, .day-circle');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Funcionalidad adicional para mejorar la experiencia del usuario
document.addEventListener('DOMContentLoaded', () => {
    // Preloader simple
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #f5f3f0 0%, #e8e5e1 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = `
        <div style="text-align: center; color: #c8860d; font-family: Georgia, serif;">
            <div style="font-size: 24px; margin-bottom: 10px;">✞</div>
            <div style="font-size: 18px; font-style: italic;">Cargando...</div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Remover preloader cuando todo esté cargado
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 800);
    });
});

// Manejo de errores para el audio
if (backgroundMusic) {
    backgroundMusic.addEventListener('error', (e) => {
        console.log('Error al cargar el audio:', e);
        if (musicControl) {
            musicControl.style.display = 'none';
        }
    });
    
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Audio listo para reproducir');
    });
}

// Funcionalidad para cambio de tema (opcional)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Función para compartir en redes sociales
function shareEvent(platform) {
    const title = 'Primera Comunión - Cristhian Camilo Quintero';
    const text = '¡Te invito a mi Primera Comunión! 17 de Marzo, 2026';
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}


        // Funcionalidad del botón "Ver ubicación" para recepción
        const receptionLocationBtn = document.getElementById('receptionLocationBtn');
        if (receptionLocationBtn) {
            receptionLocationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Dirección de la recepción
                const address = encodeURIComponent('Calle 45 Sur #28-42, Envigado, Antioquia, Colombia');
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
                
                window.open(googleMapsUrl, '_blank');
            });
        }

        // Animación de entrada al cargar la página
        window.addEventListener('load', () => {
            document.querySelector('.reception-section').classList.add('fade-in');
        });

        // Animaciones de hover para las tarjetas de información
        const infoItems = document.querySelectorAll('.info-item');
        infoItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

                // Funcionalidad para Confirmación de Asistencia
        document.addEventListener('DOMContentLoaded', () => {
            const attendanceOptions = document.querySelectorAll('.attendance-option');
            const whatsappNumber = '+573008014847'; // Reemplaza con el número real
            
            attendanceOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Remover selección previa
                    attendanceOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Marcar como seleccionado
                    option.classList.add('selected');
                    
                    // Obtener la respuesta
                    const response = option.dataset.response;
                    let message = '';
                    
                    switch(response) {
                        case 'SI':
                            message = '¡Hola! Confirmo mi asistencia a la Primera Comunión de Cristhian Camilo Quintero el 17 de Marzo a las 2:00 PM. ¡Estaré ahí para celebrar! 🎉✞';
                            break;
                        case 'TALVEZ':
                            message = 'Hola, en relación a la Primera Comunión de Cristhian Camilo Quintero el 17 de Marzo, aún no estoy seguro/a de poder asistir, pero les confirmaré pronto. Gracias por la invitación 🙏✞';
                            break;
                        case 'NO':
                            message = 'Hola, lamentablemente no podré asistir a la Primera Comunión de Cristhian Camilo Quintero el 17 de Marzo, pero estaré con ustedes en espíritu en este día tan especial 💙✞';
                            break;
                        default:
                            message = 'Hola, me gustaría confirmar sobre la asistencia a la Primera Comunión de Cristhian Camilo Quintero el 17 de Marzo a las 2:00 PM.';
                    }
                    
                    // Crear URL de WhatsApp
                    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
                    
                    // Pequeño delay para mostrar la animación
                    setTimeout(() => {
                        window.open(whatsappUrl, '_blank');
                    }, 300);
                });
            });
            
            // Animación de entrada para la sección de confirmación
            const confirmationSection = document.querySelector('.confirmation-section');
            if (confirmationSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                        }
                    });
                }, { threshold: 0.2 });
                
                observer.observe(confirmationSection);
            }

        });
