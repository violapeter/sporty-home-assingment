# API Client

Custom HTTP client implementation for TheSportsDB API integration.


Full documentation can be found at [TheSportsDB API website.][the-sports-db]

## Overview

This module provides a typed API client for interacting with TheSportsDB.com API endpoints.
It was designed to showcase the separated system unit, but in a real-world application you would probably use an OpenAPI client.

It supports fetching sports leagues and season badges with full TypeScript support.

## Usage

```ts
import { LeaguesApiClient } from 'api-client'

const client = new LeaguesApiClient()

// Get all leagues
const leagues = await client.leagues.list()

// Get all badges
const badges = await client.badges.list()
```

## API Endpoints

- **Leagues**: `/json/3/all_leagues.php` - Returns all available sports leagues
- **Badges**: `/json/3/search_all_seasons.php` - Returns season badges

## Configuration

The client uses `https://www.thesportsdb.com/api/v1/` as the default API root, but can be customized:

```ts
const client = new LeaguesApiClient('https://custom-api.com/')
```

[the-sports-db]: https://www.thesportsdb.com/free_sports_api