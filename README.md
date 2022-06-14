# Gshimpact-API

Genshin Impact characters API

## **Introduction**

---

The Genshin-API is a REST API based on the open-world online game [Genshin Impact](https://genshin.hoyoverse.com/en/). This API contains data for all playable characters of Genshin Impact. Its also providing media data, voices lines of each characters. More data will be available soon.

## **API Reference**

---

### **Root URL**

`https://gshimpact-api.herokuapp.com/`

The root endpoint provide information on all available endpoints and resources within the API. These resources are all reachable by GET requests sent over HTTPS.<br>
Example response:

```javascript
{
  message: 'Welcome to our world, fellow traveler!',
  endpoints: {
    root: 'https://gshimpact-api.herokuapp.com/',
    characters: 'https://gshimpact-api.herokuapp.com/characters',
    voices: 'https://gshimpact-api.herokuapp.com/voices',
  },
  statistics: {
    characters: 50,
    media: 30,
    voices: 47,
  },
}
```

### **Characters**

---

**/character/** - `https://gshimpact-api.herokuapp.com/characters`

Returning a list of characters information. By default, first 10 characters will be sent, sort by ID (ascending).<br>

Available query:

- page: 1, 2, 3, ... (default=1)

Example response:

```javascript
{
  page: 1,
  results: [
    {
      id:1,
      name: "Amber",
      rarity: "4_star",
      weapon: "Bow",
      vision: "Pyro",
      wiki_url: "https://genshin-impact.fandom.com/wiki/Amber"
    },
    ...
  ],
  total_results:50,
  total_pages:5
}
```

---

**/character/:id** - `https://gshimpact-api.herokuapp.com/characters/1`

Get information of a character by ID.<br>

Params:

- id: number 1, 2, ..., 50,...

Example response

```javascript
{
  result: {
    id: 1,
    name: "Amber",
    title: ["Gliding Champion","Outrider"],
    ...,
    voice_actors: [
      {
        English: "Kelly Baskin",
        Chinese: "Shujin Cai (蔡书瑾)",
        Japanese: "Manaka Iwami (石見舞菜香)",
        Korean: "Kim Yeon-woo (김연우)"
      }
    ],
    wiki_url: "https://genshin-impact.fandom.com/wiki/Amber"
  }
}
```

---

**/character/search** - `https://gshimpact-api.herokuapp.com/characters/search/?name=Amber&vision=Pyro`

Search characters, returning a list of matched characters.<br>

Available query:

- page: number
- name: string
- rarity: string
- weapon: string
- vision: string
- model_type: string
- region: string

Example response:

```javascript
{
  page: 1,
  results: [
    {
    name: "Amber",
      ...
      "vision": "Pyro",
    }
  ],
  total_results: 1,
  total_pages: 1,
  supported_attributes: "name, rarity, weapon, vision, model_type, region"
}
```

**/character/recent** - `https://gshimpact-api.herokuapp.com/characters/recent`

Get three most recently released.<br>

Example response:

```javascript
{
  results: [
    {
      id: 49,
      name: "Yelan",
      ...
    },
    {
      id: 48,
      name: "Ayato",
      ...
    },
    {
      id: 47,
      name: "Yae",
      ...
    }
  ]
}
```

---

**/characters/:id/media** - `https://gshimpact-api.herokuapp.com/characters/1/media`

Return a list of media links that are related to a characters.

---

**/characters/:id/voices** - `https://gshimpact-api.herokuapp.com/characters/1/voices`

Return a list of voices lines spoken by a characters.

### **Voices**

**/voices** - `https://gshimpact-api.herokuapp.com/characters/1/voices`

Return a list of available voices lines.

Query:

- page: number 1, 2, 3,...

Example reponse:

```javascript
{
  page: 1,
  results: [
    {
      title: "Hello",
      details: ["Outrider Amber reporting for duty! Just say the word if you ever need my help!"],
      spoken_by: {
        id: 1,
        name: "Amber"
      }
    },
    ...
  ],
  total_results: 47,
  total_pages: 3
}
```

---

### **Banners**

**/banners** - `https://gshimpact-api.herokuapp.com/banners`

Return a list of banners (event wishes).

Query:

- page: number 1, 2, 3,...

Example reponse:

```javascript
{
  page: 1,
  results: [
    {
      "id":37,
      "name":"Discerner of Enigmas",
      "type":"Character",
      "version":"v2.7",
      "featured":[
        {
          "id":49,
          "name":"Yelan"
        },
        {
          "id":2,
          "name":"Barbara"
        },
        {
          "id":34,
          "name":"Yanfei"
        },
        {
          "id":10,
          "name":"Noelle"
        }
      ],
      "start":"2022-05-31T00:00:00.000Z",
      "end":"2022-06-20T22:00:00.000Z"
    },
    ...
  ],
  total_results: 38,
  total_pages: 4
}
```

**/banners/:id** - `https://gshimpact-api.herokuapp.com/banners/1`

Return a banner by its id.

Query:

- params: id: 1, 2, ...

**/banners/current** - `https://gshimpact-api.herokuapp.com/banners/current`

Return current banners.

---

Upcoming endpoints...
