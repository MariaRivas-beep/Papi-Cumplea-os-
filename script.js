/// Textos que se van a escribir uno tras otro
const texts = ["Hola papi", "Este es mi regalo para ti", "Feliz cumpleaños"];
let textIndex = 0;
let charIndex = 0;
const speed = 150;

function typeWriter() {
  const currentText = texts[textIndex];
  if (charIndex < currentText.length) {
    document.getElementById("text").innerHTML += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  } else {
    if (textIndex < texts.length - 1) {
      setTimeout(() => {
        document.getElementById("text").innerHTML += "<br>";
        textIndex++;
        charIndex = 0;
        typeWriter();
      }, 1000);
    } else {
      // 1. Mostrar la segunda sección
      setTimeout(() => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("second-section").style.display = "flex"; 
        
        // 2. Mostrar la flecha con fade-in y animación
        setTimeout(() => {
            document.getElementById("next-button").classList.add("animated-arrow");
        }, 2000); 
        
      }, 1500); 
    }
  }
}

// Lógica de navegación del carrusel y la flecha
document.addEventListener('DOMContentLoaded', (event) => {
    const nextButton = document.getElementById('next-button');
    const secondSection = document.getElementById('second-section');
    const thirdSection = document.getElementById('third-section');
    
    const carousel = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const cards = document.querySelectorAll('.card-flip-container');
    const overlay = document.getElementById('carousel-overlay');
    const backButton = document.getElementById('back-button');
    
    // Variables del carrusel
    const cardWidth = 330; // Ancho de la tarjeta + margen
    let offset = 0;
    const totalCards = 4;
    
    // Asegurar que la tercera sección esté oculta al inicio
    if (thirdSection) {
        thirdSection.style.display = 'none';
    }
    
    // Función para manejar el clic en la flecha de la Sección 2
    if(nextButton) {
        nextButton.addEventListener('click', () => {
            // Ocultar Sección 2
            secondSection.style.display = "none";
            
            // Mostrar Sección 3 con Fade-in
            if (thirdSection) {
                thirdSection.style.display = "flex"; // Muestra el contenedor
                
                // CLAVE: Inicia la transición de Fade-in (CSS opacity transition)
                setTimeout(() => {
                    thirdSection.classList.add('visible'); 
                }, 10); 
                
                window.scrollTo(0, 0); 
            }
        });
    }

    // Funcionalidad SWIPE/Carrusel
    if (carousel) {
        nextBtn.addEventListener('click', () => {
            const cardsVisible = Math.floor(carousel.offsetWidth / cardWidth);
            if (offset > -(cardWidth * (totalCards - cardsVisible))) {
                offset -= cardWidth;
                carousel.style.transform = `translateX(${offset}px)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            if (offset < 0) {
                offset += cardWidth;
                carousel.style.transform = `translateX(${offset}px)`;
            }
        });
    }

    // Funcionalidad ZOOM-IT, FLIP y FOCUS al hacer click
    cards.forEach(cardContainer => {
        cardContainer.addEventListener('click', () => {
            // Si ya está en modo zoom, no hacer nada o dejar que el botón de volver lo maneje
            if (cardContainer.classList.contains('zoomed')) return;

            // 1. Aplicar la clase 'zoomed' para el efecto de zoom y flip
            cardContainer.classList.add('zoomed');
            
            // 2. Mostrar el overlay
            overlay.classList.add('active');
            
            // 3. Mostrar el botón de volver
            backButton.style.display = 'block';
            
            // 4. Aplicar clase al body/section para deshabilitar el scroll y ocultar otros elementos del carrusel
            document.body.style.overflow = 'hidden';
            if(thirdSection) {
                thirdSection.classList.add('zoomed-active');
            }
        });
    });
    
    // Funcionalidad BOTÓN DE VOLVER
    backButton.addEventListener('click', () => {
        const zoomedCard = document.querySelector('.card-flip-container.zoomed');

        if (zoomedCard) {
            // 1. Quitar la clase 'zoomed'
            zoomedCard.classList.remove('zoomed');
            
            // 2. Ocultar el overlay
            overlay.classList.remove('active');
            
            // 3. Ocultar el botón de volver
            backButton.style.display = 'none';
            
            // 4. Restaurar el scroll y la visibilidad de elementos
            document.body.style.overflow = 'auto';
            if(thirdSection) {
                thirdSection.classList.remove('zoomed-active');
            }
        }
    });


    window.onload = typeWriter;
});