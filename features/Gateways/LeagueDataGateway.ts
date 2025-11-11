import { LeaguesApiClient } from 'api-client'
import type { BadgesResponse, LeaguesResponse } from 'api-client'

export class LeagueDataGateway {
  constructor(private apiClient: LeaguesApiClient) {}

  async getLeagues(): Promise<LeaguesResponse> {
    return this.apiClient.leagues.list()
  }

  async getSeasonBadges(id: string): Promise<BadgesResponse> {
    return this.apiClient.badges.list({ id })
  }
}

const leaguesApiClient = new LeaguesApiClient()

export const leagueDataGateway = new LeagueDataGateway(leaguesApiClient)
