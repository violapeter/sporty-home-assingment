export type SportType = 'Soccer' | 'Motorsport' | 'Ice Hockey' | 'Basketball' | 'American Football'

export interface League {
  id: string
  name: string
  sport: SportType
  alternateName: string
}

export interface SeasonBadge {
  season: string
  /** URL for the badge image */
  badge: string
}