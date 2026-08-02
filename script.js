// ===== FONT SIZE CONTROLS =====
let fontSize = 16;
function increaseFont() { fontSize += 2; document.body.style.fontSize = fontSize + 'px'; }
function decreaseFont() { fontSize -= 2; document.body.style.fontSize = fontSize + 'px'; }
function resetFont() { fontSize = 16; document.body.style.fontSize = fontSize + 'px'; }

// ===== ACCESSIBILITY TOGGLES =====
let isGrayscale = false;
function toggleGrayscale() {
    isGrayscale = !isGrayscale;
    document.body.classList.toggle('grayscale', isGrayscale);
}
function resetSettings() {
    fontSize = 16;
    isGrayscale = false;
    document.body.style.fontSize = fontSize + 'px';
    document.body.classList.remove('grayscale', 'high-contrast');
}

// ===== ACCESSIBILITY MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.accessibility-toggle');
    const menu = document.querySelector('.accessibility-menu');
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }
});

// ===== SERVICES SIDEBAR =====
function toggleServices() {
    const sidebar = document.getElementById('services-sidebar');
    sidebar.classList.toggle('active');
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('services-sidebar');
        if (sidebar.classList.contains('active')) sidebar.classList.remove('active');
    }
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===== STATS COUNTER =====
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = Math.ceil(target / 60);
            let current = 0;
            const updateNumber = () => {
                current += step;
                if (current >= target) {
                    stat.textContent = target + '+';
                    return;
                }
                stat.textContent = current + '+';
                requestAnimationFrame(updateNumber);
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(stat);
        });
    };
    animateNumbers();
});

// ===== YOUTUBE BACKGROUND =====
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.youtube-background');
    if (!container) return;
    const videoId = container.dataset.videoUrl;
    if (!videoId) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId +
        '?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&loop=1&playlist=' + videoId;
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('tabindex', '-1');
    container.appendChild(iframe);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});