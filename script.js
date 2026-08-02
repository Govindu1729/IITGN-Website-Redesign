// ========================================
// ACCESSIBILITY CONTROLS
// ========================================
let fontSize = 16;
let isGrayscale = false;
let isHighContrast = false;

function increaseFont() {
    fontSize += 2;
    document.body.style.fontSize = fontSize + 'px';
}

function decreaseFont() {
    fontSize -= 2;
    document.body.style.fontSize = fontSize + 'px';
}

function resetFont() {
    fontSize = 16;
    document.body.style.fontSize = fontSize + 'px';
}

function toggleGrayscale() {
    isGrayscale = !isGrayscale;
    document.body.classList.toggle('grayscale', isGrayscale);
}

function resetSettings() {
    fontSize = 16;
    isGrayscale = false;
    isHighContrast = false;
    document.body.style.fontSize = fontSize + 'px';
    document.body.classList.remove('grayscale', 'high-contrast', 'light-background', 'dark-background');
}

// ========================================
// ACCESSIBILITY MENU TOGGLE
// ========================================
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

// ========================================
// SERVICES SIDEBAR TOGGLE
// ========================================
function toggleServices() {
    const sidebar = document.getElementById('services-sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('services-sidebar');
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
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

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
    }
});

// ========================================
// YOUTUBE VIDEO LOOP FIX
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-bg video');
    if (heroVideo) {
        heroVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    }
});