import type { League, SeasonBadge, SportType } from 'shared-types'
import { AbstractPresenter } from 'abstract-mvvp'
import type { LeaguesDomainModel } from './LeaguesRepository'
import { leaguesRepository } from './LeaguesRepository'

export interface LeaguesViewModel {
  leagues: League[]
  loading: boolean
  currentBadge: SeasonBadge | null
  isBadgeDisplayOpen: boolean
  seasonBadgeLoading: boolean
  sportTypeFilter: SportType | ''
  searchQuery: string
}

const DEFAULT_VIEW_MODEL: LeaguesViewModel = {
  leagues: [],
  loading: true,
  isBadgeDisplayOpen: false,
  seasonBadgeLoading: false,
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
    seasonBadgeLoading,
    searchQuery,
  }: LeaguesDomainModel): LeaguesViewModel {
    return {
      leagues: this.filterLeaguesByAll(leagues, sportTypeFilter, searchQuery),
      loading: loading,
      currentBadge: currentSeasonBadge,
      sportTypeFilter: sportTypeFilter === null ? '' : sportTypeFilter,
      searchQuery: searchQuery,
      seasonBadgeLoading: seasonBadgeLoading,
      isBadgeDisplayOpen: currentSeasonBadge !== null,
    }
  }

  private async getLeagues(): Promise<void> {
    await this.repository.getLeagues()
  }

  public async openSeasonBadgeDisplay(leagueId: string): Promise<void> {
    await this.repository.setCurrentSeasonBadge(leagueId)
  }

  public setSearchQuery(searchQuery: string): void {
    this.repository.setSearchQuery(searchQuery)
  }

  public setSportTypeFilter(sportType: SportType | ''): void {
    this.repository.setSportTypeFilter(sportType === '' ? null : sportType)
  }

  public closeSeasonBadgeDisplay() {
    this.repository.setFieldValue('currentSeasonBadge', null)
  }

  init() {
    void this.getLeagues()
  }
}
