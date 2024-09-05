const request = require('supertest');
const express = require('express');
const router = require('../../routes/deckRoutes');
const deckService = require('../../services/deckService');
const sequelize = require('../../config/database');

jest.mock('../../services/deckService');

const app = express();
app.use(express.json());
app.use('/api', router);

afterAll(async () => {
  await sequelize.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/deck', () => {
  it('should return 201 and the created deck if the request body is valid', async () => {
    const validDeck = {
      deck: {
        name: 'Test Deck',
        image_url: 'http://example.com/image.png',
        race: 'Olimpico',
        user_id: 1,
        format_id: 2,
        card_list_ids: [{ card_id: 123, copies: 3 }],
      },
    };

    jest.spyOn(deckService, 'createDeck').mockResolvedValue(validDeck);

    const response = await request(app).post('/api/deck').send(validDeck);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(validDeck);
  });

  it('should return 400 if the request body is invalid', async () => {
    const response = await request(app).post('/api/deck').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should return 500 if there is a server error', async () => {
    const validDeck = {
      deck: {
        name: 'Test Deck',
        image_url: 'http://example.com/image.png',
        race: 'Olimpico',
        user_id: 1,
        format_id: 2,
        card_list_ids: [{ card_id: 123, copies: 3 }],
      },
    };

    jest
      .spyOn(deckService, 'createDeck')
      .mockRejectedValue(new Error('Server error'));

    const response = await request(app).post('/api/deck').send(validDeck);
    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});

describe('GET /api/decks', () => {
  it('should return 201 and display a list of decks by userName', async () => {
    const validResponse = {
      data: [
        {
          deck_id: 1,
          name: 'Test Deck',
          image_url: 'https://api.myl.cl/static/cards/116/063.png',
          race: 'Olimpico',
          user_id: 1,
          created_at: '2024-08-20T14:05:00.584Z',
          updated_at: '2024-08-20T14:05:00.584Z',
          format_id: 2,
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        totalItems: 1,
        totalPages: 1,
      },
    };
    jest
      .spyOn(deckService, 'getDecksByUserName')
      .mockResolvedValue(validResponse);
    const response = await request(app)
      .get('/api/decks')
      .query({ userName: 'testUser', page: 1, pageSize: 10 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(validResponse);
  });
  it('should return 400 if queryParams are empty', async () => {
    jest.spyOn(deckService, 'getDecksByUserName').mockResolvedValue({});
    const response = await request(app).get('/api/decks').query({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
  it('should return 500 if there is a server error', async () => {
    const validDeck = {
      deck: {
        name: 'Test Deck',
        image_url: 'http://example.com/image.png',
        race: 'Olimpico',
        user_id: 1,
        format_id: 2,
        card_list_ids: [{ card_id: 123, copies: 3 }],
      },
    };

    jest
      .spyOn(deckService, 'getDecksByUserName')
      .mockRejectedValue(new Error('Server error'));

    const response = await request(app).post('/api/deck').send(validDeck);
    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});

describe('GET /api/deck', () => {
  it('should return 201 and display a deck by a deckId', async () => {
    const validDeck = {
      deck_id: 3,
      name: 'Test Deck',
      image_url: 'http://example.com/image.png',
      race: 'Olimpico',
      user_id: 1,
      created_at: '2024-08-22T19:21:42.341Z',
      updated_at: '2024-08-22T19:21:42.341Z',
      format_id: 2,
      cards: [
        {
          card_id: 1734,
          name: 'anfiteatro',
          name_slug: 'anfiteatro',
          description:
            '¿Quién negará la integridad de los actores? ¿Quién negará que la tragedia del hombre yace en el olvido?',
          ability: null,
          cost: 0,
          strength: '',
          type: 'Oro',
          type_slug: 'oro',
          rarity: 'Oro',
          rarity_slug: 'oro',
          is_unique: false,
          race: null,
          race_slug: null,
          image_url: 'https://api.myl.cl/static/cards/20/222.png',
          illustrator: '',
          edition_id: 20,
          created_at: '2024-08-20T12:20:48.019Z',
          updated_at: '2024-08-20T12:20:48.019Z',
          CardDeck: {
            card_id: 1734,
            deck_id: 3,
            copies: 1,
            created_at: '2024-08-22T19:21:42.355Z',
            updated_at: '2024-08-22T19:21:42.355Z',
          },
        },
      ],
    };
    jest.spyOn(deckService, 'getDeckByUserName').mockResolvedValue(validDeck);
    const response = await request(app)
      .get('/api/deck/1')
      .query({ userName: 'testUser' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(validDeck);
  });
  it('should return 400 if param userName is empty', async () => {
    const response = await request(app).get('/api/deck/1');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('A userName must be provided');
  });
  it('should return 500 if there is a server error', async () => {
    jest
      .spyOn(deckService, 'getDeckByUserName')
      .mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .get('/api/deck/1')
      .query({ userName: 'testUser' });

    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});

describe('DEL /api/deck', () => {
  it('should return 201 and delete a deck by a deckId', async () => {
    const expectedResponse = {
      message: 'Deck successfully deleted',
    };
    jest
      .spyOn(deckService, 'deleteDeckByUserName')
      .mockResolvedValue(expectedResponse);
    const response = await request(app)
      .del('/api/deck/1')
      .query({ userName: 'testUser' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
  it('should return 400 if param userName is empty', async () => {
    const response = await request(app).del('/api/deck/1');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('A userName must be provided');
  });
  it('should return 500 if there is a server error', async () => {
    jest
      .spyOn(deckService, 'deleteDeckByUserName')
      .mockRejectedValue(new Error('Server error'));
    const response = await request(app)
      .del('/api/deck/1')
      .query({ userName: 'testUser' });
    expect(response.status).toBe(500);
    expect(response.text).toBe(JSON.stringify({ error: 'Server error' }));
  });
});
