/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import axios from 'axios';

describe('Response from /banners endpoint : ', () => {
  let data: unknown;

  beforeAll(async () => {
    const res = await axios.get('http://localhost:5000/banners');
    data = await res.data;
  });

  test('Should contain page number', () => {
    const { page } = data as { page: number };
    expect(page).toEqual(1);
  });

  test('Should have results array object with length greater than 0', () => {
    const { results } = data as { results: any };

    expect(Array.isArray(results)).toBeTruthy();
    expect(results.length).toBeGreaterThan(0);
  });

  test('Should have total pages number greater than 0', () => {
    const { total_pages } = data as { total_pages: number };

    expect(total_pages).toBeGreaterThan(0);
  });

  test('Should have total results number greater than 0', () => {
    const { total_results } = data as { total_results: number };

    expect(total_results).toBeGreaterThan(0);
  });

  test('Each item of results object should have infos of a banner item', () => {
    const { results } = data as { results: any };

    for (let res of results) {
      const { id, name, type, version, featured, start, end } = res;

      expect(id).toBeGreaterThan(0);

      expect(typeof name).toEqual('string');
      expect(name.length).toBeGreaterThan(0);

      expect(['Permanent', 'Character'].includes(type)).toBeTruthy();

      expect(version.includes('v')).toBeTruthy();
      expect(version.includes('.')).toBeTruthy();

      expect(Array.isArray(featured)).toBeTruthy();
      expect(featured.length).toBeGreaterThan(-1);

      for (let f of featured) {
        expect(f.id).toBeGreaterThan(0);
        expect(typeof f.name).toEqual('string');
        expect(f.name.length).toBeGreaterThan(0);
      }

      expect(new Date(start).getTime()).toBeTruthy();

      if (end) {
        expect(new Date(end).getTime()).toBeTruthy();
      }
    }
  });
});
