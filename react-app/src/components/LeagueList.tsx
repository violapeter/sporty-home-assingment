import { usePresenter } from '../hooks/usePresenter'
import { LeaguesPresenter } from 'features'
import { League } from './League.tsx'
import type { SportType } from 'shared-types'
import { SeasonBadge } from './SeasonBadge.tsx'

export const LeagueList = () => {
  const [viewModel, presenter] = usePresenter(LeaguesPresenter)

  const sportTypeFilterOptions: SportType[] = [
    'American Football',
    'Basketball',
    'Soccer',
    'Ice Hockey',
    'Motorsport',
  ]

  return (
    <div className="LeagueList">
      <h2 className="LeagueList__Title">Sport Leagues</h2>

      {viewModel.loading ? (
        <div className="LeagueList__Loading Loading">Loading...</div>
      ) : (
        <>
          <div className="LeagueList__Filters">
            <input
              id="search-input"
              type="text"
              placeholder="Search leagues"
              value={viewModel.searchQuery}
              className="LeagueList__Search"
              onChange={(e) => presenter.setSearchQuery(e.target.value)}
            />
            <select
              id="sport-type-filter"
              className="LeagueList__SportTypeFilter"
              value={viewModel.sportTypeFilter}
              onChange={(e) => {
                presenter.setSportTypeFilter(e.target.value as SportType)
              }}
            >
              <option value={''}>All</option>
              <optgroup label="Sport Type">
                {sportTypeFilterOptions.map((sportTypeFilterOption) => (
                  <option
                    key={sportTypeFilterOption}
                    value={sportTypeFilterOption}
                  >
                    {sportTypeFilterOption}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          {viewModel.leagues.length === 0 ? (
            <div className="LeagueList__NoResults">🤷 No leagues found</div>
          ) : (
            <div className="LeagueList__Leagues">
              {viewModel.leagues.map((league) => (
                <League
                  key={league.id}
                  alternateNames={league.alternateName.split(',')}
                  onClick={() => presenter.openSeasonBadgeDisplay(league.id)}
                  {...league}
                />
              ))}
            </div>
          )}
        </>
      )}

      <SeasonBadge
        open={viewModel.isBadgeDisplayOpen}
        loading={viewModel.seasonBadgeLoading}
        seasonBadge={viewModel.currentBadge}
        onClose={() => presenter.closeSeasonBadgeDisplay()}
      />
    </div>
  )
}
