import { LeaguesApiClient } from 'api-client'
import type { League, SeasonBadge, SportType } from 'shared-types'

export class LeagueDataGateway {
  constructor(private apiClient: LeaguesApiClient) {}

  async getLeagues(): Promise<League[]> {
    const response = await this.apiClient.leagues.list()

    return response.leagues.map(
      ({ strLeague, strLeagueAlternate, idLeague, strSport }) => ({
        id: idLeague,
        name: strLeague,
        alternateName: strLeagueAlternate,
        sport: strSport as SportType,
      }),
    )
  }

  async getSeasonBadge(id: string): Promise<SeasonBadge> {
    const response = await this.apiClient.badges.list({ id })
    const { strSeason, strBadge } = response.badges[0]

    return {
      season: strSeason,
      badge: strBadge,
    }
  }
}

const leaguesApiClient = new LeaguesApiClient()

export const leagueDataGateway = new LeagueDataGateway(leaguesApiClient)
