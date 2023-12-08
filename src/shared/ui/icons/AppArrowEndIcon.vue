<script setup lang="ts">
export interface AppIconArrowProps {
  width?: string
  height?: string
  fill?: string
}

withDefaults(defineProps<AppIconArrowProps>(), {
  width: '24px',
  height: '24px',
  fill: '#0f0f0f'
})
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 12H18M6 12L11 7M6 12L11 17"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
