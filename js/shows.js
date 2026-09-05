// ── Shows page card mockups (polaroid + sticky note) ──
(function () {
  var polaroidGrid = document.getElementById('showsGridPolaroid');
  var stickyGrid = document.getElementById('showsGridSticky');
  var loader = document.getElementById('showLoader');

  if (!polaroidGrid || !stickyGrid || !window.CherriShows) return;

  var NOTE_COLORS = [
    '#ffe14d', '#ff9ec0', '#8ce0c0', '#8fcbff',
    '#ffb26b', '#c9a5ff', '#d7f26a', '#ff7f7f'
  ];

  // Draws from a reshuffled pool so colors stay random but never repeat back to back.
  var colorPool = [];
  var lastColor = null;

  function nextColor() {
    if (!colorPool.length) {
      colorPool = NOTE_COLORS.slice().sort(function () { return Math.random() - 0.5; });
      if (colorPool[0] === lastColor) colorPool.push(colorPool.shift());
    }
    lastColor = colorPool.shift();
    return lastColor;
  }

  window.CherriShows.fetchEvents().then(function (events) {
    if (loader) loader.style.display = 'none';

    if (!events.length) {
      polaroidGrid.innerHTML = '<p class="no-shows">No upcoming shows. Check back soon.</p>';
      return;
    }

    events.forEach(function (evt, i) {
      polaroidGrid.appendChild(buildPolaroid(evt, i));
      stickyGrid.appendChild(buildSticky(evt, i));
    });
  });

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  // Alternates lean direction down the row, with a random magnitude so it never looks mechanical.
  function tiltFor(index) {
    var magnitude = 1.4 + Math.random() * 2.1;
    return (index % 2 === 0 ? -magnitude : magnitude).toFixed(2) + 'deg';
  }

  function card(evt, cls, index) {
    var a = el('a', cls);
    a.href = evt.url || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.setProperty('--tilt', tiltFor(index));
    return a;
  }

  function details(evt) {
    return {
      date: window.CherriShows.formatDate(evt.datetime, { weekday: 'short', month: 'short', day: 'numeric' }),
      venue: evt.venue.name,
      location: window.CherriShows.formatLocation(evt.venue)
    };
  }

  function buildPolaroid(evt, index) {
    var d = details(evt);
    var a = card(evt, 'polaroid polaroid--sm', index);

    var photo = el('div', 'polaroid-photo');
    var ph = el('div', 'polaroid-photo-ph');
    ph.appendChild(el('i', 'fas fa-camera'));
    photo.appendChild(ph);

    var caption = el('div', 'polaroid-caption');
    caption.appendChild(el('span', 'polaroid-date', d.date));
    caption.appendChild(el('span', 'polaroid-venue', d.venue));
    caption.appendChild(el('span', 'polaroid-location', d.location));

    a.appendChild(photo);
    a.appendChild(caption);
    return a;
  }

  function buildSticky(evt, index) {
    var d = details(evt);
    var a = card(evt, 'sticky-note', index);
    a.style.setProperty('--note-color', nextColor());

    a.appendChild(el('span', 'sticky-date', d.date));
    a.appendChild(el('span', 'sticky-venue', d.venue));
    a.appendChild(el('span', 'sticky-location', d.location));
    a.appendChild(el('span', 'sticky-cta', 'Tickets'));
    return a;
  }
})();
