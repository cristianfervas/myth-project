const request = require('supertest');
const express = require('express');
const router = require('../../routes/cardRoutes');
const cardService = require('../../services/cardService');
const sequelize = require('../../config/database');

jest.mock('../../services/cardService');

const app = express();
app.use(express.json());
app.use('/api', router);

afterAll(async () => {
  await sequelize.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('GET api/cards/search', () => {
  it('should return 201 and display a deck by a deckId', async () => {
    const foundCards = [
      {
        card_id: 12352,
        name: 'julio cesar',
        name_slug: 'julio_cesar',
        description: null,
        ability: null,
        cost: 4,
        strength: '2',
        type: 'Aliado',
        type_slug: 'aliado',
        rarity: 'Real',
        rarity_slug: 'real',
        is_unique: false,
        race: 'Héroe',
        race_slug: 'heroe',
        image_url: 'https://api.myl.cl/static/cards/72/086.png',
        illustrator: '',
        edition_id: 72,
        created_at: '2024-08-20T12:20:47.968Z',
        updated_at: '2024-08-20T12:20:47.968Z',
        edition: {
          edition_id: 72,
          name: 'Primer Bloque 2.0',
          name_slug: 'primer_bloque_2',
          image_url: null,
          created_at: '2024-08-17T23:34:49.024Z',
          updated_at: '2024-08-17T23:34:49.024Z',
        },
      },
    ];
    jest.spyOn(cardService, 'searchCards').mockResolvedValue(foundCards);
    const response = await request(app)
      .get('/api/cards/search')
      .query({ name: 'julio_cesar' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(foundCards);
  });
  it('should return 400 if param name is empty', async () => {
    const response = await request(app).get('/api/cards/search');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('A search term must be provided');
  });
  it('should return 500 if there is a server error', async () => {
    jest
      .spyOn(cardService, 'searchCards')
      .mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .get('/api/cards/search')
      .query({ name: 'testCardName' });

    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});
