<script setup lang="ts">
import type { SportType } from 'shared-types'

interface LeagueProps {
  name: string
  sport: SportType
  alternateNames: string[]
}

const { sport, alternateNames, name } = defineProps<LeagueProps>()

const classNameMap: { [key in SportType]: string } = {
  Soccer: 'League--Soccer',
  Motorsport: 'League--Motorsport',
  Basketball: 'League--Basketball',
  'Ice Hockey': 'League--IceHockey',
  'American Football': 'League--AmericanFootball',
}
</script>

<template>
  <div :class="['League', classNameMap[sport]]" @click="$emit('click')">
    <div class="League__Content">
      <h3 class="League__Name">{{ name }}</h3>
      <div class="League__Meta">
        <span class="League__Category">{{ sport }}</span>
        <div class="League__AlternateNames">
          <span
            v-for="alternateName in alternateNames"
            class="League__AlternateName"
          >
            {{ alternateName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
