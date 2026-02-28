
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling (prevent default for demonstration)
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            this.querySelectorAll('input, textarea').forEach(field => {
                if (!field.value) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Show success message or handle submission
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;

                btn.innerHTML = 'SENDING...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = 'MESSAGE SENT!';
                    btn.classList.replace('btn-warning', 'btn-success');
                    btn.style.backgroundColor = '#28a745';
                    btn.style.borderColor = '#28a745';

                    form.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.replace('btn-success', 'btn-warning');
                        btn.style.backgroundColor = '#f7a01a';
                        btn.style.borderColor = '#f7a01a';
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Interactive hero dots - auto cycle with timer, no image change
    const dots = document.querySelectorAll('.hero-section .dot');
    let currentDot = 0;
    let dotTimer;

    function setActiveDot(index) {
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
        currentDot = index;
    }

    function startDotCycle() {
        dotTimer = setInterval(() => {
            const next = (currentDot + 1) % dots.length;
            setActiveDot(next);
        }, 3000);
    }

    // Allow manual click on dots too
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(dotTimer);
            setActiveDot(index);
            startDotCycle(); // restart timer from this dot
        });
    });

    startDotCycle();

    // Navbar logo swap on scroll (keep navbar always transparent)
    const navLogo = document.querySelector('.custom-nav .navbar-brand img');

    window.addEventListener('scroll', function () {
        if (navLogo) {
            if (window.scrollY > 50) {
                navLogo.src = 'images/logo-dark.png';
            } else {
                navLogo.src = 'images/logo-white.png';
            }
        }
    });

});
