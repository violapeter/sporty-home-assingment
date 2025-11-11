import { LeaguesApiClient } from 'api-client'
import type { SeasonsResponse, LeaguesResponse } from 'api-client'

export class LeagueDataGateway {
  constructor(private apiClient: LeaguesApiClient) {}

  async getLeagues(): Promise<LeaguesResponse> {
    return this.apiClient.leagues.list()
  }

  async getSeasonBadges(id: string): Promise<SeasonsResponse> {
    return this.apiClient.seasons.list({ id, badge: '1' })
  }
}

const leaguesApiClient = new LeaguesApiClient()

export const leagueDataGateway = new LeagueDataGateway(leaguesApiClient)
