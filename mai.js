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

    // 3. Animaciones al hacer Scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll(".intersect-observe");
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach((el) => observer.observe(el));
    }

    // 4. Formulario de Contacto -> Redirección directa a WhatsApp
    function enviarAWhatsApp(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
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

        // Abrir directamente
        window.open(url, "_blank");

        return false;
    }
});