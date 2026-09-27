/*
================================================================================
                    MYARIM MEDICAL - JAVASCRIPT (app.js)
================================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    
    /* ---------------------------------------------------------------------- */
    /* 1. إدارة شاشة التحميل (Loader)
    /* ---------------------------------------------------------------------- */
    const loader = document.getElementById('app-loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    /* ---------------------------------------------------------------------- */
    /* 2. القائمة المنسدلة للهواتف (Mobile Menu)
    /* ---------------------------------------------------------------------- */
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // تغيير الأيقونة بين القائمة وعلامة الإغلاق
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* ---------------------------------------------------------------------- */
    /* 3. الظهور التدريجي عند التمرير (Intersection Observer)
    /* ---------------------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // تطبيق المراقبة على كافة الأقسام والبطاقات
    const animatedElements = document.querySelectorAll('.dept-card, .manager-card, .contact-info, .text-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });

    /* ---------------------------------------------------------------------- */
    /* 4. عارض وثيقة التأسيس (Certificate Lightbox)
    /* ---------------------------------------------------------------------- */
    const certTrigger = document.getElementById('certificate-trigger');
    
    if (certTrigger) {
        certTrigger.addEventListener('click', () => {
            const imgSrc = certTrigger.querySelector('img').src;
            
            // إنشاء الهيكل الديناميكي للعارض
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(11, 37, 69, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.justifyContent = 'center';
            lightbox.style.alignItems = 'center';
            lightbox.style.zIndex = '10000';
            lightbox.style.cursor = 'zoom-out';
            lightbox.style.opacity = '0';
            lightbox.style.transition = 'opacity 0.3s ease';

            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.borderRadius = '8px';
            img.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
            img.style.transform = 'scale(0.8)';
            img.style.transition = 'transform 0.3s ease';

            lightbox.appendChild(img);
            document.body.appendChild(lightbox);

            // تفعيل الحركة
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });

            // إغلاق العارض عند النقر
            lightbox.addEventListener('click', () => {
                lightbox.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                setTimeout(() => { lightbox.remove(); }, 300);
            });
        });
    }

    /* ---------------------------------------------------------------------- */
    /* 5. الفيزياء التفاعلية للبطاقات (3D Tilt Effect)
    /* ---------------------------------------------------------------------- */
    const tiltCards = document.querySelectorAll('.hover-tilt');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // موقع X داخل البطاقة
            const y = e.clientY - rect.top;  // موقع Y داخل البطاقة
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // أقصى دوران 10 درجات
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        });
    });

});

