import type { League, SeasonBadge, SportType } from 'shared-types'
import { AbstractPresenter } from 'abstract-mvvp'
import type { LeaguesDomainModel } from './LeaguesRepository'
import { leaguesRepository } from './LeaguesRepository'

export interface LeaguesViewModel {
  leagues: League[]
  loading: boolean
  currentBadge: SeasonBadge | null
}

const DEFAULT_VIEW_MODEL: LeaguesViewModel = {
  leagues: [],
  loading: true,
  currentBadge: null,
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
    if (!sportType) {
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

  reduceViewModel(domainModel: LeaguesDomainModel): LeaguesViewModel {
    return {
      leagues: this.filterLeaguesByAll(
        domainModel.leagues,
        domainModel.sportTypeFilter,
        domainModel.searchQuery,
      ),
      loading: domainModel.loading,
      currentBadge: domainModel.currentSeasonBadge,
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

  public setSportTypeFilter(sportType: SportType | null): void {
    this.repository.setSportTypeFilter(sportType)
  }

  init() {
    void this.getLeagues()
  }
}
