<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'

export interface AppInputSlots {
  label?(): any;
}

export interface AppInputModifiers {
  upper?: boolean;
  lower?: boolean;
  capitalize?: boolean;
  trim?: boolean;
  uniqueSymbols?: boolean;
  number?: boolean;
}

export interface AppInputProps {
  placeholder?: string;
  modelValue?: string;
  modelModifiers?: AppInputModifiers;
  disabled?: boolean;
  type: 'text' | 'password';
}

export interface AppInputEmits {
  (e: 'update:modelValue', value: string): void
}

const slots = defineSlots<AppInputSlots>();
const emit = defineEmits<AppInputEmits>();

const props = withDefaults(defineProps<AppInputProps>(), {
  type: 'text',
  modelModifiers: () => ({})
});

const inputText = ref(props.modelValue ?? '')
const inputElement = ref<HTMLInputElement | null>(null)
const showPlaceholder = computed(
  () => inputText.value.length === 0 && props.placeholder !== undefined
)

const focusOnInput = () => {
  if (inputElement.value) {
    inputElement.value.focus()
  }
}

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement

  inputText.value = target.value

  if (props.modelModifiers.number) {
    inputText.value = Number.isNaN(Number(target.value)) ? props.modelValue ?? '0' : target.value

    return emit('update:modelValue', inputText.value)
  }

  if (props.modelModifiers.trim) {
    inputText.value = inputText.value.trim()
  }

  if (props.modelModifiers.lower) {
    inputText.value = inputText.value.toLowerCase()
  }

  if (props.modelModifiers.upper) {
    inputText.value = inputText.value.toUpperCase()
  }

  if (props.modelModifiers.capitalize) {
    inputText.value = inputText.value[0].toUpperCase() + inputText.value.slice(1)
  }

  if (props.modelModifiers.uniqueSymbols) {
    inputText.value = Array.from(new Set(inputText.value.split(''))).join('')
  }

  emit('update:modelValue', inputText.value)
}

onUpdated(() => {
  if (props.modelValue) {
    inputText.value = props.modelValue
  }
})

const isFocused = ref(false);

const conditionalClasses = computed(() => ({
  'app-input-text-field-blocked': props.disabled,
  'app-input-text-field-focused': isFocused.value
}))

const onFocus = () => {
  isFocused.value = true;
}

const onBlur = () => {
  isFocused.value = false;
}
</script>

<template>
  <div class="app-input">
    <label v-if="slots.label" class="app-input__label">
      <slot name="label" />
    </label>

    <div class="app-input-text-field" :class="conditionalClasses" @click="focusOnInput">
      <div class="app-input-text-field__wrapper">
        <p v-show="showPlaceholder" class="app-input-text-field__placeholder truncate">
          {{ props.placeholder }}
        </p>
        <input
          :disabled="props.disabled"
          ref="inputElement"
          class="app-input-text-field__text"
          :type="type"
          :value="inputText"
          @input="updateModelValue"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: max-content;

  &-text-field {
    padding: 8px 12px;
    background: var(--color__input);
    border-radius: 8px;
    border: 2px solid #eee2;
    cursor: text;

    &-blocked {
      cursor: default;
    }

    &-focused {
      border-color: #eeec;
    }

    &__wrapper {
      position: relative;
    }

    &__placeholder {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      opacity: 0.25;
      max-width: 100%;
    }

    &__text {
      width: 100%;
      color: var(--color__text);
      border: none;
      outline: none;
      background: transparent;
    }
  }
}
</style>
