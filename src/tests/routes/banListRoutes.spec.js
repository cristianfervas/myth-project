const request = require('supertest');
const express = require('express');
const router = require('../../routes/banlistRoutes');
const banlistService = require('../../services/banlistService');
const sequelize = require('../../config/database');

jest.mock('../../services/banlistService');

const app = express();
app.use(express.json());
app.use('/api', router);

afterAll(async () => {
  await sequelize.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('GET api/banlist', () => {
  it('should return 201 and display all banned cards by a formatId', async () => {
    const banlistCards = [
      {
        card_id: 12401,
        name: 'ofrenda a los dioses',
        name_slug: 'ofrenda_a_los_dioses',
        description: null,
        ability: null,
        cost: null,
        strength: '',
        type: 'Oro',
        type_slug: 'oro',
        rarity: 'Real',
        rarity_slug: 'real',
        is_unique: false,
        race: null,
        race_slug: null,
        image_url: 'https://api.myl.cl/static/cards/72/135.png',
        illustrator: '',
        edition_id: 72,
        created_at: '2024-08-20T12:20:47.971Z',
        updated_at: '2024-08-20T12:20:47.971Z',
        ban_type: 'RESTRICTED_2',
      },
    ];
    jest
      .spyOn(banlistService, 'getAllBannedCardsByFormat')
      .mockResolvedValue(banlistCards);
    const response = await request(app)
      .get('/api/banlist')
      .query({ format_id: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(banlistCards);
  });
  it('should return 400 if param format_id is empty', async () => {
    const response = await request(app).get('/api/banlist');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('A format_id must be provided');
  });
  it('should return 500 if there is a server error', async () => {
    jest
      .spyOn(banlistService, 'getAllBannedCardsByFormat')
      .mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .get('/api/banlist')
      .query({ format_id: 1 });

    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});

describe('POST api/banlist/bannedCards', () => {
  it('should return 201 and the created deck if the request body is valid', async () => {
    const newBanlist = {
      banlist: {
        format_id: 2,
        ban_type: 'RESTRICTED_1',
        banned_card_ids: [12352, 16471, 15730, 15763, 12078, 11879, 8794],
      },
    };
    const expectedResponse = 'Banlist created successfully with 7 entries.';

    jest
      .spyOn(banlistService, 'createBanlist')
      .mockResolvedValue(expectedResponse);

    const response = await request(app)
      .post('/api/banlist/bannedCards')
      .send(newBanlist);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return 400 if the request body is invalid', async () => {
    const response = await request(app)
      .post('/api/banlist/bannedCards')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should return 500 if there is a server error', async () => {
    const newBanlist = {
      banlist: {
        format_id: 2,
        ban_type: 'RESTRICTED_1',
        banned_card_ids: [12352, 16471, 15730, 15763, 12078, 11879, 8794],
      },
    };
    jest
      .spyOn(banlistService, 'createBanlist')
      .mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/api/banlist/bannedCards')
      .send(newBanlist);
    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});
