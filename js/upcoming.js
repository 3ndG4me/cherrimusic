// ── Upcoming Show hero (home page) ──
(function () {
  var sections = document.querySelectorAll('.upcoming-show');
  if (!sections.length || !window.CherriShows) return;

  window.CherriShows.fetchEvents().then(function (events) {
    if (!events.length) return;

    var evt = events[0];
    var date = new Date(evt.datetime);
    var dateStr = window.CherriShows.formatDate(evt.datetime, { weekday: 'short', month: 'short', day: 'numeric' });
    var locationStr = window.CherriShows.formatLocation(evt.venue) + ' \u00b7 ' +
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    sections.forEach(function (section) {
      section.querySelector('[data-show-date]').textContent = dateStr;
      section.querySelector('[data-show-venue]').textContent = evt.venue.name;
      section.querySelector('[data-show-location]').textContent = locationStr;

      if (evt.url) {
        section.querySelectorAll('[data-show-link]').forEach(function (link) {
          link.href = evt.url;
        });
      }

      section.classList.add('is-active');
    });
  });
})();
