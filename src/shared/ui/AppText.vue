<script setup lang="ts">
import { computed } from 'vue'
import type { ColorKinds } from '@uikit/basic-types'

export interface AppTextSlots {
  default?(): string
}

export interface AppTextProps {
  kind?: ColorKinds | string
}

const props = withDefaults(defineProps<AppTextProps>(), {
  kind: 'primary'
})

const textClasses = computed(() => ({
  'app-text': true,
  [`app-text__${props.kind}`]: props.kind !== 'primary',
  'app-text__high-brightness': props.kind !== 'primary'
}))
</script>

<template>
  <p :class="textClasses">
    <slot />
  </p>
</template>

<style scoped lang="scss">
.app-text {
  margin: 0;
  padding: 0;

  &__success {
    color: var(--color__success);
  }

  &__accent {
    color: var(--color__accent);
  }

  &__error {
    color: var(--color__error);
  }

  &__info {
    color: var(--color__info);
  }

  &__high-brightness {
    filter: brightness(200%);
  }
}
</style>
