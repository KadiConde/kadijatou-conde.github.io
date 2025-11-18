// Script pour améliorer l'interactivité du portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Portfolio Kadijatou Condé chargé avec succès');
    
    // ===========================================
    // 1. NAVIGATION SMOOTH SCROLL 
    // ===========================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Compense la navbar fixe
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu hamburger sur mobile
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    }
                }
            });
        });
    }

    // ===========================================
    // 2. TOOLTIPS BOOTSTRAP (Bonus interactivité)
    // ===========================================
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        console.log('✅ Tooltips initialisés:', tooltipList.length);
    }

    // ===========================================
    // 3. FORMULAIRE DE CONTACT AVEC VALIDATION 
    // ===========================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validation des champs
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                
                if (!name || !email || !subject || !message) {
                    showAlert('Veuillez remplir tous les champs obligatoires.', 'danger');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showAlert('Veuillez entrer une adresse email valide.', 'warning');
                    return;
                }
                
                // Simulation d'envoi réussi
                console.log('📧 Formulaire soumis:', { name, email, subject, message });
                
                // Message de confirmation stylisé
                showAlert('Merci pour votre message ' + name + '! Je vous répondrai dans les plus brefs délais.', 'success');
                
                // Réinitialisation du formulaire
                contactForm.reset();
            });
        }
    }

    // ===========================================
    // 4. ANIMATIONS AU DÉFILEMENT 
    // ===========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            });
        }, observerOptions);
        
        // Observer les sections et cartes
        const animatedElements = document.querySelectorAll('section, .card, .progress-bar');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    // ===========================================
    // 5. ANIMATION DES BARRES DE PROGRESSION 
    // ===========================================
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    // Réinitialiser et animer
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                        progressBar.style.transition = 'width 1.5s ease-in-out';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // ===========================================
    // 6. GESTION DES IMAGES 
    // ===========================================
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.warn('⚠️ Image non chargée:', this.src);
                this.alt = 'Image non disponible';
                this.style.backgroundColor = '#f8f9fa';
                this.style.padding = '20px';
            });
            
            img.addEventListener('load', function() {
                console.log('✅ Image chargée:', this.src);
            });
        });
    }

    // ===========================================
    // 7. FONCTIONS UTILITAIRES
    // ===========================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showAlert(message, type) {
        // Créer une alerte Bootstrap stylisée
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Ajouter au début du formulaire
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.prepend(alertDiv);
            
            // Auto-suppression après 5 secondes
            setTimeout(() => {
                if (alertDiv.parentElement) {
                    alertDiv.remove();
                }
            }, 5000);
        }
    }

    // ===========================================
    // 8. TEST ET DÉBOGAGE 
    // ===========================================
    function runTests() {
        console.group('🧪 Tests du portfolio');
        
        // Test des sections obligatoires
        const requiredSections = ['accueil', 'projets', 'competences', 'recompenses', 'contact'];
        requiredSections.forEach(section => {
            const element = document.getElementById(section);
            console.log(`${element ? '✅' : '❌'} Section ${section}:`, element ? 'Présente' : 'Manquante');
        });
        
        // Test Bootstrap
        console.log('✅ Bootstrap:', typeof bootstrap !== 'undefined' ? 'Chargé' : 'Manquant');
        
        // Test images
        const images = document.querySelectorAll('img');
        console.log(`✅ Images chargées: ${images.length}`);
        
        console.groupEnd();
    }

    // ===========================================
    // INITIALISATION DE TOUTES LES FONCTIONNALITÉS
    // ===========================================
    function initPortfolio() {
        initSmoothScroll();
        initTooltips();
        initContactForm();
        initScrollAnimations();
        animateProgressBars();
        handleImageErrors();
        runTests();
        
        console.log('🎉 Portfolio initialisé avec succès!');
    }

    // Démarrer l'initialisation
    initPortfolio();

    // ===========================================
    // GESTION DES ERREURS GLOBALES
    // ===========================================
    window.addEventListener('error', function(e) {
        console.error('❌ Erreur JavaScript:', e.error);
    });
});