/* PIV Installer NI — Google Analytics 4 with Consent Mode v2 + cookie banner.
   Analytics storage is denied by default and only granted after the visitor
   accepts, keeping the site compliant with UK PECR / GDPR. */
(function () {
  var GA_ID = 'G-6HPP14HEFL';
  var STORAGE_KEY = 'pivCookieConsent';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };

  // Default: deny everything until the user makes a choice.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  // Load the Google tag.
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID);

  function readConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveConsent(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
  }

  // Honour a previous "accept".
  if (readConsent() === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }

  function buildBanner() {
    if (readConsent()) return; // already decided

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
      gtag('consent', 'update', { analytics_storage: 'granted' });
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
