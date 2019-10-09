const { get } = require('../lib/api_helper');

const ORGANIZATION_ID = 'FAAD3C7E-AA75-3567-75B9EB28363D5D0A';

module.exports.getUpcomingEvents = async (response) => {
  try {
    const upcomingEvents = await get(`rest/index.cfm/calendars/organization/${ORGANIZATION_ID}.json`);

    return response.status(200).json(upcomingEvents.response.events);
  } catch (error) {
    return response.status(500);
  }
};
