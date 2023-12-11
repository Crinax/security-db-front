<script setup lang="ts">
import { ref, computed } from 'vue';

export interface AppAvatarProps {
  uid?: string;
  name: string;
}

const props = defineProps<AppAvatarProps>();

const isLoadingError = ref(false);

const url = computed(() => `${import.meta.env.VITE_API_URL}/files/${props.uid}`);
const firstLetterFromName = computed(() => props.name.charAt(0));

const changeErrorState = () => {
  isLoadingError.value = true;
}
</script>

<template>
  <div class="app-avatar">
    <img v-if="!isLoadingError && uid" :src="url" class="app-avatar__exists" @error="changeErrorState" />

    <div v-else class="app-avatar__empty">
      <span class="app-avatar__name">{{ firstLetterFromName }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-avatar {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #aeaeae77;
  flex-shrink: 0;
  flex-grow: 0;
  height: 100%;

  &__empty {
    background-color: #aaaaaa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
  }
}
</style>