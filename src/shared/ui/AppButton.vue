<script setup lang="ts">
import { computed } from 'vue'
import type { ColorKinds } from '@uikit/basic-types'

export interface AppButtonProps {
  kind?: ColorKinds | string
  block?: boolean
}

export interface AppButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export interface AppButtonSlots {
  icon?(): any
  default?(): any
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  kind: 'primary',
  block: false
})

const buttonClasses = computed(() => ({
  'app-button': true,
  [`app-button__${props.kind}`]: props.kind !== 'primary',
  'app-button__block': props.block
}))

const slots = defineSlots<AppButtonSlots>()

const emit = defineEmits<AppButtonEmits>()

const click = (e: MouseEvent) => (!props.block ? emit('click', e) : void 0)
</script>

<template>
  <div :class="buttonClasses" role="button" @click="click">
    <div class="app-button-icon" v-if="slots.icon">
      <slot name="icon" />
    </div>
    <div class="app-button-text">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-button {
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--color__primary);
  box-shadow: 0px 0px 6px 0px #00000075;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: 0.1s;

  &-text {
    margin: auto;
  }

  &-icon {
    max-width: 12px;
    max-height: 12px;
  }

  &:active {
    box-shadow: 0px 0px 0px 0px #00000075;
  }

  &:hover {
    filter: brightness(120%);
  }

  &__success {
    background-color: var(--color__success);
  }

  &__accent {
    background-color: var(--color__accent);
  }

  &__error {
    background-color: var(--color__error);
  }

  &__info {
    background-color: var(--color__info);
  }

  &__block {
    filter: brightness(80%);
    box-shadow: none;
    cursor: not-allowed;

    &:hover {
      filter: brightness(80%);
    }
  }
}
</style>
