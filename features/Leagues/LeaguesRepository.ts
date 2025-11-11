import type { League, SeasonBadge, SportType } from 'shared-types'
import { AbstractRepository } from 'abstract-mvvp'
import { leagueDataGateway } from '../Gateways/LeagueDataGateway'
import type { LeagueSchema, SeasonBadgeSchema } from 'api-client'

export interface LeaguesDomainModel {
  searchQuery: string
  sportTypeFilter: SportType | null
  leagues: League[]
  seasonBadges: Record<string, SeasonBadge>
  currentSeasonBadge: SeasonBadge | null
  loading: boolean
  seasonBadgeLoading: boolean
}

class LeaguesRepository extends AbstractRepository<LeaguesDomainModel> {
  defaultValue = {
    searchQuery: '',
    sportTypeFilter: null,
    leagues: [],
    seasonBadges: {},
    currentSeasonBadge: null,
    loading: true,
    seasonBadgeLoading: false,
  }

  gateway = leagueDataGateway

  async getLeagues(): Promise<void> {
    const response = await this.gateway.getLeagues()
    const leagues = response.leagues.map(this.mapLeagueApiResponse)
    this.setValue({ leagues, loading: false })
  }

  private mapLeagueApiResponse({
    idLeague: id,
    strLeague: name,
    strSport,
    strLeagueAlternate: alternateName,
  }: LeagueSchema): League {
    return {
      id,
      name,
      sport: strSport as SportType,
      alternateName,
    }
  }

  private mapSeasonBadgeApiResponse({
    strSeason: season,
    strBadge: badge,
  }: SeasonBadgeSchema): SeasonBadge {
    return {
      season,
      badge,
    }
  }

  private async getSeasonBadge(leagueId: string): Promise<SeasonBadge> {
    this.setFieldValue('seasonBadgeLoading', true)

    if (this.value.seasonBadges[leagueId]) {
      return this.value.seasonBadges[leagueId]
    }

    const response = await this.gateway.getSeasonBadges(leagueId)
    const seasonBadge = this.mapSeasonBadgeApiResponse(response.seasons[0])

    this.setFieldValue('seasonBadgeLoading', false)

    return seasonBadge
  }

  async setCurrentSeasonBadge(leagueId: string): Promise<void> {
    const seasonBadge = await this.getSeasonBadge(leagueId)

    this.setFieldValue('currentSeasonBadge', seasonBadge)
  }

  setSportTypeFilter(sportType: SportType | null): void {
    this.setFieldValue('sportTypeFilter', sportType)
  }

  setSearchQuery(searchQuery: string): void {
    this.setFieldValue('searchQuery', searchQuery)
  }
}

const leaguesRepository = new LeaguesRepository()

export { leaguesRepository }
