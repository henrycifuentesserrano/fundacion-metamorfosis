// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== CONTADOR ANIMADO =====
const contadores = document.querySelectorAll('.stat-num');

const animarContador = (elemento) => {
  const texto = elemento.textContent.trim();
  const tieneMas = texto.startsWith('+');
  const tieneMas2 = texto.endsWith('+');
  const numero = parseInt(texto.replace(/[^0-9]/g, ''));
  const duracion = 4000;
  const inicio = performance.now();

  const actualizar = (tiempo) => {
    const transcurrido = tiempo - inicio;
    const progreso = Math.min(transcurrido / duracion, 1);
    const easeOut = 1 - Math.pow(1 - progreso, 3);
    const actual = Math.floor(easeOut * numero);

    if (tieneMas) {
      elemento.textContent = '+' + actual.toLocaleString();
    } else if (tieneMas2) {
      elemento.textContent = actual + '+';
    } else {
      elemento.textContent = actual.toLocaleString();
    }

    if (progreso < 1) {
      requestAnimationFrame(actualizar);
    } else {
      elemento.textContent = texto;
    }
  };

  requestAnimationFrame(actualizar);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

contadores.forEach(contador => observer.observe(contador));

// ===== ANIMACIONES AL HACER SCROLL =====
const elementosAnimados = document.querySelectorAll(
  '.pilar, .mision-card, .donacion-card, .timeline-item, .galeria-grid img'
);

const observerAnimacion = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerAnimacion.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -50px 0px' });

elementosAnimados.forEach(el => observerAnimacion.observe(el));

// ===== FORMULARIO VOLUNTARIADO =====
function enviarFormulario(event) {
  event.preventDefault();
  const form = event.target;
  const nombre = form.querySelector('input[type="text"]').value;
  const correo = form.querySelector('input[type="email"]').value;
  const telefono = form.querySelector('input[type="tel"]').value;
  const area = form.querySelector('select').value;

  const mensaje = `Hola! Me gustaría ser voluntario de la Fundación Metamorfosis Chicoral.%0A%0A*Nombre:* ${nombre}%0A*Correo:* ${correo}%0A*Teléfono:* ${telefono}%0A*Área de interés:* ${area}`;

  window.open(`https://wa.me/573184814463?text=${mensaje}`, '_blank');
  form.reset();
}