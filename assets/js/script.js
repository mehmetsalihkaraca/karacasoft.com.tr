// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll efekti
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top butonu
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Scroll animasyonları
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Gecikme süresini al
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                // Belirtilen gecikme süresi kadar bekleyip animasyonu uygula
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Skill bar animasyonları
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Portfolio filtreleme
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif butonu değiştir
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Navbar link tıklamaları
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// Gelişmiş Arama Sistemi - Tüm Sayfayı Otomatik Tarar
// Arama fonksiyonu
   
   /* ==========================================
   1. GLOBAL DEĞİŞKENLER VE AYARLAR
   ========================================== */
let searchIndex = []; // Global arama indexi

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll efekti
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top butonu
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Scroll animasyonları
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    animateElements.forEach(element => observer.observe(element));
    
    // Skill bar animasyonları
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Portfolio filtreleme
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Arama Indexini Oluştur
    buildSearchIndex();
    
    // GDPR Başlat
    if (typeof initCookieConsent === "function") {
        initCookieConsent();
    }
});

/* ==========================================
   2. GELİŞMİŞ ARAMA SİSTEMİ
   ========================================== */
function buildSearchIndex() {
    searchIndex = [];
    const searchableAreas = document.querySelectorAll('section, article, .content, main, .blog-post, .portfolio-item');
    
    searchableAreas.forEach((area, areaIndex) => {
        const sectionTitle = area.querySelector('h1, h2, h3')?.textContent.trim() || area.getAttribute('id') || `Bölüm ${areaIndex + 1}`;
        const sectionId = area.getAttribute('id') || `section-${areaIndex}`;
        const textElements = area.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, a, .card-title, .card-text, .skill-name');
        
        textElements.forEach(element => {
            const text = element.textContent.trim();
            if (text.length > 2) {
                searchIndex.push({
                    word: text.toLowerCase(),
                    fullText: text,
                    section: sectionTitle,
                    element: `#${sectionId}`,
                    priority: (element.tagName.startsWith('H') ? 10 : 5)
                });
            }
        });
    });
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        let results = searchIndex.filter(item => item.word.includes(searchTerm));
        const uniqueResults = [];
        const seenTexts = new Set();
        results.sort((a, b) => b.priority - a.priority).forEach(item => {
            const key = `${item.fullText}-${item.section}`;
            if (!seenTexts.has(key)) {
                seenTexts.add(key);
                uniqueResults.push(item);
            }
        });

        if (uniqueResults.length > 0) {
            searchResults.innerHTML = uniqueResults.slice(0, 8).map(result => `
                <div class="search-result-item" data-target="${result.element}">
                    <div class="search-result-text">${result.fullText.substring(0, 70)}...</div>
                    <div class="search-result-section"><i class="fas fa-bookmark"></i> ${result.section}</div>
                </div>
            `).join('');
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="search-no-results"><p>Sonuç bulunamadı</p></div>';
            searchResults.classList.add('active');
        }
    });

    // Arama Sonucuna Tıklama (Event Delegation)
    searchResults.addEventListener('click', function(e) {
        const item = e.target.closest('.search-result-item');
        if (item) {
            const targetId = item.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                searchInput.value = '';
                searchResults.classList.remove('active');
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                
                targetElement.style.backgroundColor = 'rgba(0, 129, 151, 0.2)';
                setTimeout(() => targetElement.style.backgroundColor = '', 2000);
            }
        }
    });
}

/* ==========================================
   3. GDPR & ÇEREZ YÖNETİMİ
   ========================================== */
const STORAGE_KEY = 'karaca_soft_cookies';

function initCookieConsent() {
    const prefs = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const panel = document.getElementById('cookie-consent');
    const trigger = document.getElementById('cookie-trigger');

    if (!prefs) {
        setTimeout(() => { if(panel) panel.classList.add('active'); }, 1000);
    } else {
        if(trigger) trigger.classList.add('visible');
        if(prefs.analytics) loadTrackingScripts();
    }
}

window.acceptAllCookies = function() {
    const prefs = { essential: true, analytics: true, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    document.getElementById('cookie-consent').classList.remove('active');
    document.getElementById('cookie-trigger').classList.add('visible');
    loadTrackingScripts();
};

window.saveCookiePreferences = function() {
    const analyticsChecked = document.getElementById('opt-analytics').checked;
    const prefs = { essential: true, analytics: analyticsChecked, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    document.getElementById('cookie-consent').classList.remove('active');
    document.getElementById('cookie-trigger').classList.add('visible');
    if (analyticsChecked) loadTrackingScripts();
};

window.toggleCookiePanel = function() {
    document.getElementById('cookie-consent').classList.toggle('active');
};

function loadTrackingScripts() {
    document.querySelectorAll('script.analytics-script').forEach(el => {
        if (el.getAttribute('data-loaded') === 'true') return;
        const newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        if (el.src) {
            newScript.src = el.src;
            newScript.async = true;
        } else {
            newScript.textContent = el.textContent;
        }
        el.setAttribute('data-loaded', 'true');
        document.head.appendChild(newScript);
    });
}

/* ==========================================
   4. DARK MODE (LocalStorage İle Sabitlendi)
   ========================================== */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (document.cookie.includes('theme=dark')) {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
        document.cookie = `theme=${isDark ? 'dark' : 'light'}; path=/; max-age=31536000`;
    });
}

/* ==========================================
   5. CERTIFICATE MODAL
   ========================================== */
window.openCertModal = function(element) {
    const modal = document.getElementById("certModal");
    const img = document.getElementById("certModalImg");
    const title = document.getElementById("certModalTitle");
    const issuer = document.getElementById("certModalIssuer");
    const year = document.getElementById("certModalYear");

    if(modal && element) {
        img.src = element.getAttribute('data-img');
        title.innerText = element.getAttribute('data-title');
        if(issuer) issuer.innerText = element.getAttribute('data-issuer');
        if(year) year.innerText = element.getAttribute('data-year');
        modal.classList.add('active');
        document.body.style.overflow = "hidden";
    }
};

window.closeCertModal = function() {
    const modal = document.getElementById("certModal");
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = "auto";
    }
};
   
   
   
   
   
   
   
   
 
 
 
 

// Dark Mode Toggle (localStorage kullanmadan)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Sayfa yüklendiğinde tema tercihini kontrol et (cookie veya başka yöntemle)
    const isDark = document.cookie.includes('theme=dark');
    if (isDark) {
        body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            document.cookie = 'theme=dark; path=/; max-age=31536000';
        } else {
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            document.cookie = 'theme=light; path=/; max-age=31536000';
        }
    });
});



/* Certificate Popup Functions */
function openCertModal(src, title) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImg");
    const captionText = document.getElementById("certCaption");
    
    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = title;
    
    // Sayfa kaymasını engelle
    document.body.style.overflow = "hidden";
}

function closeCertModal() {
    const modal = document.getElementById("certModal");
    modal.style.display = "none";
    
    // Kaymayı geri aç
    document.body.style.overflow = "auto";
}

// ESC tuşu ile kapatma
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeCertModal();
    }
});

// Sayfa yüklendiği anda çalışacak ana fonksiyon
document.addEventListener("DOMContentLoaded", function() {
    initCookieConsent();
});



// gdpr 



/**
 * Cookie Consent Manager - karaca_soft
 * Tüm tracking scriptleri type="text/plain" class="analytics-script" olarak işaretlenmeli
 */

(function () {
    const STORAGE_KEY = 'karaca_soft_cookies';

    /* ─── Yardımcı: Tercihleri oku ─── */
    function getPrefs() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    /* ─── Yardımcı: Tercihleri kaydet ─── */
    function savePrefs(prefs) {
        prefs.date = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }

    /* ─── Tracking scriptlerini DOM'a ekle ─── */
    function loadTrackingScripts() {
        document.querySelectorAll('script.analytics-script').forEach(function (el) {
            if (el.getAttribute('data-loaded') === 'true') return;

            var newScript = document.createElement('script');
            newScript.type = 'text/javascript';

            var src = el.getAttribute('src'); // getAttribute zorunlu!
            if (src) {
                newScript.src = src;
                newScript.async = true;
            } else {
                newScript.textContent = el.textContent;
            }

            el.setAttribute('data-loaded', 'true'); // orijinali işaretle
            document.head.appendChild(newScript);
        });
        console.log('[CookieConsent] Tracking scriptler yüklendi.');
    }

    /* ─── UI: Paneli aç/kapat ─── */
    function showPanel() {
        var panel = document.getElementById('cookie-consent');
        var trigger = document.getElementById('cookie-trigger');
        if (panel) panel.classList.add('active');
        if (trigger) trigger.classList.remove('visible');
    }

    function hidePanel() {
        var panel = document.getElementById('cookie-consent');
        var trigger = document.getElementById('cookie-trigger');
        if (panel) panel.classList.remove('active');
        if (trigger) trigger.classList.add('visible');
    }

    /* ─── UI: Checkbox'ları güncelle ─── */
    function syncCheckboxes(prefs) {
        var analyticsBox = document.getElementById('opt-analytics');
        if (analyticsBox && prefs) {
            analyticsBox.checked = !!prefs.analytics;
        }
    }

    /* ─── Başlangıç ─── */
    function init() {
        var prefs = getPrefs();

        if (!prefs) {
            // İlk ziyaret → paneli göster
            setTimeout(showPanel, 800);
        } else {
            // Daha önce seçim yapılmış
            syncCheckboxes(prefs);
            hidePanel();
            if (prefs.analytics) {
                loadTrackingScripts();
            }
        }
    }

    /* ══════════════════════════════════════
       PUBLIC FONKSİYONLAR (HTML onclick için)
    ══════════════════════════════════════ */

    /** Hepsini Kabul Et */
    window.acceptAllCookies = function () {
        savePrefs({ essential: true, analytics: true });
        hidePanel();
        loadTrackingScripts();
    };

    /** Reddet (sadece zorunlu) */
    window.rejectAllCookies = function () {
        savePrefs({ essential: true, analytics: false });
        hidePanel();
        // Tracking scriptler yüklenmez
    };

    /** Seçimi Kaydet */
    window.saveCookiePreferences = function () {
        var analyticsBox = document.getElementById('opt-analytics');
        var analyticsChecked = analyticsBox ? analyticsBox.checked : false;

        savePrefs({ essential: true, analytics: analyticsChecked });
        hidePanel();

        if (analyticsChecked) {
            loadTrackingScripts();
        }
    };

    /** Küçük ikon tıklaması → paneli aç/kapat */
    window.toggleCookiePanel = function () {
        var panel = document.getElementById('cookie-consent');
        if (!panel) return;
        if (panel.classList.contains('active')) {
            hidePanel();
        } else {
            showPanel();
        }
    };

    /* ─── DOM hazır olunca başlat ─── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init(); // DOMContentLoaded zaten geçti
    }

})();




// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(reg => console.log('Service Worker Kayıt Başarılı!'))
//             .catch(err => console.log('Service Worker Hatası:', err));
//     });
// }



