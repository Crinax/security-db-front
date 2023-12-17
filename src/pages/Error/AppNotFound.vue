<script setup lang="ts">
import AppHeader from '@uikit/AppHeader.vue';
import FlexCenterLayout from '@layouts/FlexCenterLayout.vue';
</script>

<template>
  <flex-center-layout is-full>
    <app-header level="1" :line="false">Страница не найдена!</app-header>
  </flex-center-layout>
</template>
