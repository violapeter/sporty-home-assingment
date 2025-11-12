# 🏆 Sports Leagues

> A modern, reactive sports league management application showcasing Clean Architecture principles

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)

**Frontend Home Assignment for Sporty Group—**A showcase of modern frontend architecture with dual-framework implementation.

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- npm v8+

### Installation
```bash
npm install
```

### Development
```bash
# Start React app
npm run dev:react
# Start Vue app
npm run dev:vue
# Run all tests
npm test
# Lint the styles (standard config)
npm lint:styles
```

## 📁 Project Structure

```
  sports-leagues/
  ├── react-app/              # React implementation
  ├── vue-app/                # Vue implementation
  ├── features/               # Business logic
  └── modules/                # Shared libraries
      ├── abstract-mvvp/      # MVVM foundation
      ├── api-client/         # HTTP client
      ├── observable/         # Reactive primitives
      └── shared-types/       # TypeScript definitions
```

## 🏗 Architecture

This project demonstrates **Clean Architecture** with a clear separation of concerns:

```
┌────────────────────────────────────────────────────────────┐
│                       UI Layer                             │
│  ┌───────────────────┐        ┌──────────────────────┐     │
│  │     React App     │        │        Vue App       │     │
│  │  ┌──────────────┐ │        │  ┌─────────────────┐ │     │
│  │  │ usePresenter │ │        │  │ usePresenter    │ │     │
│  │  │ (hook)       │ │        │  │ (composable)    │ │     │
│  │  └──────────────┘ │        │  └─────────────────┘ │     │      
│  └───────────────────┘        └──────────────────────┘     │
└──────────┬──────────────────────────────┬──────────────────┘
           │                              │
┌──────────▼──────────────────────────────▼──────────────────┐
│                Business Logic Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  LeaguesPresenter                                    │  │
│  │  • openSeasonBadgeDisplay()                          │  │
│  │  • setSearchQuery()                                  │  │
│  │  • setSportTypeFilter()                              │  │
│  └─────────────────┬────────────────────────────────────┘  │
└────────────────────┼───────────────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────────────┐
│                Data Layer                                  │
│  ┌─────────────────┐    ┌────────────────────────────────┐ │
│  │LeaguesRepository│    │  LeagueDataGateway             │ │
│  │ • Badge caching │    │  • TheSportsDB API integration │ │
│  │ • State mgmt    │    │  • HTTP client abstraction     │ │
│  └─────────────────┘    └────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

## 🏆 Why This Architecture?

### ✅ **Maintainable**
- Clear separation of concerns
- Framework-agnostic business logic
- Comprehensive test coverage

### ✅ **Scalable**
- Modular design enables easy feature additions
- Observable pattern handles complex state scenarios
- Type-safe interfaces prevent runtime errors

### ✅ **Performant**
- Intelligent caching strategies
- Optimized re-renders with singleton patterns
- Efficient API usage with request deduplication

### ✅ **Developer Experience**
- Hot reloading in both React and Vue
- Rich TypeScript intellisense
- Extensive testing feedback

---

## ✨AI usage during development

- I used Claude Code to generate some test cases, it generated the vast majority of the documentation, and in some cases it helped me find and fix bugs.
- I constantly use ChatGPT and Dia browser to ask quick questions instead of googling, I looked up modern CSS features, Vue specific features templating best practices.
- Worth mentioning that I never use any AI-generated code as-is, I always refactor it to make it more readable and maintainable.

<div align="center">

**Built with ❤️ for Sporty Group**

*Showcasing modern frontend architecture patterns*

</div>