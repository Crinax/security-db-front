<script setup lang="ts">
import { computed, ref } from 'vue'
import AppArrowIcon from '@uikit/icons/AppArrowIcon.vue'

export interface AppSelectList {
  key: string
  value: string
  default?: boolean
  blocked?: boolean
}

export interface AppSelectProps {
  list: AppSelectList[]
}

export interface AppSelectEmits {
  (e: 'select', key: string, value: any): void
}

const props = defineProps<AppSelectProps>()
const emit = defineEmits<AppSelectEmits>()

const selectValue = ref<string | null>(null)
const isOpened = ref(false)

const defaultValue = computed(() => props.list.find((item) => item.default))
const currentValue = computed(
  () => selectValue.value ?? defaultValue?.value?.value ?? 'Not selected'
)
const iconClasses = computed(() => ({
  'app-select-element__arrow': true,
  'arrow-active': isOpened.value,
  'arrow-inactive': !isOpened.value
}))

const toggleSelect = () => {
  isOpened.value = !isOpened.value
}

const selectElement = (key: string) => {
  toggleSelect()
  // it's is impossible to select unexisting value :D
  selectValue.value = props.list.find((item) => item.key === key)!.value
  emit('select', key, selectValue.value)
}
</script>

<template>
  <div class="app-select">
    <div class="app-select-element" role="button" @click="toggleSelect">
      <p class="app-select-element__value">
        {{ currentValue }}
      </p>
      <app-arrow-icon fill="currentColor" :class="iconClasses" />
    </div>
    <Transition name="slide">
      <div class="app-select-list" v-if="isOpened">
        <template v-if="props.list.length !== 0">
          <div
            v-for="item in list"
            class="app-select-list__element"
            :class="{
              'app-select-list__blocked': item.blocked
            }"
            role="button"
            :key="item.key"
            @click="!item.blocked && selectElement(item.key)"
          >
            {{ item.value }}
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.app-select {
  position: relative;

  &-element {
    padding: 8px 12px;
    background: var(--color__input);
    border-radius: 8px;
    border: 2px solid #eee2;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    overflow: hidden;

    &__value {
      padding: 0;
      margin: 0;
    }

    &__arrow {
      transition: transform 0.3s;
    }

    &__arrow.arrow-active {
      transform: rotate(0deg);
    }

    &__arrow.arrow-inactive {
      transform: rotate(180deg);
    }
  }

  &-list {
    position: absolute;
    width: 100%;
    margin-top: 4px;
    flex-direction: column;
    padding: 0;
    gap: 0px;
    z-index: 20;
    @extend .app-select-element;

    &__element {
      padding: 8px 12px;
      background: var(--color__input);
    }

    &__element:hover {
      filter: brightness(130%);
    }

    &__blocked:hover,
    &__blocked {
      cursor: default;
      filter: brightness(80%);
    }
  }
}
</style>
