import { LeaguesPresenter, LeaguesViewModel } from './LeaguesPresenter'
import { leagueDataGateway } from '../Gateways/LeagueDataGateway'

jest.mock('../Gateways/LeagueDataGateway', () => ({
  leagueDataGateway: {
    getLeagues: jest.fn(),
    getSeasonBadge: jest.fn(),
  },
}))

const mockLeaguesResponse = {
  leagues: [
    {
      idLeague: '4328',
      strLeague: 'English Premier League',
      strSport: 'Soccer',
      strLeagueAlternate: 'Premier League, EPL',
    },
    {
      idLeague: '4370',
      strLeague: 'Formula 1',
      strSport: 'Motorsport',
      strLeagueAlternate: 'F1, Formula One, Formula1, Formula 1, Formula-1',
    },
    {
      idLeague: '4371',
      strLeague: 'Formula E',
      strSport: 'Motorsport',
      strLeagueAlternate: 'Formula-E, FormulaE',
    },
  ],
}

const mockSeasonBadgesResponse = {
  seasons: [
    {
      strSeason: '2014-2015',
      strBadge:
        'https://r2.thesportsdb.com/images/media/league/badgearchive/571jj21690676218.png',
    },
  ],
}

describe('Leagues feature', () => {
  let presenter = new LeaguesPresenter()
  let viewModel: LeaguesViewModel

  beforeEach(() => {
    leagueDataGateway.getLeagues = jest
      .fn()
      .mockResolvedValue(mockLeaguesResponse)
    leagueDataGateway.getSeasonBadges = jest
      .fn()
      .mockResolvedValue(mockSeasonBadgesResponse)

    presenter.load((data) => {
      viewModel = data
    })
  })

  afterEach(() => {
    presenter.reset()
    jest.clearAllMocks()
  })

  it('should load leagues', async () => {
    expect(viewModel.leagues).toEqual([
      {
        id: '4328',
        name: 'English Premier League',
        sport: 'Soccer',
        alternateName: 'Premier League, EPL',
      },
      {
        id: '4370',
        name: 'Formula 1',
        sport: 'Motorsport',
        alternateName: 'F1, Formula One, Formula1, Formula 1, Formula-1',
      },
      {
        id: '4371',
        name: 'Formula E',
        sport: 'Motorsport',
        alternateName: 'Formula-E, FormulaE',
      },
    ])
  })

  it('should load the first season badge if a league clicked', async () => {
    await presenter.openSeasonBadgeDisplay('4328')
    expect(viewModel.currentBadge).toEqual({
      season: '2014-2015',
      badge:
        'https://r2.thesportsdb.com/images/media/league/badgearchive/571jj21690676218.png',
    })
  })

  it('should indicate the loading state during the request', async () => {
    presenter.openSeasonBadgeDisplay('4328').then(() => {
      expect(viewModel.seasonBadgeLoading).toBe(false)
    })
    expect(viewModel.seasonBadgeLoading).toBe(true)
  })

  it('should filter by search query when it is set ', () => {
    presenter.setSearchQuery('formu')

    expect(viewModel.leagues).toStrictEqual([
      {
        id: '4370',
        name: 'Formula 1',
        sport: 'Motorsport',
        alternateName: 'F1, Formula One, Formula1, Formula 1, Formula-1',
      },
      {
        id: '4371',
        name: 'Formula E',
        sport: 'Motorsport',
        alternateName: 'Formula-E, FormulaE',
      },
    ])
  })

  it('should filter by sport type when it is set ', () => {
    presenter.setSportTypeFilter('Soccer')

    expect(viewModel.leagues).toStrictEqual([
      {
        id: '4328',
        name: 'English Premier League',
        sport: 'Soccer',
        alternateName: 'Premier League, EPL',
      },
    ])
  })

  describe('Combined filtering', () => {
    it('should filter by both sport type and search query', () => {
      presenter.setSportTypeFilter('Motorsport')
      presenter.setSearchQuery('Formula 1')

      expect(viewModel.leagues).toStrictEqual([
        {
          id: '4370',
          name: 'Formula 1',
          sport: 'Motorsport',
          alternateName: 'F1, Formula One, Formula1, Formula 1, Formula-1',
        },
      ])
    })

    it('should return empty array when combined filters match nothing', () => {
      presenter.setSportTypeFilter('Soccer')
      presenter.setSearchQuery('Formula')

      expect(viewModel.leagues).toStrictEqual([])
    })

    it('should reset filters when search query is cleared', () => {
      presenter.setSearchQuery('Formula')
      presenter.setSearchQuery('')

      expect(viewModel.leagues).toHaveLength(3)
    })

    it('should reset filters when sport type is set to empty string', () => {
      presenter.setSportTypeFilter('Soccer')
      presenter.setSportTypeFilter('')

      expect(viewModel.leagues).toHaveLength(3)
    })
  })

  describe('Case insensitive search', () => {
    it('should filter case insensitively', () => {
      presenter.setSearchQuery('FORMULA')

      expect(viewModel.leagues).toHaveLength(2)
      expect(viewModel.leagues[0].name).toBe('Formula 1')
      expect(viewModel.leagues[1].name).toBe('Formula E')
    })

    it('should filter by partial name case insensitively', () => {
      presenter.setSearchQuery('premier')

      expect(viewModel.leagues).toStrictEqual([
        {
          id: '4328',
          name: 'English Premier League',
          sport: 'Soccer',
          alternateName: 'Premier League, EPL',
        },
      ])
    })
  })

  describe('Season badge caching', () => {
    it('should cache season badge data after first request', async () => {
      await presenter.openSeasonBadgeDisplay('4328')
      expect(leagueDataGateway.getSeasonBadges).toHaveBeenCalledTimes(1)

      await presenter.openSeasonBadgeDisplay('4328')
      expect(leagueDataGateway.getSeasonBadges).toHaveBeenCalledTimes(1)

      expect(viewModel.currentBadge).toEqual({
        season: '2014-2015',
        badge:
          'https://r2.thesportsdb.com/images/media/league/badgearchive/571jj21690676218.png',
      })
    })

    it('should make separate API calls for different leagues', async () => {
      await presenter.openSeasonBadgeDisplay('4328')
      await presenter.openSeasonBadgeDisplay('4370')

      expect(leagueDataGateway.getSeasonBadges).toHaveBeenCalledTimes(2)
      expect(leagueDataGateway.getSeasonBadges).toHaveBeenCalledWith('4328')
      expect(leagueDataGateway.getSeasonBadges).toHaveBeenCalledWith('4370')
    })

    it('should maintain cache after closing badge display', async () => {
      await presenter.openSeasonBadgeDisplay('4328')
      presenter.closeSeasonBadgeDisplay()
      await presenter.openSeasonBadgeDisplay('4328')

      expect(leagueDataGateway.getSeasonBadges).toHaveBeenCalledTimes(1)
    })
  })

  describe('Badge display state management', () => {
    it('should set badge display to open when a badge is loaded', async () => {
      expect(viewModel.isBadgeDisplayOpen).toBe(false)

      await presenter.openSeasonBadgeDisplay('4328')

      expect(viewModel.isBadgeDisplayOpen).toBe(true)
      expect(viewModel.currentBadge).toBeTruthy()
    })

    it('should close badge display when requested', async () => {
      await presenter.openSeasonBadgeDisplay('4328')
      expect(viewModel.isBadgeDisplayOpen).toBe(true)

      presenter.closeSeasonBadgeDisplay()

      expect(viewModel.isBadgeDisplayOpen).toBe(false)
      expect(viewModel.currentBadge).toBeNull()
    })

    it('should show loading state during badge request', async () => {
      expect(viewModel.seasonBadgeLoading).toBe(false)

      const promise = presenter.openSeasonBadgeDisplay('4328')
      expect(viewModel.seasonBadgeLoading).toBe(true)

      await promise
      expect(viewModel.seasonBadgeLoading).toBe(false)
    })
  })
})
