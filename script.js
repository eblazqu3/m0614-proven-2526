 /* === Código JavaScript: Animación Radial === */
        const boton = document.getElementById('boton-circular');
        const contenedor = document.getElementById('contenedor-central');
        const NUM_PARTICULAS = 60; // ¡Aumentamos la cantidad para el efecto de rayo!

        /**
         * Crea y anima las partículas de un "fuego artificial" con dispersión radial.
         * La lógica trigonométrica asegura que el movimiento sea perfectamente radial.
         */
        function crearFuegoArtificial(startX, startY) {
            for (let i = 0; i < NUM_PARTICULAS; i++) {
                const particula = document.createElement('div');
                particula.classList.add('firework-particle');
                
                // Color aleatorio
                const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
                particula.style.backgroundColor = color;

                // Posición inicial: El centro del botón
                particula.style.left = `${startX}px`;
                particula.style.top = `${startY}px`;

                contenedor.appendChild(particula);

                // --- Lógica Radial ---
                // 1. Ángulo: 360 grados aleatorios
                const angulo = Math.random() * 2 * Math.PI; 
                
                // 2. Distancia: Fuerte dispersión (de 80px a 180px)
                const distancia = Math.random() * 400 + 80; 

                // 3. Coordenadas finales (transformación polar a cartesiana)
                const finalX = startX + (distancia * Math.cos(angulo));
                const finalY = startY + (distancia * Math.sin(angulo));
                
                // Duración: Rápida (0.3s a 0.8s)
                const duracion = Math.random() * 0.5 + 0.3; 

                // 4. Animación (Web Animations API)
                particula.animate([
                    { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }, 
                    { 
                        // Mover al punto final (X, Y) y desvanecer/encoger
                        opacity: 1, 
                        transform: `translate(${finalX}px, ${finalY}px) scale(0.1)` 
                    } 
                ], {
                    duration: duracion * 1000,
                    // 'linear' o 'ease-out' muy fuerte para simular velocidad constante de explosión
                    easing: 'linear', 
                    fill: 'forwards'
                });

                // 5. Limpieza del DOM
                setTimeout(() => {
                    particula.remove();
                }, duracion * 1000 + 50);
            }
        }

        // --- Event Listener ---
        boton.addEventListener('click', () => {
            // Se calcula la posición del botón respecto a su contenedor padre.
            const botonRect = boton.getBoundingClientRect();
            const contenedorRect = contenedor.getBoundingClientRect();

            // Centro del botón: (Posición relativa) + (Mitad del ancho/alto)
            const centerX = (botonRect.left - contenedorRect.left) + (botonRect.width / 2);
            const centerY = (botonRect.top - contenedorRect.top) + (botonRect.height / 2);

            // Dispara la animación
            crearFuegoArtificial(centerX, centerY);
        });