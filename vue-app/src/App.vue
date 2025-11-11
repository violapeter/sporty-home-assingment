<script setup lang="ts">
import LeagueList from './components/LeagueList.vue'
</script>

<template>
  <div class="Layout">
    <header class="Layout__Header">Peter Viola - Home Assignment</header>
    <main class="Layout__Content">
      <LeagueList />
    </main>
    <footer class="Layout__Footer">
      &copy; {{ new Date().getFullYear() }} Peter Viola
    </footer>
  </div>
</template>
