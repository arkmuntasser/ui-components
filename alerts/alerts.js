var alerts = document.querySelector('[data-alerts]');
var toggles = alerts.querySelectorAll('[data-alerts-toggle]');

for (var toggle of toggles) {
  toggle.addEventListener('click', function() {
    alerts.classList.toggle('open');
  });
}
