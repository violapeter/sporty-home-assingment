<script setup lang="ts">
import LeagueList from './components/LeagueList.vue'
</script>

<template>
  <div class="Layout">
    <header class="Layout__Header Header">
      <a target="_blank" class="Header__Link" href="https://violapeter.hu/"
        >Peter Viola</a
      >
      <a
        target="_blank"
        class="Header__Link"
        href="https://github.com/violapeter/"
        >GitHub</a
      >
      <a
        target="_blank"
        class="Header__Link"
        href="https://linkedin.com/in/violapeter/"
        >LinkedIn</a
      >
    </header>
    <main class="Layout__Content">
      <LeagueList />
    </main>
    <footer class="Layout__Footer">
      &copy; {{ new Date().getFullYear() }} Peter Viola
    </footer>
  </div>
</template>
