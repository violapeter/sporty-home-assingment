import type { League, SeasonBadge, SportType } from 'shared-types'
import { AbstractPresenter } from 'abstract-mvvp'
import { LeaguesDomainModel, leaguesRepository } from './LeaguesRepository'

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

  reduceViewModel(domainModel: LeaguesDomainModel): LeaguesViewModel {
    return {
      leagues: domainModel.leagues || [],
      loading: domainModel.loading,
      currentBadge: domainModel.currentSeasonBadge,
    }
  }

  private async getLeagues(): Promise<void> {
    await this.repository.getLeagues()
  }

  async handleLeagueClick(leagueId: string): Promise<void> {
    await this.repository.setCurrentSeasonBadge(leagueId)
  }

  setSearchQuery(searchQuery: string): void {
    this.repository.setSearchQuery(searchQuery)
  }

  setSportTypeFilter(sportType: SportType | null): void {
    this.repository.setSportTypeFilter(sportType)
  }

  init() {
    void this.getLeagues()
  }
}
