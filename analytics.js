/* PIV Installer NI — cookie consent banner for Google Consent Mode v2.
   The Google tag and "consent default = denied" are set directly in each
   page <head>. This file only manages the banner and grants analytics
   storage once the visitor accepts, keeping the site UK PECR / GDPR friendly. */
(function () {
  var STORAGE_KEY = 'pivCookieConsent';

  function readConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveConsent(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
  }

  function buildBanner() {
    if (readConsent()) return; // already decided
    if (typeof window.gtag !== 'function') return;

    var bar = document.createElement('div');
    bar.className = 'cookie-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<p>We use cookies to measure site traffic and improve your experience. ' +
      'See our <a href="privacy.html">Privacy Policy</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn cookie-decline">Decline</button>' +
      '<button type="button" class="cookie-btn cookie-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);

    bar.querySelector('.cookie-accept').addEventListener('click', function () {
      saveConsent('granted');
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      bar.remove();
    });
    bar.querySelector('.cookie-decline').addEventListener('click', function () {
      saveConsent('denied');
      bar.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBanner);
  } else {
    buildBanner();
  }
})();
