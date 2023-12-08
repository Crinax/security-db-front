<script setup lang="ts">
import { computed } from 'vue'

export interface AppHeaderProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
  line?: boolean
}

const props = withDefaults(defineProps<AppHeaderProps>(), {
  level: 1,
  line: true
})

const headerLevel = computed(() => `h${props.level}`)
</script>

<template>
  <div class="app-header">
    <hr v-if="props.line" class="app-header__line" />

    <component :is="headerLevel" class="app-header__text">
      <slot />
    </component>
  </div>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;

  &__line {
    margin: 0;
    border: 0;
    width: 2px;
    border-radius: 8px;
    background-color: var(--color__text);
  }

  &__text {
    margin: 8px 4px;
  }
}
</style>
