<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import AppButton from '@uikit/AppButton.vue'
import AppText from '@uikit/AppText.vue'
import AppInput from '@uikit/AppInput.vue'
import AppModal from '@uikit/AppModal.vue'
import AppSelect from '@uikit/AppSelect.vue'
import AppHeader from '@uikit/AppHeader.vue'
import BaseLayout from '@layouts/BaseLayout.vue'

const textComponent = ref('')
const inputText = ref('')
const modalStatus = ref(false)
const modalKind = ref('primary')
const router = useRouter()

const modalKinds = computed(() => [
  { key: 'primary', value: 'primary', default: true, blocked: false },
  { key: 'success', value: 'success', default: false, blocked: false },
  { key: 'accent', value: 'accent', default: false, blocked: false },
  { key: 'error', value: 'error', default: false, blocked: false },
  { key: 'info', value: 'info', default: false, blocked: false }
])

const selectModalKind = (key: string) => (modalKind.value = key)
const clickEvent = (text: string) => (textComponent.value = text)
const openModal = () => (modalStatus.value = true)
const closeModal = () => (modalStatus.value = false)
</script>

<template>
  <base-layout>
    <div>
      <app-header level="1">Header level 1</app-header>
      <app-header level="2">Header level 2</app-header>
      <app-header level="3">Header level 3</app-header>
      <app-header level="4">Header level 4</app-header>
      <app-header level="5">Header level 5</app-header>
      <app-header level="6">Header level 6</app-header>

      <div class="app-components simple-text">
        <app-text kind="primary">Default text: {{ textComponent }}</app-text>
        <app-text kind="success">Success text: {{ textComponent }}</app-text>
        <app-text kind="accent">Accent text: {{ textComponent }}</app-text>
        <app-text kind="error">Error text: {{ textComponent }}</app-text>
        <app-text kind="info">Info text: {{ textComponent }}</app-text>
      </div>

      <div class="app-components buttons">
        <app-button kind="primary" @click="clickEvent('Primary button')">Primary button</app-button>
        <app-button kind="success" @click="clickEvent('Success button')">Success button</app-button>
        <app-button kind="accent" @click="clickEvent('Accent button')">Accent button</app-button>
        <app-button kind="error" @click="clickEvent('Error button')">Error button</app-button>
        <app-button kind="info" @click="clickEvent('Info button')">Info button</app-button>
      </div>

      <div class="app-components buttons">
        <app-button kind="primary" @click="clickEvent('Primary button')" block>
          Primary button
        </app-button>
        <app-button kind="success" @click="clickEvent('Success button')" block>
          Success button
        </app-button>
        <app-button kind="accent" @click="clickEvent('Accent button')" block>
          Accent button
        </app-button>
        <app-button kind="error" @click="clickEvent('Error button')" block>Error button</app-button>
        <app-button kind="info" @click="clickEvent('Info button')" block>Info button</app-button>
      </div>

      <div class="app-components input">
        <app-input v-model="inputText" placeholder="Enter a text">
          <template #label>
            {{ inputText }}
          </template>
        </app-input>
      </div>

      <div class="app-components modal">
        <app-select :list="modalKinds" @select="selectModalKind" class="modal-select"></app-select>
        <app-button @click="openModal">Open {{ modalKind }} modal</app-button>
      </div>

      <app-button @click="router.push({ name: 'home' })">Return to home</app-button>

      <app-modal v-if="modalStatus" :kind="modalKind" show-cross @close="closeModal">
        <app-text>This is {{ modalKind }} modal</app-text>
      </app-modal>
    </div>
  </base-layout>
</template>

<style scoped>
.app-components {
  margin-bottom: 8px;
}

.app-components.buttons,
.app-components.modal {
  display: flex;
  gap: 20px;
}

.modal-select {
  width: 150px;
}
</style>
