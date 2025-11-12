import { LeagueList } from './components/LeagueList.tsx'

export const App = () => (
  <div className="Layout">
    <header className="Layout__Header Header">
      <a target="_blank" className="Header__Link" href="https://violapeter.hu/">
        Peter Viola
      </a>
      <a
        target="_blank"
        className="Header__Link"
        href="https://github.com/violapeter/"
      >
        GitHub
      </a>
      <a
        target="_blank"
        className="Header__Link"
        href="https://linkedin.com/in/violapeter/"
      >
        LinkedIn
      </a>
    </header>
    <main className="Layout__Content">
      <LeagueList />
    </main>
    <footer className="Layout__Footer">
      &copy; {new Date().getFullYear()} Peter Viola
    </footer>
  </div>
)
