/**
 * G&M Gestión Legal S.A.S.
 * Scripts interactivos y lógica institucional
 */

// Función de redirección a WhatsApp (definida en ámbito global para onsubmit="return enviarAWhatsApp(event)")
function enviarAWhatsApp(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const nombre = (document.getElementById("nombre")?.value || "").trim();
    const entidad = (document.getElementById("entidad")?.value || "").trim();
    const mensaje = (document.getElementById("mensaje")?.value || "").trim();

    const numeroEmpresa = "573112854346";

    const texto = `Hola, me gustaría solicitar una asesoría jurídica.

  Nombre: ${nombre}

  Entidad / Empresa: ${entidad}

  Consulta:

  ${mensaje}`;

    const url = `https://api.whatsapp.com/send?phone=${numeroEmpresa}&text=${encodeURIComponent(texto)}`;

    // Crea un enlace invisible y lo pulsa para evitar bloqueos de pop-up
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return false;
}

window.enviarAWhatsApp = enviarAWhatsApp;

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar los iconos de Lucide si la librería está presente
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 1. Menú Móvil
    const mobileToggle = document.getElementById("mobile-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-btn");

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });
    }

    // 2. Efecto de sombra dinámica en el Navbar al hacer scroll
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";
            } else {
                navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }
        });
    }

    // 3. Sistema Global de Scroll Reveal (Intersection Observer nativo - 0 KB)
    const revealElements = document.querySelectorAll(".reveal, .reveal-scroll");
    if (revealElements.length > 0) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if ("IntersectionObserver" in window && !prefersReducedMotion) {
            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            entry.target.classList.add("is-visible");
                            obs.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

            revealElements.forEach((el) => observer.observe(el));
        } else {
            // Fallback si no soporta IntersectionObserver o si el usuario tiene preferencia de movimiento reducido
            revealElements.forEach((el) => {
                el.classList.add("active");
                el.classList.add("is-visible");
            });
        }
    }

    // 4. Formulario de Contacto -> Listener para envío a WhatsApp
    const contactForm = document.getElementById("form-whatsapp");
    if (contactForm) {
        contactForm.addEventListener("submit", enviarAWhatsApp);
    }
});