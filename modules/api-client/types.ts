export type LeagueSchema = {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string
}

export type SeasonBadgeSchema = {
  strSeason: string
  strBadge: string
}

export type LeaguesResponse = {
  leagues: LeagueSchema[]
}

export type BadgesResponse = {
  seasons: SeasonBadgeSchema[]
}
