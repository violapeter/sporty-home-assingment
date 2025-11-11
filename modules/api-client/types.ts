export type LeaguesResponse = {
  leagues: Array<{
    idLeague: string
    strLeague: string
    strSport: string
    strLeagueAlternate: string
  }>
}

export type BadgesResponse = {
  badges: Array<{
    strSeason: string
    strBadge: string
  }>
}
