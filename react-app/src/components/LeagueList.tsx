import { usePresenter } from '../hooks/usePresenter'
import { LeaguesPresenter } from 'features'
import { League } from './League.tsx'

export const LeagueList = () => {
  const [viewModel] = usePresenter(LeaguesPresenter)

  return (
    <div className="LeagueList">
      <h2 className="LeagueList__Title">Leagues:</h2>
      {viewModel.loading && <div>Loading...</div>}
      {viewModel.leagues.map((league) => (
        <League
          key={league.id}
          alternateNames={league.alternateName.split(',')}
          {...league}
        />
      ))}
      {viewModel.currentBadge && (
        <div>Current badge: {viewModel.currentBadge.season}</div>
      )}
    </div>
  )
}
