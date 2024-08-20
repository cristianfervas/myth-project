const axios = require('axios');
const MYTH_SOURCE_API = require('../utilities/constants');
const editionService = require('../services/editionService');

async function retrieveEditionData() {
  try {
    const requests = MYTH_SOURCE_API.PB_EDITIONS.map((edition_name) =>
      axios.get(`${MYTH_SOURCE_API.BASE_URL}/cards/edition/${edition_name}`),
    );
    const responses = await Promise.all(requests);
    responses.forEach(async (response) => {
      if (response.status === 200 && response?.data?.edition) {
        const { edition } = response.data;
        await editionService.createEdition(edition);
      }
    });
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

retrieveEditionData();
