import type { SportType } from 'shared-types'

interface LeagueProps {
  name: string
  sport: SportType
  alternateNames: string[]
  onClick?: () => void
}

export const League = ({
  name,
  sport,
  alternateNames,
  onClick,
}: LeagueProps) => {
  const classNameMap: { [key in SportType]: string } = {
    Soccer: 'League--Soccer',
    Motorsport: 'League--Motorsport',
    Basketball: 'League--Basketball',
    'Ice Hockey': 'League--IceHockey',
    'American Football': 'League--AmericanFootball',
  }

  const sportClassName = classNameMap[sport]

  return (
    <div className={['League', sportClassName].join(' ')} onClick={onClick}>
      <div className="League__Content">
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
    </div>
  )
}
