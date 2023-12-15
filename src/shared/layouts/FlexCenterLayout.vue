<script lang="ts" setup>
export interface FlexCenterLayoutProps {
  direction?: 'row' | 'column';
  isFull?: boolean;
}

withDefaults(defineProps<FlexCenterLayoutProps>(), {
  direction: 'row',
  isFull: false,
});
</script>

<template>
  <div class="flex-center-layout" :class="{ 'full-layout': isFull }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.flex-center-layout {
  display: flex;
  flex-direction: v-bind(direction);
  justify-content: center;
  align-items: center;
}

.full-layout {
  width: 100%;
  height: 100%;
}
</style>
