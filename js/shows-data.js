// ── Shared Bandsintown data source ──
window.CherriShows = (function () {
  var ARTIST_NAME = 'CHERRI';
  var API_URL = 'https://rest.bandsintown.com/artists/' +
    encodeURIComponent(ARTIST_NAME) +
    '/events?app_id=26113258b4b0ab3265bf61cdb27edeab';

  // Placeholder data used only when Bandsintown returns nothing. Set to false to go live-only.
  var USE_MOCK_FALLBACK = true;

  var MOCK_EVENTS = [
    {
      id: 'mock-1',
      url: 'https://www.bandsintown.com/',
      datetime: '2026-09-19T20:00:00',
      title: '',
      venue: { name: 'The Echo', city: 'Los Angeles', region: 'CA', country: 'United States' },
      lineup: ['CHERRI']
    },
    {
      id: 'mock-2',
      url: 'https://www.bandsintown.com/',
      datetime: '2026-10-03T21:00:00',
      title: '',
      venue: { name: 'Bottom of the Hill', city: 'San Francisco', region: 'CA', country: 'United States' },
      lineup: ['CHERRI']
    },
    {
      id: 'mock-3',
      url: 'https://www.bandsintown.com/',
      datetime: '2026-10-24T19:30:00',
      title: '',
      venue: { name: 'Baby\u2019s All Right', city: 'Brooklyn', region: 'NY', country: 'United States' },
      lineup: ['CHERRI']
    },
    {
      id: 'mock-4',
      url: 'https://www.bandsintown.com/',
      datetime: '2026-11-08T20:00:00',
      title: '',
      venue: { name: 'Empty Bottle', city: 'Chicago', region: 'IL', country: 'United States' },
      lineup: ['CHERRI']
    }
  ];

  function normalize(events) {
    if (!Array.isArray(events)) return [];
    return events
      .filter(function (evt) { return evt && evt.datetime && evt.venue; })
      .sort(function (a, b) { return new Date(a.datetime) - new Date(b.datetime); });
  }

  async function fetchEvents() {
    var events = [];
    try {
      var resp = await fetch(API_URL);
      events = normalize(await resp.json());
    } catch (err) {
      events = [];
    }
    if (events.length === 0 && USE_MOCK_FALLBACK) events = normalize(MOCK_EVENTS);
    return events;
  }

  function formatDate(datetime, opts) {
    return new Date(datetime).toLocaleDateString('en-US', opts || {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  function formatLocation(venue) {
    return venue.city + ', ' + (venue.region || venue.country);
  }

  return {
    fetchEvents: fetchEvents,
    formatDate: formatDate,
    formatLocation: formatLocation
  };
})();
