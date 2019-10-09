const AsyncRouter = require('express-async-router').AsyncRouter;
const router = AsyncRouter();
const jsonParser = require('body-parser').json();

const { getUpcomingEvents } = require('./controller');

router.use(jsonParser);
router.get('/upcoming-events', async (request, response) => await getUpcomingEvents(response));


module.exports = router;
