/* eslint-disable no-undef */
import axios from 'axios';

describe('Response from root endpoint:', () => {
  let data: unknown;

  beforeAll(async () => {
    const res = await axios.get('http://localhost:4000');
    data = await res.data;
  });

  test('Should contain welcome message', async () => {
    const { message } = data as { message: string };
    expect(message).toEqual('Welcome to our world, fellow traveler!');
  });

  test('Should have endpoints objects', async () => {
    const { endpoints } = data as { endpoints: any };
    const { root, characters, voices, banners } = endpoints;

    expect(typeof root).toEqual('string');
    expect(root.length).toBeGreaterThan(0);

    expect(typeof characters).toEqual('string');
    expect(characters.length).toBeGreaterThan(0);

    expect(typeof voices).toEqual('string');
    expect(voices.length).toBeGreaterThan(0);

    expect(typeof banners).toEqual('string');
    expect(banners.length).toBeGreaterThan(0);
  });

  test('Should have statistics object', async () => {
    const { statistics } = data as { statistics: any };
    const { characters, media, voices, banners } = statistics;

    expect(characters).toBeGreaterThan(0);
    expect(media).toBeGreaterThan(0);
    expect(voices).toBeGreaterThan(0);
    expect(banners).toBeGreaterThan(0);
  });
});
