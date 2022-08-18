/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import axios from 'axios';

describe('Response from voices endpoint: ', () => {
  let data: unknown;

  beforeAll(async () => {
    const res = await axios.get('http://localhost:5000/voices');
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

  test('Each item of results object should have infos of a voice item', () => {
    const { results } = data as { results: any };

    for (let res of results) {
      const { title, details, spoken_by } = res;

      expect(title.length).toBeGreaterThan(0);
      expect(Array.isArray(details)).toBeTruthy();
      expect(details.length).toBeGreaterThan(0);
      expect(spoken_by.id).toBeGreaterThan(0);
      expect(spoken_by.name.length).toBeGreaterThan(0);
    }
  });
});
