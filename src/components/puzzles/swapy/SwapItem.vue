<script setup lang="ts">
const { itemId } = defineProps<{
  itemId: string;
}>();
</script>

<template>
  <div :data-swapy-item="itemId"></div>
</template>
