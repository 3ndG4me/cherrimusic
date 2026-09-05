// ── Upcoming Show hero (home page) ──
(function () {
  var section = document.getElementById('upcomingShow');
  if (!section || !window.CherriShows) return;

  window.CherriShows.fetchEvents().then(function (events) {
    if (!events.length) return;

    var evt = events[0];
    var date = new Date(evt.datetime);

    document.getElementById('showDate').textContent =
      window.CherriShows.formatDate(evt.datetime, { weekday: 'short', month: 'short', day: 'numeric' });
    document.getElementById('showVenue').textContent = evt.venue.name;
    document.getElementById('showLocation').textContent =
      window.CherriShows.formatLocation(evt.venue) + ' \u00b7 ' +
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    var polaroid = document.getElementById('showPolaroid');
    var tickets = document.getElementById('showTickets');
    if (evt.url) {
      polaroid.href = evt.url;
      tickets.href = evt.url;
    }

    section.classList.add('is-active');
  });
})();
