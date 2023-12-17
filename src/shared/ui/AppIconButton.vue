<script setup lang="ts">
export interface AppIconButtonProps {
  name: string;
  scale?: number | string;
  fill?: string;
  animation?: 'wrench' | 'ring' | 'pulse' | 'spin' | 'spin-pulse' | 'flash' | 'float';
  speed?: 'slow' | 'fast';
  flip?: 'vertical' | 'horizontal' | 'both';
  hover?: boolean;
  label?: string;
  title?: string;
  inverse?: boolean;
}

defineProps<AppIconButtonProps>();
</script>

<template>
  <button class="app-icon-button">
    <v-icon
      :name="name"
      :scale="scale"
      :fill="fill"
      :animation="animation"
      :speed="speed"
      :flip="flip"
      :hover="hover"
      :label="label"
      :title="title"
      :inverse="inverse"
    />
  </button>
</template>

<style scoped lang="scss">
.app-icon-button {
  aspect-ratio: 1/1;
  border-radius: 100%;
  border: none;
  background-color: var(--color__primary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;

  &:hover {
    filter: brightness(150%);
  }
}
</style>
