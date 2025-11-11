import { LeagueList } from './components/LeagueList.tsx'

export const App = () => (
  <div className="Layout">
    <header className="Layout__Header">Peter Viola - Home Assignment</header>
    <main className="Layout__Content">
      <LeagueList />
    </main>
    <footer className="Layout__Footer">
      &copy; {new Date().getFullYear()} Peter Viola
    </footer>
  </div>
)
