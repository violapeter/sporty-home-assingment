import type { League, SeasonBadge, SportType } from 'shared-types'
import { AbstractPresenter } from 'abstract-mvvp'
import type { LeaguesDomainModel } from './LeaguesRepository'
import { leaguesRepository } from './LeaguesRepository'

export interface LeaguesViewModel {
  leagues: League[]
  loading: boolean
  currentBadge: SeasonBadge | null
  sportTypeFilter: SportType | ''
  searchQuery: string
}

const DEFAULT_VIEW_MODEL: LeaguesViewModel = {
  leagues: [],
  loading: true,
  currentBadge: null,
  sportTypeFilter: '',
  searchQuery: '',
}

export class LeaguesPresenter extends AbstractPresenter<
  LeaguesDomainModel,
  LeaguesViewModel
> {
  defaultViewModel = DEFAULT_VIEW_MODEL

  repository = leaguesRepository

  private filterLeaguesBySearchQuery(
    leagues: League[],
    searchQuery: string,
  ): League[] {
    return leagues.filter((league) => {
      const name = league.name.toLowerCase()
      const searchQueryLower = searchQuery.toLowerCase()

      return name.includes(searchQueryLower)
    })
  }

  private filterLeaguesBySportType(
    leagues: League[],
    sportType: SportType | null,
  ): League[] {
    if (sportType === null) {
      return leagues
    }

    return leagues.filter((league) => league.sport === sportType)
  }

  private filterLeaguesByAll(
    leagues: League[],
    sportType: SportType | null,
    searchQuery: string,
  ): League[] {
    return this.filterLeaguesBySportType(
      this.filterLeaguesBySearchQuery(leagues, searchQuery),
      sportType,
    )
  }

  reduceViewModel({
    leagues,
    sportTypeFilter,
    loading,
    currentSeasonBadge,
    searchQuery,
  }: LeaguesDomainModel): LeaguesViewModel {
    return {
      leagues: this.filterLeaguesByAll(leagues, sportTypeFilter, searchQuery),
      loading: loading,
      currentBadge: currentSeasonBadge,
      sportTypeFilter: sportTypeFilter === null ? '' : sportTypeFilter,
      searchQuery: searchQuery,
    }
  }

  private async getLeagues(): Promise<void> {
    await this.repository.getLeagues()
  }

  public async handleLeagueClick(leagueId: string): Promise<void> {
    await this.repository.setCurrentSeasonBadge(leagueId)
  }

  public setSearchQuery(searchQuery: string): void {
    this.repository.setSearchQuery(searchQuery)
  }

  public setSportTypeFilter(sportType: SportType | ''): void {
    this.repository.setSportTypeFilter(sportType === '' ? null : sportType)
  }

  init() {
    void this.getLeagues()
  }
}
