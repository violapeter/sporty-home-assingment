import type { SportType } from 'shared-types'

interface LeagueProps {
  name: string
  sport: SportType
  alternateNames: string[]
}

export const League = ({ name, sport, alternateNames }: LeagueProps) => (
  <div className="League">
    <h3 className="League__Name">{name}</h3>
    <div className="League__Meta">
      <span className="League__Category">{sport}</span>
      <div className="League__AlternateNames">
        {alternateNames.map((alternateName) => (
          <span key={alternateName} className="League__AlternateName">
            {alternateName}
          </span>
        ))}
      </div>
    </div>
  </div>
)
