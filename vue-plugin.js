const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Vue.component('upcoming-events', {
  data: function () {
    return {
      events: [],
      upcomingEventsUrl: 'http://localhost:8085/upcoming-events',
      loading: true,
      error: false
    };
  },
  methods: {
    parseEvents: function(events) {
      const today = new Date();

      if (!events || !events.length) {
        return [];
      }

      return events.map(event => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const registrationOpen = new Date(event.registration.end).getTime() - today.getTime() > 0
          && new Date(event.registration.start).getTime() - today.getTime() <= 0

        return {
          ...event,
          registrationOpen,
          date: `${monthNames[startDate.getMonth()]} ${startDate.getDay()}-${endDate.getDay()}`
        };
      });
    }
  },
  computed: {
    showLoadingMessage: function() {
      return this.loading;
    },
    showNoEventsMessage: function() {
      return !this.loading && !this.error && !this.events.length;
    },
    showErrorMessage: function() {
      return !this.loading && this.error;
    },
    showEventsList: function() {
      return !this.loading && !this.error && this.events.length;
    }
  },
  template: `
    <div class="events-list-card--container">
      <h2>My Club Events</h2>
      <p v-if="showLoadingMessage">Loading...</p>
      <p v-if="showNoEventsMessage">There are no upcoming events.</p>
      <p class="error-message" v-if="showErrorMessage">
        An unexpected error occurred while getting the list of events. Please try again later.
      </p>
      <table cellspacing="0" v-if="showEventsList">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Type</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events">
            <td>{{ event.date }}</td>
            <td>{{ event.name }}</td>
            <td>{{ event.venue.name }}</td>
            <td>{{ event.venue.city }}, {{ event.venue.region }}</td>
            <td>{{ event.type }}</td>
            <td>
              <a v-bind:href="event.detailuri" target="_blank" v-if="event.registrationOpen">Register!</a>
              <span v-if="!event.registrationOpen">Registration</br>closed</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Use MotorsportReg.com for
        <a href="https://www.motorsportreg.com" target="_blank">online driving event registration</a>.
        See <a href="https://www.motorsportreg.com" target="_blank">thousands of driving events</a>.
      </p>
    </div>
  `,
  mounted() {
    var xhr = new XMLHttpRequest();

    xhr.onload = () => {
      try {
        this.events = this.parseEvents(JSON.parse(xhr.response));
      } catch (error) {
        this.events = [];
      }
      this.loading = false;
    };

    xhr.onerror = () => {
      this.error = true;
      this.loading = false;
    };

    xhr.open('GET', this.upcomingEventsUrl);
    xhr.send();
  }
});