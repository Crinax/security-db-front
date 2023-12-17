<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import AppAvatar from '@uikit/AppAvatar.vue';
import AppText from '@uikit/AppText.vue';
import AppIconButton from '@uikit/AppIconButton.vue';
import { getYearSuffix } from '@shared/helpers/date';
 
export interface AppLawProps {
  avatarUid?: string;
  lawUid: string;
  startActivityDate: Date;
  firstName: string;
  secondName: string;
}

const props = defineProps<AppLawProps>();
const elapsedYears = computed(() => moment().diff(props.startActivityDate, 'years'));
const fullname = computed(() => `${props.firstName} ${props.secondName}`);
const yearsSuffix = computed(() => getYearSuffix(elapsedYears.value));
const expirienceStatus = computed(() =>
  elapsedYears.value > 10
    ? 'app-law__gold-status'
    : elapsedYears.value > 5
      ? 'app-law__silver-status'
      : 'app-law__default'
);
</script>

<template>
  <div class="app-law">
    <app-avatar class="app-law__avatar" :uid="avatarUid" :name="firstName" />

    <div class="app-law__info">
      <app-text>{{ fullname }}</app-text>

      <app-text v-if="elapsedYears > 0" class="app-law__expirience">
        Стаж: <app-text inline :class="expirienceStatus">{{ elapsedYears }} {{ yearsSuffix }}</app-text>
      </app-text>
      <app-text v-else class="app-law__expirience expirience__low">
        Cтаж менее года
      </app-text>
    </div>

    <div class="app-law__action-panel">
      <app-icon-button
        name="oi-pencil"
        scale="1.4"
      />
      <app-icon-button
        name="oi-trash"
        scale="1.4"
        fill="#fa4444"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-law {
  display: flex;
  align-items: center;
  gap: 1rem;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #51525355;
  padding: 0.5rem;
  background-color: var(--color__primary);
  box-shadow: 0 0 5px 0 #111213f0;
  filter: brightness(100%);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px 0 #11121300;
    filter: brightness(110%);
  }

  &__action-panel {
    margin-left: auto;
    display: flex;
    gap: 0.5rem;
  }

  &__avatar {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__expirience, &__expirience * {
    font-size: 0.9rem;
    display: flex;
    align-items: end;
    gap: 4px;
  }

  &__gold-status {
    color: #ffd700;
    text-decoration: underline #ffd700 2px;
  }

  &__silver-status {
    color: #c0c0c0;
    text-decoration: underline #c0c0c0 2px;
  }

  .expirience__low {
    font-size: 0.75rem;
  }
}
</style>
