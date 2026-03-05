/* ==========================================
   CERTIFICATES.JS
   assets/js/certificates.js olarak kaydet
   
   Hem index.php hem certificates.php bu dosyayı kullanır.
   index.php için </body> öncesine script tag ekle:
   <script src="assets/js/certificates.js"></script>
   ========================================== */

/**
 * Popup'ı açar.
 * index.php'de: onclick="openCertModal('img.webp','Başlık','Kurum','2024')"
 * certificates.php'de: onclick="openCertModal(this)" → data attribute'lardan okur
 */
function openCertModal(srcOrEl, title, issuer, year) {
    let imgSrc, certTitle, certIssuer, certYear;

    // certificates.php: element geçildi, data attribute'lardan oku
    if (srcOrEl instanceof HTMLElement) {
        imgSrc    = srcOrEl.dataset.img;
        certTitle  = srcOrEl.dataset.title;
        certIssuer = srcOrEl.dataset.issuer;
        certYear   = srcOrEl.dataset.year;
    } else {
        // index.php: string parametreler
        imgSrc    = srcOrEl;
        certTitle  = title;
        certIssuer = issuer;
        certYear   = year;
    }

    const modal = document.getElementById('certModal');
    if (!modal) return;

    document.getElementById('certModalImg').src = imgSrc;
    document.getElementById('certModalImg').alt = certTitle;
    document.getElementById('certModalTitle').textContent = certTitle;
    document.getElementById('certModalIssuer').innerHTML = `<i class="fas fa-award"></i> ${certIssuer}`;
    document.getElementById('certModalYear').innerHTML   = `<i class="fas fa-calendar-alt"></i> ${certYear}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Popup'ı kapatır.
 * X butonuna tıklamada veya overlay'e tıklamada çağrılır.
 */
function closeCertModal(event) {
    // Sadece overlay'e tıklandıysa kapat (modal-box'a değil)
    if (event && event.target !== document.getElementById('certModal')) return;

    const modal = document.getElementById('certModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Resmi temizle (hafıza için)
    setTimeout(() => {
        document.getElementById('certModalImg').src = '';
    }, 300);
}

// ESC tuşuyla kapat
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('certModal');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==========================================
// Sertifika sayfası için animate-on-scroll
// (certificates.php'de script.js yoksa bunu kullan)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Ana sayfada script.js zaten bunu halleder,
    // sadece certificates.php'de devreye girer
    if (document.querySelector('.cert-page-hero')) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

        // Navbar scroll efekti
        const navbar = document.getElementById('navbar-example');
        if (navbar) {
            window.addEventListener('scroll', function () {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    }
});