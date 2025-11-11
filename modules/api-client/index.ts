import { BadgesResponse, LeaguesResponse } from './types'

type Endpoint = 'leagues' | 'badges'

export class LeaguesApiClient {
  private static API_ROOT = 'https://www.thesportsdb.com/api/v1/'

  private static ENDPOINTS: Record<Endpoint, string> = {
    leagues: 'json/3/all_leagues.php',
    badges: 'json/3/search_all_seasons.php',
  }

  constructor(private apiRoot = LeaguesApiClient.API_ROOT) {}

  private async operation<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    return (await response.json()) as T
  }

  private async get<T>(
    endpoint: Endpoint,
    params?: Record<string, any>,
  ): Promise<T> {
    const endpointURLPart = LeaguesApiClient.ENDPOINTS[endpoint]
    const searchParams = new URLSearchParams(params).toString()
    const url = `${this.apiRoot}${endpointURLPart}`
    return this.operation<T>(searchParams ? `${url}?${searchParams}` : url)
  }

  public get leagues() {
    return {
      list: async (): Promise<LeaguesResponse> => {
        return this.get<LeaguesResponse>('leagues')
      },
    }
  }

  public get badges() {
    return {
      list: async (): Promise<BadgesResponse> => {
        return this.get<BadgesResponse>('badges')
      },
    }
  }
}
