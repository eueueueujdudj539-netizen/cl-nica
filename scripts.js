
document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Nav
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 3. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. FAQ Category Filter
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCounter = document.getElementById('faqCounter');
    
    function updateCounter() {
        if(faqCounter) {
            const visible = document.querySelectorAll('.faq-item[style*="display: block"], .faq-item:not([style*="display: none"])').length;
            faqCounter.textContent = `Exibindo ${visible} de 120 perguntas`;
        }
    }

    faqCategories.forEach(btn => {
        btn.addEventListener('click', () => {
            faqCategories.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            updateCounter();
        });
    });

    // 5. FAQ Search
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset categories to ALL
            document.querySelector('.faq-category[data-category="all"]').click();
            updateCounter();
        });
    }
});

// Global functions for Modals
window.openSpecialtyModal = function(id) {
    const modal = document.getElementById('specialtyModal-' + id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeSpecialtyModal = function(id) {
    const modal = document.getElementById('specialtyModal-' + id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
