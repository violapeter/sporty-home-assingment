<script setup lang="ts">
import { usePresenter } from '../composables/usePresenter'
import { LeaguesPresenter } from 'features'
import type { SportType } from 'shared-types'
import League from './League.vue'
import SeasonBadge from './SeasonBadge.vue'

const [viewModel, presenter] = usePresenter(LeaguesPresenter)

const sportTypeFilterOptions: SportType[] = [
  'American Football',
  'Basketball',
  'Soccer',
  'Ice Hockey',
  'Motorsport',
]
</script>

<template>
  <div class="LeagueList">
    <h2 class="LeagueList__Title">Leagues</h2>

    <div v-if="viewModel.loading" class="LeagueList__Loading Loading">
      Loading...
    </div>
    <template v-else>
      <div class="LeagueList__Filters">
        <input
          type="text"
          placeholder="Search leagues"
          :value="viewModel.searchQuery"
          class="LeagueList__Search"
          @input="
            presenter.setSearchQuery(($event.target as HTMLInputElement).value)
          "
        />
        <select
          class="LeagueList__SportTypeFilter"
          :value="viewModel.sportTypeFilter"
          @change="
            presenter.setSportTypeFilter(
              ($event.target as HTMLSelectElement).value as SportType,
            )
          "
        >
          <option value="">All</option>
          <optgroup label="Sport Type">
            <option
              v-for="sportTypeFilterOption in sportTypeFilterOptions"
              :key="sportTypeFilterOption"
              :value="sportTypeFilterOption"
            >
              {{ sportTypeFilterOption }}
            </option>
          </optgroup>
        </select>
      </div>
      <div v-if="viewModel.leagues.length === 0" class="LeagueList__NoResults">
        🤷 No leagues found
      </div>
      <div v-else class="LeagueList__Leagues">
        <League
          v-for="league in viewModel.leagues"
          :key="league.id"
          :id="league.id"
          :name="league.name"
          :sport="league.sport"
          :alternate-names="league.alternateName.split(',')"
          @click="presenter.openSeasonBadgeDisplay(league.id)"
        />
      </div>
    </template>

    <SeasonBadge
      :open="viewModel.isBadgeDisplayOpen"
      :loading="viewModel.seasonBadgeLoading"
      :season-badge="viewModel.currentBadge"
      @close="presenter.closeSeasonBadgeDisplay()"
    />
  </div>
</template>
