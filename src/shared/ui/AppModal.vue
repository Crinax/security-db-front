<script setup lang="ts">
import { computed } from 'vue'
import AppCrossIcon from '@uikit/icons/AppCrossIcon.vue'
import type { ColorKinds } from '@uikit/basic-types'

export interface AppModalEmits {
  (e: 'close'): void
}

export interface AppModalProps {
  kind?: ColorKinds | string
  showCross?: boolean
}

const emit = defineEmits<AppModalEmits>()
const props = defineProps<AppModalProps>()

const modalClasses = computed(() => ({
  'app-modal-window': true,
  [`app-modal-window__${props.kind}`]: props.kind !== 'primary'
}))

const closeModal = () => emit('close')
</script>

<template>
  <Teleport to="#app-modals">
    <div class="app-modal" @click.self="closeModal">
      <div :class="modalClasses">
        <div class="app-modal-window__body">
          <slot />
        </div>
        <div
          v-if="props.showCross"
          class="app-modal-window__cross"
          role="button"
          @click="closeModal"
        >
          <app-cross-icon fill="#fff5" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '@app/assets/mixins';

.app-modal {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color__modal-fog);

  @include backdrop-filter(blur(5px));

  &-window {
    box-shadow: 0px 0px 12px 0px #0003;
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: var(--color__background);
    border: 2px solid #fff1;

    &__cross {
      background-color: var(--color__background);
      width: 24px;
      height: 24px;
      border-radius: 100%;
      align-self: flex-end;

      &:active {
        filter: brightness(150%);
      }
    }

    &__success {
      border-color: #00690755;
    }

    &__accent {
      border-color: #5b38bf55;
    }

    &__info {
      border-color: #22668955;
    }

    &__error {
      border-color: #89110755;
    }
  }
}
</style>
