<script setup lang="ts">
import type { SeasonBadge } from 'shared-types'
import { onMounted, useTemplateRef, watchEffect } from 'vue'

interface SeasonBadgeProps {
  open: boolean
  loading: boolean
  seasonBadge?: SeasonBadge | null
}

const { seasonBadge, loading, open } = defineProps<SeasonBadgeProps>()
const emit = defineEmits(['close'])

const dialog = useTemplateRef('dialog')

watchEffect(() => {
  if (open && dialog.value) {
    dialog.value.showModal()
  }
})

const handleClose = () => {
  emit('close')

  if (dialog.value) {
    dialog.value.close()
  }
}
</script>

<template>
  <dialog class="SeasonBadgeDisplay" ref="dialog">
    <button class="SeasonBadgeDisplay__CloseButton" @click="handleClose">
      ×
    </button>
    <div class="SeasonBadgeDisplay__Content">
      <div v-if="loading" class="SeasonBadgeDisplay__Loading Loading">
        Loading...
      </div>
      <img
        v-else-if="!!seasonBadge"
        class="SeasonBadgeDisplay__Image"
        :src="seasonBadge.badge"
        :alt="seasonBadge.season"
      />
    </div>
  </dialog>
</template>
