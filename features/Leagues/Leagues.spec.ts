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
    await presenter.handleLeagueClick('4328')
    expect(viewModel.currentBadge).toEqual({
      season: '2014-2015',
      badge:
        'https://r2.thesportsdb.com/images/media/league/badgearchive/571jj21690676218.png',
    })
  })

  it('should indicate the loading state during the request', async () => {
    presenter.handleLeagueClick('4328').then(() => {
      expect(viewModel.loading).toBe(false)
    })
    expect(viewModel.loading).toBe(true)
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
})
